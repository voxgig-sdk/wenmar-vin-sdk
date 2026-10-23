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
(0, node_test_1.describe)('PartsCardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.PartsCard();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PartsCard().list({ "vin_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'parts_card.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "attribution": { "a": true, "h": "Attribution", "n": "attribution", "r": true, "t": "`$ARRAY`", "key$": "attribution", "index$": 0 }, "engine_settled": { "a": true, "h": "Engine Settled", "n": "engine_settled", "r": true, "sh": "Whether the decode settled one catalog engine.", "t": "`$BOOLEAN`", "key$": "engine_settled", "index$": 1 }, "lines": { "a": true, "h": "Lines", "n": "lines", "r": true, "t": "`$ARRAY`", "key$": "lines", "index$": 2 }, "text": { "a": true, "h": "Text", "n": "text", "r": true, "sh": "The lines as plain text, one `Label: value` each.", "t": "`$STRING`", "key$": "text", "index$": 3 }, "vehicle": { "a": true, "h": "Vehicle", "n": "vehicle", "r": false, "t": "`$ANY`", "key$": "vehicle", "index$": 4 }, "vin": { "a": true, "h": "Vin", "n": "vin", "r": true, "t": "`$STRING`", "key$": "vin", "index$": 5 }, "warnings": { "a": true, "h": "Warnings", "n": "warnings", "r": true, "t": "`$ARRAY`", "key$": "warnings", "index$": 6 } }, "name": "parts_card", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/vin/{vin}/parts-card", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "KM8K2CAB4PU001140", "k": "param", "n": "vin_id", "or": "vin", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "year", "or": "year", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/vin/{vin}/parts-card", "q": { "exist": ["vin_id"] }, "r": { "param": { "vin": "vin_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "vin" }, { "var": "vin_id" }, { "lit": "parts-card" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.vin"]] }, "key$": "parts_card", "name__orig": "parts_card", "Name": "PartsCard", "name_": "parts_card", "name-": "parts-card", "NAME": "PARTS_CARD", "index$": 10 }, { "active": true, "entity": "parts_card", "key$": "BasicPartsCardFlow", "kind": "basic", "name": "BasicPartsCardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "vin_id": "vin01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "parts_card_ref01" } }], "index$": 0 }] }, 'PartsCard', { "GET /v1/vin/{vin}/parts-card": { "protocol": "http", "parameters": [{ "name": "vin", "in": "path", "description": "A 17-character VIN.", "required": true, "schema": { "type": "string" }, "example": "KM8K2CAB4PU001140", "index$": 0 }, { "name": "year", "in": "query", "description": "The model year, when the VIN's tenth character leaves two possible.", "required": false, "schema": { "type": "integer", "format": "int32", "minimum": 0 }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let parts_card_ref01_data = Object.values(setup.data.existing.parts_card)[0];
        // LIST
        const parts_card_ref01_ent = client.PartsCard();
        const parts_card_ref01_match = {};
        parts_card_ref01_match['vin_id'] = setup.idmap['vin01'];
        const parts_card_ref01_list = (await parts_card_ref01_ent.list(parts_card_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/parts_card/PartsCardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['parts_card01', 'parts_card02', 'parts_card03', 'vin01', 'vin02', 'vin03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_PARTS_CARD_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_PARTS_CARD_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_PARTS_CARD_ENTID'];
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
//# sourceMappingURL=PartsCardEntity.test.js.map