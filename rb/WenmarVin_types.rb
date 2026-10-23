# frozen_string_literal: true

# Typed models for the WenmarVin SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Batch entity data model.
#
# @!attribute [rw] vins
#   @return [Array]
Batch = Struct.new(
  :vins,
  keyword_init: true
)

# Request payload for Batch#create.
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] vins
#   @return [Array]
BatchCreateData = Struct.new(
  :include,
  :vins,
  keyword_init: true
)

# Bulletin entity data model.
#
# @!attribute [rw] as_of
#   @return [Object, nil]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] codes
#   @return [Array]
#
# @!attribute [rw] component
#   @return [Object, nil]
#
# @!attribute [rw] components
#   @return [Array]
#
# @!attribute [rw] date
#   @return [Object, nil]
#
# @!attribute [rw] date_added
#   @return [String]
#
# @!attribute [rw] document
#   @return [Object, nil]
#
# @!attribute [rw] document_id
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mfr_campaign
#   @return [Object, nil]
#
# @!attribute [rw] mfr_system
#   @return [Object, nil]
#
# @!attribute [rw] nhtsa_id
#   @return [Integer]
#
# @!attribute [rw] note
#   @return [String]
#
# @!attribute [rw] replaces
#   @return [Object, nil]
#
# @!attribute [rw] summary
#   @return [Object, nil]
#
# @!attribute [rw] topics
#   @return [Array]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] type_name
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] vehicles
#   @return [Array]
Bulletin = Struct.new(
  :as_of,
  :attribution,
  :codes,
  :component,
  :components,
  :date,
  :date_added,
  :document,
  :document_id,
  :id,
  :mfr_campaign,
  :mfr_system,
  :nhtsa_id,
  :note,
  :replaces,
  :summary,
  :topics,
  :type,
  :type_name,
  :url,
  :vehicles,
  keyword_init: true
)

# Request payload for Bulletin#load.
#
# @!attribute [rw] id
#   @return [String]
BulletinLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Bulletin#list.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] component
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] make
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
BulletinListMatch = Struct.new(
  :code,
  :component,
  :cursor,
  :limit,
  :make,
  :model,
  :q,
  :topic,
  :type,
  :year,
  keyword_init: true
)

# Code entity data model.
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] checked
#   @return [String]
#
# @!attribute [rw] checks
#   @return [Array]
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] common_causes
#   @return [Array]
#
# @!attribute [rw] components
#   @return [Array]
#
# @!attribute [rw] generic
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] meaning
#   @return [String]
#
# @!attribute [rw] note
#   @return [String]
#
# @!attribute [rw] related
#   @return [Array]
#
# @!attribute [rw] reviewer
#   @return [String]
#
# @!attribute [rw] system
#   @return [String]
#
# @!attribute [rw] system_name
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
Code = Struct.new(
  :attribution,
  :checked,
  :checks,
  :code,
  :common_causes,
  :components,
  :generic,
  :id,
  :meaning,
  :note,
  :related,
  :reviewer,
  :system,
  :system_name,
  :title,
  :url,
  keyword_init: true
)

# Request payload for Code#load.
#
# @!attribute [rw] id
#   @return [String]
CodeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Code#list.
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] system
#   @return [String, nil]
CodeListMatch = Struct.new(
  :cursor,
  :limit,
  :q,
  :system,
  keyword_init: true
)

# Data entity data model.
#
# @!attribute [rw] built_at
#   @return [String]
#
# @!attribute [rw] data_version
#   @return [String]
#
# @!attribute [rw] datasets
#   @return [Hash]
#
# @!attribute [rw] server_version
#   @return [String]
#
# @!attribute [rw] vpic_release
#   @return [String]
DataType = Struct.new(
  :built_at,
  :data_version,
  :datasets,
  :server_version,
  :vpic_release,
  keyword_init: true
)

# Request payload for Data#load.
#
# @!attribute [rw] built_at
#   @return [String, nil]
#
# @!attribute [rw] data_version
#   @return [String, nil]
#
# @!attribute [rw] datasets
#   @return [Hash, nil]
#
# @!attribute [rw] server_version
#   @return [String, nil]
#
# @!attribute [rw] vpic_release
#   @return [String, nil]
DataLoadMatch = Struct.new(
  :built_at,
  :data_version,
  :datasets,
  :server_version,
  :vpic_release,
  keyword_init: true
)

# Engine entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] preset
#   @return [Boolean]
#
# @!attribute [rw] vin8
#   @return [Object, nil]
Engine = Struct.new(
  :id,
  :label,
  :preset,
  :vin8,
  keyword_init: true
)

# Request payload for Engine#list.
#
# @!attribute [rw] make
#   @return [String]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] submodel
#   @return [String, nil]
#
# @!attribute [rw] term
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer]
EngineListMatch = Struct.new(
  :make,
  :model,
  :submodel,
  :term,
  :year,
  keyword_init: true
)

