

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


describe('PayrollDeductionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WENMAR_VIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('WENMAR_VIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WenmarVinSDK.test()
    const ent = testsdk.PayrollDeduction()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('payroll_deduction hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WenmarVinSDK.test(offline).PayrollDeduction().stream('list')) { }
    }, /offline/)

    for await (const _item of WenmarVinSDK.test(offline).PayrollDeduction()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WenmarVinSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.PayrollDeduction().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WenmarVinSDK.test().PayrollDeduction().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WenmarVinSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.PayrollDeduction().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.PayrollDeduction().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WenmarVinSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PayrollDeduction().list({"federal_claim":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WENMAR_VIN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'payroll_deduction.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"meaning":{"a":true,"h":"Meaning","n":"meaning","r":true,"sh":"What the factor means.","t":"`$STRING`","key$":"meaning","index$":0},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name the engine gives the factor.","t":"`$STRING`","key$":"name","index$":1},"value":{"a":true,"fo":"double","h":"Value","n":"value","r":true,"sh":"The value used, after rounding.","t":"`$NUMBER`","key$":"value","index$":2}},"name":"payroll_deduction","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/payroll/deductions","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"0","k":"query","n":"federal_claim","or":"federal_claim","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"biweekly","k":"query","n":"frequency","or":"frequency","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"2400.00","k":"query","n":"gross","or":"gross","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"2026-07-15","k":"query","n":"pay_date","or":"pay_date","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"ON","k":"query","n":"province","or":"province","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"0","k":"query","n":"provincial_claim","or":"provincial_claim","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"0.00","k":"query","n":"ytd_cpp","or":"ytd_cpp","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":"0.00","k":"query","n":"ytd_cpp2","or":"ytd_cpp2","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":"0.00","k":"query","n":"ytd_ei","or":"ytd_ei","r":false,"t":"`$STRING`","index$":8},{"a":true,"ex":"0.00","k":"query","n":"ytd_pensionable","or":"ytd_pensionable","r":false,"t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/v1/payroll/deductions","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"payroll"},{"lit":"deductions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"payroll_deduction","name__orig":"payroll_deduction","Name":"PayrollDeduction","name_":"payroll_deduction","name-":"payroll-deduction","NAME":"PAYROLL_DEDUCTION","index$":11}, {"active":true,"entity":"payroll_deduction","key$":"BasicPayrollDeductionFlow","kind":"basic","name":"BasicPayrollDeductionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"payroll_deduction_ref01"}}],"index$":0}]}, 'PayrollDeduction', {"GET /v1/payroll/deductions":{"protocol":"http","parameters":[{"name":"province","in":"query","description":"Only `ON`, Ontario, for now. Left out, Ontario.","required":false,"schema":{"type":"string"},"example":"ON","index$":0},{"name":"frequency","in":"query","description":"`weekly`, `biweekly`, `semi-monthly` or `monthly`. Required.","required":false,"schema":{"type":"string"},"example":"biweekly","index$":1},{"name":"gross","in":"query","description":"The gross pay for one pay period, in dollars. Required.","required":false,"schema":{"type":"string"},"example":"2400.00","index$":2},{"name":"federal_claim","in":"query","description":"The federal claim amount from Form TD1. Left out, the basic personal amount (claim code 1); 0 is claim code 0.","required":false,"schema":{"type":"string"},"example":"0","index$":3},{"name":"provincial_claim","in":"query","description":"The Ontario claim amount from Form TD1ON. Left out, the basic personal amount (claim code 1); 0 is claim code 0.","required":false,"schema":{"type":"string"},"example":"0","index$":4},{"name":"pay_date","in":"query","description":"The pay date, `YYYY-MM-DD`; it chooses the tables. Left out, today. Send it for an answer that does not depend on the day.","required":false,"schema":{"type":"string"},"example":"2026-07-15","index$":5},{"name":"ytd_cpp","in":"query","description":"CPP (base and first additional) deducted earlier this calendar year. Left out, nothing.","required":false,"schema":{"type":"string"},"example":"0.00","index$":6},{"name":"ytd_cpp2","in":"query","description":"CPP2 deducted earlier this calendar year. Left out, nothing.","required":false,"schema":{"type":"string"},"example":"0.00","index$":7},{"name":"ytd_ei","in":"query","description":"EI deducted earlier this calendar year. Left out, nothing.","required":false,"schema":{"type":"string"},"example":"0.00","index$":8},{"name":"ytd_pensionable","in":"query","description":"Pensionable earnings earlier this calendar year. Left out, nothing.","required":false,"schema":{"type":"string"},"example":"0.00","index$":9}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let payroll_deduction_ref01_data = Object.values(setup.data.existing.payroll_deduction)[0] as any

    // LIST
    const payroll_deduction_ref01_ent = client.PayrollDeduction()
    const payroll_deduction_ref01_match: any = {}

    const payroll_deduction_ref01_list = (await payroll_deduction_ref01_ent.list(payroll_deduction_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/payroll_deduction/PayrollDeductionTestData.json')

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
    ['payroll_deduction01','payroll_deduction02','payroll_deduction03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WENMAR_VIN_TEST_PAYROLL_DEDUCTION_ENTID': idmap,
    'WENMAR_VIN_TEST_LIVE': 'FALSE',
    'WENMAR_VIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WENMAR_VIN_TEST_PAYROLL_DEDUCTION_ENTID']

  const live = 'TRUE' === env.WENMAR_VIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WENMAR_VIN_TEST_PAYROLL_DEDUCTION_ENTID']
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
  
