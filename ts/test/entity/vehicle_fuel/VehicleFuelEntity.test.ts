

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


describe('VehicleFuelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.VehicleFuel()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VehicleFuel().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vehicle_fuel.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"co2_g_km":{"a":true,"fo":"int32","h":"Co2 G Km","n":"co2_g_km","r":false,"sh":"Tailpipe carbon dioxide, combined.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"co2_g_km","index$":0},"confidence":{"a":true,"h":"Confidence","n":"confidence","r":true,"sh":"How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim).","t":"`$STRING`","key$":"confidence","index$":1},"country":{"a":true,"h":"Country","n":"country","r":true,"sh":"`us` or `ca`.","t":"`$STRING`","key$":"country","index$":2},"cylinders":{"a":true,"fo":"int32","h":"Cylinders","n":"cylinders","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"cylinders","index$":3},"described_as":{"a":true,"h":"Described As","n":"described_as","r":true,"sh":"The source's own name for the vehicle rated.","t":"`$STRING`","key$":"described_as","index$":4},"displacement_l":{"a":true,"fo":"double","h":"Displacement L","n":"displacement_l","r":false,"t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"displacement_l","index$":5},"drive":{"a":true,"h":"Drive","n":"drive","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"drive","index$":6},"engine":{"a":true,"h":"Engine","n":"engine","r":false,"t":"`$ANY`","key$":"engine","index$":7},"fuel_grade":{"a":true,"h":"Fuel Grade","n":"fuel_grade","r":true,"sh":"The fuel the figures are for, which is the recommended grade.","t":"`$STRING`","key$":"fuel_grade","index$":8},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":9},"kwh_100km":{"a":true,"fo":"double","h":"Kwh 100km","n":"kwh_100km","r":false,"sh":"Combined electricity use.","t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"kwh_100km","index$":10},"l_100km":{"a":true,"h":"L 100km","n":"l_100km","r":false,"t":"`$ANY`","key$":"l_100km","index$":11},"match":{"a":true,"h":"Match","n":"match","r":true,"sh":"How the model was found: `exact`, `base` or `curated`.","t":"`$STRING`","key$":"match","index$":12},"mpg":{"a":true,"h":"Mpg","n":"mpg","r":false,"t":"`$ANY`","key$":"mpg","index$":13},"range_km":{"a":true,"fo":"int32","h":"Range Km","n":"range_km","r":false,"sh":"On a full battery.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"range_km","index$":14},"range_mi":{"a":true,"fo":"int32","h":"Range Mi","n":"range_mi","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"range_mi","index$":15},"second_fuel":{"a":true,"h":"Second Fuel","n":"second_fuel","r":false,"sh":"A second fuel the vehicle takes, such as `E85` or `Electricity`.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"second_fuel","index$":16},"source":{"a":true,"h":"Source","n":"source","r":true,"sh":"`epa` or `nrcan`.","t":"`$STRING`","key$":"source","index$":17},"source_id":{"a":true,"h":"Source Id","n":"source_id","r":false,"sh":"EPA's id for the rating.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_id","index$":18},"transmission":{"a":true,"h":"Transmission","n":"transmission","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"transmission","index$":19}},"id":{"field":"id","name":"id"},"name":"vehicle_fuel","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vehicles/{id}/fuel","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2018_ford_f-150","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/vehicles/{id}/fuel","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"var":"id"},{"lit":"fuel"}],"t":{"req":"`reqdata`","res":"`body.ratings`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"vehicle_fuel","name__orig":"vehicle_fuel","Name":"VehicleFuel","name_":"vehicle_fuel","name-":"vehicle-fuel","NAME":"VEHICLE_FUEL","index$":21}, {"active":true,"entity":"vehicle_fuel","key$":"BasicVehicleFuelFlow","kind":"basic","name":"BasicVehicleFuelFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vehicle_fuel_ref01"}}],"unreachable":true}]}, 'VehicleFuel', {"GET /v1/vehicles/{id}/fuel":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"A vehicle id. Ratings are listed by year, make and model; a submodel or an engine in the id is set aside.","required":true,"schema":{"type":"string"},"example":"2018_ford_f-150","index$":0},{"name":"country","in":"query","description":"`us` for EPA's ratings, `ca` for Natural Resources Canada's.\nLeave out for both.","required":false,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vehicle_fuel_ref01_data = Object.values(setup.data.existing.vehicle_fuel)[0] as any

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
      '../../../../.sdk/test/entity/vehicle_fuel/VehicleFuelTestData.json')

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
    ['vehicle_fuel01','vehicle_fuel02','vehicle_fuel03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VEHICLE_FUEL_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VEHICLE_FUEL_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_FUEL_ENTID']
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
  
