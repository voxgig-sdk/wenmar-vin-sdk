

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


describe('VinRecallEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.VinRecall()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VinRecall().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vin_recall.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"as_of":{"a":true,"h":"As Of","n":"as_of","r":true,"sh":"The day each country's recall data was current.","t":"`$OBJECT`","key$":"as_of","index$":0},"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"t":"`$ARRAY`","key$":"attribution","index$":1},"decode":{"a":true,"h":"Decode","n":"decode","r":true,"sh":"What a VIN decoded to, as far as recalls need it.","t":"`$OBJECT`","key$":"decode","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"lookup":{"a":true,"h":"Lookup","n":"lookup","r":true,"sh":"Where to check one vehicle for open recalls.","t":"`$OBJECT`","key$":"lookup","index$":4},"may_apply":{"a":true,"h":"May Apply","n":"may_apply","r":true,"sh":"Always `true`.","t":"`$BOOLEAN`","key$":"may_apply","index$":5},"recalls":{"a":true,"h":"Recalls","n":"recalls","r":true,"t":"`$ARRAY`","key$":"recalls","index$":6},"vehicle":{"a":true,"h":"Vehicle","n":"vehicle","r":false,"t":"`$ANY`","key$":"vehicle","index$":7},"warnings":{"a":true,"h":"Warnings","n":"warnings","r":true,"sh":"The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for.","t":"`$ARRAY`","key$":"warnings","index$":8}},"id":{"field":"id","name":"id"},"name":"vin_recall","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vin/{vin}/recalls","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"KM8K2CAB4PU001140","k":"param","n":"id","or":"vin","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"us","k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":2023,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v1/vin/{vin}/recalls","q":{"exist":["id"]},"r":{"param":{"vin":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vin"},{"var":"id"},{"lit":"recalls"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"vin_recall","name__orig":"vin_recall","Name":"VinRecall","name_":"vin_recall","name-":"vin-recall","NAME":"VIN_RECALL","index$":33}, {"active":true,"entity":"vin_recall","key$":"BasicVinRecallFlow","kind":"basic","name":"BasicVinRecallFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"vin":"vin01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vin_recall_ref01"}}],"unreachable":true}]}, 'VinRecall', {"GET /v1/vin/{vin}/recalls":{"protocol":"http","parameters":[{"name":"vin","in":"path","description":"A 17-character VIN.","required":true,"schema":{"type":"string"},"example":"KM8K2CAB4PU001140","index$":0},{"name":"country","in":"query","description":"`us` or `ca`. Left out: both, where the server holds both.","required":false,"schema":{"type":"string"},"example":"us","index$":1},{"name":"year","in":"query","description":"Use this model year instead of working it out from the VIN.","required":false,"schema":{"type":"integer","format":"int32","minimum":0},"example":2023,"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vin_recall_ref01_data = Object.values(setup.data.existing.vin_recall)[0] as any

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
      '../../../../.sdk/test/entity/vin_recall/VinRecallTestData.json')

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
    ['vin_recall01','vin_recall02','vin_recall03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VIN_RECALL_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VIN_RECALL_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VIN_RECALL_ENTID']
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
  
