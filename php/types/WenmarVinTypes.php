<?php
declare(strict_types=1);

// Typed models for the WenmarVin SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Batch entity data model. */
class Batch
{
    public array $vins;
}

/** Request payload for Batch#create. */
class BatchCreateData
{
    public ?string $include = null;
    public array $vins;
}

/** Bulletin entity data model. */
class Bulletin
{
    public mixed $as_of = null;
    public array $attribution;
    public array $codes;
    public mixed $component = null;
    public array $components;
    public mixed $date = null;
    public string $date_added;
    public mixed $document = null;
    public mixed $document_id = null;
    public ?string $id = null;
    public mixed $mfr_campaign = null;
    public mixed $mfr_system = null;
    public int $nhtsa_id;
    public string $note;
    public mixed $replaces = null;
    public mixed $summary = null;
    public array $topics;
    public string $type;
    public string $type_name;
    public string $url;
    public array $vehicles;
}

/** Request payload for Bulletin#load. */
class BulletinLoadMatch
{
    public string $id;
}

/** Request payload for Bulletin#list. */
class BulletinListMatch
{
    public ?string $code = null;
    public ?string $component = null;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $make = null;
    public ?string $model = null;
    public ?string $q = null;
    public ?string $topic = null;
    public ?string $type = null;
    public ?int $year = null;
}

/** Code entity data model. */
class Code
{
    public array $attribution;
    public string $checked;
    public array $checks;
    public string $code;
    public array $common_causes;
    public array $components;
    public bool $generic;
    public ?string $id = null;
    public string $meaning;
    public string $note;
    public array $related;
    public string $reviewer;
    public string $system;
    public string $system_name;
    public string $title;
    public string $url;
}

/** Request payload for Code#load. */
class CodeLoadMatch
{
    public string $id;
}

/** Request payload for Code#list. */
class CodeListMatch
{
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $q = null;
    public ?string $system = null;
}

/** Data entity data model. */
class Data
{
    public string $built_at;
    public string $data_version;
    public array $datasets;
    public string $server_version;
    public string $vpic_release;
}

/** Request payload for Data#load. */
class DataLoadMatch
{
    public ?string $built_at = null;
    public ?string $data_version = null;
    public ?array $datasets = null;
    public ?string $server_version = null;
    public ?string $vpic_release = null;
}

/** Engine entity data model. */
class Engine
{
    public string $id;
    public string $label;
    public bool $preset;
    public mixed $vin8 = null;
}

/** Request payload for Engine#list. */
class EngineListMatch
{
    public string $make;
    public string $model;
    public ?string $submodel = null;
    public ?string $term = null;
    public int $year;
}

/** Entry entity data model. */
class Entry
{
    public mixed $body = null;
    public mixed $drive = null;
    public mixed $engine = null;
    public string $id;
    public string $make;
    public string $model;
    public mixed $submodel = null;
    public string $summary;
    public mixed $transmission = null;
    public array $vehicle_types;
    public int $year;
}

/** Request payload for Entry#load. */
class EntryLoadMatch
{
    public string $id;
}

/** Request payload for Entry#list. */
class EntryListMatch
{
    public ?int $limit = null;
    public string $q;
    public ?string $scope = null;
}

/** Job entity data model. */
class Job
{
    public array $attribution;
    public array $components;
    public mixed $estimates = null;
    public array $excludes;
    public string $id;
    public array $includes;
    public string $name;
    public string $note;
    public array $related;
    public string $system;
    public string $system_name;
    public string $url;
}

/** Request payload for Job#load. */
class JobLoadMatch
{
    public string $id;
}

/** Request payload for Job#list. */
class JobListMatch
{
    public ?array $attribution = null;
    public ?array $components = null;
    public mixed $estimates = null;
    public ?array $excludes = null;
    public ?string $id = null;
    public ?array $includes = null;
    public ?string $name = null;
    public ?string $note = null;
    public ?array $related = null;
    public ?string $system = null;
    public ?string $system_name = null;
    public ?string $url = null;
}

/** Make entity data model. */
class Make
{
    public string $id;
    public mixed $links = null;
    public string $name;
    public bool $popular;
}

