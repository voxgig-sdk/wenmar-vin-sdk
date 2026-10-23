-- Typed models for the WenmarVin SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Batch
---@field vins table

---@class BatchCreateData
---@field include? string
---@field vins table

---@class Bulletin
---@field as_of? string|nil
---@field attribution table
---@field codes table
---@field component? string|nil
---@field components table
---@field date? string|nil
---@field date_added string
---@field document? any
---@field document_id? string|nil
---@field id? string
---@field mfr_campaign? string|nil
---@field mfr_system? string|nil
---@field nhtsa_id number
---@field note string
---@field replaces? string|nil
---@field summary? string|nil
---@field topics table
---@field type string
---@field type_name string
---@field url string
---@field vehicles table

---@class BulletinLoadMatch
---@field id string

---@class BulletinListMatch
---@field code? string
---@field component? string
---@field cursor? string
---@field limit? number
---@field make? string
---@field model? string
---@field q? string
---@field topic? string
---@field type? string
---@field year? number

---@class Code
---@field attribution table
---@field checked string
---@field checks table
---@field code string
---@field common_causes table
---@field components table
---@field generic boolean
---@field id? string
---@field meaning string
---@field note string
---@field related table
---@field reviewer string
---@field system string
---@field system_name string
---@field title string
---@field url string

---@class CodeLoadMatch
---@field id string

---@class CodeListMatch
---@field cursor? string
---@field limit? number
---@field q? string
---@field system? string

---@class Data
---@field built_at string
---@field data_version string
---@field datasets table
---@field server_version string
---@field vpic_release string

---@class DataLoadMatch
---@field built_at? string
---@field data_version? string
---@field datasets? table
---@field server_version? string
---@field vpic_release? string

---@class Engine
---@field id string
---@field label string
---@field preset boolean
---@field vin8? string|nil

---@class EngineListMatch
---@field make string
---@field model string
---@field submodel? string
---@field term? string
---@field year number

---@class Entry
---@field body? string|nil
---@field drive? string|nil
---@field engine? string|nil
---@field id string
---@field make string
---@field model string
---@field submodel? string|nil
---@field summary string
---@field transmission? string|nil
---@field vehicle_types table
---@field year number

---@class EntryLoadMatch
---@field id string

---@class EntryListMatch
---@field limit? number
---@field q string
---@field scope? string

---@class Job
---@field attribution table
---@field components table
---@field estimates? table|nil
---@field excludes table
---@field id string
---@field includes table
---@field name string
---@field note string
---@field related table
---@field system string
---@field system_name string
---@field url string

---@class JobLoadMatch
---@field id string

---@class JobListMatch
---@field attribution? table
---@field components? table
---@field estimates? table|nil
---@field excludes? table
---@field id? string
---@field includes? table
---@field name? string
---@field note? string
---@field related? table
---@field system? string
---@field system_name? string
---@field url? string

---@class Make
---@field id string
---@field links? any
---@field name string
---@field popular boolean

---@class MakeLoadMatch
---@field id string

---@class MakeListMatch
---@field limit? number
---@field scope? string
---@field term? string
---@field year? number

---@class Model
---@field as_of table
---@field attribution table
---@field id string
---@field lookup table
---@field make table
---@field may_apply boolean
---@field model table
---@field name string
---@field year_from number
---@field year_to number
---@field years table

---@class ModelLoadMatch
---@field make string
---@field model string

---@class ModelListMatch
---@field limit? number
---@field make string
---@field scope? string
---@field term? string
---@field year? number

---@class Overview
---@field code string
---@field message string
---@field suggestions? table

---@class OverviewListMatch
---@field vehicle_id string

---@class PartsCard
---@field attribution table
---@field engine_settled boolean
---@field lines table
---@field text string
---@field vehicle? any
---@field vin string
---@field warnings table

---@class PartsCardListMatch
---@field vin_id string
---@field year? number

---@class PayrollDeduction
---@field meaning string
---@field name string
---@field value number

---@class PayrollDeductionListMatch
---@field federal_claim? string
---@field frequency? string
---@field gross? string
---@field pay_date? string
---@field province? string
---@field provincial_claim? string
---@field ytd_cpp? string
---@field ytd_cpp2? string
---@field ytd_ei? string
---@field ytd_pensionable? string

---@class Recall
---@field as_of? string|nil
---@field attribution table
---@field built_from? string|nil
---@field built_to? string|nil
---@field campaign string
---@field completion? any
---@field component? string|nil
---@field consequence? string|nil
---@field country string
---@field date? string|nil
---@field do_not_drive? boolean|nil
---@field french? any
---@field id? string
---@field lookup table
---@field manufacturer? string|nil
---@field match? string|nil
---@field may_apply boolean
---@field mfr_campaign? string|nil
---@field models table
---@field notes? string|nil
---@field notification? string|nil
---@field owner_notified? string|nil
---@field park_outside? boolean|nil
---@field part_number? string|nil
---@field remedy? string|nil
---@field source string
---@field summary? string|nil
---@field units? number|nil
---@field url string
---@field vehicles table

