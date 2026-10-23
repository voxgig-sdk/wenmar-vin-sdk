

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


describe('VehicleInvestigationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.VehicleInvestigation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VehicleInvestigation().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vehicle_investigation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"action":{"a":true,"h":"Action","n":"action","r":true,"sh":"NHTSA's action number.","t":"`$STRING`","key$":"action","index$":0},"campaigns":{"a":true,"h":"Campaigns","n":"campaigns","r":true,"sh":"The recall campaigns it led to, as NHTSA numbers them.","t":"`$ARRAY`","key$":"campaigns","index$":1},"closed":{"a":true,"h":"Closed","n":"closed","r":false,"sh":"The day it was closed.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"closed","index$":2},"component":{"a":true,"h":"Component","n":"component","r":false,"sh":"The components it names, as NHTSA words them, separated by `; `.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"component","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"sh":"The letters the number starts with.","t":"`$STRING`","key$":"kind","index$":5},"kind_name":{"a":true,"h":"Kind Name","n":"kind_name","r":false,"sh":"The kind in words.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"kind_name","index$":6},"manufacturer":{"a":true,"h":"Manufacturer","n":"manufacturer","r":false,"sh":"The manufacturers it names, separated by `; `.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"manufacturer","index$":7},"match":{"a":true,"h":"Match","n":"match","r":false,"sh":"In an answer about one model year: how the investigation's vehicle text reached that model.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"match","index$":8},"models":{"a":true,"h":"Models","n":"models","r":true,"sh":"In an answer about one model year: the model names the investigation lists that reached it.","t":"`$ARRAY`","key$":"models","index$":9},"open":{"a":true,"h":"Open","n":"open","r":true,"sh":"Whether it was opened in 2010 or later and has no day closed.","t":"`$BOOLEAN`","key$":"open","index$":10},"opened":{"a":true,"h":"Opened","n":"opened","r":false,"sh":"The day it was opened.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"opened","index$":11},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"sh":"NHTSA's one-line subject.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"subject","index$":12},"summary":{"a":true,"h":"Summary","n":"summary","r":false,"sh":"NHTSA's summary.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"summary","index$":13}},"id":{"field":"id","name":"id"},"name":"vehicle_investigation","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vehicles/{id}/investigations","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2019_ram_1500","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"open","k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/vehicles/{id}/investigations","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vehicles"},{"var":"id"},{"lit":"investigations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"vehicle_investigation","name__orig":"vehicle_investigation","Name":"VehicleInvestigation","name_":"vehicle_investigation","name-":"vehicle-investigation","NAME":"VEHICLE_INVESTIGATION","index$":22}, {"active":true,"entity":"vehicle_investigation","key$":"BasicVehicleInvestigationFlow","kind":"basic","name":"BasicVehicleInvestigationFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vehicle_investigation_ref01"}}],"unreachable":true}]}, 'VehicleInvestigation', {"GET /v1/vehicles/{id}/investigations":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"A vehicle id. Investigations are listed by year, make and model; a submodel or an engine in the id is set aside.","required":true,"schema":{"type":"string"},"example":"2019_ram_1500","index$":0},{"name":"status","in":"query","description":"`open` (the default): only investigations that are open and about a\npossible defect in the vehicles they list. `all`: every\ninvestigation that lists the model year, closed ones and audit\nqueries included.","required":false,"schema":{"type":"string"},"example":"open","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vehicle_investigation_ref01_data = Object.values(setup.data.existing.vehicle_investigation)[0] as any

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
      '../../../../.sdk/test/entity/vehicle_investigation/VehicleInvestigationTestData.json')

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
    ['vehicle_investigation01','vehicle_investigation02','vehicle_investigation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VEHICLE_INVESTIGATION_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VEHICLE_INVESTIGATION_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VEHICLE_INVESTIGATION_ENTID']
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
  
