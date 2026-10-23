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
(0, node_test_1.describe)('VehicleBulletinEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.VehicleBulletin();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VehicleBulletin().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vehicle_bulletin.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "component": { "a": true, "h": "Component", "n": "component", "r": false, "sh": "NHTSA's components, in its words, separated by `; `.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "component", "index$": 0 }, "date": { "a": true, "h": "Date", "n": "date", "r": false, "sh": "The manufacturer's own date.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "date", "index$": 1 }, "date_added": { "a": true, "h": "Date Added", "n": "date_added", "r": true, "sh": "The day NHTSA published it.", "t": "`$STRING`", "key$": "date_added", "index$": 2 }, "document": { "a": true, "h": "Document", "n": "document", "r": false, "t": "`$ANY`", "key$": "document", "index$": 3 }, "document_id": { "a": true, "h": "Document Id", "n": "document_id", "r": false, "sh": "The manufacturer's own number for the document, which a dealer looks it up by.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "document_id", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "mfr_campaign": { "a": true, "h": "Mfr Campaign", "n": "mfr_campaign", "r": false, "sh": "The manufacturer's campaign id or software version.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "mfr_campaign", "index$": 6 }, "nhtsa_id": { "a": true, "fo": "int64", "h": "Nhtsa Id", "n": "nhtsa_id", "r": true, "sh": "NHTSA's id number for the communication.", "t": "`$INTEGER`", "key$": "nhtsa_id", "index$": 7 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": false, "sh": "NHTSA's summary of the communication.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "summary", "index$": 8 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "`service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`.", "t": "`$STRING`", "key$": "type", "index$": 9 }, "type_name": { "a": true, "h": "Type Name", "n": "type_name", "r": true, "sh": "The type in words.", "t": "`$STRING`", "key$": "type_name", "index$": 10 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "sh": "The bulletin's page on this site.", "t": "`$STRING`", "key$": "url", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "vehicle_bulletin", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/vehicles/{id}/bulletins", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "2018_ford_f-150", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "P0420", "k": "query", "n": "code", "or": "code", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "brakes", "k": "query", "n": "component", "or": "component", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": "noise", "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "maintenance", "k": "query", "n": "topic", "or": "topic", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "warranty_extension", "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/v1/vehicles/{id}/bulletins", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vehicles" }, { "var": "id" }, { "lit": "bulletins" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "vehicle_bulletin", "name__orig": "vehicle_bulletin", "Name": "VehicleBulletin", "name_": "vehicle_bulletin", "name-": "vehicle-bulletin", "NAME": "VEHICLE_BULLETIN", "index$": 17 }, { "active": true, "entity": "vehicle_bulletin", "key$": "BasicVehicleBulletinFlow", "kind": "basic", "name": "BasicVehicleBulletinFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vehicle_bulletin_ref01" } }], "unreachable": true }] }, 'VehicleBulletin', { "GET /v1/vehicles/{id}/bulletins": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "A vehicle id. Bulletins are listed by year, make and model; a submodel or an engine in the id is set aside.", "required": true, "schema": { "type": "string" }, "example": "2018_ford_f-150", "index$": 0 }, { "name": "type", "in": "query", "description": "Only this type: `service_bulletin`, `service_campaign`,\n`warranty_extension`, `over_the_air`, `emissions` or `other`.", "required": false, "schema": { "type": "string" }, "example": "warranty_extension", "index$": 1 }, { "name": "component", "in": "query", "description": "Only bulletins about this component: an id from `counts.components`,\nsuch as `brakes` or `brake-pad`.", "required": false, "schema": { "type": "string" }, "example": "brakes", "index$": 2 }, { "name": "code", "in": "query", "description": "Only bulletins whose summary names this trouble code. Letters may\nbe in either case.", "required": false, "schema": { "type": "string" }, "example": "P0420", "index$": 3 }, { "name": "q", "in": "query", "description": "Only bulletins with this text in them, in either case: in the\nsummary, the manufacturer's document number or campaign id, or the\ncomponent. At most 100 characters are read.", "required": false, "schema": { "type": "string" }, "example": "noise", "index$": 4 }, { "name": "topic", "in": "query", "description": "Only bulletins with this topic. `maintenance` is the only one.", "required": false, "schema": { "type": "string" }, "example": "maintenance", "index$": 5 }, { "name": "limit", "in": "query", "description": "At most this many, up to 100. The default is 25.", "required": false, "schema": { "type": "integer", "minimum": 0 }, "index$": 6 }, { "name": "cursor", "in": "query", "description": "`next_cursor` from the page before, unchanged.", "required": false, "schema": { "type": "string" }, "index$": 7 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vehicle_bulletin_ref01_data = Object.values(setup.data.existing.vehicle_bulletin)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vehicle_bulletin/VehicleBulletinTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vehicle_bulletin01', 'vehicle_bulletin02', 'vehicle_bulletin03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_VEHICLE_BULLETIN_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_VEHICLE_BULLETIN_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_BULLETIN_ENTID'];
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
//# sourceMappingURL=VehicleBulletinEntity.test.js.map