# Typed models for the WenmarVin SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Batch(TypedDict):
    vins: list


class BatchCreateDataRequired(TypedDict):
    vins: list


class BatchCreateData(BatchCreateDataRequired, total=False):
    include: str


class BulletinRequired(TypedDict):
    attribution: list
    codes: list
    components: list
    date_added: str
    nhtsa_id: int
    note: str
    topics: list
    type: str
    type_name: str
    url: str
    vehicles: list


class Bulletin(BulletinRequired, total=False):
    as_of: str | None
    component: str | None
    date: str | None
    document: Any
    document_id: str | None
    id: str
    mfr_campaign: str | None
    mfr_system: str | None
    replaces: str | None
    summary: str | None


class BulletinLoadMatch(TypedDict):
    id: str


class BulletinListMatch(TypedDict, total=False):
    code: str
    component: str
    cursor: str
    limit: int
    make: str
    model: str
    q: str
    topic: str
    type: str
    year: int


class CodeRequired(TypedDict):
    attribution: list
    checked: str
    checks: list
    code: str
    common_causes: list
    components: list
    generic: bool
    meaning: str
    note: str
    related: list
    reviewer: str
    system: str
    system_name: str
    title: str
    url: str


class Code(CodeRequired, total=False):
    id: str


class CodeLoadMatch(TypedDict):
    id: str


class CodeListMatch(TypedDict, total=False):
    cursor: str
    limit: int
    q: str
    system: str


class Data(TypedDict):
    built_at: str
    data_version: str
    datasets: dict
    server_version: str
    vpic_release: str


class DataLoadMatch(TypedDict, total=False):
    built_at: str
    data_version: str
    datasets: dict
    server_version: str
    vpic_release: str


class EngineRequired(TypedDict):
    id: str
    label: str
    preset: bool


class Engine(EngineRequired, total=False):
    vin8: str | None


class EngineListMatchRequired(TypedDict):
    make: str
    model: str
    year: int


class EngineListMatch(EngineListMatchRequired, total=False):
    submodel: str
    term: str


class EntryRequired(TypedDict):
    id: str
    make: str
    model: str
    summary: str
    vehicle_types: list
    year: int


class Entry(EntryRequired, total=False):
    body: str | None
    drive: str | None
    engine: str | None
    submodel: str | None
    transmission: str | None


class EntryLoadMatch(TypedDict):
    id: str


class EntryListMatchRequired(TypedDict):
    q: str


class EntryListMatch(EntryListMatchRequired, total=False):
    limit: int
    scope: str


class JobRequired(TypedDict):
    attribution: list
    components: list
    excludes: list
    id: str
    includes: list
    name: str
    note: str
    related: list
    system: str
    system_name: str
    url: str


class Job(JobRequired, total=False):
    estimates: list | None


class JobLoadMatch(TypedDict):
    id: str


class JobListMatch(TypedDict, total=False):
    attribution: list
    components: list
    estimates: list | None
    excludes: list
    id: str
    includes: list
    name: str
    note: str
    related: list
    system: str
    system_name: str
    url: str


class MakeRequired(TypedDict):
    id: str
    name: str
    popular: bool


class Make(MakeRequired, total=False):
    links: Any


class MakeLoadMatch(TypedDict):
    id: str


class MakeListMatch(TypedDict, total=False):
    limit: int
    scope: str
    term: str
    year: int


class Model(TypedDict):
    as_of: dict
    attribution: list
    id: str
    lookup: dict
    make: dict
    may_apply: bool
    model: dict
    name: str
    year_from: int
    year_to: int
    years: list


class ModelLoadMatch(TypedDict):
    make: str
    model: str


class ModelListMatchRequired(TypedDict):
    make: str


class ModelListMatch(ModelListMatchRequired, total=False):
    limit: int
    scope: str
    term: str
    year: int


class OverviewRequired(TypedDict):
    code: str
    message: str


class Overview(OverviewRequired, total=False):
    suggestions: list


class OverviewListMatch(TypedDict):
    vehicle_id: str


class PartsCardRequired(TypedDict):
    attribution: list
    engine_settled: bool
    lines: list
    text: str
    vin: str
    warnings: list


class PartsCard(PartsCardRequired, total=False):
    vehicle: Any


class PartsCardListMatchRequired(TypedDict):
    vin_id: str


class PartsCardListMatch(PartsCardListMatchRequired, total=False):
    year: int


