

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


describe('VehicleFluidEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.VehicleFluid()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VehicleFluid().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vehicle_fluid.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"as_of":{"a":true,"h":"As Of","n":"as_of","r":false,"sh":"The day EPA's oil grades were current.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"as_of","index$":0},"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"t":"`$ARRAY`","key$":"attribution","index$":1},"brake":{"a":true,"h":"Brake","n":"brake","r":true,"t":"`$ARRAY`","key$":"brake","index$":2},"checked_as_of":{"a":true,"h":"Checked As Of","n":"checked_as_of","r":false,"sh":"The day of the newest hand-read record the server holds, for any vehicle.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"checked_as_of","index$":3},"coolant":{"a":true,"h":"Coolant","n":"coolant","r":true,"t":"`$ARRAY`","key$":"coolant","index$":4},"engine_oil":{"a":true,"h":"Engine Oil","n":"engine_oil","r":true,"t":"`$ARRAY`","key$":"engine_oil","index$":5},"engine_oil_checked":{"a":true,"h":"Engine Oil Checked","n":"engine_oil_checked","r":true,"t":"`$ARRAY`","key$":"engine_oil_checked","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":7},"refrigerant":{"a":true,"h":"Refrigerant","n":"refrigerant","r":true,"t":"`$ARRAY`","key$":"refrigerant","index$":8},"transmission":{"a":true,"h":"Transmission","n":"transmission","r":true,"t":"`$ARRAY`","key$":"transmission","index$":9},"vehicle":{"a":true,"h":"Vehicle","n":"vehicle","r":true,"sh":"The model year an answer is about.","t":"`$OBJECT`","key$":"vehicle","index$":10}},"id":{"field":"id","name":"id"},"name":"vehicle_fluid","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vehicles/{id}/fluids","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2018_ford_f-150","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/vehicles/{id}/fluids","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"var":"id"},{"lit":"fluids"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"vehicle_fluid","name__orig":"vehicle_fluid","Name":"VehicleFluid","name_":"vehicle_fluid","name-":"vehicle-fluid","NAME":"VEHICLE_FLUID","index$":20}, {"active":true,"entity":"vehicle_fluid","key$":"BasicVehicleFluidFlow","kind":"basic","name":"BasicVehicleFluidFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vehicle_fluid_ref01"}}],"unreachable":true}]}, 'VehicleFluid', {"GET /v1/vehicles/{id}/fluids":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"A vehicle id.","required":true,"schema":{"type":"string"},"example":"2018_ford_f-150","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vehicle_fluid_ref01_data = Object.values(setup.data.existing.vehicle_fluid)[0] as any

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
      '../../../../.sdk/test/entity/vehicle_fluid/VehicleFluidTestData.json')

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
    ['vehicle_fluid01','vehicle_fluid02','vehicle_fluid03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VEHICLE_FLUID_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VEHICLE_FLUID_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_FLUID_ENTID']
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
  
