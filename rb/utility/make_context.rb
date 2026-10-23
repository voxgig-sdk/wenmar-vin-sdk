# WenmarVin SDK utility: make_context
require_relative '../core/context'
module WenmarVinUtilities
  MakeContext = ->(ctxmap, basectx) {
    WenmarVinContext.new(ctxmap, basectx)
  }
end