class PayrollDeduction(TypedDict):
    meaning: str
    name: str
    value: float


class PayrollDeductionListMatch(TypedDict, total=False):
    federal_claim: str
    frequency: str
    gross: str
    pay_date: str
    province: str
    provincial_claim: str
    ytd_cpp: str
    ytd_cpp2: str
    ytd_ei: str
    ytd_pensionable: str


class RecallRequired(TypedDict):
    attribution: list
    campaign: str
    country: str
    lookup: dict
    may_apply: bool
    models: list
    source: str
    url: str
    vehicles: list


class Recall(RecallRequired, total=False):
    as_of: str | None
    built_from: str | None
    built_to: str | None
    completion: Any
    component: str | None
    consequence: str | None
    date: str | None
    do_not_drive: bool | None
    french: Any
    id: str
    manufacturer: str | None
    match: str | None
    mfr_campaign: str | None
    notes: str | None
    notification: str | None
    owner_notified: str | None
    park_outside: bool | None
    part_number: str | None
    remedy: str | None
    summary: str | None
    units: int | None


class RecallLoadMatch(TypedDict):
    campaign: str
    source: str


class RecallListMatch(TypedDict, total=False):
    component: str
    country: str
    cursor: str
    limit: int
    make: str
    model: str
    q: str
    year: int


class RecallInvestigationRequired(TypedDict):
    action: str
    campaigns: list
    kind: str
    models: list
    open: bool


class RecallInvestigation(RecallInvestigationRequired, total=False):
    closed: str | None
    component: str | None
    kind_name: str | None
    manufacturer: str | None
    match: str | None
    opened: str | None
    subject: str | None
    summary: str | None


class RecallInvestigationListMatch(TypedDict):
    campaign: str
    recall_id: str


class Recent(TypedDict):
    recall: dict
    vehicles: list
    vehicles_listed: int


class RecentListMatch(TypedDict, total=False):
    country: str
    cursor: str
    limit: int
    make: str
    since: str


class Submodel(TypedDict):
    id: str
    kind: str
    name: str


class SubmodelListMatchRequired(TypedDict):
    make: str
    model: str
    year: int


class SubmodelListMatch(SubmodelListMatchRequired, total=False):
    term: str


class Vehicle(TypedDict):
    pass


class VehicleListMatch(TypedDict, total=False):
    scope: str
    term: str


class VehicleBulletinRequired(TypedDict):
    date_added: str
    nhtsa_id: int
    type: str
    type_name: str
    url: str


class VehicleBulletin(VehicleBulletinRequired, total=False):
    component: str | None
    date: str | None
    document: Any
    document_id: str | None
    id: str
    mfr_campaign: str | None
    summary: str | None


class VehicleBulletinListMatchRequired(TypedDict):
    id: str


class VehicleBulletinListMatch(VehicleBulletinListMatchRequired, total=False):
    code: str
    component: str
    cursor: str
    limit: int
    q: str
    topic: str
    type: str


class VehicleCodeRequired(TypedDict):
    attribution: list
    code: str
    generic: bool
    note: str
    related: dict
    url: str
    vehicle: dict


class VehicleCode(VehicleCodeRequired, total=False):
    bulletins: Any
    description: str
    id: str


class VehicleCodeLoadMatch(TypedDict):
    id: str
    vehicle_id: str


class VehicleComplaintRequired(TypedDict):
    complaints: int
    crashes: int
    fires: int
    id: str
    injuries: int
    name: str


class VehicleComplaint(VehicleComplaintRequired, total=False):
    median_km: int | None
    median_miles: int | None
    parent: str | None


class VehicleComplaintListMatch(TypedDict):
    id: str


class VehicleFluidRequired(TypedDict):
    attribution: list
    brake: list
    coolant: list
    engine_oil: list
    engine_oil_checked: list
    refrigerant: list
    transmission: list
    vehicle: dict


class VehicleFluid(VehicleFluidRequired, total=False):
    as_of: str | None
    checked_as_of: str | None
    id: str


class VehicleFluidListMatch(TypedDict):
    id: str


class VehicleFuelRequired(TypedDict):
    confidence: str
    country: str
    described_as: str
    fuel_grade: str
    match: str
    source: str