/** Request payload for Make#load. */
class MakeLoadMatch
{
    public string $id;
}

/** Request payload for Make#list. */
class MakeListMatch
{
    public ?int $limit = null;
    public ?string $scope = null;
    public ?string $term = null;
    public ?int $year = null;
}

/** Model entity data model. */
class Model
{
    public array $as_of;
    public array $attribution;
    public string $id;
    public array $lookup;
    public array $make;
    public bool $may_apply;
    public array $model;
    public string $name;
    public int $year_from;
    public int $year_to;
    public array $years;
}

/** Request payload for Model#load. */
class ModelLoadMatch
{
    public string $make;
    public string $model;
}

/** Request payload for Model#list. */
class ModelListMatch
{
    public ?int $limit = null;
    public string $make;
    public ?string $scope = null;
    public ?string $term = null;
    public ?int $year = null;
}

/** Overview entity data model. */
class Overview
{
    public string $code;
    public string $message;
    public ?array $suggestions = null;
}

/** Request payload for Overview#list. */
class OverviewListMatch
{
    public string $vehicle_id;
}

/** PartsCard entity data model. */
class PartsCard
{
    public array $attribution;
    public bool $engine_settled;
    public array $lines;
    public string $text;
    public mixed $vehicle = null;
    public string $vin;
    public array $warnings;
}

/** Request payload for PartsCard#list. */
class PartsCardListMatch
{
    public string $vin_id;
    public ?int $year = null;
}

/** PayrollDeduction entity data model. */
class PayrollDeduction
{
    public string $meaning;
    public string $name;
    public float $value;
}

/** Request payload for PayrollDeduction#list. */
class PayrollDeductionListMatch
{
    public ?string $federal_claim = null;
    public ?string $frequency = null;
    public ?string $gross = null;
    public ?string $pay_date = null;
    public ?string $province = null;
    public ?string $provincial_claim = null;
    public ?string $ytd_cpp = null;
    public ?string $ytd_cpp2 = null;
    public ?string $ytd_ei = null;
    public ?string $ytd_pensionable = null;
}

/** Recall entity data model. */
class Recall
{
    public mixed $as_of = null;
    public array $attribution;
    public mixed $built_from = null;
    public mixed $built_to = null;
    public string $campaign;
    public mixed $completion = null;
    public mixed $component = null;
    public mixed $consequence = null;
    public string $country;
    public mixed $date = null;
    public mixed $do_not_drive = null;
    public mixed $french = null;
    public ?string $id = null;
    public array $lookup;
    public mixed $manufacturer = null;
    public mixed $match = null;
    public bool $may_apply;
    public mixed $mfr_campaign = null;
    public array $models;
    public mixed $notes = null;
    public mixed $notification = null;
    public mixed $owner_notified = null;
    public mixed $park_outside = null;
    public mixed $part_number = null;
    public mixed $remedy = null;
    public string $source;
    public mixed $summary = null;
    public mixed $units = null;
    public string $url;
    public array $vehicles;
}

/** Request payload for Recall#load. */
class RecallLoadMatch
{
    public string $campaign;
    public string $source;
}

/** Request payload for Recall#list. */
class RecallListMatch
{
    public ?string $component = null;
    public ?string $country = null;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $make = null;
    public ?string $model = null;
    public ?string $q = null;
    public ?int $year = null;
}

/** RecallInvestigation entity data model. */
class RecallInvestigation
{
    public string $action;
    public array $campaigns;
    public mixed $closed = null;
    public mixed $component = null;
    public string $kind;
    public mixed $kind_name = null;
    public mixed $manufacturer = null;
    public mixed $match = null;
    public array $models;
    public bool $open;
    public mixed $opened = null;
    public mixed $subject = null;
    public mixed $summary = null;
}

/** Request payload for RecallInvestigation#list. */
class RecallInvestigationListMatch
{
    public string $campaign;
    public string $recall_id;
}

/** Recent entity data model. */
class Recent
{
    public array $recall;
    public array $vehicles;
    public int $vehicles_listed;
}

/** Request payload for Recent#list. */
class RecentListMatch
{
    public ?string $country = null;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $make = null;
    public ?string $since = null;
}

