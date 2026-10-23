

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


describe('VehicleComplaintEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.VehicleComplaint()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VehicleComplaint().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vehicle_complaint.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"complaints":{"a":true,"fo":"int32","h":"Complaints","n":"complaints","r":true,"t":"`$INTEGER`","key$":"complaints","index$":0},"crashes":{"a":true,"fo":"int32","h":"Crashes","n":"crashes","r":true,"sh":"Complaints that report a crash.","t":"`$INTEGER`","key$":"crashes","index$":1},"fires":{"a":true,"fo":"int32","h":"Fires","n":"fires","r":true,"sh":"Complaints that report a fire.","t":"`$INTEGER`","key$":"fires","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A component id, such as `steering` or `brake-pad`.","t":"`$STRING`","key$":"id","index$":3},"injuries":{"a":true,"fo":"int32","h":"Injuries","n":"injuries","r":true,"sh":"Complaints that report at least one person injured.","t":"`$INTEGER`","key$":"injuries","index$":4},"median_km":{"a":true,"fo":"int32","h":"Median Km","n":"median_km","r":false,"sh":"The median of the mileages owners gave, in kilometres.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"median_km","index$":5},"median_miles":{"a":true,"fo":"int32","h":"Median Miles","n":"median_miles","r":false,"sh":"The same in miles, as NHTSA records it.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"median_miles","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":7},"parent":{"a":true,"h":"Parent","n":"parent","r":false,"sh":"The system a part belongs to.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"parent","index$":8}},"id":{"field":"id","name":"id"},"name":"vehicle_complaint","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vehicles/{id}/complaints","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2016_honda_civic","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/vehicles/{id}/complaints","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"var":"id"},{"lit":"complaints"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"vehicle_complaint","name__orig":"vehicle_complaint","Name":"VehicleComplaint","name_":"vehicle_complaint","name-":"vehicle-complaint","NAME":"VEHICLE_COMPLAINT","index$":19}, {"active":true,"entity":"vehicle_complaint","key$":"BasicVehicleComplaintFlow","kind":"basic","name":"BasicVehicleComplaintFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vehicle_complaint_ref01"}}],"unreachable":true}]}, 'VehicleComplaint', {"GET /v1/vehicles/{id}/complaints":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"A vehicle id. Complaints are counted by year, make and model; a submodel or an engine in the id is set aside.","required":true,"schema":{"type":"string"},"example":"2016_honda_civic","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vehicle_complaint_ref01_data = Object.values(setup.data.existing.vehicle_complaint)[0] as any

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
      '../../../../.sdk/test/entity/vehicle_complaint/VehicleComplaintTestData.json')

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
    ['vehicle_complaint01','vehicle_complaint02','vehicle_complaint03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VEHICLE_COMPLAINT_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VEHICLE_COMPLAINT_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_COMPLAINT_ENTID']
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
  
