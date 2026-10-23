# WenmarVin SDK exists test

require "minitest/autorun"
require_relative "../WenmarVin_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = WenmarVinSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