# Entry entity data model.
#
# @!attribute [rw] body
#   @return [Object, nil]
#
# @!attribute [rw] drive
#   @return [Object, nil]
#
# @!attribute [rw] engine
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] make
#   @return [String]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] submodel
#   @return [Object, nil]
#
# @!attribute [rw] summary
#   @return [String]
#
# @!attribute [rw] transmission
#   @return [Object, nil]
#
# @!attribute [rw] vehicle_types
#   @return [Array]
#
# @!attribute [rw] year
#   @return [Integer]
Entry = Struct.new(
  :body,
  :drive,
  :engine,
  :id,
  :make,
  :model,
  :submodel,
  :summary,
  :transmission,
  :vehicle_types,
  :year,
  keyword_init: true
)

# Request payload for Entry#load.
#
# @!attribute [rw] id
#   @return [String]
EntryLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Entry#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] scope
#   @return [String, nil]
EntryListMatch = Struct.new(
  :limit,
  :q,
  :scope,
  keyword_init: true
)

# Job entity data model.
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] components
#   @return [Array]
#
# @!attribute [rw] estimates
#   @return [Object, nil]
#
# @!attribute [rw] excludes
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] includes
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] note
#   @return [String]
#
# @!attribute [rw] related
#   @return [Array]
#
# @!attribute [rw] system
#   @return [String]
#
# @!attribute [rw] system_name
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
Job = Struct.new(
  :attribution,
  :components,
  :estimates,
  :excludes,
  :id,
  :includes,
  :name,
  :note,
  :related,
  :system,
  :system_name,
  :url,
  keyword_init: true
)

# Request payload for Job#load.
#
# @!attribute [rw] id
#   @return [String]
JobLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Job#list.
#
# @!attribute [rw] attribution
#   @return [Array, nil]
#
# @!attribute [rw] components
#   @return [Array, nil]
#
# @!attribute [rw] estimates
#   @return [Object, nil]
#
# @!attribute [rw] excludes
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] includes
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] related
#   @return [Array, nil]
#
# @!attribute [rw] system
#   @return [String, nil]
#
# @!attribute [rw] system_name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
JobListMatch = Struct.new(
  :attribution,
  :components,
  :estimates,
  :excludes,
  :id,
  :includes,
  :name,
  :note,
  :related,
  :system,
  :system_name,
  :url,
  keyword_init: true
)

# Make entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] links
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] popular
#   @return [Boolean]
Make = Struct.new(
  :id,
  :links,
  :name,
  :popular,
  keyword_init: true
)

# Request payload for Make#load.
#
# @!attribute [rw] id
#   @return [String]
MakeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Make#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] scope
#   @return [String, nil]
#
# @!attribute [rw] term
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
MakeListMatch = Struct.new(
  :limit,
  :scope,
  :term,
  :year,
  keyword_init: true
)

# Model entity data model.
#
# @!attribute [rw] as_of
#   @return [Hash]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lookup
#   @return [Hash]
#
# @!attribute [rw] make
#   @return [Hash]
#
# @!attribute [rw] may_apply
#   @return [Boolean]
#
# @!attribute [rw] model
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] year_from
#   @return [Integer]
#
# @!attribute [rw] year_to
#   @return [Integer]
#
# @!attribute [rw] years
#   @return [Array]
Model = Struct.new(
  :as_of,
  :attribution,
  :id,
  :lookup,
  :make,
  :may_apply,
  :model,
  :name,
  :year_from,
  :year_to,
  :years,
  keyword_init: true
)

# Request payload for Model#load.
#
# @!attribute [rw] make
#   @return [String]
#
# @!attribute [rw] model
#   @return [String]
ModelLoadMatch = Struct.new(
  :make,
  :model,
  keyword_init: true
)

# Request payload for Model#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] make
#   @return [String]
#
# @!attribute [rw] scope
#   @return [String, nil]
#
# @!attribute [rw] term
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
ModelListMatch = Struct.new(
  :limit,
  :make,
  :scope,
  :term,
  :year,
  keyword_init: true
)

# Overview entity data model.
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] suggestions
#   @return [Array, nil]
Overview = Struct.new(
  :code,
  :message,
  :suggestions,
  keyword_init: true
)

# Request payload for Overview#list.
#
# @!attribute [rw] vehicle_id
#   @return [String]
OverviewListMatch = Struct.new(
  :vehicle_id,
  keyword_init: true
)

# PartsCard entity data model.
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] engine_settled
#   @return [Boolean]
#
# @!attribute [rw] lines
#   @return [Array]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] vehicle
#   @return [Object, nil]
#
# @!attribute [rw] vin
#   @return [String]
#
# @!attribute [rw] warnings
#   @return [Array]
PartsCard = Struct.new(
  :attribution,
  :engine_settled,
  :lines,
  :text,
  :vehicle,
  :vin,
  :warnings,
  keyword_init: true
)

# Request payload for PartsCard#list.
#
# @!attribute [rw] vin_id
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer, nil]
PartsCardListMatch = Struct.new(
  :vin_id,
  :year,
  keyword_init: true
)

