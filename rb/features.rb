# WenmarVin SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WenmarVinFeatures
  def self.make_feature(name)
    case name
    when "base"
      WenmarVinBaseFeature.new
    when "ratelimit"
      WenmarVinRatelimitFeature.new
    when "retry"
      WenmarVinRetryFeature.new
    when "test"
      WenmarVinTestFeature.new
    when "timeout"
      WenmarVinTimeoutFeature.new
    else
      WenmarVinBaseFeature.new
    end
  end
end
