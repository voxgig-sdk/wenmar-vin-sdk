// Typed models for the WenmarVin SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Batch {
  vins: any[]
}

export interface BatchCreateData {
  include?: string
  vins: any[]
}

export interface Bulletin {
  as_of?: string | null
  attribution: any[]
  codes: any[]
  component?: string | null
  components: any[]
  date?: string | null
  date_added: string
  document?: any
  document_id?: string | null
  id?: string
  mfr_campaign?: string | null
  mfr_system?: string | null
  nhtsa_id: number
  note: string
  replaces?: string | null
  summary?: string | null
  topics: any[]
  type: string
  type_name: string
  url: string
  vehicles: any[]
}

export interface BulletinLoadMatch {
  id: string
}

export interface BulletinListMatch {
  code?: string
  component?: string
  cursor?: string
  limit?: number
  make?: string
  model?: string
  q?: string
  topic?: string
  type?: string
  year?: number
}

export interface Code {
  attribution: any[]
  checked: string
  checks: any[]
  code: string
  common_causes: any[]
  components: any[]
  generic: boolean
  id?: string
  meaning: string
  note: string
  related: any[]
  reviewer: string
  system: string
  system_name: string
  title: string
  url: string
}

export interface CodeLoadMatch {
  id: string
}

export interface CodeListMatch {
  cursor?: string
  limit?: number
  q?: string
  system?: string
}

export interface Data {
  built_at: string
  data_version: string
  datasets: Record<string, any>
  server_version: string
  vpic_release: string
}

export interface DataLoadMatch {
  built_at?: string
  data_version?: string
  datasets?: Record<string, any>
  server_version?: string
  vpic_release?: string
}

export interface Engine {
  id: string
  label: string
  preset: boolean
  vin8?: string | null
}

export interface EngineListMatch {
  make: string
  model: string
  submodel?: string
  term?: string
  year: number
}

export interface Entry {
  body?: string | null
  drive?: string | null
  engine?: string | null
  id: string
  make: string
  model: string
  submodel?: string | null
  summary: string
  transmission?: string | null
  vehicle_types: any[]
  year: number
}

export interface EntryLoadMatch {
  id: string
}

export interface EntryListMatch {
  limit?: number
  q: string
  scope?: string
}

export interface Job {
  attribution: any[]
  components: any[]
  estimates?: any[] | null
  excludes: any[]
  id: string
  includes: any[]
  name: string
  note: string
  related: any[]
  system: string
  system_name: string
  url: string
}

export interface JobLoadMatch {
  id: string
}

export interface JobListMatch {
  attribution?: any[]
  components?: any[]
  estimates?: any[] | null
  excludes?: any[]
  id?: string
  includes?: any[]
  name?: string
  note?: string
  related?: any[]
  system?: string
  system_name?: string
  url?: string
}

export interface Make {
  id: string
  links?: any
  name: string
  popular: boolean
}

export interface MakeLoadMatch {
  id: string
}

export interface MakeListMatch {
  limit?: number
  scope?: string
  term?: string
  year?: number
}

export interface Model {
  as_of: Record<string, any>
  attribution: any[]
  id: string
  lookup: Record<string, any>
  make: Record<string, any>
  may_apply: boolean
  model: Record<string, any>
  name: string
  year_from: number
  year_to: number
  years: any[]
}

export interface ModelLoadMatch {
  make: string
  model: string
}

export interface ModelListMatch {
  limit?: number
  make: string
  scope?: string
  term?: string
  year?: number
}

export interface Overview {
  code: string
  message: string
  suggestions?: any[]
}

export interface OverviewListMatch {
  vehicle_id: string
}

export interface PartsCard {
  attribution: any[]
  engine_settled: boolean
  lines: any[]
  text: string
  vehicle?: any
  vin: string
  warnings: any[]
}

export interface PartsCardListMatch {
  vin_id: string
  year?: number
}

export interface PayrollDeduction {
  meaning: string
  name: string
  value: number
}

export interface PayrollDeductionListMatch {
  federal_claim?: string
  frequency?: string
  gross?: string
  pay_date?: string
  province?: string
  provincial_claim?: string
  ytd_cpp?: string
  ytd_cpp2?: string
  ytd_ei?: string
  ytd_pensionable?: string
}

export interface Recall {
  as_of?: string | null
  attribution: any[]
  built_from?: string | null
  built_to?: string | null
  campaign: string
  completion?: any
  component?: string | null
  consequence?: string | null
  country: string
  date?: string | null
  do_not_drive?: boolean | null
  french?: any
  id?: string
  lookup: Record<string, any>
  manufacturer?: string | null
  match?: string | null
  may_apply: boolean
  mfr_campaign?: string | null
  models: any[]
  notes?: string | null
  notification?: string | null
  owner_notified?: string | null
  park_outside?: boolean | null
  part_number?: string | null
  remedy?: string | null
  source: string
  summary?: string | null
  units?: number | null
  url: string
  vehicles: any[]
}