---@class RecallLoadMatch
---@field campaign string
---@field source string

---@class RecallListMatch
---@field component? string
---@field country? string
---@field cursor? string
---@field limit? number
---@field make? string
---@field model? string
---@field q? string
---@field year? number

---@class RecallInvestigation
---@field action string
---@field campaigns table
---@field closed? string|nil
---@field component? string|nil
---@field kind string
---@field kind_name? string|nil
---@field manufacturer? string|nil
---@field match? string|nil
---@field models table
---@field open boolean
---@field opened? string|nil
---@field subject? string|nil
---@field summary? string|nil

---@class RecallInvestigationListMatch
---@field campaign string
---@field recall_id string

---@class Recent
---@field recall table
---@field vehicles table
---@field vehicles_listed number

---@class RecentListMatch
---@field country? string
---@field cursor? string
---@field limit? number
---@field make? string
---@field since? string

---@class Submodel
---@field id string
---@field kind string
---@field name string

---@class SubmodelListMatch
---@field make string
---@field model string
---@field term? string
---@field year number

---@class Vehicle

---@class VehicleListMatch
---@field scope? string
---@field term? string

---@class VehicleBulletin
---@field component? string|nil
---@field date? string|nil
---@field date_added string
---@field document? any
---@field document_id? string|nil
---@field id? string
---@field mfr_campaign? string|nil
---@field nhtsa_id number
---@field summary? string|nil
---@field type string
---@field type_name string
---@field url string

---@class VehicleBulletinListMatch
---@field id string
---@field code? string
---@field component? string
---@field cursor? string
---@field limit? number
---@field q? string
---@field topic? string
---@field type? string

---@class VehicleCode
---@field attribution table
---@field bulletins? any
---@field code string
---@field description? string
---@field generic boolean
---@field id? string
---@field note string
---@field related table
---@field url string
---@field vehicle table

---@class VehicleCodeLoadMatch
---@field id string
---@field vehicle_id string

---@class VehicleComplaint
---@field complaints number
---@field crashes number
---@field fires number
---@field id string
---@field injuries number
---@field median_km? number|nil
---@field median_miles? number|nil
---@field name string
---@field parent? string|nil

---@class VehicleComplaintListMatch
---@field id string

---@class VehicleFluid
---@field as_of? string|nil
---@field attribution table
---@field brake table
---@field checked_as_of? string|nil
---@field coolant table
---@field engine_oil table
---@field engine_oil_checked table
---@field id? string
---@field refrigerant table
---@field transmission table
---@field vehicle table

---@class VehicleFluidListMatch
---@field id string

---@class VehicleFuel
---@field co2_g_km? number|nil
---@field confidence string
---@field country string
---@field cylinders? number|nil
---@field described_as string
---@field displacement_l? number|nil
---@field drive? string|nil
---@field engine? any
---@field fuel_grade string
---@field id? string
---@field kwh_100km? number|nil
---@field l_100km? any
---@field match string
---@field mpg? any
---@field range_km? number|nil
---@field range_mi? number|nil
---@field second_fuel? string|nil
---@field source string
---@field source_id? string|nil
---@field transmission? string|nil

---@class VehicleFuelListMatch
---@field id string
---@field country? string

---@class VehicleInvestigation
---@field action string
---@field campaigns table
---@field closed? string|nil
---@field component? string|nil
---@field id? string
---@field kind string
---@field kind_name? string|nil
---@field manufacturer? string|nil
---@field match? string|nil
---@field models table
---@field open boolean
---@field opened? string|nil
---@field subject? string|nil
---@field summary? string|nil

---@class VehicleInvestigationListMatch
---@field id string
---@field status? string

---@class VehicleLabor
---@field as_of? string|nil
---@field attribution table
---@field basis string
---@field class? any
---@field class_name? string|nil
---@field engine? string|nil
---@field estimates table
---@field hours table
---@field id? string
---@field job string
---@field name string
---@field note string
---@field notes? string|nil
---@field sample? any
---@field scope string
---@field updated string
---@field url string
---@field vehicle table
---@field years? any

---@class VehicleLaborLoadMatch
---@field id string
---@field vehicle_id string

---@class VehicleLaborListMatch
---@field id string

---@class VehicleRecall
---@field built_from? string|nil
---@field built_to? string|nil
---@field campaign string
---@field component? string|nil
---@field country string
---@field date? string|nil
---@field do_not_drive? boolean|nil
---@field id? string
---@field manufacturer? string|nil
---@field match? string|nil
---@field mfr_campaign? string|nil
---@field models table
---@field notification? string|nil
---@field park_outside? boolean|nil
---@field source string
---@field summary? string|nil
---@field units? number|nil
---@field url string

---@class VehicleRecallListMatch
---@field id string
---@field country? string

---@class VehicleSafety
---@field body_style? string|nil
---@field curb_weight_kg? number|nil
---@field curb_weight_lb? number|nil
---@field description string
---@field drive? string|nil
---@field features table
---@field id? string
---@field match string
---@field model string
---@field notes table
---@field release number
---@field rollover_risk_percent? number|nil
---@field rollover_tip? boolean|nil
---@field stars table
---@field vehicle_type? string|nil