/** Submodel entity data model. */
class Submodel
{
    public string $id;
    public string $kind;
    public string $name;
}

/** Request payload for Submodel#list. */
class SubmodelListMatch
{
    public string $make;
    public string $model;
    public ?string $term = null;
    public int $year;
}

/** Vehicle entity data model. */
class Vehicle
{
}

/** Request payload for Vehicle#list. */
class VehicleListMatch
{
    public ?string $scope = null;
    public ?string $term = null;
}

/** VehicleBulletin entity data model. */
class VehicleBulletin
{
    public mixed $component = null;
    public mixed $date = null;
    public string $date_added;
    public mixed $document = null;
    public mixed $document_id = null;
    public ?string $id = null;
    public mixed $mfr_campaign = null;
    public int $nhtsa_id;
    public mixed $summary = null;
    public string $type;
    public string $type_name;
    public string $url;
}

/** Request payload for VehicleBulletin#list. */
class VehicleBulletinListMatch
{
    public string $id;
    public ?string $code = null;
    public ?string $component = null;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $q = null;
    public ?string $topic = null;
    public ?string $type = null;
}

/** VehicleCode entity data model. */
class VehicleCode
{
    public array $attribution;
    public mixed $bulletins = null;
    public string $code;
    public ?string $description = null;
    public bool $generic;
    public ?string $id = null;
    public string $note;
    public array $related;
    public string $url;
    public array $vehicle;
}

/** Request payload for VehicleCode#load. */
class VehicleCodeLoadMatch
{
    public string $id;
    public string $vehicle_id;
}

/** VehicleComplaint entity data model. */
class VehicleComplaint
{
    public int $complaints;
    public int $crashes;
    public int $fires;
    public string $id;
    public int $injuries;
    public mixed $median_km = null;
    public mixed $median_miles = null;
    public string $name;
    public mixed $parent = null;
}

/** Request payload for VehicleComplaint#list. */
class VehicleComplaintListMatch
{
    public string $id;
}

/** VehicleFluid entity data model. */
class VehicleFluid
{
    public mixed $as_of = null;
    public array $attribution;
    public array $brake;
    public mixed $checked_as_of = null;
    public array $coolant;
    public array $engine_oil;
    public array $engine_oil_checked;
    public ?string $id = null;
    public array $refrigerant;
    public array $transmission;
    public array $vehicle;
}

/** Request payload for VehicleFluid#list. */
class VehicleFluidListMatch
{
    public string $id;
}

/** VehicleFuel entity data model. */
class VehicleFuel
{
    public mixed $co2_g_km = null;
    public string $confidence;
    public string $country;
    public mixed $cylinders = null;
    public string $described_as;
    public mixed $displacement_l = null;
    public mixed $drive = null;
    public mixed $engine = null;
    public string $fuel_grade;
    public ?string $id = null;
    public mixed $kwh_100km = null;
    public mixed $l_100km = null;
    public string $match;
    public mixed $mpg = null;
    public mixed $range_km = null;
    public mixed $range_mi = null;
    public mixed $second_fuel = null;
    public string $source;
    public mixed $source_id = null;
    public mixed $transmission = null;
}

/** Request payload for VehicleFuel#list. */
class VehicleFuelListMatch
{
    public string $id;
    public ?string $country = null;
}

/** VehicleInvestigation entity data model. */
class VehicleInvestigation
{
    public string $action;
    public array $campaigns;
    public mixed $closed = null;
    public mixed $component = null;
    public ?string $id = null;
    public string $kind;
    public mixed $kind_name = null;
    public mixed $manufacturer = null;
    public mixed $match = null;
    public array $models;
    public bool $open;
    public mixed $opened = null;
    public mixed $subject = null;
    public mixed $summary = null;
}

/** Request payload for VehicleInvestigation#list. */
class VehicleInvestigationListMatch
{
    public string $id;
    public ?string $status = null;
}

/** VehicleLabor entity data model. */
class VehicleLabor
{
    public mixed $as_of = null;
    public array $attribution;
    public string $basis;
    public mixed $class = null;
    public mixed $class_name = null;
    public mixed $engine = null;
    public array $estimates;
    public array $hours;
    public ?string $id = null;
    public string $job;
    public string $name;
    public string $note;
    public mixed $notes = null;
    public mixed $sample = null;
    public string $scope;
    public string $updated;
    public string $url;
    public array $vehicle;
    public mixed $years = null;
}

