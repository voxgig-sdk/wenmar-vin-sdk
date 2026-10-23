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
(0, node_test_1.describe)('VinFuelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.VinFuel();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VinFuel().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vin_fuel.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "as_of": { "a": true, "h": "As Of", "n": "as_of", "r": true, "sh": "The day each country's fuel ratings were current.", "t": "`$OBJECT`", "key$": "as_of", "index$": 0 }, "attribution": { "a": true, "h": "Attribution", "n": "attribution", "r": true, "t": "`$ARRAY`", "key$": "attribution", "index$": 1 }, "decode": { "a": true, "h": "Decode", "n": "decode", "r": true, "sh": "What a VIN decoded to, as far as recalls need it.", "t": "`$OBJECT`", "key$": "decode", "index$": 2 }, "engine": { "a": true, "h": "Engine", "n": "engine", "r": false, "t": "`$ANY`", "key$": "engine", "index$": 3 }, "engine_settled": { "a": true, "h": "Engine Settled", "n": "engine_settled", "r": true, "sh": "Whether `ratings` is narrowed to `engine`.", "t": "`$BOOLEAN`", "key$": "engine_settled", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "ratings": { "a": true, "h": "Ratings", "n": "ratings", "r": true, "t": "`$ARRAY`", "key$": "ratings", "index$": 6 }, "vehicle": { "a": true, "h": "Vehicle", "n": "vehicle", "r": false, "t": "`$ANY`", "key$": "vehicle", "index$": 7 }, "warnings": { "a": true, "h": "Warnings", "n": "warnings", "r": true, "t": "`$ARRAY`", "key$": "warnings", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "vin_fuel", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/vin/{vin}/fuel", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "KM8K2CAB4PU001140", "k": "param", "n": "id", "or": "vin", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "country", "or": "country", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "year", "or": "year", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/vin/{vin}/fuel", "q": { "exist": ["id"] }, "r": { "param": { "vin": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vin" }, { "var": "id" }, { "lit": "fuel" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "vin_fuel", "name__orig": "vin_fuel", "Name": "VinFuel", "name_": "vin_fuel", "name-": "vin-fuel", "NAME": "VIN_FUEL", "index$": 31 }, { "active": true, "entity": "vin_fuel", "key$": "BasicVinFuelFlow", "kind": "basic", "name": "BasicVinFuelFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": {}, "m": { "vin": "vin01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vin_fuel_ref01" } }], "unreachable": true }] }, 'VinFuel', { "GET /v1/vin/{vin}/fuel": { "protocol": "http", "parameters": [{ "name": "vin", "in": "path", "description": "A 17-character VIN.", "required": true, "schema": { "type": "string" }, "example": "KM8K2CAB4PU001140", "index$": 0 }, { "name": "country", "in": "query", "description": "`us` or `ca`. Leave out for both.", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "year", "in": "query", "description": "The model year, when the VIN's tenth character leaves two possible.", "required": false, "schema": { "type": "integer", "format": "int32", "minimum": 0 }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vin_fuel_ref01_data = Object.values(setup.data.existing.vin_fuel)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vin_fuel/VinFuelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vin_fuel01', 'vin_fuel02', 'vin_fuel03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_VIN_FUEL_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_VIN_FUEL_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_VIN_FUEL_ENTID'];
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
//# sourceMappingURL=VinFuelEntity.test.js.map