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
(0, node_test_1.describe)('VehicleRecallEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.VehicleRecall();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VehicleRecall().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vehicle_recall.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "built_from": { "a": true, "h": "Built From", "n": "built_from", "r": false, "sh": "In an answer about one model year: the first and last build date the campaign gives.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "built_from", "index$": 0 }, "built_to": { "a": true, "h": "Built To", "n": "built_to", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "built_to", "index$": 1 }, "campaign": { "a": true, "h": "Campaign", "n": "campaign", "r": true, "sh": "The publisher's campaign number.", "t": "`$STRING`", "key$": "campaign", "index$": 2 }, "component": { "a": true, "h": "Component", "n": "component", "r": false, "sh": "The component, as the source words it.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "component", "index$": 3 }, "country": { "a": true, "h": "Country", "n": "country", "r": true, "sh": "`us` or `ca`.", "t": "`$STRING`", "key$": "country", "index$": 4 }, "date": { "a": true, "h": "Date", "n": "date", "r": false, "sh": "The day the campaign was reported.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "date", "index$": 5 }, "do_not_drive": { "a": true, "h": "Do Not Drive", "n": "do_not_drive", "r": false, "sh": "NHTSA's advisory not to drive the vehicle until it is repaired.", "t": ["`$ONE`", ["`$BOOLEAN`", "`$NULL`"]], "key$": "do_not_drive", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 7 }, "manufacturer": { "a": true, "h": "Manufacturer", "n": "manufacturer", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "manufacturer", "index$": 8 }, "match": { "a": true, "h": "Match", "n": "match", "r": false, "sh": "In an answer about one model year: how the campaign's vehicle text reached that model.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "match", "index$": 9 }, "mfr_campaign": { "a": true, "h": "Mfr Campaign", "n": "mfr_campaign", "r": false, "sh": "The manufacturer's own campaign number, which a dealer looks a recall up by.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "mfr_campaign", "index$": 10 }, "models": { "a": true, "h": "Models", "n": "models", "r": true, "sh": "In an answer about one model year: the model names the campaign lists that reached it.", "t": "`$ARRAY`", "key$": "models", "index$": 11 }, "notification": { "a": true, "h": "Notification", "n": "notification", "r": false, "sh": "Transport Canada's notification type, such as `Safety Mfr`.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "notification", "index$": 12 }, "park_outside": { "a": true, "h": "Park Outside", "n": "park_outside", "r": false, "sh": "NHTSA's advisory to park outside, away from buildings.", "t": ["`$ONE`", ["`$BOOLEAN`", "`$NULL`"]], "key$": "park_outside", "index$": 13 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "sh": "Who published it: `nhtsa` or `tc` (Transport Canada).", "t": "`$STRING`", "key$": "source", "index$": 14 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": false, "sh": "What is wrong, in the source's words.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "summary", "index$": 15 }, "units": { "a": true, "fo": "int32", "h": "Units", "n": "units", "r": false, "sh": "Units potentially affected.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "units", "index$": 16 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "sh": "The campaign's page on this site.", "t": "`$STRING`", "key$": "url", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "vehicle_recall", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/vehicles/{id}/recalls", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "2018_ford_f-150", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "us", "k": "query", "n": "country", "or": "country", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/vehicles/{id}/recalls", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vehicles" }, { "var": "id" }, { "lit": "recalls" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "vehicle_recall", "name__orig": "vehicle_recall", "Name": "VehicleRecall", "name_": "vehicle_recall", "name-": "vehicle-recall", "NAME": "VEHICLE_RECALL", "index$": 24 }, { "active": true, "entity": "vehicle_recall", "key$": "BasicVehicleRecallFlow", "kind": "basic", "name": "BasicVehicleRecallFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vehicle_recall_ref01" } }], "unreachable": true }] }, 'VehicleRecall', { "GET /v1/vehicles/{id}/recalls": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "A vehicle id. Recalls are listed by year, make and model; a submodel or an engine in the id is set aside.", "required": true, "schema": { "type": "string" }, "example": "2018_ford_f-150", "index$": 0 }, { "name": "country", "in": "query", "description": "`us` or `ca`. Left out: both, where the server holds both.", "required": false, "schema": { "type": "string" }, "example": "us", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vehicle_recall_ref01_data = Object.values(setup.data.existing.vehicle_recall)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vehicle_recall/VehicleRecallTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vehicle_recall01', 'vehicle_recall02', 'vehicle_recall03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_VEHICLE_RECALL_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_VEHICLE_RECALL_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_RECALL_ENTID'];
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
//# sourceMappingURL=VehicleRecallEntity.test.js.map