/** Request payload for VehicleLabor#load. */
class VehicleLaborLoadMatch
{
    public string $id;
    public string $vehicle_id;
}

/** Request payload for VehicleLabor#list. */
class VehicleLaborListMatch
{
    public string $id;
}

/** VehicleRecall entity data model. */
class VehicleRecall
{
    public mixed $built_from = null;
    public mixed $built_to = null;
    public string $campaign;
    public mixed $component = null;
    public string $country;
    public mixed $date = null;
    public mixed $do_not_drive = null;
    public ?string $id = null;
    public mixed $manufacturer = null;
    public mixed $match = null;
    public mixed $mfr_campaign = null;
    public array $models;
    public mixed $notification = null;
    public mixed $park_outside = null;
    public string $source;
    public mixed $summary = null;
    public mixed $units = null;
    public string $url;
}

/** Request payload for VehicleRecall#list. */
class VehicleRecallListMatch
{
    public string $id;
    public ?string $country = null;
}

/** VehicleSafety entity data model. */
class VehicleSafety
{
    public mixed $body_style = null;
    public mixed $curb_weight_kg = null;
    public mixed $curb_weight_lb = null;
    public string $description;
    public mixed $drive = null;
    public array $features;
    public ?string $id = null;
    public string $match;
    public string $model;
    public array $notes;
    public int $release;
    public mixed $rollover_risk_percent = null;
    public mixed $rollover_tip = null;
    public array $stars;
    public mixed $vehicle_type = null;
}

/** Request payload for VehicleSafety#list. */
class VehicleSafetyListMatch
{
    public string $id;
}

/** VehicleSpec entity data model. */
class VehicleSpec
{
    public mixed $battery_type = null;
    public mixed $battery_voltage = null;
    public string $confidence;
    public mixed $cylinder_deactivation = null;
    public mixed $cylinder_deactivation_name = null;
    public string $described_as;
    public mixed $drive = null;
    public mixed $electrification = null;
    public array $emission_standards;
    public mixed $engine = null;
    public mixed $ev_motor = null;
    public mixed $exhaust_valves = null;
    public string $fuel_grade;
    public mixed $fuel_usage = null;
    public mixed $gears = null;
    public ?string $id = null;
    public mixed $intake_valves = null;
    public mixed $luggage_volume_ft3 = null;
    public mixed $luggage_volume_l = null;
    public mixed $motor_kw = null;
    public mixed $passenger_volume_ft3 = null;
    public mixed $passenger_volume_l = null;
    public string $size_class;
    public string $source;
    public string $source_id;
    public mixed $start_stop = null;
    public bool $supercharger;
    public mixed $transmission = null;
    public mixed $transmission_type = null;
    public bool $turbo;
    public mixed $variable_valve_lift = null;
    public mixed $variable_valve_timing = null;
}

/** Request payload for VehicleSpec#list. */
class VehicleSpecListMatch
{
    public string $id;
}

/** VehicleTire entity data model. */
class VehicleTire
{
    public mixed $bolt_pattern = null;
    public string $checked;
    public ?string $id = null;
    public mixed $lug_torque_lbft = null;
    public mixed $lug_torque_nm = null;
    public mixed $lug_torque_written_in = null;
    public mixed $market = null;
    public mixed $pressure_kpa = null;
    public mixed $pressure_psi = null;
    public mixed $pressure_written_in = null;
    public string $size;
    public mixed $size_rear = null;
    public string $source;
    public array $trims;
}

/** Request payload for VehicleTire#list. */
class VehicleTireListMatch
{
    public string $id;
}

