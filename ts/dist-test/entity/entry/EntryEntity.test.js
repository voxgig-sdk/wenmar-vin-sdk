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
(0, node_test_1.describe)('EntryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.Entry();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('entry hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.WenmarVinSDK.test(offline).Entry().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.WenmarVinSDK.test(offline).Entry()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Entry().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.WenmarVinSDK.test().Entry().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Entry().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Entry().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Entry().list({ "limit": "x", "q": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'entry.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "body": { "a": true, "h": "Body", "n": "body", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "body", "index$": 0 }, "drive": { "a": true, "h": "Drive", "n": "drive", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "drive", "index$": 1 }, "engine": { "a": true, "h": "Engine", "n": "engine", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "engine", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "The stable id.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "make": { "a": true, "h": "Make", "n": "make", "r": true, "t": "`$STRING`", "key$": "make", "index$": 4 }, "model": { "a": true, "h": "Model", "n": "model", "r": true, "t": "`$STRING`", "key$": "model", "index$": 5 }, "submodel": { "a": true, "h": "Submodel", "n": "submodel", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "submodel", "index$": 6 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": true, "sh": "One line naming everything above that is known.", "t": "`$STRING`", "key$": "summary", "index$": 7 }, "transmission": { "a": true, "h": "Transmission", "n": "transmission", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "transmission", "index$": 8 }, "vehicle_types": { "a": true, "h": "Vehicle Types", "n": "vehicle_types", "r": true, "sh": "NHTSA's vehicle types for this model year, such as `Truck`.", "t": "`$ARRAY`", "key$": "vehicle_types", "index$": 9 }, "year": { "a": true, "fo": "int32", "h": "Year", "n": "year", "r": true, "t": "`$INTEGER`", "key$": "year", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "entry", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/vehicles/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "2019 civic si", "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "scope", "or": "scope", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/vehicles/search", "q": { "exist": ["q"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vehicles" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/vehicles/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "2019_honda_civic_si", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/vehicles/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vehicles" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "entry", "name__orig": "entry", "Name": "Entry", "name_": "entry", "name-": "entry", "NAME": "ENTRY", "index$": 5 }, { "active": true, "entity": "entry", "key$": "BasicEntryFlow", "kind": "basic", "name": "BasicEntryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "entry_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "entry_ref01", "srcdatavar": "entry_ref01_data", "suffix": "_dt0" }, "m": { "id": "entry01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-entry_ref01" } }], "index$": 1 }] }, 'Entry', { "GET /v1/vehicles/search": { "protocol": "http", "parameters": [{ "name": "q", "in": "query", "description": "What someone would type: `2019 civic si`, `chevy 1500`, `f150`.", "required": true, "schema": { "type": "string" }, "example": "2019 civic si", "index$": 0 }, { "name": "scope", "in": "query", "description": "`light` (the default), `all`, or a vPIC vehicle type id.", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "limit", "in": "query", "description": "At most this many, up to 50. The default is 10.", "required": false, "schema": { "type": "integer", "minimum": 0 }, "index$": 2 }] }, "GET /v1/vehicles/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "A vehicle id: year, make and model, then optionally submodel and engine, joined by underscores.", "required": true, "schema": { "type": "string" }, "example": "2019_honda_civic_si", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let entry_ref01_data = Object.values(setup.data.existing.entry)[0];
        // LIST
        const entry_ref01_ent = client.Entry();
        const entry_ref01_match = {};
        const entry_ref01_list = (await entry_ref01_ent.list(entry_ref01_match)).map((e) => e.data());
        // LOAD
        const entry_ref01_match_dt0 = {};
        entry_ref01_match_dt0.id = entry_ref01_data.id;
        const entry_ref01_data_dt0 = (await entry_ref01_ent.load(entry_ref01_match_dt0)).data();
        (0, node_assert_1.default)(entry_ref01_data_dt0.id === entry_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/entry/EntryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['entry01', 'entry02', 'entry03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_ENTRY_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_ENTRY_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_ENTRY_ENTID'];
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
//# sourceMappingURL=EntryEntity.test.js.map