class VehicleFuel(VehicleFuelRequired, total=False):
    co2_g_km: int | None
    cylinders: int | None
    displacement_l: float | None
    drive: str | None
    engine: Any
    id: str
    kwh_100km: float | None
    l_100km: Any
    mpg: Any
    range_km: int | None
    range_mi: int | None
    second_fuel: str | None
    source_id: str | None
    transmission: str | None


class VehicleFuelListMatchRequired(TypedDict):
    id: str


class VehicleFuelListMatch(VehicleFuelListMatchRequired, total=False):
    country: str


class VehicleInvestigationRequired(TypedDict):
    action: str
    campaigns: list
    kind: str
    models: list
    open: bool


class VehicleInvestigation(VehicleInvestigationRequired, total=False):
    closed: str | None
    component: str | None
    id: str
    kind_name: str | None
    manufacturer: str | None
    match: str | None
    opened: str | None
    subject: str | None
    summary: str | None


class VehicleInvestigationListMatchRequired(TypedDict):
    id: str


class VehicleInvestigationListMatch(VehicleInvestigationListMatchRequired, total=False):
    status: str


VehicleLaborRequired = TypedDict('VehicleLaborRequired', {
    "attribution": list,
    "basis": str,
    "estimates": list,
    "hours": dict,
    "job": str,
    "name": str,
    "note": str,
    "scope": str,
    "updated": str,
    "url": str,
    "vehicle": dict,
})

VehicleLaborOptional = TypedDict('VehicleLaborOptional', {
    "as_of": str | None,
    "class": Any,
    "class_name": str | None,
    "engine": str | None,
    "id": str,
    "notes": str | None,
    "sample": Any,
    "years": Any,
}, total=False)


class VehicleLabor(VehicleLaborRequired, VehicleLaborOptional):
    pass


class VehicleLaborLoadMatch(TypedDict):
    id: str
    vehicle_id: str


class VehicleLaborListMatch(TypedDict):
    id: str


class VehicleRecallRequired(TypedDict):
    campaign: str
    country: str
    models: list
    source: str
    url: str


class VehicleRecall(VehicleRecallRequired, total=False):
    built_from: str | None
    built_to: str | None
    component: str | None
    date: str | None
    do_not_drive: bool | None
    id: str
    manufacturer: str | None
    match: str | None
    mfr_campaign: str | None
    notification: str | None
    park_outside: bool | None
    summary: str | None
    units: int | None


class VehicleRecallListMatchRequired(TypedDict):
    id: str


class VehicleRecallListMatch(VehicleRecallListMatchRequired, total=False):
    country: str


class VehicleSafetyRequired(TypedDict):
    description: str
    features: dict
    match: str
    model: str
    notes: list
    release: int
    stars: dict


class VehicleSafety(VehicleSafetyRequired, total=False):
    body_style: str | None
    curb_weight_kg: int | None
    curb_weight_lb: int | None
    drive: str | None
    id: str
    rollover_risk_percent: float | None
    rollover_tip: bool | None
    vehicle_type: str | None


class VehicleSafetyListMatch(TypedDict):
    id: str


class VehicleSpecRequired(TypedDict):
    confidence: str
    described_as: str
    emission_standards: list
    fuel_grade: str
    size_class: str
    source: str
    source_id: str
    supercharger: bool
    turbo: bool


class VehicleSpec(VehicleSpecRequired, total=False):
    battery_type: str | None
    battery_voltage: int | None
    cylinder_deactivation: bool | None
    cylinder_deactivation_name: str | None
    drive: str | None
    electrification: str | None
    engine: Any
    ev_motor: str | None
    exhaust_valves: int | None
    fuel_usage: str | None
    gears: int | None
    id: str
    intake_valves: int | None
    luggage_volume_ft3: int | None
    luggage_volume_l: int | None
    motor_kw: str | None
    passenger_volume_ft3: int | None
    passenger_volume_l: int | None
    start_stop: bool | None
    transmission: str | None
    transmission_type: str | None
    variable_valve_lift: bool | None
    variable_valve_timing: bool | None


class VehicleSpecListMatch(TypedDict):
    id: str


class VehicleTireRequired(TypedDict):
    checked: str
    size: str
    source: str
    trims: list


class VehicleTire(VehicleTireRequired, total=False):
    bolt_pattern: str | None
    id: str
    lug_torque_lbft: int | None
    lug_torque_nm: int | None
    lug_torque_written_in: str | None
    market: str | None
    pressure_kpa: Any
    pressure_psi: Any
    pressure_written_in: str | None
    size_rear: str | None


