# WenmarVin SDK utility: prepare_body
require_relative 'media'
module WenmarVinUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return WenmarVinUtilities.raw_body(ctx.reqdata) if WenmarVinUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