# PayrollDeduction entity data model.
#
# @!attribute [rw] meaning
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] value
#   @return [Float]
PayrollDeduction = Struct.new(
  :meaning,
  :name,
  :value,
  keyword_init: true
)

# Request payload for PayrollDeduction#list.
#
# @!attribute [rw] federal_claim
#   @return [String, nil]
#
# @!attribute [rw] frequency
#   @return [String, nil]
#
# @!attribute [rw] gross
#   @return [String, nil]
#
# @!attribute [rw] pay_date
#   @return [String, nil]
#
# @!attribute [rw] province
#   @return [String, nil]
#
# @!attribute [rw] provincial_claim
#   @return [String, nil]
#
# @!attribute [rw] ytd_cpp
#   @return [String, nil]
#
# @!attribute [rw] ytd_cpp2
#   @return [String, nil]
#
# @!attribute [rw] ytd_ei
#   @return [String, nil]
#
# @!attribute [rw] ytd_pensionable
#   @return [String, nil]
PayrollDeductionListMatch = Struct.new(
  :federal_claim,
  :frequency,
  :gross,
  :pay_date,
  :province,
  :provincial_claim,
  :ytd_cpp,
  :ytd_cpp2,
  :ytd_ei,
  :ytd_pensionable,
  keyword_init: true
)

# Recall entity data model.
#
# @!attribute [rw] as_of
#   @return [Object, nil]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] built_from
#   @return [Object, nil]
#
# @!attribute [rw] built_to
#   @return [Object, nil]
#
# @!attribute [rw] campaign
#   @return [String]
#
# @!attribute [rw] completion
#   @return [Object, nil]
#
# @!attribute [rw] component
#   @return [Object, nil]
#
# @!attribute [rw] consequence
#   @return [Object, nil]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] date
#   @return [Object, nil]
#
# @!attribute [rw] do_not_drive
#   @return [Object, nil]
#
# @!attribute [rw] french
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lookup
#   @return [Hash]
#
# @!attribute [rw] manufacturer
#   @return [Object, nil]
#
# @!attribute [rw] match
#   @return [Object, nil]
#
# @!attribute [rw] may_apply
#   @return [Boolean]
#
# @!attribute [rw] mfr_campaign
#   @return [Object, nil]
#
# @!attribute [rw] models
#   @return [Array]
#
# @!attribute [rw] notes
#   @return [Object, nil]
#
# @!attribute [rw] notification
#   @return [Object, nil]
#
# @!attribute [rw] owner_notified
#   @return [Object, nil]
#
# @!attribute [rw] park_outside
#   @return [Object, nil]
#
# @!attribute [rw] part_number
#   @return [Object, nil]
#
# @!attribute [rw] remedy
#   @return [Object, nil]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] summary
#   @return [Object, nil]
#
# @!attribute [rw] units
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] vehicles
#   @return [Array]
Recall = Struct.new(
  :as_of,
  :attribution,
  :built_from,
  :built_to,
  :campaign,
  :completion,
  :component,
  :consequence,
  :country,
  :date,
  :do_not_drive,
  :french,
  :id,
  :lookup,
  :manufacturer,
  :match,
  :may_apply,
  :mfr_campaign,
  :models,
  :notes,
  :notification,
  :owner_notified,
  :park_outside,
  :part_number,
  :remedy,
  :source,
  :summary,
  :units,
  :url,
  :vehicles,
  keyword_init: true
)

# Request payload for Recall#load.
#
# @!attribute [rw] campaign
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
RecallLoadMatch = Struct.new(
  :campaign,
  :source,
  keyword_init: true
)

# Request payload for Recall#list.
#
# @!attribute [rw] component
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] make
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
RecallListMatch = Struct.new(
  :component,
  :country,
  :cursor,
  :limit,
  :make,
  :model,
  :q,
  :year,
  keyword_init: true
)

# RecallInvestigation entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] campaigns
#   @return [Array]
#
# @!attribute [rw] closed
#   @return [Object, nil]
#
# @!attribute [rw] component
#   @return [Object, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] kind_name
#   @return [Object, nil]
#
# @!attribute [rw] manufacturer
#   @return [Object, nil]
#
# @!attribute [rw] match
#   @return [Object, nil]
#
# @!attribute [rw] models
#   @return [Array]
#
# @!attribute [rw] open
#   @return [Boolean]
#
# @!attribute [rw] opened
#   @return [Object, nil]
#
# @!attribute [rw] subject
#   @return [Object, nil]
#
# @!attribute [rw] summary
#   @return [Object, nil]
RecallInvestigation = Struct.new(
  :action,
  :campaigns,
  :closed,
  :component,
  :kind,
  :kind_name,
  :manufacturer,
  :match,
  :models,
  :open,
  :opened,
  :subject,
  :summary,
  keyword_init: true
)

# Request payload for RecallInvestigation#list.
#
# @!attribute [rw] campaign
#   @return [String]
#
# @!attribute [rw] recall_id
#   @return [String]
RecallInvestigationListMatch = Struct.new(
  :campaign,
  :recall_id,
  keyword_init: true
)

