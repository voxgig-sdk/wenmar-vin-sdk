# WenmarVin SDK

from wenmarvin_sdk.utility.voxgig_struct import voxgig_struct as vs
from wenmarvin_sdk.core.utility_type import WenmarVinUtility
from wenmarvin_sdk.core.spec import WenmarVinSpec
from wenmarvin_sdk.core import helpers
from wenmarvin_sdk.utility.prepare_method import allowed
from wenmarvin_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from wenmarvin_sdk.utility import register

# Load features
from wenmarvin_sdk.feature.base_feature import WenmarVinBaseFeature
from wenmarvin_sdk.features import _has_feature, _make_feature


class WenmarVinSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = WenmarVinUtility()
        self._utility = utility

        from wenmarvin_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "WenmarVinSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return WenmarVinUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = WenmarVinSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "WenmarVinSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("WenmarVinSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Batch(self, data=None) -> "BatchEntity":
        """Entity factory: client.Batch().list() / client.Batch().load({"id": ...})."""
        from wenmarvin_sdk.entity.batch_entity import BatchEntity
        return BatchEntity(self, data)


    def Bulletin(self, data=None) -> "BulletinEntity":
        """Entity factory: client.Bulletin().list() / client.Bulletin().load({"id": ...})."""
        from wenmarvin_sdk.entity.bulletin_entity import BulletinEntity
        return BulletinEntity(self, data)


    def Code(self, data=None) -> "CodeEntity":
        """Entity factory: client.Code().list() / client.Code().load({"id": ...})."""
        from wenmarvin_sdk.entity.code_entity import CodeEntity
        return CodeEntity(self, data)


    def Data(self, data=None) -> "DataEntity":
        """Entity factory: client.Data().list() / client.Data().load({"id": ...})."""
        from wenmarvin_sdk.entity.data_entity import DataEntity
        return DataEntity(self, data)


    def Engine(self, data=None) -> "EngineEntity":
        """Entity factory: client.Engine().list() / client.Engine().load({"id": ...})."""
        from wenmarvin_sdk.entity.engine_entity import EngineEntity
        return EngineEntity(self, data)


    def Entry(self, data=None) -> "EntryEntity":
        """Entity factory: client.Entry().list() / client.Entry().load({"id": ...})."""
        from wenmarvin_sdk.entity.entry_entity import EntryEntity
        return EntryEntity(self, data)


    def Job(self, data=None) -> "JobEntity":
        """Entity factory: client.Job().list() / client.Job().load({"id": ...})."""
        from wenmarvin_sdk.entity.job_entity import JobEntity
        return JobEntity(self, data)


    def Make(self, data=None) -> "MakeEntity":
        """Entity factory: client.Make().list() / client.Make().load({"id": ...})."""
        from wenmarvin_sdk.entity.make_entity import MakeEntity
        return MakeEntity(self, data)


    def Model(self, data=None) -> "ModelEntity":
        """Entity factory: client.Model().list() / client.Model().load({"id": ...})."""
        from wenmarvin_sdk.entity.model_entity import ModelEntity
        return ModelEntity(self, data)


    def Overview(self, data=None) -> "OverviewEntity":
        """Entity factory: client.Overview().list() / client.Overview().load({"id": ...})."""
        from wenmarvin_sdk.entity.overview_entity import OverviewEntity
        return OverviewEntity(self, data)


    def PartsCard(self, data=None) -> "PartsCardEntity":
        """Entity factory: client.PartsCard().list() / client.PartsCard().load({"id": ...})."""
        from wenmarvin_sdk.entity.parts_card_entity import PartsCardEntity
        return PartsCardEntity(self, data)


    def PayrollDeduction(self, data=None) -> "PayrollDeductionEntity":
        """Entity factory: client.PayrollDeduction().list() / client.PayrollDeduction().load({"id": ...})."""
        from wenmarvin_sdk.entity.payroll_deduction_entity import PayrollDeductionEntity
        return PayrollDeductionEntity(self, data)


    def Recall(self, data=None) -> "RecallEntity":
        """Entity factory: client.Recall().list() / client.Recall().load({"id": ...})."""
        from wenmarvin_sdk.entity.recall_entity import RecallEntity
        return RecallEntity(self, data)


    def RecallInvestigation(self, data=None) -> "RecallInvestigationEntity":
        """Entity factory: client.RecallInvestigation().list() / client.RecallInvestigation().load({"id": ...})."""
        from wenmarvin_sdk.entity.recall_investigation_entity import RecallInvestigationEntity
        return RecallInvestigationEntity(self, data)


    def Recent(self, data=None) -> "RecentEntity":
        """Entity factory: client.Recent().list() / client.Recent().load({"id": ...})."""
        from wenmarvin_sdk.entity.recent_entity import RecentEntity
        return RecentEntity(self, data)


    def Submodel(self, data=None) -> "SubmodelEntity":
        """Entity factory: client.Submodel().list() / client.Submodel().load({"id": ...})."""
        from wenmarvin_sdk.entity.submodel_entity import SubmodelEntity
        return SubmodelEntity(self, data)


    def Vehicle(self, data=None) -> "VehicleEntity":
        """Entity factory: client.Vehicle().list() / client.Vehicle().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_entity import VehicleEntity
        return VehicleEntity(self, data)


    def VehicleBulletin(self, data=None) -> "VehicleBulletinEntity":
        """Entity factory: client.VehicleBulletin().list() / client.VehicleBulletin().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_bulletin_entity import VehicleBulletinEntity
        return VehicleBulletinEntity(self, data)


    def VehicleCode(self, data=None) -> "VehicleCodeEntity":
        """Entity factory: client.VehicleCode().list() / client.VehicleCode().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_code_entity import VehicleCodeEntity
        return VehicleCodeEntity(self, data)


    def VehicleComplaint(self, data=None) -> "VehicleComplaintEntity":
        """Entity factory: client.VehicleComplaint().list() / client.VehicleComplaint().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_complaint_entity import VehicleComplaintEntity
        return VehicleComplaintEntity(self, data)


    def VehicleFluid(self, data=None) -> "VehicleFluidEntity":
        """Entity factory: client.VehicleFluid().list() / client.VehicleFluid().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_fluid_entity import VehicleFluidEntity
        return VehicleFluidEntity(self, data)


    def VehicleFuel(self, data=None) -> "VehicleFuelEntity":
        """Entity factory: client.VehicleFuel().list() / client.VehicleFuel().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_fuel_entity import VehicleFuelEntity
        return VehicleFuelEntity(self, data)


    def VehicleInvestigation(self, data=None) -> "VehicleInvestigationEntity":
        """Entity factory: client.VehicleInvestigation().list() / client.VehicleInvestigation().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_investigation_entity import VehicleInvestigationEntity
        return VehicleInvestigationEntity(self, data)


    def VehicleLabor(self, data=None) -> "VehicleLaborEntity":
        """Entity factory: client.VehicleLabor().list() / client.VehicleLabor().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_labor_entity import VehicleLaborEntity
        return VehicleLaborEntity(self, data)


    def VehicleRecall(self, data=None) -> "VehicleRecallEntity":
        """Entity factory: client.VehicleRecall().list() / client.VehicleRecall().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_recall_entity import VehicleRecallEntity
        return VehicleRecallEntity(self, data)


    def VehicleSafety(self, data=None) -> "VehicleSafetyEntity":
        """Entity factory: client.VehicleSafety().list() / client.VehicleSafety().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_safety_entity import VehicleSafetyEntity
        return VehicleSafetyEntity(self, data)


    def VehicleSpec(self, data=None) -> "VehicleSpecEntity":
        """Entity factory: client.VehicleSpec().list() / client.VehicleSpec().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_spec_entity import VehicleSpecEntity
        return VehicleSpecEntity(self, data)


    def VehicleTire(self, data=None) -> "VehicleTireEntity":
        """Entity factory: client.VehicleTire().list() / client.VehicleTire().load({"id": ...})."""
        from wenmarvin_sdk.entity.vehicle_tire_entity import VehicleTireEntity
        return VehicleTireEntity(self, data)


    def Vin(self, data=None) -> "VinEntity":
        """Entity factory: client.Vin().list() / client.Vin().load({"id": ...})."""
        from wenmarvin_sdk.entity.vin_entity import VinEntity
        return VinEntity(self, data)


    def VinBulletin(self, data=None) -> "VinBulletinEntity":
        """Entity factory: client.VinBulletin().list() / client.VinBulletin().load({"id": ...})."""
        from wenmarvin_sdk.entity.vin_bulletin_entity import VinBulletinEntity
        return VinBulletinEntity(self, data)


    def VinFluid(self, data=None) -> "VinFluidEntity":
        """Entity factory: client.VinFluid().list() / client.VinFluid().load({"id": ...})."""
        from wenmarvin_sdk.entity.vin_fluid_entity import VinFluidEntity
        return VinFluidEntity(self, data)


    def VinFuel(self, data=None) -> "VinFuelEntity":
        """Entity factory: client.VinFuel().list() / client.VinFuel().load({"id": ...})."""
        from wenmarvin_sdk.entity.vin_fuel_entity import VinFuelEntity
        return VinFuelEntity(self, data)


    def VinLabor(self, data=None) -> "VinLaborEntity":
        """Entity factory: client.VinLabor().list() / client.VinLabor().load({"id": ...})."""
        from wenmarvin_sdk.entity.vin_labor_entity import VinLaborEntity
        return VinLaborEntity(self, data)


    def VinRecall(self, data=None) -> "VinRecallEntity":
        """Entity factory: client.VinRecall().list() / client.VinRecall().load({"id": ...})."""
        from wenmarvin_sdk.entity.vin_recall_entity import VinRecallEntity
        return VinRecallEntity(self, data)


    def VinSpec(self, data=None) -> "VinSpecEntity":
        """Entity factory: client.VinSpec().list() / client.VinSpec().load({"id": ...})."""
        from wenmarvin_sdk.entity.vin_spec_entity import VinSpecEntity
        return VinSpecEntity(self, data)


    def VinTire(self, data=None) -> "VinTireEntity":
        """Entity factory: client.VinTire().list() / client.VinTire().load({"id": ...})."""
        from wenmarvin_sdk.entity.vin_tire_entity import VinTireEntity
        return VinTireEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "WenmarVinSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from wenmarvin_sdk.entity.batch_entity import BatchEntity
    from wenmarvin_sdk.entity.bulletin_entity import BulletinEntity
    from wenmarvin_sdk.entity.code_entity import CodeEntity
    from wenmarvin_sdk.entity.data_entity import DataEntity
    from wenmarvin_sdk.entity.engine_entity import EngineEntity
    from wenmarvin_sdk.entity.entry_entity import EntryEntity
    from wenmarvin_sdk.entity.job_entity import JobEntity
    from wenmarvin_sdk.entity.make_entity import MakeEntity
    from wenmarvin_sdk.entity.model_entity import ModelEntity
    from wenmarvin_sdk.entity.overview_entity import OverviewEntity
    from wenmarvin_sdk.entity.parts_card_entity import PartsCardEntity
    from wenmarvin_sdk.entity.payroll_deduction_entity import PayrollDeductionEntity
    from wenmarvin_sdk.entity.recall_entity import RecallEntity
    from wenmarvin_sdk.entity.recall_investigation_entity import RecallInvestigationEntity
    from wenmarvin_sdk.entity.recent_entity import RecentEntity
    from wenmarvin_sdk.entity.submodel_entity import SubmodelEntity
    from wenmarvin_sdk.entity.vehicle_entity import VehicleEntity
    from wenmarvin_sdk.entity.vehicle_bulletin_entity import VehicleBulletinEntity
    from wenmarvin_sdk.entity.vehicle_code_entity import VehicleCodeEntity
    from wenmarvin_sdk.entity.vehicle_complaint_entity import VehicleComplaintEntity
    from wenmarvin_sdk.entity.vehicle_fluid_entity import VehicleFluidEntity
    from wenmarvin_sdk.entity.vehicle_fuel_entity import VehicleFuelEntity
    from wenmarvin_sdk.entity.vehicle_investigation_entity import VehicleInvestigationEntity
    from wenmarvin_sdk.entity.vehicle_labor_entity import VehicleLaborEntity
    from wenmarvin_sdk.entity.vehicle_recall_entity import VehicleRecallEntity
    from wenmarvin_sdk.entity.vehicle_safety_entity import VehicleSafetyEntity
    from wenmarvin_sdk.entity.vehicle_spec_entity import VehicleSpecEntity
    from wenmarvin_sdk.entity.vehicle_tire_entity import VehicleTireEntity
    from wenmarvin_sdk.entity.vin_entity import VinEntity
    from wenmarvin_sdk.entity.vin_bulletin_entity import VinBulletinEntity
    from wenmarvin_sdk.entity.vin_fluid_entity import VinFluidEntity
    from wenmarvin_sdk.entity.vin_fuel_entity import VinFuelEntity
    from wenmarvin_sdk.entity.vin_labor_entity import VinLaborEntity
    from wenmarvin_sdk.entity.vin_recall_entity import VinRecallEntity
    from wenmarvin_sdk.entity.vin_spec_entity import VinSpecEntity
    from wenmarvin_sdk.entity.vin_tire_entity import VinTireEntity
