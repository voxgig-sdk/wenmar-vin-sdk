

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


describe('VinFluidEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.VinFluid()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VinFluid().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vin_fluid.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"as_of":{"a":true,"h":"As Of","n":"as_of","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"as_of","index$":0},"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"t":"`$ARRAY`","key$":"attribution","index$":1},"brake":{"a":true,"h":"Brake","n":"brake","r":true,"t":"`$ARRAY`","key$":"brake","index$":2},"checked_as_of":{"a":true,"h":"Checked As Of","n":"checked_as_of","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"checked_as_of","index$":3},"coolant":{"a":true,"h":"Coolant","n":"coolant","r":true,"t":"`$ARRAY`","key$":"coolant","index$":4},"decode":{"a":true,"h":"Decode","n":"decode","r":true,"sh":"What a VIN decoded to, as far as recalls need it.","t":"`$OBJECT`","key$":"decode","index$":5},"engine":{"a":true,"h":"Engine","n":"engine","r":false,"t":"`$ANY`","key$":"engine","index$":6},"engine_oil":{"a":true,"h":"Engine Oil","n":"engine_oil","r":true,"t":"`$ARRAY`","key$":"engine_oil","index$":7},"engine_oil_checked":{"a":true,"h":"Engine Oil Checked","n":"engine_oil_checked","r":true,"sh":"Narrowed as `engine_oil` is.","t":"`$ARRAY`","key$":"engine_oil_checked","index$":8},"engine_settled":{"a":true,"h":"Engine Settled","n":"engine_settled","r":true,"sh":"Whether `engine_oil` is narrowed to `engine`.","t":"`$BOOLEAN`","key$":"engine_settled","index$":9},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":10},"refrigerant":{"a":true,"h":"Refrigerant","n":"refrigerant","r":true,"t":"`$ARRAY`","key$":"refrigerant","index$":11},"transmission":{"a":true,"h":"Transmission","n":"transmission","r":true,"t":"`$ARRAY`","key$":"transmission","index$":12},"vehicle":{"a":true,"h":"Vehicle","n":"vehicle","r":false,"t":"`$ANY`","key$":"vehicle","index$":13},"warnings":{"a":true,"h":"Warnings","n":"warnings","r":true,"t":"`$ARRAY`","key$":"warnings","index$":14}},"id":{"field":"id","name":"id"},"name":"vin_fluid","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vin/{vin}/fluids","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"KM8K2CAB4PU001140","k":"param","n":"id","or":"vin","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v1/vin/{vin}/fluids","q":{"exist":["id"]},"r":{"param":{"vin":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vin"},{"var":"id"},{"lit":"fluids"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"vin_fluid","name__orig":"vin_fluid","Name":"VinFluid","name_":"vin_fluid","name-":"vin-fluid","NAME":"VIN_FLUID","index$":30}, {"active":true,"entity":"vin_fluid","key$":"BasicVinFluidFlow","kind":"basic","name":"BasicVinFluidFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"vin":"vin01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vin_fluid_ref01"}}],"unreachable":true}]}, 'VinFluid', {"GET /v1/vin/{vin}/fluids":{"protocol":"http","parameters":[{"name":"vin","in":"path","description":"A 17-character VIN.","required":true,"schema":{"type":"string"},"example":"KM8K2CAB4PU001140","index$":0},{"name":"year","in":"query","description":"The model year, when the VIN's tenth character leaves two possible.","required":false,"schema":{"type":"integer","format":"int32","minimum":0},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vin_fluid_ref01_data = Object.values(setup.data.existing.vin_fluid)[0] as any

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
      '../../../../.sdk/test/entity/vin_fluid/VinFluidTestData.json')

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
    ['vin_fluid01','vin_fluid02','vin_fluid03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VIN_FLUID_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VIN_FLUID_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VIN_FLUID_ENTID']
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
  