# Recent entity data model.
#
# @!attribute [rw] recall
#   @return [Hash]
#
# @!attribute [rw] vehicles
#   @return [Array]
#
# @!attribute [rw] vehicles_listed
#   @return [Integer]
Recent = Struct.new(
  :recall,
  :vehicles,
  :vehicles_listed,
  keyword_init: true
)

# Request payload for Recent#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] make
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
RecentListMatch = Struct.new(
  :country,
  :cursor,
  :limit,
  :make,
  :since,
  keyword_init: true
)

# Submodel entity data model.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
Submodel = Struct.new(
  :id,
  :kind,
  :name,
  keyword_init: true
)

# Request payload for Submodel#list.
#
# @!attribute [rw] make
#   @return [String]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] term
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer]
SubmodelListMatch = Struct.new(
  :make,
  :model,
  :term,
  :year,
  keyword_init: true
)

# Vehicle entity data model.
class Vehicle
end

# Request payload for Vehicle#list.
#
# @!attribute [rw] scope
#   @return [String, nil]
#
# @!attribute [rw] term
#   @return [String, nil]
VehicleListMatch = Struct.new(
  :scope,
  :term,
  keyword_init: true
)

# VehicleBulletin entity data model.
#
# @!attribute [rw] component
#   @return [Object, nil]
#
# @!attribute [rw] date
#   @return [Object, nil]
#
# @!attribute [rw] date_added
#   @return [String]
#
# @!attribute [rw] document
#   @return [Object, nil]
#
# @!attribute [rw] document_id
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mfr_campaign
#   @return [Object, nil]
#
# @!attribute [rw] nhtsa_id
#   @return [Integer]
#
# @!attribute [rw] summary
#   @return [Object, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] type_name
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
VehicleBulletin = Struct.new(
  :component,
  :date,
  :date_added,
  :document,
  :document_id,
  :id,
  :mfr_campaign,
  :nhtsa_id,
  :summary,
  :type,
  :type_name,
  :url,
  keyword_init: true
)

# Request payload for VehicleBulletin#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] component
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
VehicleBulletinListMatch = Struct.new(
  :id,
  :code,
  :component,
  :cursor,
  :limit,
  :q,
  :topic,
  :type,
  keyword_init: true
)

# VehicleCode entity data model.
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] bulletins
#   @return [Object, nil]
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] generic
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String]
#
# @!attribute [rw] related
#   @return [Hash]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] vehicle
#   @return [Hash]
VehicleCode = Struct.new(
  :attribution,
  :bulletins,
  :code,
  :description,
  :generic,
  :id,
  :note,
  :related,
  :url,
  :vehicle,
  keyword_init: true
)

# Request payload for VehicleCode#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] vehicle_id
#   @return [String]
VehicleCodeLoadMatch = Struct.new(
  :id,
  :vehicle_id,
  keyword_init: true
)

# VehicleComplaint entity data model.
#
# @!attribute [rw] complaints
#   @return [Integer]
#
# @!attribute [rw] crashes
#   @return [Integer]
#
# @!attribute [rw] fires
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] injuries
#   @return [Integer]
#
# @!attribute [rw] median_km
#   @return [Object, nil]
#
# @!attribute [rw] median_miles
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] parent
#   @return [Object, nil]
VehicleComplaint = Struct.new(
  :complaints,
  :crashes,
  :fires,
  :id,
  :injuries,
  :median_km,
  :median_miles,
  :name,
  :parent,
  keyword_init: true
)

# Request payload for VehicleComplaint#list.
#
# @!attribute [rw] id
#   @return [String]
VehicleComplaintListMatch = Struct.new(
  :id,
  keyword_init: true
)

# VehicleFluid entity data model.
#
# @!attribute [rw] as_of
#   @return [Object, nil]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] brake
#   @return [Array]
#
# @!attribute [rw] checked_as_of
#   @return [Object, nil]
#
# @!attribute [rw] coolant
#   @return [Array]
#
# @!attribute [rw] engine_oil
#   @return [Array]
#
# @!attribute [rw] engine_oil_checked
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] refrigerant
#   @return [Array]
#
# @!attribute [rw] transmission
#   @return [Array]
#
# @!attribute [rw] vehicle
#   @return [Hash]
VehicleFluid = Struct.new(
  :as_of,
  :attribution,
  :brake,
  :checked_as_of,
  :coolant,
  :engine_oil,
  :engine_oil_checked,
  :id,
  :refrigerant,
  :transmission,
  :vehicle,
  keyword_init: true
)

# Request payload for VehicleFluid#list.
#
# @!attribute [rw] id
#   @return [String]
VehicleFluidListMatch = Struct.new(
  :id,
  keyword_init: true
)

