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
(0, node_test_1.describe)('VehicleSafetyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.VehicleSafety();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VehicleSafety().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vehicle_safety.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "body_style": { "a": true, "h": "Body Style", "n": "body_style", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "body_style", "index$": 0 }, "curb_weight_kg": { "a": true, "fo": "int32", "h": "Curb Weight Kg", "n": "curb_weight_kg", "r": false, "sh": "The weight of the vehicle NHTSA tested.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "curb_weight_kg", "index$": 1 }, "curb_weight_lb": { "a": true, "fo": "int32", "h": "Curb Weight Lb", "n": "curb_weight_lb", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "curb_weight_lb", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": true, "sh": "The vehicle NHTSA rated, in NHTSA's words, on one line.", "t": "`$STRING`", "key$": "description", "index$": 3 }, "drive": { "a": true, "h": "Drive", "n": "drive", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "drive", "index$": 4 }, "features": { "a": true, "h": "Features", "n": "features", "r": true, "sh": "The safety features NHTSA lists with a rating.", "t": "`$OBJECT`", "key$": "features", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 6 }, "match": { "a": true, "h": "Match", "n": "match", "r": true, "sh": "How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`.", "t": "`$STRING`", "key$": "match", "index$": 7 }, "model": { "a": true, "h": "Model", "n": "model", "r": true, "sh": "The model, body style, vehicle type and drive as NHTSA words them.", "t": "`$STRING`", "key$": "model", "index$": 8 }, "notes": { "a": true, "h": "Notes", "n": "notes", "r": true, "sh": "NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover.", "t": "`$ARRAY`", "key$": "notes", "index$": 9 }, "release": { "a": true, "fo": "int32", "h": "Release", "n": "release", "r": true, "sh": "1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again.", "t": "`$INTEGER`", "key$": "release", "index$": 10 }, "rollover_risk_percent": { "a": true, "fo": "double", "h": "Rollover Risk Percent", "n": "rollover_risk_percent", "r": false, "sh": "The chance of a rollover in a single-vehicle crash, in percent.", "t": ["`$ONE`", ["`$NUMBER`", "`$NULL`"]], "key$": "rollover_risk_percent", "index$": 11 }, "rollover_tip": { "a": true, "h": "Rollover Tip", "n": "rollover_tip", "r": false, "sh": "Whether the vehicle tipped up in NHTSA's dynamic test.", "t": ["`$ONE`", ["`$BOOLEAN`", "`$NULL`"]], "key$": "rollover_tip", "index$": 12 }, "stars": { "a": true, "h": "Stars", "n": "stars", "r": true, "sh": "The stars of one rating, each from 1 to 5.", "t": "`$OBJECT`", "key$": "stars", "index$": 13 }, "vehicle_type": { "a": true, "h": "Vehicle Type", "n": "vehicle_type", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "vehicle_type", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "vehicle_safety", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/vehicles/{id}/safety", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "2018_ford_f-150", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/vehicles/{id}/safety", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vehicles" }, { "var": "id" }, { "lit": "safety" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "vehicle_safety", "name__orig": "vehicle_safety", "Name": "VehicleSafety", "name_": "vehicle_safety", "name-": "vehicle-safety", "NAME": "VEHICLE_SAFETY", "index$": 25 }, { "active": true, "entity": "vehicle_safety", "key$": "BasicVehicleSafetyFlow", "kind": "basic", "name": "BasicVehicleSafetyFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vehicle_safety_ref01" } }], "unreachable": true }] }, 'VehicleSafety', { "GET /v1/vehicles/{id}/safety": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "A vehicle id. Ratings are listed by year, make and model; a submodel or an engine in the id is set aside.", "required": true, "schema": { "type": "string" }, "example": "2018_ford_f-150", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vehicle_safety_ref01_data = Object.values(setup.data.existing.vehicle_safety)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vehicle_safety/VehicleSafetyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vehicle_safety01', 'vehicle_safety02', 'vehicle_safety03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_VEHICLE_SAFETY_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_VEHICLE_SAFETY_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_SAFETY_ENTID'];
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
//# sourceMappingURL=VehicleSafetyEntity.test.js.map