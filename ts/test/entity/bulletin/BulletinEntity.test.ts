

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


describe('BulletinEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.Bulletin()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('bulletin hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WenmarVinSDK.test(offline).Bulletin().stream('list')) { }
    }, /offline/)

    for await (const _item of WenmarVinSDK.test(offline).Bulletin()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Bulletin().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WenmarVinSDK.test().Bulletin().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Bulletin().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Bulletin().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Bulletin().list({"code":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bulletin.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"as_of":{"a":true,"h":"As Of","n":"as_of","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"as_of","index$":0},"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"t":"`$ARRAY`","key$":"attribution","index$":1},"codes":{"a":true,"h":"Codes","n":"codes","r":true,"sh":"The trouble codes the summary names.","t":"`$ARRAY`","key$":"codes","index$":2},"component":{"a":true,"h":"Component","n":"component","r":false,"sh":"NHTSA's components, in its words, separated by `; `.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"component","index$":3},"components":{"a":true,"h":"Components","n":"components","r":true,"sh":"The components it is about, systems first.","t":"`$ARRAY`","key$":"components","index$":4},"date":{"a":true,"h":"Date","n":"date","r":false,"sh":"The manufacturer's own date.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"date","index$":5},"date_added":{"a":true,"h":"Date Added","n":"date_added","r":true,"sh":"The day NHTSA published it.","t":"`$STRING`","key$":"date_added","index$":6},"document":{"a":true,"h":"Document","n":"document","r":false,"t":"`$ANY`","key$":"document","index$":7},"document_id":{"a":true,"h":"Document Id","n":"document_id","r":false,"sh":"The manufacturer's own number for the document, which a dealer looks it up by.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"document_id","index$":8},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":9},"mfr_campaign":{"a":true,"h":"Mfr Campaign","n":"mfr_campaign","r":false,"sh":"The manufacturer's campaign id or software version.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"mfr_campaign","index$":10},"mfr_system":{"a":true,"h":"Mfr System","n":"mfr_system","r":false,"sh":"The manufacturer's own words for the system.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"mfr_system","index$":11},"nhtsa_id":{"a":true,"fo":"int64","h":"Nhtsa Id","n":"nhtsa_id","r":true,"sh":"NHTSA's id number for the communication.","t":"`$INTEGER`","key$":"nhtsa_id","index$":12},"note":{"a":true,"h":"Note","n":"note","r":true,"t":"`$STRING`","key$":"note","index$":13},"replaces":{"a":true,"h":"Replaces","n":"replaces","r":false,"sh":"The number of the bulletin this one replaces.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"replaces","index$":14},"summary":{"a":true,"h":"Summary","n":"summary","r":false,"sh":"NHTSA's summary of the communication.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"summary","index$":15},"topics":{"a":true,"h":"Topics","n":"topics","r":true,"t":"`$ARRAY`","key$":"topics","index$":16},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"`service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`.","t":"`$STRING`","key$":"type","index$":17},"type_name":{"a":true,"h":"Type Name","n":"type_name","r":true,"sh":"The type in words.","t":"`$STRING`","key$":"type_name","index$":18},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"The bulletin's page on this site.","t":"`$STRING`","key$":"url","index$":19},"vehicles":{"a":true,"h":"Vehicles","n":"vehicles","r":true,"t":"`$ARRAY`","key$":"vehicles","index$":20}},"id":{"field":"id","name":"id"},"name":"bulletin","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/bulletins","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"P0420","k":"query","n":"code","or":"code","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"brakes","k":"query","n":"component","or":"component","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"ford","k":"query","n":"make","or":"make","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"f-150","k":"query","n":"model","or":"model","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"noise","k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"topic","or":"topic","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":"warranty_extension","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":8},{"a":true,"ex":2018,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":9}]},"k":"http","m":"GET","o":"/v1/bulletins","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"bulletins"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/bulletins/{nhtsa_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"10152456","k":"param","n":"id","or":"nhtsa_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/bulletins/{nhtsa_id}","q":{"exist":["id"]},"r":{"param":{"nhtsa_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"bulletins"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"bulletin","name__orig":"bulletin","Name":"Bulletin","name_":"bulletin","name-":"bulletin","NAME":"BULLETIN","index$":1}, {"active":true,"entity":"bulletin","key$":"BasicBulletinFlow","kind":"basic","name":"BasicBulletinFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"bulletin_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"bulletin_ref01","srcdatavar":"bulletin_ref01_data","suffix":"_dt0"},"m":{"id":"bulletin01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bulletin_ref01"}}],"index$":1}]}, 'Bulletin', {"GET /v1/bulletins":{"protocol":"http","parameters":[{"name":"make","in":"query","description":"Only bulletins that list a vehicle of this make: a name, an alias\nor an id, as in `/v1/vehicles/models`.","required":false,"schema":{"type":"string"},"example":"ford","index$":0},{"name":"model","in":"query","description":"Only bulletins that list this model: a name or an id. Needs `make`.","required":false,"schema":{"type":"string"},"example":"f-150","index$":1},{"name":"year","in":"query","description":"Only bulletins that list this model year.","required":false,"schema":{"type":"integer","format":"int32","minimum":0},"example":2018,"index$":2},{"name":"type","in":"query","description":"Only this type: `service_bulletin`, `service_campaign`,\n`warranty_extension`, `over_the_air`, `emissions` or `other`.","required":false,"schema":{"type":"string"},"example":"warranty_extension","index$":3},{"name":"component","in":"query","description":"Only bulletins about this component: an id such as `brakes` or\n`brake-pad`.","required":false,"schema":{"type":"string"},"example":"brakes","index$":4},{"name":"code","in":"query","description":"Only bulletins whose summary names this trouble code.","required":false,"schema":{"type":"string"},"example":"P0420","index$":5},{"name":"q","in":"query","description":"Only bulletins with this text in them, in either case. At most 100\ncharacters are read.","required":false,"schema":{"type":"string"},"example":"noise","index$":6},{"name":"topic","in":"query","description":"Only bulletins with this topic. `maintenance` is the only one.","required":false,"schema":{"type":"string"},"index$":7},{"name":"limit","in":"query","description":"At most this many, up to 100. The default is 25.","required":false,"schema":{"type":"integer","minimum":0},"index$":8},{"name":"cursor","in":"query","description":"`next_cursor` from the page before, unchanged.","required":false,"schema":{"type":"string"},"index$":9}]},"GET /v1/bulletins/{nhtsa_id}":{"protocol":"http","parameters":[{"name":"nhtsa_id","in":"path","description":"NHTSA's id number for the communication.","required":true,"schema":{"type":"string"},"example":"10152456","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bulletin_ref01_data = Object.values(setup.data.existing.bulletin)[0] as any

    // LIST
    const bulletin_ref01_ent = client.Bulletin()
    const bulletin_ref01_match: any = {}

    const bulletin_ref01_list = (await bulletin_ref01_ent.list(bulletin_ref01_match)).map((e: any) => e.data())


    // LOAD
    const bulletin_ref01_match_dt0: any = {}
    bulletin_ref01_match_dt0.id = bulletin_ref01_data.id
    const bulletin_ref01_data_dt0 = (await bulletin_ref01_ent.load(bulletin_ref01_match_dt0)).data()
    assert(bulletin_ref01_data_dt0.id === bulletin_ref01_data.id)


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
      '../../../../.sdk/test/entity/bulletin/BulletinTestData.json')

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
    ['bulletin01','bulletin02','bulletin03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_BULLETIN_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_BULLETIN_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_BULLETIN_ENTID']
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
  
