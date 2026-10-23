

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


describe('VehicleSpecEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.VehicleSpec()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VehicleSpec().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vehicle_spec.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"battery_type":{"a":true,"h":"Battery Type","n":"battery_type","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"battery_type","index$":0},"battery_voltage":{"a":true,"fo":"int32","h":"Battery Voltage","n":"battery_voltage","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"battery_voltage","index$":1},"confidence":{"a":true,"h":"Confidence","n":"confidence","r":true,"sh":"`model`, `engine` or `submodel`, as on a fuel rating.","t":"`$STRING`","key$":"confidence","index$":2},"cylinder_deactivation":{"a":true,"h":"Cylinder Deactivation","n":"cylinder_deactivation","r":false,"t":["`$ONE`",["`$BOOLEAN`","`$NULL`"]],"key$":"cylinder_deactivation","index$":3},"cylinder_deactivation_name":{"a":true,"h":"Cylinder Deactivation Name","n":"cylinder_deactivation_name","r":false,"sh":"The maker's name for it, such as `Active Fuel Management`.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cylinder_deactivation_name","index$":4},"described_as":{"a":true,"h":"Described As","n":"described_as","r":true,"t":"`$STRING`","key$":"described_as","index$":5},"drive":{"a":true,"h":"Drive","n":"drive","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"drive","index$":6},"electrification":{"a":true,"h":"Electrification","n":"electrification","r":false,"sh":"EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"electrification","index$":7},"emission_standards":{"a":true,"h":"Emission Standards","n":"emission_standards","r":true,"t":"`$ARRAY`","key$":"emission_standards","index$":8},"engine":{"a":true,"h":"Engine","n":"engine","r":false,"t":"`$ANY`","key$":"engine","index$":9},"ev_motor":{"a":true,"h":"Ev Motor","n":"ev_motor","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ev_motor","index$":10},"exhaust_valves":{"a":true,"fo":"int32","h":"Exhaust Valves","n":"exhaust_valves","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"exhaust_valves","index$":11},"fuel_grade":{"a":true,"h":"Fuel Grade","n":"fuel_grade","r":true,"t":"`$STRING`","key$":"fuel_grade","index$":12},"fuel_usage":{"a":true,"h":"Fuel Usage","n":"fuel_usage","r":false,"sh":"Whether the grade is recommended or required, in EPA's words.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"fuel_usage","index$":13},"gears":{"a":true,"fo":"int32","h":"Gears","n":"gears","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"gears","index$":14},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":15},"intake_valves":{"a":true,"fo":"int32","h":"Intake Valves","n":"intake_valves","r":false,"sh":"Per cylinder.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"intake_valves","index$":16},"luggage_volume_ft3":{"a":true,"fo":"int32","h":"Luggage Volume Ft3","n":"luggage_volume_ft3","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"luggage_volume_ft3","index$":17},"luggage_volume_l":{"a":true,"fo":"int32","h":"Luggage Volume L","n":"luggage_volume_l","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"luggage_volume_l","index$":18},"motor_kw":{"a":true,"h":"Motor Kw","n":"motor_kw","r":false,"sh":"Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"motor_kw","index$":19},"passenger_volume_ft3":{"a":true,"fo":"int32","h":"Passenger Volume Ft3","n":"passenger_volume_ft3","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"passenger_volume_ft3","index$":20},"passenger_volume_l":{"a":true,"fo":"int32","h":"Passenger Volume L","n":"passenger_volume_l","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"passenger_volume_l","index$":21},"size_class":{"a":true,"h":"Size Class","n":"size_class","r":true,"t":"`$STRING`","key$":"size_class","index$":22},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":23},"source_id":{"a":true,"h":"Source Id","n":"source_id","r":true,"t":"`$STRING`","key$":"source_id","index$":24},"start_stop":{"a":true,"h":"Start Stop","n":"start_stop","r":false,"t":["`$ONE`",["`$BOOLEAN`","`$NULL`"]],"key$":"start_stop","index$":25},"supercharger":{"a":true,"h":"Supercharger","n":"supercharger","r":true,"t":"`$BOOLEAN`","key$":"supercharger","index$":26},"transmission":{"a":true,"h":"Transmission","n":"transmission","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"transmission","index$":27},"transmission_type":{"a":true,"h":"Transmission Type","n":"transmission_type","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"transmission_type","index$":28},"turbo":{"a":true,"h":"Turbo","n":"turbo","r":true,"t":"`$BOOLEAN`","key$":"turbo","index$":29},"variable_valve_lift":{"a":true,"h":"Variable Valve Lift","n":"variable_valve_lift","r":false,"t":["`$ONE`",["`$BOOLEAN`","`$NULL`"]],"key$":"variable_valve_lift","index$":30},"variable_valve_timing":{"a":true,"h":"Variable Valve Timing","n":"variable_valve_timing","r":false,"t":["`$ONE`",["`$BOOLEAN`","`$NULL`"]],"key$":"variable_valve_timing","index$":31}},"id":{"field":"id","name":"id"},"name":"vehicle_spec","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vehicles/{id}/specs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2018_ford_f-150","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/vehicles/{id}/specs","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"var":"id"},{"lit":"specs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"vehicle_spec","name__orig":"vehicle_spec","Name":"VehicleSpec","name_":"vehicle_spec","name-":"vehicle-spec","NAME":"VEHICLE_SPEC","index$":26}, {"active":true,"entity":"vehicle_spec","key$":"BasicVehicleSpecFlow","kind":"basic","name":"BasicVehicleSpecFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vehicle_spec_ref01"}}],"unreachable":true}]}, 'VehicleSpec', {"GET /v1/vehicles/{id}/specs":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"A vehicle id.","required":true,"schema":{"type":"string"},"example":"2018_ford_f-150","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vehicle_spec_ref01_data = Object.values(setup.data.existing.vehicle_spec)[0] as any

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
      '../../../../.sdk/test/entity/vehicle_spec/VehicleSpecTestData.json')

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
    ['vehicle_spec01','vehicle_spec02','vehicle_spec03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VEHICLE_SPEC_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VEHICLE_SPEC_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_SPEC_ENTID']
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
  
