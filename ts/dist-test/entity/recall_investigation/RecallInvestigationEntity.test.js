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
(0, node_test_1.describe)('RecallInvestigationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.RecallInvestigation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.RecallInvestigation().list({ "campaign": 1, "recall_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'recall_investigation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "action": { "a": true, "h": "Action", "n": "action", "r": true, "sh": "NHTSA's action number.", "t": "`$STRING`", "key$": "action", "index$": 0 }, "campaigns": { "a": true, "h": "Campaigns", "n": "campaigns", "r": true, "sh": "The recall campaigns it led to, as NHTSA numbers them.", "t": "`$ARRAY`", "key$": "campaigns", "index$": 1 }, "closed": { "a": true, "h": "Closed", "n": "closed", "r": false, "sh": "The day it was closed.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "closed", "index$": 2 }, "component": { "a": true, "h": "Component", "n": "component", "r": false, "sh": "The components it names, as NHTSA words them, separated by `; `.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "component", "index$": 3 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "sh": "The letters the number starts with.", "t": "`$STRING`", "key$": "kind", "index$": 4 }, "kind_name": { "a": true, "h": "Kind Name", "n": "kind_name", "r": false, "sh": "The kind in words.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "kind_name", "index$": 5 }, "manufacturer": { "a": true, "h": "Manufacturer", "n": "manufacturer", "r": false, "sh": "The manufacturers it names, separated by `; `.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "manufacturer", "index$": 6 }, "match": { "a": true, "h": "Match", "n": "match", "r": false, "sh": "In an answer about one model year: how the investigation's vehicle text reached that model.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "match", "index$": 7 }, "models": { "a": true, "h": "Models", "n": "models", "r": true, "sh": "In an answer about one model year: the model names the investigation lists that reached it.", "t": "`$ARRAY`", "key$": "models", "index$": 8 }, "open": { "a": true, "h": "Open", "n": "open", "r": true, "sh": "Whether it was opened in 2010 or later and has no day closed.", "t": "`$BOOLEAN`", "key$": "open", "index$": 9 }, "opened": { "a": true, "h": "Opened", "n": "opened", "r": false, "sh": "The day it was opened.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "opened", "index$": 10 }, "subject": { "a": true, "h": "Subject", "n": "subject", "r": false, "sh": "NHTSA's one-line subject.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "subject", "index$": 11 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": false, "sh": "NHTSA's summary.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "summary", "index$": 12 } }, "name": "recall_investigation", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/recalls/{source}/{campaign}/investigations", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "18V568000", "k": "param", "n": "campaign", "or": "campaign", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "nhtsa", "k": "param", "n": "recall_id", "or": "source", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/recalls/{source}/{campaign}/investigations", "q": { "exist": ["campaign", "recall_id"] }, "r": { "param": { "source": "recall_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "recalls" }, { "var": "recall_id" }, { "var": "campaign" }, { "lit": "investigations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.recall"]] }, "key$": "recall_investigation", "name__orig": "recall_investigation", "Name": "RecallInvestigation", "name_": "recall_investigation", "name-": "recall-investigation", "NAME": "RECALL_INVESTIGATION", "index$": 13 }, { "active": true, "entity": "recall_investigation", "key$": "BasicRecallInvestigationFlow", "kind": "basic", "name": "BasicRecallInvestigationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "campaign": "campaign01", "recall_id": "recall01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "recall_investigation_ref01" } }], "index$": 0 }] }, 'RecallInvestigation', { "GET /v1/recalls/{source}/{campaign}/investigations": { "protocol": "http", "parameters": [{ "name": "source", "in": "path", "description": "Who published the campaign: `nhtsa` or `tc` (Transport Canada).", "required": true, "schema": { "type": "string" }, "example": "nhtsa", "index$": 0 }, { "name": "campaign", "in": "path", "description": "The publisher's campaign number. Letters may be in either case.", "required": true, "schema": { "type": "string" }, "example": "18V568000", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let recall_investigation_ref01_data = Object.values(setup.data.existing.recall_investigation)[0];
        // LIST
        const recall_investigation_ref01_ent = client.RecallInvestigation();
        const recall_investigation_ref01_match = {};
        recall_investigation_ref01_match['campaign'] = setup.idmap['campaign01'];
        recall_investigation_ref01_match['recall_id'] = setup.idmap['recall01'];
        const recall_investigation_ref01_list = (await recall_investigation_ref01_ent.list(recall_investigation_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/recall_investigation/RecallInvestigationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['recall_investigation01', 'recall_investigation02', 'recall_investigation03', 'recall01', 'recall02', 'recall03', 'campaign01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_RECALL_INVESTIGATION_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_RECALL_INVESTIGATION_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_RECALL_INVESTIGATION_ENTID'];
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
//# sourceMappingURL=RecallInvestigationEntity.test.js.map