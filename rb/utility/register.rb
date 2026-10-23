# WenmarVin SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WenmarVinUtility.registrar = ->(u) {
  u.clean = WenmarVinUtilities::Clean
  u.clean_add = WenmarVinUtilities::CleanAdd
  u.clean_explain = WenmarVinUtilities::CleanExplain
  u.done = WenmarVinUtilities::Done
  u.make_error = WenmarVinUtilities::MakeError
  u.feature_add = WenmarVinUtilities::FeatureAdd
  u.feature_hook = WenmarVinUtilities::FeatureHook
  u.feature_init = WenmarVinUtilities::FeatureInit
  u.fetcher = WenmarVinUtilities::Fetcher
  u.make_fetch_def = WenmarVinUtilities::MakeFetchDef
  u.make_context = WenmarVinUtilities::MakeContext
  u.make_options = WenmarVinUtilities::MakeOptions
  u.make_request = WenmarVinUtilities::MakeRequest
  u.make_response = WenmarVinUtilities::MakeResponse
  u.make_result = WenmarVinUtilities::MakeResult
  u.make_point = WenmarVinUtilities::MakePoint
  u.make_spec = WenmarVinUtilities::MakeSpec
  u.make_url = WenmarVinUtilities::MakeUrl
  u.param = WenmarVinUtilities::Param
  u.prepare_auth = WenmarVinUtilities::PrepareAuth
  u.prepare_body = WenmarVinUtilities::PrepareBody
  u.prepare_headers = WenmarVinUtilities::PrepareHeaders
  u.prepare_method = WenmarVinUtilities::PrepareMethod
  u.prepare_params = WenmarVinUtilities::PrepareParams
  u.prepare_path = WenmarVinUtilities::PreparePath
  u.prepare_query = WenmarVinUtilities::PrepareQuery
  u.graphql_body = WenmarVinUtilities::GraphqlBody
  u.graphql_errors = WenmarVinUtilities::GraphqlErrors
  u.result_basic = WenmarVinUtilities::ResultBasic
  u.result_body = WenmarVinUtilities::ResultBody
  u.result_headers = WenmarVinUtilities::ResultHeaders
  u.transform_request = WenmarVinUtilities::TransformRequest
  u.transform_response = WenmarVinUtilities::TransformResponse
}
