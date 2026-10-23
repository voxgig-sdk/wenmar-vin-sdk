<?php
declare(strict_types=1);

// WenmarVin SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class WenmarVinSDK implements \JsonSerializable
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new WenmarVinUtility();
        $this->_utility = $utility;

        $config = WenmarVinConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = WenmarVinHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = WenmarVinHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!WenmarVinFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, WenmarVinFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    // The options hold the credential, so the default print and json form
    // name the client and nothing more; options_map() is the way to read
    // them back.
    public function jsonSerialize(): array
    {
        return ['name' => 'WenmarVin'];
    }

    public function __debugInfo(): array
    {
        return $this->jsonSerialize();
    }

    public function get_utility()
    {
        return WenmarVinUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = WenmarVinHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = strtoupper(is_string($method_val) && '' !== $method_val ? $method_val : "GET");
        $allow_method = Struct::getpath($opts, "allow.method");
        if (!WenmarVinPrepareMethod::allowed($allow_method, $method_val)) {
            return ($utility->make_error)($ctx, $ctx->make_error("spec_method_allow",
                "Method \"" . $method_val . "\" not allowed by SDK option allow.method value: \"" .
                (is_string($allow_method) ? $allow_method : "") . "\""));
        }
        $params = WenmarVinHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = WenmarVinHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new WenmarVinSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        return WenmarVinPrepareMethod::allowed(Struct::getpath($this->options, "allow.op"), $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new WenmarVinError($op . "_allow",
                "WenmarVinSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = WenmarVinHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => ($utility->clean)($ctx, $fetch_err)];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = WenmarVinHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            $body_err = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
                if (true === Struct::getprop($fetched, "unreadable")) {
                    $failed = ($status >= 200 && $status < 300) ? null : $ctx->make_error(
                        "request_status",
                        "request: {$status}: " . (string)Struct::getprop($fetched, "statusText"));
                    $sent = $fetchdef["headers"] ?? [];
                    if (WenmarVinFetcher::usesDefault($ctx)) {
                        $sent = WenmarVinFetcher::sentHeaders($sent);
                    }
                    $body_err = WenmarVinResultBody::unreadable($ctx, $status, $headers,
                        Struct::getprop($fetched, "body"), $sent, $failed);
                }
            }

            $out = [
                "ok" => null === $body_err && $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
            if (null !== $body_err) {
                $out["err"] = ($utility->clean)($ctx, $body_err);
            }
            return $out;
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new WenmarVinError("graphql_error",
                "WenmarVinSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_batch = null;

    // Canonical facade: $client->Batch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->batch()
    // resolves here too.
    public function Batch($data = null)
    {
        require_once __DIR__ . '/entity/batch_entity.php';
        if ($data === null) {
            if ($this->_batch === null) {
                $this->_batch = new BatchEntity($this, null);
            }
            return $this->_batch;
        }
        return new BatchEntity($this, $data);
    }


    private $_bulletin = null;

    // Canonical facade: $client->Bulletin()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bulletin()
    // resolves here too.
    public function Bulletin($data = null)
    {
        require_once __DIR__ . '/entity/bulletin_entity.php';
        if ($data === null) {
            if ($this->_bulletin === null) {
                $this->_bulletin = new BulletinEntity($this, null);
            }
            return $this->_bulletin;
        }
        return new BulletinEntity($this, $data);
    }


    private $_code = null;

    // Canonical facade: $client->Code()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->code()
    // resolves here too.
    public function Code($data = null)
    {
        require_once __DIR__ . '/entity/code_entity.php';
        if ($data === null) {
            if ($this->_code === null) {
                $this->_code = new CodeEntity($this, null);
            }
            return $this->_code;
        }
        return new CodeEntity($this, $data);
    }


    private $_data = null;

    // Canonical facade: $client->Data()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->data()
    // resolves here too.
    public function Data($data = null)
    {
        require_once __DIR__ . '/entity/data_entity.php';
        if ($data === null) {
            if ($this->_data === null) {
                $this->_data = new DataEntity($this, null);
            }
            return $this->_data;
        }
        return new DataEntity($this, $data);
    }


    private $_engine = null;

    // Canonical facade: $client->Engine()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->engine()
    // resolves here too.
    public function Engine($data = null)
    {
        require_once __DIR__ . '/entity/engine_entity.php';
        if ($data === null) {
            if ($this->_engine === null) {
                $this->_engine = new EngineEntity($this, null);
            }
            return $this->_engine;
        }
        return new EngineEntity($this, $data);
    }


    private $_entry = null;

    // Canonical facade: $client->Entry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->entry()
    // resolves here too.
    public function Entry($data = null)
    {
        require_once __DIR__ . '/entity/entry_entity.php';
        if ($data === null) {
            if ($this->_entry === null) {
                $this->_entry = new EntryEntity($this, null);
            }
            return $this->_entry;
        }
        return new EntryEntity($this, $data);
    }


    private $_job = null;

    // Canonical facade: $client->Job()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->job()
    // resolves here too.
    public function Job($data = null)
    {
        require_once __DIR__ . '/entity/job_entity.php';
        if ($data === null) {
            if ($this->_job === null) {
                $this->_job = new JobEntity($this, null);
            }
            return $this->_job;
        }
        return new JobEntity($this, $data);
    }


    private $_make = null;

    // Canonical facade: $client->Make()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->make()
    // resolves here too.
    public function Make($data = null)
    {
        require_once __DIR__ . '/entity/make_entity.php';
        if ($data === null) {
            if ($this->_make === null) {
                $this->_make = new MakeEntity($this, null);
            }
            return $this->_make;
        }
        return new MakeEntity($this, $data);
    }


    private $_model = null;

    // Canonical facade: $client->Model()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->model()
    // resolves here too.
    public function Model($data = null)
    {
        require_once __DIR__ . '/entity/model_entity.php';
        if ($data === null) {
            if ($this->_model === null) {
                $this->_model = new ModelEntity($this, null);
            }
            return $this->_model;
        }
        return new ModelEntity($this, $data);
    }


    private $_overview = null;

    // Canonical facade: $client->Overview()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->overview()
    // resolves here too.
    public function Overview($data = null)
    {
        require_once __DIR__ . '/entity/overview_entity.php';
        if ($data === null) {
            if ($this->_overview === null) {
                $this->_overview = new OverviewEntity($this, null);
            }
            return $this->_overview;
        }
        return new OverviewEntity($this, $data);
    }


    private $_parts_card = null;

    // Canonical facade: $client->PartsCard()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->parts_card()
    // resolves here too.
    public function PartsCard($data = null)
    {
        require_once __DIR__ . '/entity/parts_card_entity.php';
        if ($data === null) {
            if ($this->_parts_card === null) {
                $this->_parts_card = new PartsCardEntity($this, null);
            }
            return $this->_parts_card;
        }
        return new PartsCardEntity($this, $data);
    }


    private $_payroll_deduction = null;

    // Canonical facade: $client->PayrollDeduction()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payroll_deduction()
    // resolves here too.
    public function PayrollDeduction($data = null)
    {
        require_once __DIR__ . '/entity/payroll_deduction_entity.php';
        if ($data === null) {
            if ($this->_payroll_deduction === null) {
                $this->_payroll_deduction = new PayrollDeductionEntity($this, null);
            }
            return $this->_payroll_deduction;
        }
        return new PayrollDeductionEntity($this, $data);
    }


    private $_recall = null;

    // Canonical facade: $client->Recall()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->recall()
    // resolves here too.
    public function Recall($data = null)
    {
        require_once __DIR__ . '/entity/recall_entity.php';
        if ($data === null) {
            if ($this->_recall === null) {
                $this->_recall = new RecallEntity($this, null);
            }
            return $this->_recall;
        }
        return new RecallEntity($this, $data);
    }


    private $_recall_investigation = null;

    // Canonical facade: $client->RecallInvestigation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->recall_investigation()
    // resolves here too.
    public function RecallInvestigation($data = null)
    {
        require_once __DIR__ . '/entity/recall_investigation_entity.php';
        if ($data === null) {
            if ($this->_recall_investigation === null) {
                $this->_recall_investigation = new RecallInvestigationEntity($this, null);
            }
            return $this->_recall_investigation;
        }
        return new RecallInvestigationEntity($this, $data);
    }


    private $_recent = null;

    // Canonical facade: $client->Recent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->recent()
    // resolves here too.
    public function Recent($data = null)
    {
        require_once __DIR__ . '/entity/recent_entity.php';
        if ($data === null) {
            if ($this->_recent === null) {
                $this->_recent = new RecentEntity($this, null);
            }
            return $this->_recent;
        }
        return new RecentEntity($this, $data);
    }


    private $_submodel = null;

    // Canonical facade: $client->Submodel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->submodel()
    // resolves here too.
    public function Submodel($data = null)
    {
        require_once __DIR__ . '/entity/submodel_entity.php';
        if ($data === null) {
            if ($this->_submodel === null) {
                $this->_submodel = new SubmodelEntity($this, null);
            }
            return $this->_submodel;
        }
        return new SubmodelEntity($this, $data);
    }


    private $_vehicle = null;

    // Canonical facade: $client->Vehicle()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle()
    // resolves here too.
    public function Vehicle($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_entity.php';
        if ($data === null) {
            if ($this->_vehicle === null) {
                $this->_vehicle = new VehicleEntity($this, null);
            }
            return $this->_vehicle;
        }
        return new VehicleEntity($this, $data);
    }


    private $_vehicle_bulletin = null;

    // Canonical facade: $client->VehicleBulletin()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_bulletin()
    // resolves here too.
    public function VehicleBulletin($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_bulletin_entity.php';
        if ($data === null) {
            if ($this->_vehicle_bulletin === null) {
                $this->_vehicle_bulletin = new VehicleBulletinEntity($this, null);
            }
            return $this->_vehicle_bulletin;
        }
        return new VehicleBulletinEntity($this, $data);
    }


    private $_vehicle_code = null;

    // Canonical facade: $client->VehicleCode()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_code()
    // resolves here too.
    public function VehicleCode($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_code_entity.php';
        if ($data === null) {
            if ($this->_vehicle_code === null) {
                $this->_vehicle_code = new VehicleCodeEntity($this, null);
            }
            return $this->_vehicle_code;
        }
        return new VehicleCodeEntity($this, $data);
    }


    private $_vehicle_complaint = null;

    // Canonical facade: $client->VehicleComplaint()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_complaint()
    // resolves here too.
    public function VehicleComplaint($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_complaint_entity.php';
        if ($data === null) {
            if ($this->_vehicle_complaint === null) {
                $this->_vehicle_complaint = new VehicleComplaintEntity($this, null);
            }
            return $this->_vehicle_complaint;
        }
        return new VehicleComplaintEntity($this, $data);
    }


    private $_vehicle_fluid = null;

    // Canonical facade: $client->VehicleFluid()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_fluid()
    // resolves here too.
    public function VehicleFluid($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_fluid_entity.php';
        if ($data === null) {
            if ($this->_vehicle_fluid === null) {
                $this->_vehicle_fluid = new VehicleFluidEntity($this, null);
            }
            return $this->_vehicle_fluid;
        }
        return new VehicleFluidEntity($this, $data);
    }


    private $_vehicle_fuel = null;

    // Canonical facade: $client->VehicleFuel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_fuel()
    // resolves here too.
    public function VehicleFuel($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_fuel_entity.php';
        if ($data === null) {
            if ($this->_vehicle_fuel === null) {
                $this->_vehicle_fuel = new VehicleFuelEntity($this, null);
            }
            return $this->_vehicle_fuel;
        }
        return new VehicleFuelEntity($this, $data);
    }


    private $_vehicle_investigation = null;

    // Canonical facade: $client->VehicleInvestigation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_investigation()
    // resolves here too.
    public function VehicleInvestigation($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_investigation_entity.php';
        if ($data === null) {
            if ($this->_vehicle_investigation === null) {
                $this->_vehicle_investigation = new VehicleInvestigationEntity($this, null);
            }
            return $this->_vehicle_investigation;
        }
        return new VehicleInvestigationEntity($this, $data);
    }


    private $_vehicle_labor = null;

    // Canonical facade: $client->VehicleLabor()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_labor()
    // resolves here too.
    public function VehicleLabor($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_labor_entity.php';
        if ($data === null) {
            if ($this->_vehicle_labor === null) {
                $this->_vehicle_labor = new VehicleLaborEntity($this, null);
            }
            return $this->_vehicle_labor;
        }
        return new VehicleLaborEntity($this, $data);
    }


    private $_vehicle_recall = null;

    // Canonical facade: $client->VehicleRecall()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_recall()
    // resolves here too.
    public function VehicleRecall($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_recall_entity.php';
        if ($data === null) {
            if ($this->_vehicle_recall === null) {
                $this->_vehicle_recall = new VehicleRecallEntity($this, null);
            }
            return $this->_vehicle_recall;
        }
        return new VehicleRecallEntity($this, $data);
    }


    private $_vehicle_safety = null;

    // Canonical facade: $client->VehicleSafety()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_safety()
    // resolves here too.
    public function VehicleSafety($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_safety_entity.php';
        if ($data === null) {
            if ($this->_vehicle_safety === null) {
                $this->_vehicle_safety = new VehicleSafetyEntity($this, null);
            }
            return $this->_vehicle_safety;
        }
        return new VehicleSafetyEntity($this, $data);
    }


    private $_vehicle_spec = null;

    // Canonical facade: $client->VehicleSpec()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_spec()
    // resolves here too.
    public function VehicleSpec($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_spec_entity.php';
        if ($data === null) {
            if ($this->_vehicle_spec === null) {
                $this->_vehicle_spec = new VehicleSpecEntity($this, null);
            }
            return $this->_vehicle_spec;
        }
        return new VehicleSpecEntity($this, $data);
    }


    private $_vehicle_tire = null;

    // Canonical facade: $client->VehicleTire()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle_tire()
    // resolves here too.
    public function VehicleTire($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_tire_entity.php';
        if ($data === null) {
            if ($this->_vehicle_tire === null) {
                $this->_vehicle_tire = new VehicleTireEntity($this, null);
            }
            return $this->_vehicle_tire;
        }
        return new VehicleTireEntity($this, $data);
    }


    private $_vin = null;

    // Canonical facade: $client->Vin()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vin()
    // resolves here too.
    public function Vin($data = null)
    {
        require_once __DIR__ . '/entity/vin_entity.php';
        if ($data === null) {
            if ($this->_vin === null) {
                $this->_vin = new VinEntity($this, null);
            }
            return $this->_vin;
        }
        return new VinEntity($this, $data);
    }


    private $_vin_bulletin = null;

    // Canonical facade: $client->VinBulletin()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vin_bulletin()
    // resolves here too.
    public function VinBulletin($data = null)
    {
        require_once __DIR__ . '/entity/vin_bulletin_entity.php';
        if ($data === null) {
            if ($this->_vin_bulletin === null) {
                $this->_vin_bulletin = new VinBulletinEntity($this, null);
            }
            return $this->_vin_bulletin;
        }
        return new VinBulletinEntity($this, $data);
    }


    private $_vin_fluid = null;

    // Canonical facade: $client->VinFluid()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vin_fluid()
    // resolves here too.
    public function VinFluid($data = null)
    {
        require_once __DIR__ . '/entity/vin_fluid_entity.php';
        if ($data === null) {
            if ($this->_vin_fluid === null) {
                $this->_vin_fluid = new VinFluidEntity($this, null);
            }
            return $this->_vin_fluid;
        }
        return new VinFluidEntity($this, $data);
    }


    private $_vin_fuel = null;

    // Canonical facade: $client->VinFuel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vin_fuel()
    // resolves here too.
    public function VinFuel($data = null)
    {
        require_once __DIR__ . '/entity/vin_fuel_entity.php';
        if ($data === null) {
            if ($this->_vin_fuel === null) {
                $this->_vin_fuel = new VinFuelEntity($this, null);
            }
            return $this->_vin_fuel;
        }
        return new VinFuelEntity($this, $data);
    }


    private $_vin_labor = null;

    // Canonical facade: $client->VinLabor()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vin_labor()
    // resolves here too.
    public function VinLabor($data = null)
    {
        require_once __DIR__ . '/entity/vin_labor_entity.php';
        if ($data === null) {
            if ($this->_vin_labor === null) {
                $this->_vin_labor = new VinLaborEntity($this, null);
            }
            return $this->_vin_labor;
        }
        return new VinLaborEntity($this, $data);
    }


    private $_vin_recall = null;

    // Canonical facade: $client->VinRecall()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vin_recall()
    // resolves here too.
    public function VinRecall($data = null)
    {
        require_once __DIR__ . '/entity/vin_recall_entity.php';
        if ($data === null) {
            if ($this->_vin_recall === null) {
                $this->_vin_recall = new VinRecallEntity($this, null);
            }
            return $this->_vin_recall;
        }
        return new VinRecallEntity($this, $data);
    }


    private $_vin_spec = null;

    // Canonical facade: $client->VinSpec()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vin_spec()
    // resolves here too.
    public function VinSpec($data = null)
    {
        require_once __DIR__ . '/entity/vin_spec_entity.php';
        if ($data === null) {
            if ($this->_vin_spec === null) {
                $this->_vin_spec = new VinSpecEntity($this, null);
            }
            return $this->_vin_spec;
        }
        return new VinSpecEntity($this, $data);
    }


    private $_vin_tire = null;

    // Canonical facade: $client->VinTire()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vin_tire()
    // resolves here too.
    public function VinTire($data = null)
    {
        require_once __DIR__ . '/entity/vin_tire_entity.php';
        if ($data === null) {
            if ($this->_vin_tire === null) {
                $this->_vin_tire = new VinTireEntity($this, null);
            }
            return $this->_vin_tire;
        }
        return new VinTireEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new WenmarVinSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