# VehicleFuel entity data model.
#
# @!attribute [rw] co2_g_km
#   @return [Object, nil]
#
# @!attribute [rw] confidence
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] cylinders
#   @return [Object, nil]
#
# @!attribute [rw] described_as
#   @return [String]
#
# @!attribute [rw] displacement_l
#   @return [Object, nil]
#
# @!attribute [rw] drive
#   @return [Object, nil]
#
# @!attribute [rw] engine
#   @return [Object, nil]
#
# @!attribute [rw] fuel_grade
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kwh_100km
#   @return [Object, nil]
#
# @!attribute [rw] l_100km
#   @return [Object, nil]
#
# @!attribute [rw] match
#   @return [String]
#
# @!attribute [rw] mpg
#   @return [Object, nil]
#
# @!attribute [rw] range_km
#   @return [Object, nil]
#
# @!attribute [rw] range_mi
#   @return [Object, nil]
#
# @!attribute [rw] second_fuel
#   @return [Object, nil]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] source_id
#   @return [Object, nil]
#
# @!attribute [rw] transmission
#   @return [Object, nil]
VehicleFuel = Struct.new(
  :co2_g_km,
  :confidence,
  :country,
  :cylinders,
  :described_as,
  :displacement_l,
  :drive,
  :engine,
  :fuel_grade,
  :id,
  :kwh_100km,
  :l_100km,
  :match,
  :mpg,
  :range_km,
  :range_mi,
  :second_fuel,
  :source,
  :source_id,
  :transmission,
  keyword_init: true
)

# Request payload for VehicleFuel#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] country
#   @return [String, nil]
VehicleFuelListMatch = Struct.new(
  :id,
  :country,
  keyword_init: true
)

# VehicleInvestigation entity data model.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] campaigns
#   @return [Array]
#
# @!attribute [rw] closed
#   @return [Object, nil]
#
# @!attribute [rw] component
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] kind_name
#   @return [Object, nil]
#
# @!attribute [rw] manufacturer
#   @return [Object, nil]
#
# @!attribute [rw] match
#   @return [Object, nil]
#
# @!attribute [rw] models
#   @return [Array]
#
# @!attribute [rw] open
#   @return [Boolean]
#
# @!attribute [rw] opened
#   @return [Object, nil]
#
# @!attribute [rw] subject
#   @return [Object, nil]
#
# @!attribute [rw] summary
#   @return [Object, nil]
VehicleInvestigation = Struct.new(
  :action,
  :campaigns,
  :closed,
  :component,
  :id,
  :kind,
  :kind_name,
  :manufacturer,
  :match,
  :models,
  :open,
  :opened,
  :subject,
  :summary,
  keyword_init: true
)

# Request payload for VehicleInvestigation#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] status
#   @return [String, nil]
VehicleInvestigationListMatch = Struct.new(
  :id,
  :status,
  keyword_init: true
)

# VehicleLabor entity data model.
#
# @!attribute [rw] as_of
#   @return [Object, nil]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] basis
#   @return [String]
#
# @!attribute [rw] class
#   @return [Object, nil]
#
# @!attribute [rw] class_name
#   @return [Object, nil]
#
# @!attribute [rw] engine
#   @return [Object, nil]
#
# @!attribute [rw] estimates
#   @return [Array]
#
# @!attribute [rw] hours
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] job
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] note
#   @return [String]
#
# @!attribute [rw] notes
#   @return [Object, nil]
#
# @!attribute [rw] sample
#   @return [Object, nil]
#
# @!attribute [rw] scope
#   @return [String]
#
# @!attribute [rw] updated
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] vehicle
#   @return [Hash]
#
# @!attribute [rw] years
#   @return [Object, nil]
VehicleLabor = Struct.new(
  :as_of,
  :attribution,
  :basis,
  :class,
  :class_name,
  :engine,
  :estimates,
  :hours,
  :id,
  :job,
  :name,
  :note,
  :notes,
  :sample,
  :scope,
  :updated,
  :url,
  :vehicle,
  :years,
  keyword_init: true
)

# Request payload for VehicleLabor#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] vehicle_id
#   @return [String]
VehicleLaborLoadMatch = Struct.new(
  :id,
  :vehicle_id,
  keyword_init: true
)

# Request payload for VehicleLabor#list.
#
# @!attribute [rw] id
#   @return [String]
VehicleLaborListMatch = Struct.new(
  :id,
  keyword_init: true
)

# VehicleRecall entity data model.
#
# @!attribute [rw] built_from
#   @return [Object, nil]
#
# @!attribute [rw] built_to
#   @return [Object, nil]
#
# @!attribute [rw] campaign
#   @return [String]
#
# @!attribute [rw] component
#   @return [Object, nil]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] date
#   @return [Object, nil]
#
# @!attribute [rw] do_not_drive
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [Object, nil]
#
# @!attribute [rw] match
#   @return [Object, nil]
#
# @!attribute [rw] mfr_campaign
#   @return [Object, nil]
#
# @!attribute [rw] models
#   @return [Array]
#
# @!attribute [rw] notification
#   @return [Object, nil]
#
# @!attribute [rw] park_outside
#   @return [Object, nil]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] summary
#   @return [Object, nil]
#
# @!attribute [rw] units
#   @return [Object, nil]
#
# @!attribute [rw] url
#   @return [String]
VehicleRecall = Struct.new(
  :built_from,
  :built_to,
  :campaign,
  :component,
  :country,
  :date,
  :do_not_drive,
  :id,
  :manufacturer,
  :match,
  :mfr_campaign,
  :models,
  :notification,
  :park_outside,
  :source,
  :summary,
  :units,
  :url,
  keyword_init: true
)

