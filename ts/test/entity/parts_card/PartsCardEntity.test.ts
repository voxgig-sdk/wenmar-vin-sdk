

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


describe('PartsCardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.PartsCard()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PartsCard().list({"vin_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'parts_card.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"t":"`$ARRAY`","key$":"attribution","index$":0},"engine_settled":{"a":true,"h":"Engine Settled","n":"engine_settled","r":true,"sh":"Whether the decode settled one catalog engine.","t":"`$BOOLEAN`","key$":"engine_settled","index$":1},"lines":{"a":true,"h":"Lines","n":"lines","r":true,"t":"`$ARRAY`","key$":"lines","index$":2},"text":{"a":true,"h":"Text","n":"text","r":true,"sh":"The lines as plain text, one `Label: value` each.","t":"`$STRING`","key$":"text","index$":3},"vehicle":{"a":true,"h":"Vehicle","n":"vehicle","r":false,"t":"`$ANY`","key$":"vehicle","index$":4},"vin":{"a":true,"h":"Vin","n":"vin","r":true,"t":"`$STRING`","key$":"vin","index$":5},"warnings":{"a":true,"h":"Warnings","n":"warnings","r":true,"t":"`$ARRAY`","key$":"warnings","index$":6}},"name":"parts_card","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vin/{vin}/parts-card","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"KM8K2CAB4PU001140","k":"param","n":"vin_id","or":"vin","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v1/vin/{vin}/parts-card","q":{"exist":["vin_id"]},"r":{"param":{"vin":"vin_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vin"},{"var":"vin_id"},{"lit":"parts-card"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.vin"]]},"key$":"parts_card","name__orig":"parts_card","Name":"PartsCard","name_":"parts_card","name-":"parts-card","NAME":"PARTS_CARD","index$":10}, {"active":true,"entity":"parts_card","key$":"BasicPartsCardFlow","kind":"basic","name":"BasicPartsCardFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"vin_id":"vin01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"parts_card_ref01"}}],"index$":0}]}, 'PartsCard', {"GET /v1/vin/{vin}/parts-card":{"protocol":"http","parameters":[{"name":"vin","in":"path","description":"A 17-character VIN.","required":true,"schema":{"type":"string"},"example":"KM8K2CAB4PU001140","index$":0},{"name":"year","in":"query","description":"The model year, when the VIN's tenth character leaves two possible.","required":false,"schema":{"type":"integer","format":"int32","minimum":0},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let parts_card_ref01_data = Object.values(setup.data.existing.parts_card)[0] as any

    // LIST
    const parts_card_ref01_ent = client.PartsCard()
    const parts_card_ref01_match: any = {}
    parts_card_ref01_match['vin_id'] = setup.idmap['vin01']

    const parts_card_ref01_list = (await parts_card_ref01_ent.list(parts_card_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/parts_card/PartsCardTestData.json')

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
    ['parts_card01','parts_card02','parts_card03','vin01','vin02','vin03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_PARTS_CARD_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_PARTS_CARD_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_PARTS_CARD_ENTID']
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
  
