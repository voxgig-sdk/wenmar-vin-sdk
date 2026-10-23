

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WenmarVinSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('JobEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.Job()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('job hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WenmarVinSDK.test(offline).Job().stream('list')) { }
    }, /offline/)

    for await (const _item of WenmarVinSDK.test(offline).Job()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Job().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WenmarVinSDK.test().Job().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Job().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Job().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Job().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'job.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"sh":"The credit the labour estimates ask for.","t":"`$ARRAY`","key$":"attribution","index$":0},"components":{"a":true,"h":"Components","n":"components","r":true,"t":"`$ARRAY`","key$":"components","index$":1},"estimates":{"a":true,"h":"Estimates","n":"estimates","r":false,"sh":"The job's class-scope figures.","t":["`$ONE`",["`$ARRAY`","`$NULL`"]],"key$":"estimates","index$":2},"excludes":{"a":true,"h":"Excludes","n":"excludes","r":true,"sh":"Work often done at the same visit that is not part of this job.","t":"`$ARRAY`","key$":"excludes","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The job's id.","t":"`$STRING`","key$":"id","index$":4},"includes":{"a":true,"h":"Includes","n":"includes","r":true,"sh":"The work the job covers.","t":"`$ARRAY`","key$":"includes","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":6},"note":{"a":true,"h":"Note","n":"note","r":true,"sh":"What an estimate is not.","t":"`$STRING`","key$":"note","index$":7},"related":{"a":true,"h":"Related","n":"related","r":true,"t":"`$ARRAY`","key$":"related","index$":8},"system":{"a":true,"h":"System","n":"system","r":true,"sh":"The id of the system the job belongs to.","t":"`$STRING`","key$":"system","index$":9},"system_name":{"a":true,"h":"System Name","n":"system_name","r":true,"t":"`$STRING`","key$":"system_name","index$":10},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"The job's page on this site.","t":"`$STRING`","key$":"url","index$":11}},"id":{"field":"id","name":"id"},"name":"job","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/jobs","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/jobs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"jobs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/jobs/{job}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"brake-pads-front","k":"param","n":"id","or":"job","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/jobs/{job}","q":{"exist":["id"]},"r":{"param":{"job":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"jobs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"job","name__orig":"job","Name":"Job","name_":"job","name-":"job","NAME":"JOB","index$":6}, {"active":true,"entity":"job","key$":"BasicJobFlow","kind":"basic","name":"BasicJobFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"job_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"job_ref01","srcdatavar":"job_ref01_data","suffix":"_dt0"},"m":{"id":"job01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-job_ref01"}}],"index$":1}]}, 'Job', {"GET /v1/jobs":{"protocol":"http","parameters":[]},"GET /v1/jobs/{job}":{"protocol":"http","parameters":[{"name":"job","in":"path","description":"A job id.","required":true,"schema":{"type":"string"},"example":"brake-pads-front","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let job_ref01_data = Object.values(setup.data.existing.job)[0] as any

    // LIST
    const job_ref01_ent = client.Job()
    const job_ref01_match: any = {}

    const job_ref01_list = (await job_ref01_ent.list(job_ref01_match)).map((e: any) => e.data())


    // LOAD
    const job_ref01_match_dt0: any = {}
    job_ref01_match_dt0.id = job_ref01_data.id
    const job_ref01_data_dt0 = (await job_ref01_ent.load(job_ref01_match_dt0)).data()
    assert(job_ref01_data_dt0.id === job_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/job/JobTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WenmarVinSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['job01','job02','job03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_JOB_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_JOB_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_JOB_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WenmarVinSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
