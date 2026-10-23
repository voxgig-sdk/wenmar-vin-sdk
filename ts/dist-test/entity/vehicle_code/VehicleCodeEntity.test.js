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
(0, node_test_1.describe)('VehicleCodeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.VehicleCode();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VehicleCode().load({ "id": 1, "vehicle_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vehicle_code.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "attribution": { "a": true, "h": "Attribution", "n": "attribution", "r": true, "t": "`$ARRAY`", "key$": "attribution", "index$": 0 }, "bulletins": { "a": true, "h": "Bulletins", "n": "bulletins", "r": false, "t": "`$ANY`", "key$": "bulletins", "index$": 1 }, "code": { "a": true, "h": "Code", "n": "code", "r": true, "t": "`$STRING`", "key$": "code", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 3 }, "generic": { "a": true, "h": "Generic", "n": "generic", "r": true, "sh": "Whether every maker uses the code the same way.", "t": "`$BOOLEAN`", "key$": "generic", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "note": { "a": true, "h": "Note", "n": "note", "r": true, "t": "`$STRING`", "key$": "note", "index$": 6 }, "related": { "a": true, "h": "Related", "n": "related", "r": true, "sh": "What else is held for the model year about the components a code concerns.", "t": "`$OBJECT`", "key$": "related", "index$": 7 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "sh": "The page of this code on this model year.", "t": "`$STRING`", "key$": "url", "index$": 8 }, "vehicle": { "a": true, "h": "Vehicle", "n": "vehicle", "r": true, "sh": "The model year an answer is about.", "t": "`$OBJECT`", "key$": "vehicle", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "vehicle_code", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/vehicles/{id}/codes/{code}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "P0420", "k": "param", "n": "id", "or": "code", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2018_ford_f-150", "k": "param", "n": "vehicle_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/vehicles/{id}/codes/{code}", "q": { "exist": ["id", "vehicle_id"] }, "r": { "param": { "code": "id", "id": "vehicle_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vehicles" }, { "var": "vehicle_id" }, { "lit": "codes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.vehicle"]] }, "key$": "vehicle_code", "name__orig": "vehicle_code", "Name": "VehicleCode", "name_": "vehicle_code", "name-": "vehicle-code", "NAME": "VEHICLE_CODE", "index$": 18 }, { "active": true, "entity": "vehicle_code", "key$": "BasicVehicleCodeFlow", "kind": "basic", "name": "BasicVehicleCodeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "vehicle_code_ref01", "srcdatavar": "vehicle_code_ref01_data", "suffix": "_dt0" }, "m": { "id": "vehicle_code01", "vehicle_id": "vehicle01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vehicle_code_ref01" } }], "index$": 0 }] }, 'VehicleCode', { "GET /v1/vehicles/{id}/codes/{code}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "A vehicle id. A submodel or an engine in the id is set aside.", "required": true, "schema": { "type": "string" }, "example": "2018_ford_f-150", "index$": 0 }, { "name": "code", "in": "path", "description": "A trouble code, in either case.", "required": true, "schema": { "type": "string" }, "example": "P0420", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vehicle_code_ref01_data = Object.values(setup.data.existing.vehicle_code)[0];
        // LOAD
        const vehicle_code_ref01_ent = client.VehicleCode();
        const vehicle_code_ref01_match_dt0 = {};
        vehicle_code_ref01_match_dt0.id = vehicle_code_ref01_data.id;
        vehicle_code_ref01_match_dt0['vehicle_id'] = setup.idmap['vehicle_id'] ?? setup.idmap['vehicle01'];
        const vehicle_code_ref01_data_dt0 = (await vehicle_code_ref01_ent.load(vehicle_code_ref01_match_dt0)).data();
        (0, node_assert_1.default)(vehicle_code_ref01_data_dt0.id === vehicle_code_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vehicle_code/VehicleCodeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vehicle_code01', 'vehicle_code02', 'vehicle_code03', 'vehicle01', 'vehicle02', 'vehicle03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_VEHICLE_CODE_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_VEHICLE_CODE_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_CODE_ENTID'];
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
//# sourceMappingURL=VehicleCodeEntity.test.js.map