# Request payload for VehicleRecall#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] country
#   @return [String, nil]
VehicleRecallListMatch = Struct.new(
  :id,
  :country,
  keyword_init: true
)

# VehicleSafety entity data model.
#
# @!attribute [rw] body_style
#   @return [Object, nil]
#
# @!attribute [rw] curb_weight_kg
#   @return [Object, nil]
#
# @!attribute [rw] curb_weight_lb
#   @return [Object, nil]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] drive
#   @return [Object, nil]
#
# @!attribute [rw] features
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] match
#   @return [String]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] notes
#   @return [Array]
#
# @!attribute [rw] release
#   @return [Integer]
#
# @!attribute [rw] rollover_risk_percent
#   @return [Object, nil]
#
# @!attribute [rw] rollover_tip
#   @return [Object, nil]
#
# @!attribute [rw] stars
#   @return [Hash]
#
# @!attribute [rw] vehicle_type
#   @return [Object, nil]
VehicleSafety = Struct.new(
  :body_style,
  :curb_weight_kg,
  :curb_weight_lb,
  :description,
  :drive,
  :features,
  :id,
  :match,
  :model,
  :notes,
  :release,
  :rollover_risk_percent,
  :rollover_tip,
  :stars,
  :vehicle_type,
  keyword_init: true
)

# Request payload for VehicleSafety#list.
#
# @!attribute [rw] id
#   @return [String]
VehicleSafetyListMatch = Struct.new(
  :id,
  keyword_init: true
)

# VehicleSpec entity data model.
#
# @!attribute [rw] battery_type
#   @return [Object, nil]
#
# @!attribute [rw] battery_voltage
#   @return [Object, nil]
#
# @!attribute [rw] confidence
#   @return [String]
#
# @!attribute [rw] cylinder_deactivation
#   @return [Object, nil]
#
# @!attribute [rw] cylinder_deactivation_name
#   @return [Object, nil]
#
# @!attribute [rw] described_as
#   @return [String]
#
# @!attribute [rw] drive
#   @return [Object, nil]
#
# @!attribute [rw] electrification
#   @return [Object, nil]
#
# @!attribute [rw] emission_standards
#   @return [Array]
#
# @!attribute [rw] engine
#   @return [Object, nil]
#
# @!attribute [rw] ev_motor
#   @return [Object, nil]
#
# @!attribute [rw] exhaust_valves
#   @return [Object, nil]
#
# @!attribute [rw] fuel_grade
#   @return [String]
#
# @!attribute [rw] fuel_usage
#   @return [Object, nil]
#
# @!attribute [rw] gears
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] intake_valves
#   @return [Object, nil]
#
# @!attribute [rw] luggage_volume_ft3
#   @return [Object, nil]
#
# @!attribute [rw] luggage_volume_l
#   @return [Object, nil]
#
# @!attribute [rw] motor_kw
#   @return [Object, nil]
#
# @!attribute [rw] passenger_volume_ft3
#   @return [Object, nil]
#
# @!attribute [rw] passenger_volume_l
#   @return [Object, nil]
#
# @!attribute [rw] size_class
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] source_id
#   @return [String]
#
# @!attribute [rw] start_stop
#   @return [Object, nil]
#
# @!attribute [rw] supercharger
#   @return [Boolean]
#
# @!attribute [rw] transmission
#   @return [Object, nil]
#
# @!attribute [rw] transmission_type
#   @return [Object, nil]
#
# @!attribute [rw] turbo
#   @return [Boolean]
#
# @!attribute [rw] variable_valve_lift
#   @return [Object, nil]
#
# @!attribute [rw] variable_valve_timing
#   @return [Object, nil]
VehicleSpec = Struct.new(
  :battery_type,
  :battery_voltage,
  :confidence,
  :cylinder_deactivation,
  :cylinder_deactivation_name,
  :described_as,
  :drive,
  :electrification,
  :emission_standards,
  :engine,
  :ev_motor,
  :exhaust_valves,
  :fuel_grade,
  :fuel_usage,
  :gears,
  :id,
  :intake_valves,
  :luggage_volume_ft3,
  :luggage_volume_l,
  :motor_kw,
  :passenger_volume_ft3,
  :passenger_volume_l,
  :size_class,
  :source,
  :source_id,
  :start_stop,
  :supercharger,
  :transmission,
  :transmission_type,
  :turbo,
  :variable_valve_lift,
  :variable_valve_timing,
  keyword_init: true
)

# Request payload for VehicleSpec#list.
#
# @!attribute [rw] id
#   @return [String]
VehicleSpecListMatch = Struct.new(
  :id,
  keyword_init: true
)

