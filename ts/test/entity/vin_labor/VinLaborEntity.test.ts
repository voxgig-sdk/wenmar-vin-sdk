

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


describe('VinLaborEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.VinLabor()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VinLabor().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vin_labor.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"as_of":{"a":true,"h":"As Of","n":"as_of","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"as_of","index$":0},"attribution":{"a":true,"h":"Attribution","n":"attribution","r":true,"t":"`$ARRAY`","key$":"attribution","index$":1},"class":{"a":true,"h":"Class","n":"class","r":false,"t":"`$ANY`","key$":"class","index$":2},"decode":{"a":true,"h":"Decode","n":"decode","r":true,"sh":"What a VIN decoded to, as far as recalls need it.","t":"`$OBJECT`","key$":"decode","index$":3},"engine":{"a":true,"h":"Engine","n":"engine","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"engine","index$":4},"estimates":{"a":true,"h":"Estimates","n":"estimates","r":true,"t":"`$ARRAY`","key$":"estimates","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":6},"note":{"a":true,"h":"Note","n":"note","r":true,"t":"`$STRING`","key$":"note","index$":7},"vehicle":{"a":true,"h":"Vehicle","n":"vehicle","r":false,"t":"`$ANY`","key$":"vehicle","index$":8},"warnings":{"a":true,"h":"Warnings","n":"warnings","r":true,"t":"`$ARRAY`","key$":"warnings","index$":9}},"id":{"field":"id","name":"id"},"name":"vin_labor","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/vin/{vin}/labor","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"KM8K2CAB4PU001140","k":"param","n":"id","or":"vin","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v1/vin/{vin}/labor","q":{"exist":["id"]},"r":{"param":{"vin":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vin"},{"var":"id"},{"lit":"labor"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/vin/{vin}/labor/{job}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"brake-pads-front","k":"param","n":"id","or":"job","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"KM8K2CAB4PU001140","k":"param","n":"vin_id","or":"vin","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v1/vin/{vin}/labor/{job}","q":{"exist":["id","vin_id"]},"r":{"param":{"job":"id","vin":"vin_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"vin"},{"var":"vin_id"},{"lit":"labor"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.vin"]]},"key$":"vin_labor","name__orig":"vin_labor","Name":"VinLabor","name_":"vin_labor","name-":"vin-labor","NAME":"VIN_LABOR","index$":32}, {"active":true,"entity":"vin_labor","key$":"BasicVinLaborFlow","kind":"basic","name":"BasicVinLaborFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"vin":"vin01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vin_labor_ref01"}}],"unreachable":true},{"a":true,"d":{},"i":{"ref":"vin_labor_ref01","srcdatavar":"vin_labor_ref01_data","suffix":"_dt0"},"m":{"id":"vin_labor01","vin_id":"vin01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vin_labor_ref01"}}],"index$":0}]}, 'VinLabor', {"GET /v1/vin/{vin}/labor":{"protocol":"http","parameters":[{"name":"vin","in":"path","description":"A 17-character VIN.","required":true,"schema":{"type":"string"},"example":"KM8K2CAB4PU001140","index$":0},{"name":"year","in":"query","description":"The model year, when the VIN's tenth character leaves two possible.","required":false,"schema":{"type":"integer","format":"int32","minimum":0},"index$":1}]},"GET /v1/vin/{vin}/labor/{job}":{"protocol":"http","parameters":[{"name":"vin","in":"path","description":"A 17-character VIN.","required":true,"schema":{"type":"string"},"example":"KM8K2CAB4PU001140","index$":0},{"name":"job","in":"path","description":"A job id.","required":true,"schema":{"type":"string"},"example":"brake-pads-front","index$":1},{"name":"year","in":"query","description":"The model year, when the VIN's tenth character leaves two possible.","required":false,"schema":{"type":"integer","format":"int32","minimum":0},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vin_labor_ref01_data = Object.values(setup.data.existing.vin_labor)[0] as any

    // LOAD
    const vin_labor_ref01_ent = client.VinLabor()
    const vin_labor_ref01_match_dt0: any = {}
    vin_labor_ref01_match_dt0.id = vin_labor_ref01_data.id
    vin_labor_ref01_match_dt0['vin_id'] = setup.idmap['vin_id'] ?? setup.idmap['vin01']
    const vin_labor_ref01_data_dt0 = (await vin_labor_ref01_ent.load(vin_labor_ref01_match_dt0)).data()
    assert(vin_labor_ref01_data_dt0.id === vin_labor_ref01_data.id)


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
      '../../../../.sdk/test/entity/vin_labor/VinLaborTestData.json')

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
    ['vin_labor01','vin_labor02','vin_labor03','vin01','vin02','vin03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_VIN_LABOR_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_VIN_LABOR_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_VIN_LABOR_ENTID']
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
  
