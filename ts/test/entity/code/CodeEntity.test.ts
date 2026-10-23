

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


describe('CodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.Code()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('code hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WenmarVinSDK.test(offline).Code().stream('list')) { }
    }, /offline/)

    for await (const _item of WenmarVinSDK.test(offline).Code()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Code().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WenmarVinSDK.test().Code().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Code().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Code().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Code().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'code.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"sh":"The credit lines the data's licences ask for.","t":"`$ARRAY`","key$":"attribution","index$":0},"checked":{"a":true,"h":"Checked","n":"checked","r":true,"sh":"The day it was approved.","t":"`$STRING`","key$":"checked","index$":1},"checks":{"a":true,"h":"Checks","n":"checks","r":true,"sh":"What a technician usually verifies first.","t":"`$ARRAY`","key$":"checks","index$":2},"code":{"a":true,"h":"Code","n":"code","r":true,"t":"`$STRING`","key$":"code","index$":3},"common_causes":{"a":true,"h":"Common Causes","n":"common_causes","r":true,"sh":"General causes, not about one make.","t":"`$ARRAY`","key$":"common_causes","index$":4},"components":{"a":true,"h":"Components","n":"components","r":true,"t":"`$ARRAY`","key$":"components","index$":5},"generic":{"a":true,"h":"Generic","n":"generic","r":true,"sh":"Always `true` here: only codes every maker uses the same way are described.","t":"`$BOOLEAN`","key$":"generic","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":7},"meaning":{"a":true,"h":"Meaning","n":"meaning","r":true,"sh":"What the code tells a service advisor.","t":"`$STRING`","key$":"meaning","index$":8},"note":{"a":true,"h":"Note","n":"note","r":true,"sh":"What a description is and is not.","t":"`$STRING`","key$":"note","index$":9},"related":{"a":true,"h":"Related","n":"related","r":true,"sh":"Related codes that are described too.","t":"`$ARRAY`","key$":"related","index$":10},"reviewer":{"a":true,"h":"Reviewer","n":"reviewer","r":true,"sh":"The GitHub name of the person who approved the text.","t":"`$STRING`","key$":"reviewer","index$":11},"system":{"a":true,"h":"System","n":"system","r":true,"sh":"Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it.","t":"`$STRING`","key$":"system","index$":12},"system_name":{"a":true,"h":"System Name","n":"system_name","r":true,"t":"`$STRING`","key$":"system_name","index$":13},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":14},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"The code's page on this site.","t":"`$STRING`","key$":"url","index$":15}},"id":{"field":"id","name":"id"},"name":"code","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/codes","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"P04","k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"powertrain/emissions","k":"query","n":"system","or":"system","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v1/codes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"codes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/codes/{code}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"P0420","k":"param","n":"id","or":"code","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/codes/{code}","q":{"exist":["id"]},"r":{"param":{"code":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"codes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"code","name__orig":"code","Name":"Code","name_":"code","name-":"code","NAME":"CODE","index$":2}, {"active":true,"entity":"code","key$":"BasicCodeFlow","kind":"basic","name":"BasicCodeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"code_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"code_ref01","srcdatavar":"code_ref01_data","suffix":"_dt0"},"m":{"id":"code01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-code_ref01"}}],"index$":1}]}, 'Code', {"GET /v1/codes":{"protocol":"http","parameters":[{"name":"q","in":"query","description":"Only codes with this text in the code, the title or the meaning,\nin either case. At most 100 characters are read.","required":false,"schema":{"type":"string"},"example":"P04","index$":0},{"name":"system","in":"query","description":"Only this system: `powertrain`, `body`, `chassis` or `network`, or\nan area of the powertrain such as `powertrain/emissions`. A group\nholds its areas.","required":false,"schema":{"type":"string"},"example":"powertrain/emissions","index$":1},{"name":"limit","in":"query","description":"At most this many, up to 200. The default is 50.","required":false,"schema":{"type":"integer","minimum":0},"index$":2},{"name":"cursor","in":"query","description":"`next_cursor` from the page before, unchanged.","required":false,"schema":{"type":"string"},"index$":3}]},"GET /v1/codes/{code}":{"protocol":"http","parameters":[{"name":"code","in":"path","description":"A trouble code, in either case. A longer form such as `P0420:00` is cut to its first five characters.","required":true,"schema":{"type":"string"},"example":"P0420","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let code_ref01_data = Object.values(setup.data.existing.code)[0] as any

    // LIST
    const code_ref01_ent = client.Code()
    const code_ref01_match: any = {}

    const code_ref01_list = (await code_ref01_ent.list(code_ref01_match)).map((e: any) => e.data())


    // LOAD
    const code_ref01_match_dt0: any = {}
    code_ref01_match_dt0.id = code_ref01_data.id
    const code_ref01_data_dt0 = (await code_ref01_ent.load(code_ref01_match_dt0)).data()
    assert(code_ref01_data_dt0.id === code_ref01_data.id)


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
      '../../../../.sdk/test/entity/code/CodeTestData.json')

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
    ['code01','code02','code03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_CODE_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_CODE_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_CODE_ENTID']
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
  