# VehicleTire entity data model.
#
# @!attribute [rw] bolt_pattern
#   @return [Object, nil]
#
# @!attribute [rw] checked
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lug_torque_lbft
#   @return [Object, nil]
#
# @!attribute [rw] lug_torque_nm
#   @return [Object, nil]
#
# @!attribute [rw] lug_torque_written_in
#   @return [Object, nil]
#
# @!attribute [rw] market
#   @return [Object, nil]
#
# @!attribute [rw] pressure_kpa
#   @return [Object, nil]
#
# @!attribute [rw] pressure_psi
#   @return [Object, nil]
#
# @!attribute [rw] pressure_written_in
#   @return [Object, nil]
#
# @!attribute [rw] size
#   @return [String]
#
# @!attribute [rw] size_rear
#   @return [Object, nil]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] trims
#   @return [Array]
VehicleTire = Struct.new(
  :bolt_pattern,
  :checked,
  :id,
  :lug_torque_lbft,
  :lug_torque_nm,
  :lug_torque_written_in,
  :market,
  :pressure_kpa,
  :pressure_psi,
  :pressure_written_in,
  :size,
  :size_rear,
  :source,
  :trims,
  keyword_init: true
)

# Request payload for VehicleTire#list.
#
# @!attribute [rw] id
#   @return [String]
VehicleTireListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Vin entity data model.
#
# @!attribute [rw] base_price_usd
#   @return [Object, nil]
#
# @!attribute [rw] body
#   @return [Object, nil]
#
# @!attribute [rw] catalog
#   @return [Object, nil]
#
# @!attribute [rw] check_digit
#   @return [Hash]
#
# @!attribute [rw] doors
#   @return [Object, nil]
#
# @!attribute [rw] drivetrain
#   @return [Object, nil]
#
# @!attribute [rw] engine
#   @return [Object, nil]
#
# @!attribute [rw] gvwr
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] make
#   @return [Object, nil]
#
# @!attribute [rw] manufacturer
#   @return [Hash]
#
# @!attribute [rw] model
#   @return [Object, nil]
#
# @!attribute [rw] plant
#   @return [Hash]
#
# @!attribute [rw] recalls
#   @return [Object, nil]
#
# @!attribute [rw] safety
#   @return [Object, nil]
#
# @!attribute [rw] seat_rows
#   @return [Object, nil]
#
# @!attribute [rw] seats
#   @return [Object, nil]
#
# @!attribute [rw] series
#   @return [Object, nil]
#
# @!attribute [rw] transmission
#   @return [Object, nil]
#
# @!attribute [rw] transmission_speeds
#   @return [Object, nil]
#
# @!attribute [rw] trim
#   @return [Object, nil]
#
# @!attribute [rw] valid
#   @return [Boolean]
#
# @!attribute [rw] vin
#   @return [String]
#
# @!attribute [rw] warnings
#   @return [Array]
#
# @!attribute [rw] wheel_size_front
#   @return [Object, nil]
#
# @!attribute [rw] wheel_size_rear
#   @return [Object, nil]
#
# @!attribute [rw] year
#   @return [Object, nil]
Vin = Struct.new(
  :base_price_usd,
  :body,
  :catalog,
  :check_digit,
  :doors,
  :drivetrain,
  :engine,
  :gvwr,
  :id,
  :make,
  :manufacturer,
  :model,
  :plant,
  :recalls,
  :safety,
  :seat_rows,
  :seats,
  :series,
  :transmission,
  :transmission_speeds,
  :trim,
  :valid,
  :vin,
  :warnings,
  :wheel_size_front,
  :wheel_size_rear,
  :year,
  keyword_init: true
)

# Request payload for Vin#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer, nil]
VinLoadMatch = Struct.new(
  :id,
  :year,
  keyword_init: true
)

# VinBulletin entity data model.
#
# @!attribute [rw] as_of
#   @return [Object, nil]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] bulletins
#   @return [Array]
#
# @!attribute [rw] counts
#   @return [Hash]
#
# @!attribute [rw] decode
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] next_cursor
#   @return [Object, nil]
#
# @!attribute [rw] note
#   @return [String]
#
# @!attribute [rw] vehicle
#   @return [Object, nil]
#
# @!attribute [rw] warnings
#   @return [Array]
VinBulletin = Struct.new(
  :as_of,
  :attribution,
  :bulletins,
  :counts,
  :decode,
  :id,
  :next_cursor,
  :note,
  :vehicle,
  :warnings,
  keyword_init: true
)

# Request payload for VinBulletin#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] component
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
VinBulletinListMatch = Struct.new(
  :id,
  :code,
  :component,
  :cursor,
  :limit,
  :q,
  :topic,
  :type,
  :year,
  keyword_init: true
)

