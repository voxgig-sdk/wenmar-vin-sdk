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
(0, node_test_1.describe)('VehicleTireEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.VehicleTire();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VehicleTire().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vehicle_tire.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "bolt_pattern": { "a": true, "h": "Bolt Pattern", "n": "bolt_pattern", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "bolt_pattern", "index$": 0 }, "checked": { "a": true, "h": "Checked", "n": "checked", "r": true, "t": "`$STRING`", "key$": "checked", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "lug_torque_lbft": { "a": true, "fo": "int64", "h": "Lug Torque Lbft", "n": "lug_torque_lbft", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "lug_torque_lbft", "index$": 3 }, "lug_torque_nm": { "a": true, "fo": "int64", "h": "Lug Torque Nm", "n": "lug_torque_nm", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "lug_torque_nm", "index$": 4 }, "lug_torque_written_in": { "a": true, "h": "Lug Torque Written In", "n": "lug_torque_written_in", "r": false, "sh": "`nm` or `lbft`.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "lug_torque_written_in", "index$": 5 }, "market": { "a": true, "h": "Market", "n": "market", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "market", "index$": 6 }, "pressure_kpa": { "a": true, "h": "Pressure Kpa", "n": "pressure_kpa", "r": false, "t": "`$ANY`", "key$": "pressure_kpa", "index$": 7 }, "pressure_psi": { "a": true, "h": "Pressure Psi", "n": "pressure_psi", "r": false, "t": "`$ANY`", "key$": "pressure_psi", "index$": 8 }, "pressure_written_in": { "a": true, "h": "Pressure Written In", "n": "pressure_written_in", "r": false, "sh": "The unit the document printed: `kpa`, `bar` or `psi`.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "pressure_written_in", "index$": 9 }, "size": { "a": true, "h": "Size", "n": "size", "r": true, "sh": "The size as printed.", "t": "`$STRING`", "key$": "size", "index$": 10 }, "size_rear": { "a": true, "h": "Size Rear", "n": "size_rear", "r": false, "sh": "The rear size, only when it differs from the front.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "size_rear", "index$": 11 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "t": "`$STRING`", "key$": "source", "index$": 12 }, "trims": { "a": true, "h": "Trims", "n": "trims", "r": true, "sh": "The trims the document ties the size to, as it names them.", "t": "`$ARRAY`", "key$": "trims", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "vehicle_tire", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/vehicles/{id}/tires", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "2018_ford_f-150", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/vehicles/{id}/tires", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vehicles" }, { "var": "id" }, { "lit": "tires" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "vehicle_tire", "name__orig": "vehicle_tire", "Name": "VehicleTire", "name_": "vehicle_tire", "name-": "vehicle-tire", "NAME": "VEHICLE_TIRE", "index$": 27 }, { "active": true, "entity": "vehicle_tire", "key$": "BasicVehicleTireFlow", "kind": "basic", "name": "BasicVehicleTireFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vehicle_tire_ref01" } }], "unreachable": true }] }, 'VehicleTire', { "GET /v1/vehicles/{id}/tires": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "A vehicle id. Fitments are listed by year, make and model; a submodel or an engine in the id is set aside.", "required": true, "schema": { "type": "string" }, "example": "2018_ford_f-150", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vehicle_tire_ref01_data = Object.values(setup.data.existing.vehicle_tire)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vehicle_tire/VehicleTireTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vehicle_tire01', 'vehicle_tire02', 'vehicle_tire03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_VEHICLE_TIRE_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_VEHICLE_TIRE_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_TIRE_ENTID'];
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
//# sourceMappingURL=VehicleTireEntity.test.js.map