class VehicleTireListMatch(TypedDict):
    id: str


class VinRequired(TypedDict):
    check_digit: dict
    manufacturer: dict
    plant: dict
    valid: bool
    vin: str
    warnings: list


class Vin(VinRequired, total=False):
    base_price_usd: float | None
    body: str | None
    catalog: Any
    doors: int | None
    drivetrain: str | None
    engine: Any
    gvwr: str | None
    id: str
    make: str | None
    model: str | None
    recalls: Any
    safety: Any
    seat_rows: int | None
    seats: int | None
    series: str | None
    transmission: str | None
    transmission_speeds: int | None
    trim: str | None
    wheel_size_front: int | None
    wheel_size_rear: int | None
    year: int | None


class VinLoadMatchRequired(TypedDict):
    id: str


class VinLoadMatch(VinLoadMatchRequired, total=False):
    year: int


class VinBulletinRequired(TypedDict):
    attribution: list
    bulletins: list
    counts: dict
    decode: dict
    note: str
    warnings: list


class VinBulletin(VinBulletinRequired, total=False):
    as_of: str | None
    id: str
    next_cursor: str | None
    vehicle: Any


class VinBulletinListMatchRequired(TypedDict):
    id: str


class VinBulletinListMatch(VinBulletinListMatchRequired, total=False):
    code: str
    component: str
    cursor: str
    limit: int
    q: str
    topic: str
    type: str
    year: int


class VinFluidRequired(TypedDict):
    attribution: list
    brake: list
    coolant: list
    decode: dict
    engine_oil: list
    engine_oil_checked: list
    engine_settled: bool
    refrigerant: list
    transmission: list
    warnings: list


class VinFluid(VinFluidRequired, total=False):
    as_of: str | None
    checked_as_of: str | None
    engine: Any
    id: str
    vehicle: Any


class VinFluidListMatchRequired(TypedDict):
    id: str


class VinFluidListMatch(VinFluidListMatchRequired, total=False):
    year: int


class VinFuelRequired(TypedDict):
    as_of: dict
    attribution: list
    decode: dict
    engine_settled: bool
    ratings: list
    warnings: list


class VinFuel(VinFuelRequired, total=False):
    engine: Any
    id: str
    vehicle: Any


class VinFuelListMatchRequired(TypedDict):
    id: str


class VinFuelListMatch(VinFuelListMatchRequired, total=False):
    country: str
    year: int


VinLaborRequired = TypedDict('VinLaborRequired', {
    "attribution": list,
    "decode": dict,
    "estimates": list,
    "note": str,
    "warnings": list,
})

VinLaborOptional = TypedDict('VinLaborOptional', {
    "as_of": str | None,
    "class": Any,
    "engine": str | None,
    "id": str,
    "vehicle": Any,
}, total=False)


class VinLabor(VinLaborRequired, VinLaborOptional):
    pass


class VinLaborLoadMatchRequired(TypedDict):
    id: str
    vin_id: str


class VinLaborLoadMatch(VinLaborLoadMatchRequired, total=False):
    year: int


class VinLaborListMatchRequired(TypedDict):
    id: str


class VinLaborListMatch(VinLaborListMatchRequired, total=False):
    year: int


class VinRecallRequired(TypedDict):
    as_of: dict
    attribution: list
    decode: dict
    lookup: dict
    may_apply: bool
    recalls: list
    warnings: list


class VinRecall(VinRecallRequired, total=False):
    id: str
    vehicle: Any


class VinRecallListMatchRequired(TypedDict):
    id: str


class VinRecallListMatch(VinRecallListMatchRequired, total=False):
    country: str
    year: int


class VinSpecRequired(TypedDict):
    attribution: list
    decode: dict
    engine_settled: bool
    specs: list
    warnings: list


class VinSpec(VinSpecRequired, total=False):
    as_of: str | None
    engine: Any
    id: str
    vehicle: Any


class VinSpecListMatchRequired(TypedDict):
    id: str


class VinSpecListMatch(VinSpecListMatchRequired, total=False):
    year: int


class VinTireRequired(TypedDict):
    attribution: list
    decode: dict
    fitments: list
    warnings: list


class VinTire(VinTireRequired, total=False):
    as_of: str | None
    id: str
    vehicle: Any


class VinTireListMatchRequired(TypedDict):
    id: str


class VinTireListMatch(VinTireListMatchRequired, total=False):
    year: int