# VinFluid entity data model.
#
# @!attribute [rw] as_of
#   @return [Object, nil]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] brake
#   @return [Array]
#
# @!attribute [rw] checked_as_of
#   @return [Object, nil]
#
# @!attribute [rw] coolant
#   @return [Array]
#
# @!attribute [rw] decode
#   @return [Hash]
#
# @!attribute [rw] engine
#   @return [Object, nil]
#
# @!attribute [rw] engine_oil
#   @return [Array]
#
# @!attribute [rw] engine_oil_checked
#   @return [Array]
#
# @!attribute [rw] engine_settled
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] refrigerant
#   @return [Array]
#
# @!attribute [rw] transmission
#   @return [Array]
#
# @!attribute [rw] vehicle
#   @return [Object, nil]
#
# @!attribute [rw] warnings
#   @return [Array]
VinFluid = Struct.new(
  :as_of,
  :attribution,
  :brake,
  :checked_as_of,
  :coolant,
  :decode,
  :engine,
  :engine_oil,
  :engine_oil_checked,
  :engine_settled,
  :id,
  :refrigerant,
  :transmission,
  :vehicle,
  :warnings,
  keyword_init: true
)

# Request payload for VinFluid#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer, nil]
VinFluidListMatch = Struct.new(
  :id,
  :year,
  keyword_init: true
)

# VinFuel entity data model.
#
# @!attribute [rw] as_of
#   @return [Hash]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] decode
#   @return [Hash]
#
# @!attribute [rw] engine
#   @return [Object, nil]
#
# @!attribute [rw] engine_settled
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ratings
#   @return [Array]
#
# @!attribute [rw] vehicle
#   @return [Object, nil]
#
# @!attribute [rw] warnings
#   @return [Array]
VinFuel = Struct.new(
  :as_of,
  :attribution,
  :decode,
  :engine,
  :engine_settled,
  :id,
  :ratings,
  :vehicle,
  :warnings,
  keyword_init: true
)

# Request payload for VinFuel#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
VinFuelListMatch = Struct.new(
  :id,
  :country,
  :year,
  keyword_init: true
)

# VinLabor entity data model.
#
# @!attribute [rw] as_of
#   @return [Object, nil]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] class
#   @return [Object, nil]
#
# @!attribute [rw] decode
#   @return [Hash]
#
# @!attribute [rw] engine
#   @return [Object, nil]
#
# @!attribute [rw] estimates
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String]
#
# @!attribute [rw] vehicle
#   @return [Object, nil]
#
# @!attribute [rw] warnings
#   @return [Array]
VinLabor = Struct.new(
  :as_of,
  :attribution,
  :class,
  :decode,
  :engine,
  :estimates,
  :id,
  :note,
  :vehicle,
  :warnings,
  keyword_init: true
)

# Request payload for VinLabor#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] vin_id
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer, nil]
VinLaborLoadMatch = Struct.new(
  :id,
  :vin_id,
  :year,
  keyword_init: true
)

# Request payload for VinLabor#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer, nil]
VinLaborListMatch = Struct.new(
  :id,
  :year,
  keyword_init: true
)

# VinRecall entity data model.
#
# @!attribute [rw] as_of
#   @return [Hash]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] decode
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lookup
#   @return [Hash]
#
# @!attribute [rw] may_apply
#   @return [Boolean]
#
# @!attribute [rw] recalls
#   @return [Array]
#
# @!attribute [rw] vehicle
#   @return [Object, nil]
#
# @!attribute [rw] warnings
#   @return [Array]
VinRecall = Struct.new(
  :as_of,
  :attribution,
  :decode,
  :id,
  :lookup,
  :may_apply,
  :recalls,
  :vehicle,
  :warnings,
  keyword_init: true
)

# Request payload for VinRecall#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
VinRecallListMatch = Struct.new(
  :id,
  :country,
  :year,
  keyword_init: true
)

# VinSpec entity data model.
#
# @!attribute [rw] as_of
#   @return [Object, nil]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] decode
#   @return [Hash]
#
# @!attribute [rw] engine
#   @return [Object, nil]
#
# @!attribute [rw] engine_settled
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] specs
#   @return [Array]
#
# @!attribute [rw] vehicle
#   @return [Object, nil]
#
# @!attribute [rw] warnings
#   @return [Array]
VinSpec = Struct.new(
  :as_of,
  :attribution,
  :decode,
  :engine,
  :engine_settled,
  :id,
  :specs,
  :vehicle,
  :warnings,
  keyword_init: true
)

# Request payload for VinSpec#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer, nil]
VinSpecListMatch = Struct.new(
  :id,
  :year,
  keyword_init: true
)

# VinTire entity data model.
#
# @!attribute [rw] as_of
#   @return [Object, nil]
#
# @!attribute [rw] attribution
#   @return [Array]
#
# @!attribute [rw] decode
#   @return [Hash]
#
# @!attribute [rw] fitments
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] vehicle
#   @return [Object, nil]
#
# @!attribute [rw] warnings
#   @return [Array]
VinTire = Struct.new(
  :as_of,
  :attribution,
  :decode,
  :fitments,
  :id,
  :vehicle,
  :warnings,
  keyword_init: true
)

# Request payload for VinTire#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] year
#   @return [Integer, nil]
VinTireListMatch = Struct.new(
  :id,
  :year,
  keyword_init: true
)