---@class VehicleSafetyListMatch
---@field id string

---@class VehicleSpec
---@field battery_type? string|nil
---@field battery_voltage? number|nil
---@field confidence string
---@field cylinder_deactivation? boolean|nil
---@field cylinder_deactivation_name? string|nil
---@field described_as string
---@field drive? string|nil
---@field electrification? string|nil
---@field emission_standards table
---@field engine? any
---@field ev_motor? string|nil
---@field exhaust_valves? number|nil
---@field fuel_grade string
---@field fuel_usage? string|nil
---@field gears? number|nil
---@field id? string
---@field intake_valves? number|nil
---@field luggage_volume_ft3? number|nil
---@field luggage_volume_l? number|nil
---@field motor_kw? string|nil
---@field passenger_volume_ft3? number|nil
---@field passenger_volume_l? number|nil
---@field size_class string
---@field source string
---@field source_id string
---@field start_stop? boolean|nil
---@field supercharger boolean
---@field transmission? string|nil
---@field transmission_type? string|nil
---@field turbo boolean
---@field variable_valve_lift? boolean|nil
---@field variable_valve_timing? boolean|nil

---@class VehicleSpecListMatch
---@field id string

---@class VehicleTire
---@field bolt_pattern? string|nil
---@field checked string
---@field id? string
---@field lug_torque_lbft? number|nil
---@field lug_torque_nm? number|nil
---@field lug_torque_written_in? string|nil
---@field market? string|nil
---@field pressure_kpa? any
---@field pressure_psi? any
---@field pressure_written_in? string|nil
---@field size string
---@field size_rear? string|nil
---@field source string
---@field trims table

---@class VehicleTireListMatch
---@field id string

---@class Vin
---@field base_price_usd? number|nil
---@field body? string|nil
---@field catalog? any
---@field check_digit table
---@field doors? number|nil
---@field drivetrain? string|nil
---@field engine? any
---@field gvwr? string|nil
---@field id? string
---@field make? string|nil
---@field manufacturer table
---@field model? string|nil
---@field plant table
---@field recalls? any
---@field safety? any
---@field seat_rows? number|nil
---@field seats? number|nil
---@field series? string|nil
---@field transmission? string|nil
---@field transmission_speeds? number|nil
---@field trim? string|nil
---@field valid boolean
---@field vin string
---@field warnings table
---@field wheel_size_front? number|nil
---@field wheel_size_rear? number|nil
---@field year? number|nil

---@class VinLoadMatch
---@field id string
---@field year? number

---@class VinBulletin
---@field as_of? string|nil
---@field attribution table
---@field bulletins table
---@field counts table
---@field decode table
---@field id? string
---@field next_cursor? string|nil
---@field note string
---@field vehicle? any
---@field warnings table

---@class VinBulletinListMatch
---@field id string
---@field code? string
---@field component? string
---@field cursor? string
---@field limit? number
---@field q? string
---@field topic? string
---@field type? string
---@field year? number

---@class VinFluid
---@field as_of? string|nil
---@field attribution table
---@field brake table
---@field checked_as_of? string|nil
---@field coolant table
---@field decode table
---@field engine? any
---@field engine_oil table
---@field engine_oil_checked table
---@field engine_settled boolean
---@field id? string
---@field refrigerant table
---@field transmission table
---@field vehicle? any
---@field warnings table

---@class VinFluidListMatch
---@field id string
---@field year? number

---@class VinFuel
---@field as_of table
---@field attribution table
---@field decode table
---@field engine? any
---@field engine_settled boolean
---@field id? string
---@field ratings table
---@field vehicle? any
---@field warnings table

---@class VinFuelListMatch
---@field id string
---@field country? string
---@field year? number

---@class VinLabor
---@field as_of? string|nil
---@field attribution table
---@field class? any
---@field decode table
---@field engine? string|nil
---@field estimates table
---@field id? string
---@field note string
---@field vehicle? any
---@field warnings table

---@class VinLaborLoadMatch
---@field id string
---@field vin_id string
---@field year? number

---@class VinLaborListMatch
---@field id string
---@field year? number

---@class VinRecall
---@field as_of table
---@field attribution table
---@field decode table
---@field id? string
---@field lookup table
---@field may_apply boolean
---@field recalls table
---@field vehicle? any
---@field warnings table

---@class VinRecallListMatch
---@field id string
---@field country? string
---@field year? number

---@class VinSpec
---@field as_of? string|nil
---@field attribution table
---@field decode table
---@field engine? any
---@field engine_settled boolean
---@field id? string
---@field specs table
---@field vehicle? any
---@field warnings table

---@class VinSpecListMatch
---@field id string
---@field year? number

---@class VinTire
---@field as_of? string|nil
---@field attribution table
---@field decode table
---@field fitments table
---@field id? string
---@field vehicle? any
---@field warnings table

---@class VinTireListMatch
---@field id string
---@field year? number

local M = {}

return M
