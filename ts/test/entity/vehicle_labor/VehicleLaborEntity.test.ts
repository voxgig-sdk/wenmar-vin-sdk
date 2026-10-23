

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


describe('VehicleLaborEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.VehicleLabor()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VehicleLabor().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vehicle_labor.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"as_of":{"a":true,"h":"As Of","n":"as_of","r":false,"sh":"The newest day an estimate was changed.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"as_of","index$":0},"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"t":"`$ARRAY`","key$":"attribution","index$":1},"basis":{"a":true,"h":"Basis","n":"basis","r":true,"sh":"`expert`: written by a person who does the work.","t":"`$STRING`","key$":"basis","index$":2},"class":{"a":true,"h":"Class","n":"class","r":false,"sh":"The class, for a class-scope figure.","t":"`$ANY`","key$":"class","index$":3},"class_name":{"a":true,"h":"Class Name","n":"class_name","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"class_name","index$":4},"engine":{"a":true,"h":"Engine","n":"engine","r":false,"sh":"The engine the vehicle id named, as an id form.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"engine","index$":5},"estimates":{"a":true,"h":"Estimates","n":"estimates","r":true,"sh":"One for each job that has a figure covering the vehicle, in the order of the job list.","t":"`$ARRAY`","key$":"estimates","index$":6},"hours":{"a":true,"h":"Hours","n":"hours","r":true,"sh":"Hours, as numbers of hours.","t":"`$OBJECT`","key$":"hours","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":8},"job":{"a":true,"h":"Job","n":"job","r":true,"sh":"The job's id.","t":"`$STRING`","key$":"job","index$":9},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":10},"note":{"a":true,"h":"Note","n":"note","r":true,"sh":"\"An estimate, not a quote.","t":"`$STRING`","key$":"note","index$":11},"notes":{"a":true,"h":"Notes","n":"notes","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"notes","index$":12},"sample":{"a":true,"h":"Sample","n":"sample","r":false,"t":"`$ANY`","key$":"sample","index$":13},"scope":{"a":true,"h":"Scope","n":"scope","r":true,"sh":"What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`.","t":"`$STRING`","key$":"scope","index$":14},"updated":{"a":true,"h":"Updated","n":"updated","r":true,"sh":"The day the figure was last changed.","t":"`$STRING`","key$":"updated","index$":15},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"The job's page on this site.","t":"`$STRING`","key$":"url","index$":16},"vehicle":{"a":true,"h":"Vehicle","n":"vehicle","r":true,"sh":"The model year an answer is about.","t":"`$OBJECT`","key$":"vehicle","index$":17},"years":{"a":true,"h":"Years","n":"years","r":false,"t":"`$ANY`","key$":"years","index$":18}},"id":{"field":"id","name":"id"},"name":"vehicle_labor","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vehicles/{id}/labor","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2018_ford_f-150","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/vehicles/{id}/labor","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"var":"id"},{"lit":"labor"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/vehicles/{id}/labor/{job}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"brake-pads-front","k":"param","n":"id","or":"job","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"2018_ford_f-150","k":"param","n":"vehicle_id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/vehicles/{id}/labor/{job}","q":{"exist":["id","vehicle_id"]},"r":{"param":{"id":"vehicle_id","job":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"var":"vehicle_id"},{"lit":"labor"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.vehicle"]]},"key$":"vehicle_labor","name__orig":"vehicle_labor","Name":"VehicleLabor","name_":"vehicle_labor","name-":"vehicle-labor","NAME":"VEHICLE_LABOR","index$":23}, {"active":true,"entity":"vehicle_labor","key$":"BasicVehicleLaborFlow","kind":"basic","name":"BasicVehicleLaborFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vehicle_labor_ref01"}}],"unreachable":true},{"a":true,"d":{},"i":{"ref":"vehicle_labor_ref01","srcdatavar":"vehicle_labor_ref01_data","suffix":"_dt0"},"m":{"id":"vehicle_labor01","vehicle_id":"vehicle01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vehicle_labor_ref01"}}],"index$":0}]}, 'VehicleLabor', {"GET /v1/vehicles/{id}/labor":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"A vehicle id. An engine in the id narrows the answer to it.","required":true,"schema":{"type":"string"},"example":"2018_ford_f-150","index$":0}]},"GET /v1/vehicles/{id}/labor/{job}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"A vehicle id.","required":true,"schema":{"type":"string"},"example":"2018_ford_f-150","index$":0},{"name":"job","in":"path","description":"A job id.","required":true,"schema":{"type":"string"},"example":"brake-pads-front","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vehicle_labor_ref01_data = Object.values(setup.data.existing.vehicle_labor)[0] as any

    // LOAD
    const vehicle_labor_ref01_ent = client.VehicleLabor()
    const vehicle_labor_ref01_match_dt0: any = {}
    vehicle_labor_ref01_match_dt0.id = vehicle_labor_ref01_data.id
    vehicle_labor_ref01_match_dt0['vehicle_id'] = setup.idmap['vehicle_id'] ?? setup.idmap['vehicle01']
    const vehicle_labor_ref01_data_dt0 = (await vehicle_labor_ref01_ent.load(vehicle_labor_ref01_match_dt0)).data()
    assert(vehicle_labor_ref01_data_dt0.id === vehicle_labor_ref01_data.id)


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
      '../../../../.sdk/test/entity/vehicle_labor/VehicleLaborTestData.json')

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
    ['vehicle_labor01','vehicle_labor02','vehicle_labor03','vehicle01','vehicle02','vehicle03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VEHICLE_LABOR_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VEHICLE_LABOR_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_LABOR_ENTID']
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
  
