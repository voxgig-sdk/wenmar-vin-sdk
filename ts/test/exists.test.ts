
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WenmarVinSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = WenmarVinSDK.test()
    equal(testsdk instanceof WenmarVinSDK, true,
      'WenmarVinSDK.test() must return a client synchronously')
  })

})
