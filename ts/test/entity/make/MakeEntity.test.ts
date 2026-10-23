

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


describe('MakeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.Make()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('make hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WenmarVinSDK.test(offline).Make().stream('list')) { }
    }, /offline/)

    for await (const _item of WenmarVinSDK.test(offline).Make()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Make().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WenmarVinSDK.test().Make().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Make().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Make().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Make().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'make.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The make's id form.","t":"`$STRING`","key$":"id","index$":0},"links":{"a":true,"h":"Links","n":"links","r":false,"t":"`$ANY`","key$":"links","index$":1},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":2},"popular":{"a":true,"h":"Popular","n":"popular","r":true,"sh":"Whether it is on the list of popular makes.","t":"`$BOOLEAN`","key$":"popular","index$":3}},"id":{"field":"id","name":"id"},"name":"make","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vehicles/makes","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"scope","or":"scope","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"term","or":"term","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":2019,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/v1/vehicles/makes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"lit":"makes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/makes/{make}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"honda","k":"param","n":"id","or":"make","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/makes/{make}","q":{"exist":["id"]},"r":{"param":{"make":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"makes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"make","name__orig":"make","Name":"Make","name_":"make","name-":"make","NAME":"MAKE","index$":7}, {"active":true,"entity":"make","key$":"BasicMakeFlow","kind":"basic","name":"BasicMakeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"make_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"make_ref01","srcdatavar":"make_ref01_data","suffix":"_dt0"},"m":{"id":"make01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-make_ref01"}}],"index$":1}]}, 'Make', {"GET /v1/vehicles/makes":{"protocol":"http","parameters":[{"name":"year","in":"query","description":"Only makes with a model in this model year.","required":false,"schema":{"type":"integer","format":"int32","minimum":0},"example":2019,"index$":0},{"name":"scope","in":"query","description":"`light` (the default), `all`, or a vPIC vehicle type id.","required":false,"schema":{"type":"string"},"index$":1},{"name":"term","in":"query","description":"Only makes whose name or alias starts with this. Case and punctuation\nare ignored.","required":false,"schema":{"type":"string"},"index$":2},{"name":"limit","in":"query","description":"At most this many, up to 500.","required":false,"schema":{"type":"integer","minimum":0},"index$":3}]},"GET /v1/makes/{make}":{"protocol":"http","parameters":[{"name":"make","in":"path","description":"A make's id, name or alias.","required":true,"schema":{"type":"string"},"example":"honda","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let make_ref01_data = Object.values(setup.data.existing.make)[0] as any

    // LIST
    const make_ref01_ent = client.Make()
    const make_ref01_match: any = {}

    const make_ref01_list = (await make_ref01_ent.list(make_ref01_match)).map((e: any) => e.data())


    // LOAD
    const make_ref01_match_dt0: any = {}
    make_ref01_match_dt0.id = make_ref01_data.id
    const make_ref01_data_dt0 = (await make_ref01_ent.load(make_ref01_match_dt0)).data()
    assert(make_ref01_data_dt0.id === make_ref01_data.id)


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
      '../../../../.sdk/test/entity/make/MakeTestData.json')

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
    ['make01','make02','make03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_MAKE_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_MAKE_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_MAKE_ENTID']
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
  
