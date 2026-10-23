

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


describe('RecallEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.Recall()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('recall hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WenmarVinSDK.test(offline).Recall().stream('list')) { }
    }, /offline/)

    for await (const _item of WenmarVinSDK.test(offline).Recall()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Recall().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WenmarVinSDK.test().Recall().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Recall().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Recall().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Recall().list({"component":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'recall.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"as_of":{"a":true,"h":"As Of","n":"as_of","r":false,"sh":"The day this publisher's data was current.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"as_of","index$":0},"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"t":"`$ARRAY`","key$":"attribution","index$":1},"built_from":{"a":true,"h":"Built From","n":"built_from","r":false,"sh":"In an answer about one model year: the first and last build date the campaign gives.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"built_from","index$":2},"built_to":{"a":true,"h":"Built To","n":"built_to","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"built_to","index$":3},"campaign":{"a":true,"h":"Campaign","n":"campaign","r":true,"sh":"The publisher's campaign number.","t":"`$STRING`","key$":"campaign","index$":4},"completion":{"a":true,"h":"Completion","n":"completion","r":false,"t":"`$ANY`","key$":"completion","index$":5},"component":{"a":true,"h":"Component","n":"component","r":false,"sh":"The component, as the source words it.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"component","index$":6},"consequence":{"a":true,"h":"Consequence","n":"consequence","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"consequence","index$":7},"country":{"a":true,"h":"Country","n":"country","r":true,"sh":"`us` or `ca`.","t":"`$STRING`","key$":"country","index$":8},"date":{"a":true,"h":"Date","n":"date","r":false,"sh":"The day the campaign was reported.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"date","index$":9},"do_not_drive":{"a":true,"h":"Do Not Drive","n":"do_not_drive","r":false,"sh":"NHTSA's advisory not to drive the vehicle until it is repaired.","t":["`$ONE`",["`$BOOLEAN`","`$NULL`"]],"key$":"do_not_drive","index$":10},"french":{"a":true,"h":"French","n":"french","r":false,"t":"`$ANY`","key$":"french","index$":11},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":12},"lookup":{"a":true,"h":"Lookup","n":"lookup","r":true,"sh":"Where to check one vehicle for open recalls.","t":"`$OBJECT`","key$":"lookup","index$":13},"manufacturer":{"a":true,"h":"Manufacturer","n":"manufacturer","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"manufacturer","index$":14},"match":{"a":true,"h":"Match","n":"match","r":false,"sh":"In an answer about one model year: how the campaign's vehicle text reached that model.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"match","index$":15},"may_apply":{"a":true,"h":"May Apply","n":"may_apply","r":true,"sh":"Always `true`: the campaign may apply to a vehicle it lists.","t":"`$BOOLEAN`","key$":"may_apply","index$":16},"mfr_campaign":{"a":true,"h":"Mfr Campaign","n":"mfr_campaign","r":false,"sh":"The manufacturer's own campaign number, which a dealer looks a recall up by.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"mfr_campaign","index$":17},"models":{"a":true,"h":"Models","n":"models","r":true,"sh":"In an answer about one model year: the model names the campaign lists that reached it.","t":"`$ARRAY`","key$":"models","index$":18},"notes":{"a":true,"h":"Notes","n":"notes","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"notes","index$":19},"notification":{"a":true,"h":"Notification","n":"notification","r":false,"sh":"Transport Canada's notification type, such as `Safety Mfr`.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"notification","index$":20},"owner_notified":{"a":true,"h":"Owner Notified","n":"owner_notified","r":false,"sh":"The day owners were notified.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"owner_notified","index$":21},"park_outside":{"a":true,"h":"Park Outside","n":"park_outside","r":false,"sh":"NHTSA's advisory to park outside, away from buildings.","t":["`$ONE`",["`$BOOLEAN`","`$NULL`"]],"key$":"park_outside","index$":22},"part_number":{"a":true,"h":"Part Number","n":"part_number","r":false,"sh":"The manufacturer's part numbers, separated by commas.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"part_number","index$":23},"remedy":{"a":true,"h":"Remedy","n":"remedy","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"remedy","index$":24},"source":{"a":true,"h":"Source","n":"source","r":true,"sh":"Who published it: `nhtsa` or `tc` (Transport Canada).","t":"`$STRING`","key$":"source","index$":25},"summary":{"a":true,"h":"Summary","n":"summary","r":false,"sh":"What is wrong, in the source's words.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"summary","index$":26},"units":{"a":true,"fo":"int32","h":"Units","n":"units","r":false,"sh":"Units potentially affected.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"units","index$":27},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"The campaign's page on this site.","t":"`$STRING`","key$":"url","index$":28},"vehicles":{"a":true,"h":"Vehicles","n":"vehicles","r":true,"sh":"Every vehicle the campaign lists, by make, model and year.","t":"`$ARRAY`","key$":"vehicles","index$":29}},"id":{"field":"id","from":{"campaign":"campaign","source":"source"},"name":"id","parts":["source","campaign"],"sep":"/"},"name":"recall","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/recalls","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"air bags","k":"query","n":"component","or":"component","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"ford","k":"query","n":"make","or":"make","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"f-150","k":"query","n":"model","or":"model","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"tailgate","k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":2018,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":7}]},"k":"http","m":"GET","o":"/v1/recalls","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"recalls"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/recalls/{source}/{campaign}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"19V888000","k":"param","n":"campaign","or":"campaign","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"nhtsa","k":"param","n":"source","or":"source","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/recalls/{source}/{campaign}","q":{"exist":["campaign","source"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"recalls"},{"var":"source"},{"var":"campaign"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"recall","name__orig":"recall","Name":"Recall","name_":"recall","name-":"recall","NAME":"RECALL","index$":12}, {"active":true,"entity":"recall","key$":"BasicRecallFlow","kind":"basic","name":"BasicRecallFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"recall_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"recall_ref01","srcdatavar":"recall_ref01_data","suffix":"_dt0"},"m":{"id":"recall01","source":"source01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-recall_ref01"}}],"unreachable":true}]}, 'Recall', {"GET /v1/recalls":{"protocol":"http","parameters":[{"name":"make","in":"query","description":"Only campaigns that list a vehicle of this make: a name, an alias\nor an id, as in `/v1/vehicles/models`.","required":false,"schema":{"type":"string"},"example":"ford","index$":0},{"name":"model","in":"query","description":"Only campaigns that list this model: a name or an id. Needs `make`.","required":false,"schema":{"type":"string"},"example":"f-150","index$":1},{"name":"year","in":"query","description":"Only campaigns that list this model year.","required":false,"schema":{"type":"integer","format":"int32","minimum":0},"example":2018,"index$":2},{"name":"component","in":"query","description":"Only campaigns whose component text contains this, in either case.","required":false,"schema":{"type":"string"},"example":"air bags","index$":3},{"name":"q","in":"query","description":"Only campaigns with this text in them, in either case: in the\ncampaign number, the manufacturer's campaign number, the\nmanufacturer, the component, the summary, the consequence, the\nremedy, the notes, or the make or model of a vehicle listed. At\nmost 100 characters are read.","required":false,"schema":{"type":"string"},"example":"tailgate","index$":4},{"name":"country","in":"query","description":"`us` or `ca`. Left out: both, where the server holds both.","required":false,"schema":{"type":"string"},"index$":5},{"name":"limit","in":"query","description":"At most this many, up to 100. The default is 25.","required":false,"schema":{"type":"integer","minimum":0},"index$":6},{"name":"cursor","in":"query","description":"`next_cursor` from the page before, unchanged.","required":false,"schema":{"type":"string"},"index$":7}]},"GET /v1/recalls/{source}/{campaign}":{"protocol":"http","parameters":[{"name":"source","in":"path","description":"Who published it: `nhtsa` or `tc` (Transport Canada).","required":true,"schema":{"type":"string"},"example":"nhtsa","index$":0},{"name":"campaign","in":"path","description":"The publisher's campaign number. Letters may be in either case.","required":true,"schema":{"type":"string"},"example":"19V888000","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let recall_ref01_data = Object.values(setup.data.existing.recall)[0] as any

    // LIST
    const recall_ref01_ent = client.Recall()
    const recall_ref01_match: any = {}

    const recall_ref01_list = (await recall_ref01_ent.list(recall_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/recall/RecallTestData.json')

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
    ['recall01','recall02','recall03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_RECALL_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_RECALL_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_RECALL_ENTID']
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
  
