

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


describe('EntryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.Entry()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('entry hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WenmarVinSDK.test(offline).Entry().stream('list')) { }
    }, /offline/)

    for await (const _item of WenmarVinSDK.test(offline).Entry()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Entry().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WenmarVinSDK.test().Entry().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Entry().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Entry().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Entry().list({"limit":"x","q":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'entry.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"body":{"a":true,"h":"Body","n":"body","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"body","index$":0},"drive":{"a":true,"h":"Drive","n":"drive","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"drive","index$":1},"engine":{"a":true,"h":"Engine","n":"engine","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"engine","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The stable id.","t":"`$STRING`","key$":"id","index$":3},"make":{"a":true,"h":"Make","n":"make","r":true,"t":"`$STRING`","key$":"make","index$":4},"model":{"a":true,"h":"Model","n":"model","r":true,"t":"`$STRING`","key$":"model","index$":5},"submodel":{"a":true,"h":"Submodel","n":"submodel","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"submodel","index$":6},"summary":{"a":true,"h":"Summary","n":"summary","r":true,"sh":"One line naming everything above that is known.","t":"`$STRING`","key$":"summary","index$":7},"transmission":{"a":true,"h":"Transmission","n":"transmission","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"transmission","index$":8},"vehicle_types":{"a":true,"h":"Vehicle Types","n":"vehicle_types","r":true,"sh":"NHTSA's vehicle types for this model year, such as `Truck`.","t":"`$ARRAY`","key$":"vehicle_types","index$":9},"year":{"a":true,"fo":"int32","h":"Year","n":"year","r":true,"t":"`$INTEGER`","key$":"year","index$":10}},"id":{"field":"id","name":"id"},"name":"entry","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vehicles/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"2019 civic si","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"scope","or":"scope","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v1/vehicles/search","q":{"exist":["q"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/vehicles/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2019_honda_civic_si","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/vehicles/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"entry","name__orig":"entry","Name":"Entry","name_":"entry","name-":"entry","NAME":"ENTRY","index$":5}, {"active":true,"entity":"entry","key$":"BasicEntryFlow","kind":"basic","name":"BasicEntryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"entry_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"entry_ref01","srcdatavar":"entry_ref01_data","suffix":"_dt0"},"m":{"id":"entry01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-entry_ref01"}}],"index$":1}]}, 'Entry', {"GET /v1/vehicles/search":{"protocol":"http","parameters":[{"name":"q","in":"query","description":"What someone would type: `2019 civic si`, `chevy 1500`, `f150`.","required":true,"schema":{"type":"string"},"example":"2019 civic si","index$":0},{"name":"scope","in":"query","description":"`light` (the default), `all`, or a vPIC vehicle type id.","required":false,"schema":{"type":"string"},"index$":1},{"name":"limit","in":"query","description":"At most this many, up to 50. The default is 10.","required":false,"schema":{"type":"integer","minimum":0},"index$":2}]},"GET /v1/vehicles/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"A vehicle id: year, make and model, then optionally submodel and engine, joined by underscores.","required":true,"schema":{"type":"string"},"example":"2019_honda_civic_si","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let entry_ref01_data = Object.values(setup.data.existing.entry)[0] as any

    // LIST
    const entry_ref01_ent = client.Entry()
    const entry_ref01_match: any = {}

    const entry_ref01_list = (await entry_ref01_ent.list(entry_ref01_match)).map((e: any) => e.data())


    // LOAD
    const entry_ref01_match_dt0: any = {}
    entry_ref01_match_dt0.id = entry_ref01_data.id
    const entry_ref01_data_dt0 = (await entry_ref01_ent.load(entry_ref01_match_dt0)).data()
    assert(entry_ref01_data_dt0.id === entry_ref01_data.id)


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
      '../../../../.sdk/test/entity/entry/EntryTestData.json')

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
    ['entry01','entry02','entry03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_ENTRY_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_ENTRY_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_ENTRY_ENTID']
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
  
