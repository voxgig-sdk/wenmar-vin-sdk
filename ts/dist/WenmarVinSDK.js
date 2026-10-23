"use strict";
// WenmarVin Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.WenmarVinSDK = exports.WenmarVinEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const BatchEntity_1 = require("./entity/BatchEntity");
const BulletinEntity_1 = require("./entity/BulletinEntity");
const CodeEntity_1 = require("./entity/CodeEntity");
const DataEntity_1 = require("./entity/DataEntity");
const EngineEntity_1 = require("./entity/EngineEntity");
const EntryEntity_1 = require("./entity/EntryEntity");
const JobEntity_1 = require("./entity/JobEntity");
const MakeEntity_1 = require("./entity/MakeEntity");
const ModelEntity_1 = require("./entity/ModelEntity");
const OverviewEntity_1 = require("./entity/OverviewEntity");
const PartsCardEntity_1 = require("./entity/PartsCardEntity");
const PayrollDeductionEntity_1 = require("./entity/PayrollDeductionEntity");
const RecallEntity_1 = require("./entity/RecallEntity");
const RecallInvestigationEntity_1 = require("./entity/RecallInvestigationEntity");
const RecentEntity_1 = require("./entity/RecentEntity");
const SubmodelEntity_1 = require("./entity/SubmodelEntity");
const VehicleEntity_1 = require("./entity/VehicleEntity");
const VehicleBulletinEntity_1 = require("./entity/VehicleBulletinEntity");
const VehicleCodeEntity_1 = require("./entity/VehicleCodeEntity");
const VehicleComplaintEntity_1 = require("./entity/VehicleComplaintEntity");
const VehicleFluidEntity_1 = require("./entity/VehicleFluidEntity");
const VehicleFuelEntity_1 = require("./entity/VehicleFuelEntity");
const VehicleInvestigationEntity_1 = require("./entity/VehicleInvestigationEntity");
const VehicleLaborEntity_1 = require("./entity/VehicleLaborEntity");
const VehicleRecallEntity_1 = require("./entity/VehicleRecallEntity");
const VehicleSafetyEntity_1 = require("./entity/VehicleSafetyEntity");
const VehicleSpecEntity_1 = require("./entity/VehicleSpecEntity");
const VehicleTireEntity_1 = require("./entity/VehicleTireEntity");
const VinEntity_1 = require("./entity/VinEntity");
const VinBulletinEntity_1 = require("./entity/VinBulletinEntity");
const VinFluidEntity_1 = require("./entity/VinFluidEntity");
const VinFuelEntity_1 = require("./entity/VinFuelEntity");
const VinLaborEntity_1 = require("./entity/VinLaborEntity");
const VinRecallEntity_1 = require("./entity/VinRecallEntity");
const VinSpecEntity_1 = require("./entity/VinSpecEntity");
const VinTireEntity_1 = require("./entity/VinTireEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const WenmarVinEntityBase_1 = require("./WenmarVinEntityBase");
Object.defineProperty(exports, "WenmarVinEntityBase", { enumerable: true, get: function () { return WenmarVinEntityBase_1.WenmarVinEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class WenmarVinSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('WenmarVinSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('WenmarVinSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('WenmarVinSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Batch().list()` / `client.Batch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Batch(entopts) {
        const self = this;
        return new BatchEntity_1.BatchEntity(self, entopts);
    }
    // Entity access: `client.Bulletin().list()` / `client.Bulletin().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Bulletin(entopts) {
        const self = this;
        return new BulletinEntity_1.BulletinEntity(self, entopts);
    }
    // Entity access: `client.Code().list()` / `client.Code().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Code(entopts) {
        const self = this;
        return new CodeEntity_1.CodeEntity(self, entopts);
    }
    // Entity access: `client.Data().list()` / `client.Data().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Data(entopts) {
        const self = this;
        return new DataEntity_1.DataEntity(self, entopts);
    }
    // Entity access: `client.Engine().list()` / `client.Engine().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Engine(entopts) {
        const self = this;
        return new EngineEntity_1.EngineEntity(self, entopts);
    }
    // Entity access: `client.Entry().list()` / `client.Entry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Entry(entopts) {
        const self = this;
        return new EntryEntity_1.EntryEntity(self, entopts);
    }
    // Entity access: `client.Job().list()` / `client.Job().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Job(entopts) {
        const self = this;
        return new JobEntity_1.JobEntity(self, entopts);
    }
    // Entity access: `client.Make().list()` / `client.Make().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Make(entopts) {
        const self = this;
        return new MakeEntity_1.MakeEntity(self, entopts);
    }
    // Entity access: `client.Model().list()` / `client.Model().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Model(entopts) {
        const self = this;
        return new ModelEntity_1.ModelEntity(self, entopts);
    }
    // Entity access: `client.Overview().list()` / `client.Overview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Overview(entopts) {
        const self = this;
        return new OverviewEntity_1.OverviewEntity(self, entopts);
    }
    // Entity access: `client.PartsCard().list()` / `client.PartsCard().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PartsCard(entopts) {
        const self = this;
        return new PartsCardEntity_1.PartsCardEntity(self, entopts);
    }
    // Entity access: `client.PayrollDeduction().list()` / `client.PayrollDeduction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PayrollDeduction(entopts) {
        const self = this;
        return new PayrollDeductionEntity_1.PayrollDeductionEntity(self, entopts);
    }
    // Entity access: `client.Recall().list()` / `client.Recall().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Recall(entopts) {
        const self = this;
        return new RecallEntity_1.RecallEntity(self, entopts);
    }
    // Entity access: `client.RecallInvestigation().list()` / `client.RecallInvestigation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RecallInvestigation(entopts) {
        const self = this;
        return new RecallInvestigationEntity_1.RecallInvestigationEntity(self, entopts);
    }
    // Entity access: `client.Recent().list()` / `client.Recent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Recent(entopts) {
        const self = this;
        return new RecentEntity_1.RecentEntity(self, entopts);
    }
    // Entity access: `client.Submodel().list()` / `client.Submodel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Submodel(entopts) {
        const self = this;
        return new SubmodelEntity_1.SubmodelEntity(self, entopts);
    }
    // Entity access: `client.Vehicle().list()` / `client.Vehicle().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Vehicle(entopts) {
        const self = this;
        return new VehicleEntity_1.VehicleEntity(self, entopts);
    }
    // Entity access: `client.VehicleBulletin().list()` / `client.VehicleBulletin().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleBulletin(entopts) {
        const self = this;
        return new VehicleBulletinEntity_1.VehicleBulletinEntity(self, entopts);
    }
    // Entity access: `client.VehicleCode().list()` / `client.VehicleCode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleCode(entopts) {
        const self = this;
        return new VehicleCodeEntity_1.VehicleCodeEntity(self, entopts);
    }
    // Entity access: `client.VehicleComplaint().list()` / `client.VehicleComplaint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleComplaint(entopts) {
        const self = this;
        return new VehicleComplaintEntity_1.VehicleComplaintEntity(self, entopts);
    }
    // Entity access: `client.VehicleFluid().list()` / `client.VehicleFluid().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleFluid(entopts) {
        const self = this;
        return new VehicleFluidEntity_1.VehicleFluidEntity(self, entopts);
    }
    // Entity access: `client.VehicleFuel().list()` / `client.VehicleFuel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleFuel(entopts) {
        const self = this;
        return new VehicleFuelEntity_1.VehicleFuelEntity(self, entopts);
    }
    // Entity access: `client.VehicleInvestigation().list()` / `client.VehicleInvestigation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleInvestigation(entopts) {
        const self = this;
        return new VehicleInvestigationEntity_1.VehicleInvestigationEntity(self, entopts);
    }
    // Entity access: `client.VehicleLabor().list()` / `client.VehicleLabor().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleLabor(entopts) {
        const self = this;
        return new VehicleLaborEntity_1.VehicleLaborEntity(self, entopts);
    }
    // Entity access: `client.VehicleRecall().list()` / `client.VehicleRecall().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleRecall(entopts) {
        const self = this;
        return new VehicleRecallEntity_1.VehicleRecallEntity(self, entopts);
    }
    // Entity access: `client.VehicleSafety().list()` / `client.VehicleSafety().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleSafety(entopts) {
        const self = this;
        return new VehicleSafetyEntity_1.VehicleSafetyEntity(self, entopts);
    }
    // Entity access: `client.VehicleSpec().list()` / `client.VehicleSpec().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleSpec(entopts) {
        const self = this;
        return new VehicleSpecEntity_1.VehicleSpecEntity(self, entopts);
    }
    // Entity access: `client.VehicleTire().list()` / `client.VehicleTire().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VehicleTire(entopts) {
        const self = this;
        return new VehicleTireEntity_1.VehicleTireEntity(self, entopts);
    }
    // Entity access: `client.Vin().list()` / `client.Vin().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Vin(entopts) {
        const self = this;
        return new VinEntity_1.VinEntity(self, entopts);
    }
    // Entity access: `client.VinBulletin().list()` / `client.VinBulletin().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VinBulletin(entopts) {
        const self = this;
        return new VinBulletinEntity_1.VinBulletinEntity(self, entopts);
    }
    // Entity access: `client.VinFluid().list()` / `client.VinFluid().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VinFluid(entopts) {
        const self = this;
        return new VinFluidEntity_1.VinFluidEntity(self, entopts);
    }
    // Entity access: `client.VinFuel().list()` / `client.VinFuel().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VinFuel(entopts) {
        const self = this;
        return new VinFuelEntity_1.VinFuelEntity(self, entopts);
    }
    // Entity access: `client.VinLabor().list()` / `client.VinLabor().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VinLabor(entopts) {
        const self = this;
        return new VinLaborEntity_1.VinLaborEntity(self, entopts);
    }
    // Entity access: `client.VinRecall().list()` / `client.VinRecall().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VinRecall(entopts) {
        const self = this;
        return new VinRecallEntity_1.VinRecallEntity(self, entopts);
    }
    // Entity access: `client.VinSpec().list()` / `client.VinSpec().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VinSpec(entopts) {
        const self = this;
        return new VinSpecEntity_1.VinSpecEntity(self, entopts);
    }
    // Entity access: `client.VinTire().list()` / `client.VinTire().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VinTire(entopts) {
        const self = this;
        return new VinTireEntity_1.VinTireEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new WenmarVinSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return WenmarVinSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'WenmarVin' };
    }
    toString() {
        return 'WenmarVin ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.WenmarVinSDK = WenmarVinSDK;
const SDK = WenmarVinSDK;
exports.SDK = SDK;
//# sourceMappingURL=WenmarVinSDK.js.map