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
(0, node_test_1.describe)('JobEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WENMAR_VIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WenmarVinSDK.test();
        const ent = testsdk.Job();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('job hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.WenmarVinSDK.test(offline).Job().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.WenmarVinSDK.test(offline).Job()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Job().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.WenmarVinSDK.test().Job().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Job().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Job().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Job().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'job.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "attribution": { "a": true, "h": "Attribution", "n": "attribution", "r": true, "sh": "The credit the labour estimates ask for.", "t": "`$ARRAY`", "key$": "attribution", "index$": 0 }, "components": { "a": true, "h": "Components", "n": "components", "r": true, "t": "`$ARRAY`", "key$": "components", "index$": 1 }, "estimates": { "a": true, "h": "Estimates", "n": "estimates", "r": false, "sh": "The job's class-scope figures.", "t": ["`$ONE`", ["`$ARRAY`", "`$NULL`"]], "key$": "estimates", "index$": 2 }, "excludes": { "a": true, "h": "Excludes", "n": "excludes", "r": true, "sh": "Work often done at the same visit that is not part of this job.", "t": "`$ARRAY`", "key$": "excludes", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "The job's id.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "includes": { "a": true, "h": "Includes", "n": "includes", "r": true, "sh": "The work the job covers.", "t": "`$ARRAY`", "key$": "includes", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 6 }, "note": { "a": true, "h": "Note", "n": "note", "r": true, "sh": "What an estimate is not.", "t": "`$STRING`", "key$": "note", "index$": 7 }, "related": { "a": true, "h": "Related", "n": "related", "r": true, "t": "`$ARRAY`", "key$": "related", "index$": 8 }, "system": { "a": true, "h": "System", "n": "system", "r": true, "sh": "The id of the system the job belongs to.", "t": "`$STRING`", "key$": "system", "index$": 9 }, "system_name": { "a": true, "h": "System Name", "n": "system_name", "r": true, "t": "`$STRING`", "key$": "system_name", "index$": 10 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "sh": "The job's page on this site.", "t": "`$STRING`", "key$": "url", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "job", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/jobs", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v1/jobs", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "jobs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/jobs/{job}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "brake-pads-front", "k": "param", "n": "id", "or": "job", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/jobs/{job}", "q": { "exist": ["id"] }, "r": { "param": { "job": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "jobs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "job", "name__orig": "job", "Name": "Job", "name_": "job", "name-": "job", "NAME": "JOB", "index$": 6 }, { "active": true, "entity": "job", "key$": "BasicJobFlow", "kind": "basic", "name": "BasicJobFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "job_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "job_ref01", "srcdatavar": "job_ref01_data", "suffix": "_dt0" }, "m": { "id": "job01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-job_ref01" } }], "index$": 1 }] }, 'Job', { "GET /v1/jobs": { "protocol": "http", "parameters": [] }, "GET /v1/jobs/{job}": { "protocol": "http", "parameters": [{ "name": "job", "in": "path", "description": "A job id.", "required": true, "schema": { "type": "string" }, "example": "brake-pads-front", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let job_ref01_data = Object.values(setup.data.existing.job)[0];
        // LIST
        const job_ref01_ent = client.Job();
        const job_ref01_match = {};
        const job_ref01_list = (await job_ref01_ent.list(job_ref01_match)).map((e) => e.data());
        // LOAD
        const job_ref01_match_dt0 = {};
        job_ref01_match_dt0.id = job_ref01_data.id;
        const job_ref01_data_dt0 = (await job_ref01_ent.load(job_ref01_match_dt0)).data();
        (0, node_assert_1.default)(job_ref01_data_dt0.id === job_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/job/JobTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WenmarVinSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['job01', 'job02', 'job03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WENMAR_VIN_TEST_JOB_ENTID': idmap,
        'WENMAR_VIN_TEST_LIVE': 'FALSE',
        'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WENMAR_VIN_TEST_JOB_ENTID'];
    const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WENMAR_VIN_TEST_JOB_ENTID'];
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
//# sourceMappingURL=JobEntity.test.js.map