/** Vin entity data model. */
class Vin
{
    public mixed $base_price_usd = null;
    public mixed $body = null;
    public mixed $catalog = null;
    public array $check_digit;
    public mixed $doors = null;
    public mixed $drivetrain = null;
    public mixed $engine = null;
    public mixed $gvwr = null;
    public ?string $id = null;
    public mixed $make = null;
    public array $manufacturer;
    public mixed $model = null;
    public array $plant;
    public mixed $recalls = null;
    public mixed $safety = null;
    public mixed $seat_rows = null;
    public mixed $seats = null;
    public mixed $series = null;
    public mixed $transmission = null;
    public mixed $transmission_speeds = null;
    public mixed $trim = null;
    public bool $valid;
    public string $vin;
    public array $warnings;
    public mixed $wheel_size_front = null;
    public mixed $wheel_size_rear = null;
    public mixed $year = null;
}

/** Request payload for Vin#load. */
class VinLoadMatch
{
    public string $id;
    public ?int $year = null;
}

/** VinBulletin entity data model. */
class VinBulletin
{
    public mixed $as_of = null;
    public array $attribution;
    public array $bulletins;
    public array $counts;
    public array $decode;
    public ?string $id = null;
    public mixed $next_cursor = null;
    public string $note;
    public mixed $vehicle = null;
    public array $warnings;
}

/** Request payload for VinBulletin#list. */
class VinBulletinListMatch
{
    public string $id;
    public ?string $code = null;
    public ?string $component = null;
    public ?string $cursor = null;
    public ?int $limit = null;
    public ?string $q = null;
    public ?string $topic = null;
    public ?string $type = null;
    public ?int $year = null;
}

/** VinFluid entity data model. */
class VinFluid
{
    public mixed $as_of = null;
    public array $attribution;
    public array $brake;
    public mixed $checked_as_of = null;
    public array $coolant;
    public array $decode;
    public mixed $engine = null;
    public array $engine_oil;
    public array $engine_oil_checked;
    public bool $engine_settled;
    public ?string $id = null;
    public array $refrigerant;
    public array $transmission;
    public mixed $vehicle = null;
    public array $warnings;
}

/** Request payload for VinFluid#list. */
class VinFluidListMatch
{
    public string $id;
    public ?int $year = null;
}

/** VinFuel entity data model. */
class VinFuel
{
    public array $as_of;
    public array $attribution;
    public array $decode;
    public mixed $engine = null;
    public bool $engine_settled;
    public ?string $id = null;
    public array $ratings;
    public mixed $vehicle = null;
    public array $warnings;
}

/** Request payload for VinFuel#list. */
class VinFuelListMatch
{
    public string $id;
    public ?string $country = null;
    public ?int $year = null;
}

/** VinLabor entity data model. */
class VinLabor
{
    public mixed $as_of = null;
    public array $attribution;
    public mixed $class = null;
    public array $decode;
    public mixed $engine = null;
    public array $estimates;
    public ?string $id = null;
    public string $note;
    public mixed $vehicle = null;
    public array $warnings;
}

/** Request payload for VinLabor#load. */
class VinLaborLoadMatch
{
    public string $id;
    public string $vin_id;
    public ?int $year = null;
}

/** Request payload for VinLabor#list. */
class VinLaborListMatch
{
    public string $id;
    public ?int $year = null;
}

/** VinRecall entity data model. */
class VinRecall
{
    public array $as_of;
    public array $attribution;
    public array $decode;
    public ?string $id = null;
    public array $lookup;
    public bool $may_apply;
    public array $recalls;
    public mixed $vehicle = null;
    public array $warnings;
}

/** Request payload for VinRecall#list. */
class VinRecallListMatch
{
    public string $id;
    public ?string $country = null;
    public ?int $year = null;
}

/** VinSpec entity data model. */
class VinSpec
{
    public mixed $as_of = null;
    public array $attribution;
    public array $decode;
    public mixed $engine = null;
    public bool $engine_settled;
    public ?string $id = null;
    public array $specs;
    public mixed $vehicle = null;
    public array $warnings;
}

/** Request payload for VinSpec#list. */
class VinSpecListMatch
{
    public string $id;
    public ?int $year = null;
}

/** VinTire entity data model. */
class VinTire
{
    public mixed $as_of = null;
    public array $attribution;
    public array $decode;
    public array $fitments;
    public ?string $id = null;
    public mixed $vehicle = null;
    public array $warnings;
}

/** Request payload for VinTire#list. */
class VinTireListMatch
{
    public string $id;
    public ?int $year = null;
}