export interface RecallLoadMatch {
  campaign: string
  source: string
}

export interface RecallListMatch {
  component?: string
  country?: string
  cursor?: string
  limit?: number
  make?: string
  model?: string
  q?: string
  year?: number
}

export interface RecallInvestigation {
  action: string
  campaigns: any[]
  closed?: string | null
  component?: string | null
  kind: string
  kind_name?: string | null
  manufacturer?: string | null
  match?: string | null
  models: any[]
  open: boolean
  opened?: string | null
  subject?: string | null
  summary?: string | null
}

export interface RecallInvestigationListMatch {
  campaign: string
  recall_id: string
}

export interface Recent {
  recall: Record<string, any>
  vehicles: any[]
  vehicles_listed: number
}

export interface RecentListMatch {
  country?: string
  cursor?: string
  limit?: number
  make?: string
  since?: string
}

export interface Submodel {
  id: string
  kind: string
  name: string
}

export interface SubmodelListMatch {
  make: string
  model: string
  term?: string
  year: number
}

export interface Vehicle {
}

export interface VehicleListMatch {
  scope?: string
  term?: string

  // Selects a custom action instead of the plain list:
  //   'year'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VehicleBulletin {
  component?: string | null
  date?: string | null
  date_added: string
  document?: any
  document_id?: string | null
  id?: string
  mfr_campaign?: string | null
  nhtsa_id: number
  summary?: string | null
  type: string
  type_name: string
  url: string
}

export interface VehicleBulletinListMatch {
  id: string
  code?: string
  component?: string
  cursor?: string
  limit?: number
  q?: string
  topic?: string
  type?: string
}

export interface VehicleCode {
  attribution: any[]
  bulletins?: any
  code: string
  description?: string
  generic: boolean
  id?: string
  note: string
  related: Record<string, any>
  url: string
  vehicle: Record<string, any>
}

export interface VehicleCodeLoadMatch {
  id: string
  vehicle_id: string
}

export interface VehicleComplaint {
  complaints: number
  crashes: number
  fires: number
  id: string
  injuries: number
  median_km?: number | null
  median_miles?: number | null
  name: string
  parent?: string | null
}

export interface VehicleComplaintListMatch {
  id: string
}

export interface VehicleFluid {
  as_of?: string | null
  attribution: any[]
  brake: any[]
  checked_as_of?: string | null
  coolant: any[]
  engine_oil: any[]
  engine_oil_checked: any[]
  id?: string
  refrigerant: any[]
  transmission: any[]
  vehicle: Record<string, any>
}

export interface VehicleFluidListMatch {
  id: string
}

export interface VehicleFuel {
  co2_g_km?: number | null
  confidence: string
  country: string
  cylinders?: number | null
  described_as: string
  displacement_l?: number | null
  drive?: string | null
  engine?: any
  fuel_grade: string
  id?: string
  kwh_100km?: number | null
  l_100km?: any
  match: string
  mpg?: any
  range_km?: number | null
  range_mi?: number | null
  second_fuel?: string | null
  source: string
  source_id?: string | null
  transmission?: string | null
}

export interface VehicleFuelListMatch {
  id: string
  country?: string
}

export interface VehicleInvestigation {
  action: string
  campaigns: any[]
  closed?: string | null
  component?: string | null
  id?: string
  kind: string
  kind_name?: string | null
  manufacturer?: string | null
  match?: string | null
  models: any[]
  open: boolean
  opened?: string | null
  subject?: string | null
  summary?: string | null
}

export interface VehicleInvestigationListMatch {
  id: string
  status?: string
}

export interface VehicleLabor {
  as_of?: string | null
  attribution: any[]
  basis: string
  class?: any
  class_name?: string | null
  engine?: string | null
  estimates: any[]
  hours: Record<string, any>
  id?: string
  job: string
  name: string
  note: string
  notes?: string | null
  sample?: any
  scope: string
  updated: string
  url: string
  vehicle: Record<string, any>
  years?: any
}

export interface VehicleLaborLoadMatch {
  id: string
  vehicle_id: string
}

export interface VehicleLaborListMatch {
  id: string
}

export interface VehicleRecall {
  built_from?: string | null
  built_to?: string | null
  campaign: string
  component?: string | null
  country: string
  date?: string | null
  do_not_drive?: boolean | null
  id?: string
  manufacturer?: string | null
  match?: string | null
  mfr_campaign?: string | null
  models: any[]
  notification?: string | null
  park_outside?: boolean | null
  source: string
  summary?: string | null
  units?: number | null
  url: string
}

export interface VehicleRecallListMatch {
  id: string
  country?: string
}

export interface VehicleSafety {
  body_style?: string | null
  curb_weight_kg?: number | null
  curb_weight_lb?: number | null
  description: string
  drive?: string | null
  features: Record<string, any>
  id?: string
  match: string
  model: string
  notes: any[]
  release: number
  rollover_risk_percent?: number | null
  rollover_tip?: boolean | null
  stars: Record<string, any>
  vehicle_type?: string | null
}

