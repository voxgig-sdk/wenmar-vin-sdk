

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


describe('VinEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.Vin()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Vin().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vin.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base_price_usd":{"a":true,"fo":"double","h":"Base Price Usd","n":"base_price_usd","r":false,"sh":"Manufacturer base price in US dollars, when NHTSA has one.","t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"base_price_usd","index$":0},"body":{"a":true,"h":"Body","n":"body","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"body","index$":1},"catalog":{"a":true,"h":"Catalog","n":"catalog","r":false,"t":"`$ANY`","key$":"catalog","index$":2},"check_digit":{"a":true,"h":"Check Digit","n":"check_digit","r":true,"t":"`$OBJECT`","key$":"check_digit","index$":3},"doors":{"a":true,"fo":"int32","h":"Doors","n":"doors","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"doors","index$":4},"drivetrain":{"a":true,"h":"Drivetrain","n":"drivetrain","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"drivetrain","index$":5},"engine":{"a":true,"h":"Engine","n":"engine","r":false,"t":"`$ANY`","key$":"engine","index$":6},"gvwr":{"a":true,"h":"Gvwr","n":"gvwr","r":false,"sh":"Gross vehicle weight rating class, as NHTSA words it.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"gvwr","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":8},"make":{"a":true,"h":"Make","n":"make","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"make","index$":9},"manufacturer":{"a":true,"h":"Manufacturer","n":"manufacturer","r":true,"t":"`$OBJECT`","key$":"manufacturer","index$":10},"model":{"a":true,"h":"Model","n":"model","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"model","index$":11},"plant":{"a":true,"h":"Plant","n":"plant","r":true,"sh":"Where the vehicle was built.","t":"`$OBJECT`","key$":"plant","index$":12},"recalls":{"a":true,"h":"Recalls","n":"recalls","r":false,"t":"`$ANY`","key$":"recalls","index$":13},"safety":{"a":true,"h":"Safety","n":"safety","r":false,"t":"`$ANY`","key$":"safety","index$":14},"seat_rows":{"a":true,"fo":"int32","h":"Seat Rows","n":"seat_rows","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"seat_rows","index$":15},"seats":{"a":true,"fo":"int32","h":"Seats","n":"seats","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"seats","index$":16},"series":{"a":true,"h":"Series","n":"series","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"series","index$":17},"transmission":{"a":true,"h":"Transmission","n":"transmission","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"transmission","index$":18},"transmission_speeds":{"a":true,"fo":"int32","h":"Transmission Speeds","n":"transmission_speeds","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"transmission_speeds","index$":19},"trim":{"a":true,"h":"Trim","n":"trim","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"trim","index$":20},"valid":{"a":true,"h":"Valid","n":"valid","r":true,"sh":"Whether the check digit, position 9, is right.","t":"`$BOOLEAN`","key$":"valid","index$":21},"vin":{"a":true,"h":"Vin","n":"vin","r":true,"t":"`$STRING`","key$":"vin","index$":22},"warnings":{"a":true,"h":"Warnings","n":"warnings","r":true,"sh":"Things to know about a decode that still succeeded.","t":"`$ARRAY`","key$":"warnings","index$":23},"wheel_size_front":{"a":true,"fo":"int32","h":"Wheel Size Front","n":"wheel_size_front","r":false,"sh":"Front wheel diameter in inches.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"wheel_size_front","index$":24},"wheel_size_rear":{"a":true,"fo":"int32","h":"Wheel Size Rear","n":"wheel_size_rear","r":false,"sh":"Rear wheel diameter in inches.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"wheel_size_rear","index$":25},"year":{"a":true,"fo":"int32","h":"Year","n":"year","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"year","index$":26}},"id":{"field":"id","name":"id"},"name":"vin","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/vin/{vin}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"KM8K2CAB4PU001140","k":"param","n":"id","or":"vin","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":2023,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v1/vin/{vin}","q":{"exist":["id"]},"r":{"param":{"vin":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vin"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"vin","name__orig":"vin","Name":"Vin","name_":"vin","name-":"vin","NAME":"VIN","index$":28}, {"active":true,"entity":"vin","key$":"BasicVinFlow","kind":"basic","name":"BasicVinFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"vin_ref01","srcdatavar":"vin_ref01_data","suffix":"_dt0"},"m":{"id":"vin01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vin_ref01"}}],"index$":0}]}, 'Vin', {"GET /v1/vin/{vin}":{"protocol":"http","parameters":[{"name":"vin","in":"path","description":"A 17-character VIN.","required":true,"schema":{"type":"string"},"example":"KM8K2CAB4PU001140","index$":0},{"name":"year","in":"query","description":"Use this model year instead of working it out from the VIN.","required":false,"schema":{"type":"integer","format":"int32","minimum":0},"example":2023,"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vin_ref01_data = Object.values(setup.data.existing.vin)[0] as any

    // LOAD
    const vin_ref01_ent = client.Vin()
    const vin_ref01_match_dt0: any = {}
    vin_ref01_match_dt0.id = vin_ref01_data.id
    const vin_ref01_data_dt0 = (await vin_ref01_ent.load(vin_ref01_match_dt0)).data()
    assert(vin_ref01_data_dt0.id === vin_ref01_data.id)


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
      '../../../../.sdk/test/entity/vin/VinTestData.json')

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
    ['vin01','vin02','vin03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VIN_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VIN_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VIN_ENTID']
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
  
