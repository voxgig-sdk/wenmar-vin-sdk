"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ModelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.Model();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('model hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.WenmarVinSDK.test(offline).Model().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.WenmarVinSDK.test(offline).Model()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Model().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.WenmarVinSDK.test().Model().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Model().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Model().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Model().list({ "limit": "x", "make": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'model.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "as_of": { "a": true, "h": "As Of", "n": "as_of", "r": true, "sh": "The day each country's recall data was current.", "t": "`$OBJECT`", "key$": "as_of", "index$": 0 }, "attribution": { "a": true, "h": "Attribution", "n": "attribution", "r": true, "t": "`$ARRAY`", "key$": "attribution", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "The model's id form.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "lookup": { "a": true, "h": "Lookup", "n": "lookup", "r": true, "sh": "Where to check one vehicle for open recalls.", "t": "`$OBJECT`", "key$": "lookup", "index$": 3 }, "make": { "a": true, "h": "Make", "n": "make", "r": true, "sh": "A make or a model: its id form and its name.", "t": "`$OBJECT`", "key$": "make", "index$": 4 }, "may_apply": { "a": true, "h": "May Apply", "n": "may_apply", "r": true, "sh": "Always `true`: a recall count is of campaigns that may apply to the model year.", "t": "`$BOOLEAN`", "key$": "may_apply", "index$": 5 }, "model": { "a": true, "h": "Model", "n": "model", "r": true, "sh": "A make or a model: its id form and its name.", "t": "`$OBJECT`", "key$": "model", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 7 }, "year_from": { "a": true, "fo": "int32", "h": "Year From", "n": "year_from", "r": true, "sh": "The first and last model year the model exists in.", "t": "`$INTEGER`", "key$": "year_from", "index$": 8 }, "year_to": { "a": true, "fo": "int32", "h": "Year To", "n": "year_to", "r": true, "t": "`$INTEGER`", "key$": "year_to", "index$": 9 }, "years": { "a": true, "h": "Years", "n": "years", "r": true, "t": "`$ARRAY`", "key$": "years", "index$": 10 } }, "id": { "field": "id", "from": { "make": "make.name", "model": "model.name" }, "name": "id", "parts": ["make", "model"], "sep": "/" }, "name": "model", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/vehicles/models", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "honda", "k": "query", "n": "make", "or": "make", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "scope", "or": "scope", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "term", "or": "term", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 2019, "k": "query", "n": "year", "or": "year", "r": false, "t": "`$INTEGER`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/v1/vehicles/models", "q": { "exist": ["make"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vehicles" }, { "lit": "models" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/models/{make}/{model}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "ford", "k": "param", "n": "make", "or": "make", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "f-150", "k": "param", "n": "model", "or": "model", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/models/{make}/{model}", "q": { "exist": ["make", "model"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "models" }, { "var": "make" }, { "var": "model" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "model", "name__orig": "model", "Name": "Model", "name_": "model", "name-": "model", "NAME": "MODEL", "index$": 8 }, { "active": true, "entity": "model", "key$": "BasicModelFlow", "kind": "basic", "name": "BasicModelFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "model_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "model_ref01", "srcdatavar": "model_ref01_data", "suffix": "_dt0" }, "m": { "id": "model01", "make": "make01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-model_ref01" } }], "unreachable": true }] }, 'Model', { "GET /v1/vehicles/models": { "protocol": "http", "parameters": [{ "name": "make", "in": "query", "description": "A make's name, alias or id: `Chevrolet`, `chevy` or `chevrolet`.", "required": true, "schema": { "type": "string" }, "example": "honda", "index$": 0 }, { "name": "year", "in": "query", "description": "Only models of this model year.", "required": false, "schema": { "type": "integer", "format": "int32", "minimum": 0 }, "example": 2019, "index$": 1 }, { "name": "scope", "in": "query", "description": "`light` (the default), `all`, or a vPIC vehicle type id.", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "name": "term", "in": "query", "description": "Only models whose name starts with this.", "required": false, "schema": { "type": "string" }, "index$": 3 }, { "name": "limit", "in": "query", "description": "At most this many, up to 500.", "required": false, "schema": { "type": "integer", "minimum": 0 }, "index$": 4 }] }, "GET /v1/models/{make}/{model}": { "protocol": "http", "parameters": [{ "name": "make", "in": "path", "description": "A make's id, name or alias.", "required": true, "schema": { "type": "string" }, "example": "ford", "index$": 0 }, { "name": "model", "in": "path", "description": "A model's id or name.", "required": true, "schema": { "type": "string" }, "example": "f-150", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let model_ref01_data = Object.values(setup.data.existing.model)[0];
        // LIST
        const model_ref01_ent = client.Model();
        const model_ref01_match = {};
        const model_ref01_list = (await model_ref01_ent.list(model_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/model/ModelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['model01', 'model02', 'model03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_MODEL_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_MODEL_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_MODEL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WenmarVinSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.WENMAR_VIN_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ModelEntity.test.js.map