export interface VehicleSafetyListMatch {
  id: string
}

export interface VehicleSpec {
  battery_type?: string | null
  battery_voltage?: number | null
  confidence: string
  cylinder_deactivation?: boolean | null
  cylinder_deactivation_name?: string | null
  described_as: string
  drive?: string | null
  electrification?: string | null
  emission_standards: any[]
  engine?: any
  ev_motor?: string | null
  exhaust_valves?: number | null
  fuel_grade: string
  fuel_usage?: string | null
  gears?: number | null
  id?: string
  intake_valves?: number | null
  luggage_volume_ft3?: number | null
  luggage_volume_l?: number | null
  motor_kw?: string | null
  passenger_volume_ft3?: number | null
  passenger_volume_l?: number | null
  size_class: string
  source: string
  source_id: string
  start_stop?: boolean | null
  supercharger: boolean
  transmission?: string | null
  transmission_type?: string | null
  turbo: boolean
  variable_valve_lift?: boolean | null
  variable_valve_timing?: boolean | null
}

export interface VehicleSpecListMatch {
  id: string
}

export interface VehicleTire {
  bolt_pattern?: string | null
  checked: string
  id?: string
  lug_torque_lbft?: number | null
  lug_torque_nm?: number | null
  lug_torque_written_in?: string | null
  market?: string | null
  pressure_kpa?: any
  pressure_psi?: any
  pressure_written_in?: string | null
  size: string
  size_rear?: string | null
  source: string
  trims: any[]
}

export interface VehicleTireListMatch {
  id: string
}

export interface Vin {
  base_price_usd?: number | null
  body?: string | null
  catalog?: any
  check_digit: Record<string, any>
  doors?: number | null
  drivetrain?: string | null
  engine?: any
  gvwr?: string | null
  id?: string
  make?: string | null
  manufacturer: Record<string, any>
  model?: string | null
  plant: Record<string, any>
  recalls?: any
  safety?: any
  seat_rows?: number | null
  seats?: number | null
  series?: string | null
  transmission?: string | null
  transmission_speeds?: number | null
  trim?: string | null
  valid: boolean
  vin: string
  warnings: any[]
  wheel_size_front?: number | null
  wheel_size_rear?: number | null
  year?: number | null
}

export interface VinLoadMatch {
  id: string
  year?: number
}

export interface VinBulletin {
  as_of?: string | null
  attribution: any[]
  bulletins: any[]
  counts: Record<string, any>
  decode: Record<string, any>
  id?: string
  next_cursor?: string | null
  note: string
  vehicle?: any
  warnings: any[]
}

export interface VinBulletinListMatch {
  id: string
  code?: string
  component?: string
  cursor?: string
  limit?: number
  q?: string
  topic?: string
  type?: string
  year?: number
}

export interface VinFluid {
  as_of?: string | null
  attribution: any[]
  brake: any[]
  checked_as_of?: string | null
  coolant: any[]
  decode: Record<string, any>
  engine?: any
  engine_oil: any[]
  engine_oil_checked: any[]
  engine_settled: boolean
  id?: string
  refrigerant: any[]
  transmission: any[]
  vehicle?: any
  warnings: any[]
}

export interface VinFluidListMatch {
  id: string
  year?: number
}

export interface VinFuel {
  as_of: Record<string, any>
  attribution: any[]
  decode: Record<string, any>
  engine?: any
  engine_settled: boolean
  id?: string
  ratings: any[]
  vehicle?: any
  warnings: any[]
}

export interface VinFuelListMatch {
  id: string
  country?: string
  year?: number
}

export interface VinLabor {
  as_of?: string | null
  attribution: any[]
  class?: any
  decode: Record<string, any>
  engine?: string | null
  estimates: any[]
  id?: string
  note: string
  vehicle?: any
  warnings: any[]
}

export interface VinLaborLoadMatch {
  id: string
  vin_id: string
  year?: number
}

export interface VinLaborListMatch {
  id: string
  year?: number
}

export interface VinRecall {
  as_of: Record<string, any>
  attribution: any[]
  decode: Record<string, any>
  id?: string
  lookup: Record<string, any>
  may_apply: boolean
  recalls: any[]
  vehicle?: any
  warnings: any[]
}

export interface VinRecallListMatch {
  id: string
  country?: string
  year?: number
}

export interface VinSpec {
  as_of?: string | null
  attribution: any[]
  decode: Record<string, any>
  engine?: any
  engine_settled: boolean
  id?: string
  specs: any[]
  vehicle?: any
  warnings: any[]
}

export interface VinSpecListMatch {
  id: string
  year?: number
}

export interface VinTire {
  as_of?: string | null
  attribution: any[]
  decode: Record<string, any>
  fitments: any[]
  id?: string
  vehicle?: any
  warnings: any[]
}

export interface VinTireListMatch {
  id: string
  year?: number
}

