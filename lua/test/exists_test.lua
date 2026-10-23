-- WenmarVin SDK exists test

local sdk = require("wenmar-vin_sdk")

describe("WenmarVinSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
