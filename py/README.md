# WenmarVin Python SDK



The Python SDK for the WenmarVin API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Batch()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/wenmar-vin-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from wenmarvin_sdk import WenmarVinSDK

client = WenmarVinSDK()
```

### 3. Load a vehiclecode

VehicleCode is nested under vehicle, so provide the `vehicle_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    vehiclecode = client.VehicleCode().load({"vehicle_id": "example_vehicle_id", "id": "example_id"})
    print(vehiclecode.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Batch().create({"vins": []})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    entrys = client.Entry().list({"q": "example"})
    print([item.data_get() for item in entrys])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = WenmarVinSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
entry = client.Entry().list({"q": "example"})
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = WenmarVinSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
WENMAR_VIN_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### WenmarVinSDK

```python
from wenmarvin_sdk import WenmarVinSDK

client = WenmarVinSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = WenmarVinSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### WenmarVinSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Batch` | `(data) -> BatchEntity` | Create a Batch entity instance. |
| `Bulletin` | `(data) -> BulletinEntity` | Create a Bulletin entity instance. |
| `Code` | `(data) -> CodeEntity` | Create a Code entity instance. |
| `Data` | `(data) -> DataEntity` | Create a Data entity instance. |
| `Engine` | `(data) -> EngineEntity` | Create an Engine entity instance. |
| `Entry` | `(data) -> EntryEntity` | Create an Entry entity instance. |
| `Job` | `(data) -> JobEntity` | Create a Job entity instance. |
| `Make` | `(data) -> MakeEntity` | Create a Make entity instance. |
| `Model` | `(data) -> ModelEntity` | Create a Model entity instance. |
| `Overview` | `(data) -> OverviewEntity` | Create an Overview entity instance. |
| `PartsCard` | `(data) -> PartsCardEntity` | Create a PartsCard entity instance. |
| `PayrollDeduction` | `(data) -> PayrollDeductionEntity` | Create a PayrollDeduction entity instance. |
| `Recall` | `(data) -> RecallEntity` | Create a Recall entity instance. |
| `RecallInvestigation` | `(data) -> RecallInvestigationEntity` | Create a RecallInvestigation entity instance. |
| `Recent` | `(data) -> RecentEntity` | Create a Recent entity instance. |
| `Submodel` | `(data) -> SubmodelEntity` | Create a Submodel entity instance. |
| `Vehicle` | `(data) -> VehicleEntity` | Create a Vehicle entity instance. |
| `VehicleBulletin` | `(data) -> VehicleBulletinEntity` | Create a VehicleBulletin entity instance. |
| `VehicleCode` | `(data) -> VehicleCodeEntity` | Create a VehicleCode entity instance. |
| `VehicleComplaint` | `(data) -> VehicleComplaintEntity` | Create a VehicleComplaint entity instance. |
| `VehicleFluid` | `(data) -> VehicleFluidEntity` | Create a VehicleFluid entity instance. |
| `VehicleFuel` | `(data) -> VehicleFuelEntity` | Create a VehicleFuel entity instance. |
| `VehicleInvestigation` | `(data) -> VehicleInvestigationEntity` | Create a VehicleInvestigation entity instance. |
| `VehicleLabor` | `(data) -> VehicleLaborEntity` | Create a VehicleLabor entity instance. |
| `VehicleRecall` | `(data) -> VehicleRecallEntity` | Create a VehicleRecall entity instance. |
| `VehicleSafety` | `(data) -> VehicleSafetyEntity` | Create a VehicleSafety entity instance. |
| `VehicleSpec` | `(data) -> VehicleSpecEntity` | Create a VehicleSpec entity instance. |
| `VehicleTire` | `(data) -> VehicleTireEntity` | Create a VehicleTire entity instance. |
| `Vin` | `(data) -> VinEntity` | Create a Vin entity instance. |
| `VinBulletin` | `(data) -> VinBulletinEntity` | Create a VinBulletin entity instance. |
| `VinFluid` | `(data) -> VinFluidEntity` | Create a VinFluid entity instance. |
| `VinFuel` | `(data) -> VinFuelEntity` | Create a VinFuel entity instance. |
| `VinLabor` | `(data) -> VinLaborEntity` | Create a VinLabor entity instance. |
| `VinRecall` | `(data) -> VinRecallEntity` | Create a VinRecall entity instance. |
| `VinSpec` | `(data) -> VinSpecEntity` | Create a VinSpec entity instance. |
| `VinTire` | `(data) -> VinTireEntity` | Create a VinTire entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Batch

| Field | Description |
| --- | --- |
| `vins` | At most 50 VINs. |

Operations: Create.

API path: `/v1/vin/batch`

#### Bulletin

| Field | Description |
| --- | --- |
| `as_of` |  |
| `attribution` |  |
| `codes` | The trouble codes the summary names. |
| `component` | NHTSA's components, in its words, separated by `; `. |
| `components` | The components it is about, systems first. |
| `date` | The manufacturer's own date. |
| `date_added` | The day NHTSA published it. |
| `document` |  |
| `document_id` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` |  |
| `mfr_campaign` | The manufacturer's campaign id or software version. |
| `mfr_system` | The manufacturer's own words for the system. |
| `nhtsa_id` | NHTSA's id number for the communication. |
| `note` |  |
| `replaces` | The number of the bulletin this one replaces. |
| `summary` | NHTSA's summary of the communication. |
| `topics` |  |
| `type` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | The type in words. |
| `url` | The bulletin's page on this site. |
| `vehicles` |  |

Operations: List, Load.

API path: `/v1/bulletins`

#### Code

| Field | Description |
| --- | --- |
| `attribution` | The credit lines the data's licences ask for. |
| `checked` | The day it was approved. |
| `checks` | What a technician usually verifies first. |
| `code` |  |
| `common_causes` | General causes, not about one make. |
| `components` |  |
| `generic` | Always `true` here: only codes every maker uses the same way are described. |
| `id` |  |
| `meaning` | What the code tells a service advisor. |
| `note` | What a description is and is not. |
| `related` | Related codes that are described too. |
| `reviewer` | The GitHub name of the person who approved the text. |
| `system` | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` |  |
| `title` |  |
| `url` | The code's page on this site. |

Operations: List, Load.

API path: `/v1/codes`

#### Data

| Field | Description |
| --- | --- |
| `built_at` | When the data file was built, in UTC. |
| `data_version` | The data release, such as `2026.09`. |
| `datasets` | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | The version of the server. |
| `vpic_release` | The NHTSA vPIC release the data was built from. |

Operations: Load.

API path: `/v1/meta`

#### Engine

| Field | Description |
| --- | --- |
| `id` |  |
| `label` |  |
| `preset` | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

Operations: List.

API path: `/v1/vehicles/engines`

#### Entry

| Field | Description |
| --- | --- |
| `body` |  |
| `drive` |  |
| `engine` |  |
| `id` | The stable id. |
| `make` |  |
| `model` |  |
| `submodel` |  |
| `summary` | One line naming everything above that is known. |
| `transmission` |  |
| `vehicle_types` | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` |  |

Operations: List, Load.

API path: `/v1/vehicles/search`

#### Job

| Field | Description |
| --- | --- |
| `attribution` | The credit the labour estimates ask for. |
| `components` |  |
| `estimates` | The job's class-scope figures. |
| `excludes` | Work often done at the same visit that is not part of this job. |
| `id` | The job's id. |
| `includes` | The work the job covers. |
| `name` |  |
| `note` | What an estimate is not. |
| `related` |  |
| `system` | The id of the system the job belongs to. |
| `system_name` |  |
| `url` | The job's page on this site. |

Operations: List, Load.

API path: `/v1/jobs`

#### Make

| Field | Description |
| --- | --- |
| `id` | The make's id form. |
| `links` |  |
| `name` |  |
| `popular` | Whether it is on the list of popular makes. |

Operations: List, Load.

API path: `/v1/vehicles/makes`

#### Model

| Field | Description |
| --- | --- |
| `as_of` | The day each country's recall data was current. |
| `attribution` |  |
| `id` | The model's id form. |
| `lookup` | Where to check one vehicle for open recalls. |
| `make` | A make or a model: its id form and its name. |
| `may_apply` | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | A make or a model: its id form and its name. |
| `name` |  |
| `year_from` | The first and last model year the model exists in. |
| `year_to` |  |
| `years` |  |

Operations: List, Load.

API path: `/v1/vehicles/models`

#### Overview

| Field | Description |
| --- | --- |
| `code` | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` |  |
| `suggestions` | VINs the caller may have meant. |

Operations: List.

API path: `/v1/vehicles/{id}/overview`

#### PartsCard

| Field | Description |
| --- | --- |
| `attribution` |  |
| `engine_settled` | Whether the decode settled one catalog engine. |
| `lines` |  |
| `text` | The lines as plain text, one `Label: value` each. |
| `vehicle` |  |
| `vin` |  |
| `warnings` |  |

Operations: List.

API path: `/v1/vin/{vin}/parts-card`

#### PayrollDeduction

| Field | Description |
| --- | --- |
| `meaning` | What the factor means. |
| `name` | The name the engine gives the factor. |
| `value` | The value used, after rounding. |

Operations: List.

API path: `/v1/payroll/deductions`

#### Recall

| Field | Description |
| --- | --- |
| `as_of` | The day this publisher's data was current. |
| `attribution` |  |
| `built_from` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` |  |
| `campaign` | The publisher's campaign number. |
| `completion` |  |
| `component` | The component, as the source words it. |
| `consequence` |  |
| `country` | `us` or `ca`. |
| `date` | The day the campaign was reported. |
| `do_not_drive` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` |  |
| `id` |  |
| `lookup` | Where to check one vehicle for open recalls. |
| `manufacturer` |  |
| `match` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` |  |
| `notification` | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | The day owners were notified. |
| `park_outside` | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | The manufacturer's part numbers, separated by commas. |
| `remedy` |  |
| `source` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | What is wrong, in the source's words. |
| `units` | Units potentially affected. |
| `url` | The campaign's page on this site. |
| `vehicles` | Every vehicle the campaign lists, by make, model and year. |

Operations: List, Load.

API path: `/v1/recalls`

#### RecallInvestigation

| Field | Description |
| --- | --- |
| `action` | NHTSA's action number. |
| `campaigns` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | The day it was closed. |
| `component` | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | The letters the number starts with. |
| `kind_name` | The kind in words. |
| `manufacturer` | The manufacturers it names, separated by `; `. |
| `match` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | The day it was opened. |
| `subject` | NHTSA's one-line subject. |
| `summary` | NHTSA's summary. |

Operations: List.

API path: `/v1/recalls/{source}/{campaign}/investigations`

#### Recent

| Field | Description |
| --- | --- |
| `recall` | One recall campaign in a list. |
| `vehicles` | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | How many vehicles the campaign lists in all. |

Operations: List.

API path: `/v1/recalls/recent`

#### Submodel

| Field | Description |
| --- | --- |
| `id` |  |
| `kind` | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` |  |

Operations: List.

API path: `/v1/vehicles/submodels`

#### Vehicle

| Field | Description |
| --- | --- |

Operations: List.

API path: `/v1/vehicles/years`

#### VehicleBulletin

| Field | Description |
| --- | --- |
| `component` | NHTSA's components, in its words, separated by `; `. |
| `date` | The manufacturer's own date. |
| `date_added` | The day NHTSA published it. |
| `document` |  |
| `document_id` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` |  |
| `mfr_campaign` | The manufacturer's campaign id or software version. |
| `nhtsa_id` | NHTSA's id number for the communication. |
| `summary` | NHTSA's summary of the communication. |
| `type` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | The type in words. |
| `url` | The bulletin's page on this site. |

Operations: List.

API path: `/v1/vehicles/{id}/bulletins`

#### VehicleCode

| Field | Description |
| --- | --- |
| `attribution` |  |
| `bulletins` |  |
| `code` |  |
| `description` |  |
| `generic` | Whether every maker uses the code the same way. |
| `id` |  |
| `note` |  |
| `related` | What else is held for the model year about the components a code concerns. |
| `url` | The page of this code on this model year. |
| `vehicle` | The model year an answer is about. |

Operations: Load.

API path: `/v1/vehicles/{id}/codes/{code}`

#### VehicleComplaint

| Field | Description |
| --- | --- |
| `complaints` |  |
| `crashes` | Complaints that report a crash. |
| `fires` | Complaints that report a fire. |
| `id` | A component id, such as `steering` or `brake-pad`. |
| `injuries` | Complaints that report at least one person injured. |
| `median_km` | The median of the mileages owners gave, in kilometres. |
| `median_miles` | The same in miles, as NHTSA records it. |
| `name` |  |
| `parent` | The system a part belongs to. |

Operations: List.

API path: `/v1/vehicles/{id}/complaints`

#### VehicleFluid

| Field | Description |
| --- | --- |
| `as_of` | The day EPA's oil grades were current. |
| `attribution` |  |
| `brake` |  |
| `checked_as_of` | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` |  |
| `engine_oil` |  |
| `engine_oil_checked` |  |
| `id` |  |
| `refrigerant` |  |
| `transmission` |  |
| `vehicle` | The model year an answer is about. |

Operations: List.

API path: `/v1/vehicles/{id}/fluids`

#### VehicleFuel

| Field | Description |
| --- | --- |
| `co2_g_km` | Tailpipe carbon dioxide, combined. |
| `confidence` | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `us` or `ca`. |
| `cylinders` |  |
| `described_as` | The source's own name for the vehicle rated. |
| `displacement_l` |  |
| `drive` |  |
| `engine` |  |
| `fuel_grade` | The fuel the figures are for, which is the recommended grade. |
| `id` |  |
| `kwh_100km` | Combined electricity use. |
| `l_100km` |  |
| `match` | How the model was found: `exact`, `base` or `curated`. |
| `mpg` |  |
| `range_km` | On a full battery. |
| `range_mi` |  |
| `second_fuel` | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `epa` or `nrcan`. |
| `source_id` | EPA's id for the rating. |
| `transmission` |  |

Operations: List.

API path: `/v1/vehicles/{id}/fuel`

#### VehicleInvestigation

| Field | Description |
| --- | --- |
| `action` | NHTSA's action number. |
| `campaigns` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | The day it was closed. |
| `component` | The components it names, as NHTSA words them, separated by `; `. |
| `id` |  |
| `kind` | The letters the number starts with. |
| `kind_name` | The kind in words. |
| `manufacturer` | The manufacturers it names, separated by `; `. |
| `match` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | The day it was opened. |
| `subject` | NHTSA's one-line subject. |
| `summary` | NHTSA's summary. |

Operations: List.

API path: `/v1/vehicles/{id}/investigations`

#### VehicleLabor

| Field | Description |
| --- | --- |
| `as_of` | The newest day an estimate was changed. |
| `attribution` |  |
| `basis` | `expert`: written by a person who does the work. |
| `class` | The class, for a class-scope figure. |
| `class_name` |  |
| `engine` | The engine the vehicle id named, as an id form. |
| `estimates` | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | Hours, as numbers of hours. |
| `id` |  |
| `job` | The job's id. |
| `name` |  |
| `note` | "An estimate, not a quote. |
| `notes` |  |
| `sample` |  |
| `scope` | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | The day the figure was last changed. |
| `url` | The job's page on this site. |
| `vehicle` | The model year an answer is about. |
| `years` |  |

Operations: List, Load.

API path: `/v1/vehicles/{id}/labor`

#### VehicleRecall

| Field | Description |
| --- | --- |
| `built_from` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` |  |
| `campaign` | The publisher's campaign number. |
| `component` | The component, as the source words it. |
| `country` | `us` or `ca`. |
| `date` | The day the campaign was reported. |
| `do_not_drive` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` |  |
| `manufacturer` |  |
| `match` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | NHTSA's advisory to park outside, away from buildings. |
| `source` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | What is wrong, in the source's words. |
| `units` | Units potentially affected. |
| `url` | The campaign's page on this site. |

Operations: List.

API path: `/v1/vehicles/{id}/recalls`

#### VehicleSafety

| Field | Description |
| --- | --- |
| `body_style` |  |
| `curb_weight_kg` | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` |  |
| `description` | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` |  |
| `features` | The safety features NHTSA lists with a rating. |
| `id` |  |
| `match` | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | The stars of one rating, each from 1 to 5. |
| `vehicle_type` |  |

Operations: List.

API path: `/v1/vehicles/{id}/safety`

#### VehicleSpec

| Field | Description |
| --- | --- |
| `battery_type` |  |
| `battery_voltage` |  |
| `confidence` | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` |  |
| `cylinder_deactivation_name` | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` |  |
| `drive` |  |
| `electrification` | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` |  |
| `engine` |  |
| `ev_motor` |  |
| `exhaust_valves` |  |
| `fuel_grade` |  |
| `fuel_usage` | Whether the grade is recommended or required, in EPA's words. |
| `gears` |  |
| `id` |  |
| `intake_valves` | Per cylinder. |
| `luggage_volume_ft3` |  |
| `luggage_volume_l` |  |
| `motor_kw` | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` |  |
| `passenger_volume_l` |  |
| `size_class` |  |
| `source` |  |
| `source_id` |  |
| `start_stop` |  |
| `supercharger` |  |
| `transmission` |  |
| `transmission_type` |  |
| `turbo` |  |
| `variable_valve_lift` |  |
| `variable_valve_timing` |  |

Operations: List.

API path: `/v1/vehicles/{id}/specs`

#### VehicleTire

| Field | Description |
| --- | --- |
| `bolt_pattern` |  |
| `checked` |  |
| `id` |  |
| `lug_torque_lbft` |  |
| `lug_torque_nm` |  |
| `lug_torque_written_in` | `nm` or `lbft`. |
| `market` |  |
| `pressure_kpa` |  |
| `pressure_psi` |  |
| `pressure_written_in` | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | The size as printed. |
| `size_rear` | The rear size, only when it differs from the front. |
| `source` |  |
| `trims` | The trims the document ties the size to, as it names them. |

Operations: List.

API path: `/v1/vehicles/{id}/tires`

#### Vin

| Field | Description |
| --- | --- |
| `base_price_usd` | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` |  |
| `catalog` |  |
| `check_digit` |  |
| `doors` |  |
| `drivetrain` |  |
| `engine` |  |
| `gvwr` | Gross vehicle weight rating class, as NHTSA words it. |
| `id` |  |
| `make` |  |
| `manufacturer` |  |
| `model` |  |
| `plant` | Where the vehicle was built. |
| `recalls` |  |
| `safety` |  |
| `seat_rows` |  |
| `seats` |  |
| `series` |  |
| `transmission` |  |
| `transmission_speeds` |  |
| `trim` |  |
| `valid` | Whether the check digit, position 9, is right. |
| `vin` |  |
| `warnings` | Things to know about a decode that still succeeded. |
| `wheel_size_front` | Front wheel diameter in inches. |
| `wheel_size_rear` | Rear wheel diameter in inches. |
| `year` |  |

Operations: Load.

API path: `/v1/vin/{vin}`

#### VinBulletin

| Field | Description |
| --- | --- |
| `as_of` |  |
| `attribution` |  |
| `bulletins` |  |
| `counts` | What the bulletins of one model year are, in numbers. |
| `decode` | What a VIN decoded to, as far as recalls need it. |
| `id` |  |
| `next_cursor` |  |
| `note` |  |
| `vehicle` |  |
| `warnings` |  |

Operations: List.

API path: `/v1/vin/{vin}/bulletins`

#### VinFluid

| Field | Description |
| --- | --- |
| `as_of` |  |
| `attribution` |  |
| `brake` |  |
| `checked_as_of` |  |
| `coolant` |  |
| `decode` | What a VIN decoded to, as far as recalls need it. |
| `engine` |  |
| `engine_oil` |  |
| `engine_oil_checked` | Narrowed as `engine_oil` is. |
| `engine_settled` | Whether `engine_oil` is narrowed to `engine`. |
| `id` |  |
| `refrigerant` |  |
| `transmission` |  |
| `vehicle` |  |
| `warnings` |  |

Operations: List.

API path: `/v1/vin/{vin}/fluids`

#### VinFuel

| Field | Description |
| --- | --- |
| `as_of` | The day each country's fuel ratings were current. |
| `attribution` |  |
| `decode` | What a VIN decoded to, as far as recalls need it. |
| `engine` |  |
| `engine_settled` | Whether `ratings` is narrowed to `engine`. |
| `id` |  |
| `ratings` |  |
| `vehicle` |  |
| `warnings` |  |

Operations: List.

API path: `/v1/vin/{vin}/fuel`

#### VinLabor

| Field | Description |
| --- | --- |
| `as_of` |  |
| `attribution` |  |
| `class` |  |
| `decode` | What a VIN decoded to, as far as recalls need it. |
| `engine` |  |
| `estimates` |  |
| `id` |  |
| `note` |  |
| `vehicle` |  |
| `warnings` |  |

Operations: List, Load.

API path: `/v1/vin/{vin}/labor`

#### VinRecall

| Field | Description |
| --- | --- |
| `as_of` | The day each country's recall data was current. |
| `attribution` |  |
| `decode` | What a VIN decoded to, as far as recalls need it. |
| `id` |  |
| `lookup` | Where to check one vehicle for open recalls. |
| `may_apply` | Always `true`. |
| `recalls` |  |
| `vehicle` |  |
| `warnings` | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

Operations: List.

API path: `/v1/vin/{vin}/recalls`

#### VinSpec

| Field | Description |
| --- | --- |
| `as_of` |  |
| `attribution` |  |
| `decode` | What a VIN decoded to, as far as recalls need it. |
| `engine` |  |
| `engine_settled` | Whether `specs` is narrowed to `engine`. |
| `id` |  |
| `specs` |  |
| `vehicle` |  |
| `warnings` |  |

Operations: List.

API path: `/v1/vin/{vin}/specs`

#### VinTire

| Field | Description |
| --- | --- |
| `as_of` |  |
| `attribution` |  |
| `decode` | What a VIN decoded to, as far as recalls need it. |
| `fitments` | Every fitment of the model year. |
| `id` |  |
| `vehicle` |  |
| `warnings` |  |

Operations: List.

API path: `/v1/vin/{vin}/tires`



## Entities


### Batch

Create an instance: `batch = client.Batch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `vins` | `list` | At most 50 VINs. |

#### Example: Create

```python
batch = client.Batch().create({
    "vins": [],  # list
})
```


### Bulletin

Create an instance: `bulletin = client.Bulletin()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `str | None` |  |
| `attribution` | `list` |  |
| `codes` | `list` | The trouble codes the summary names. |
| `component` | `str | None` | NHTSA's components, in its words, separated by `; `. |
| `components` | `list` | The components it is about, systems first. |
| `date` | `str | None` | The manufacturer's own date. |
| `date_added` | `str` | The day NHTSA published it. |
| `document` | `Any` |  |
| `document_id` | `str | None` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `str` |  |
| `mfr_campaign` | `str | None` | The manufacturer's campaign id or software version. |
| `mfr_system` | `str | None` | The manufacturer's own words for the system. |
| `nhtsa_id` | `int` | NHTSA's id number for the communication. |
| `note` | `str` |  |
| `replaces` | `str | None` | The number of the bulletin this one replaces. |
| `summary` | `str | None` | NHTSA's summary of the communication. |
| `topics` | `list` |  |
| `type` | `str` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `str` | The type in words. |
| `url` | `str` | The bulletin's page on this site. |
| `vehicles` | `list` |  |

#### Example: Load

```python
bulletin = client.Bulletin().load({"id": "bulletin_id"})
```

#### Example: List

```python
bulletins = client.Bulletin().list()
```


### Code

Create an instance: `code = client.Code()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `list` | The credit lines the data's licences ask for. |
| `checked` | `str` | The day it was approved. |
| `checks` | `list` | What a technician usually verifies first. |
| `code` | `str` |  |
| `common_causes` | `list` | General causes, not about one make. |
| `components` | `list` |  |
| `generic` | `bool` | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `str` |  |
| `meaning` | `str` | What the code tells a service advisor. |
| `note` | `str` | What a description is and is not. |
| `related` | `list` | Related codes that are described too. |
| `reviewer` | `str` | The GitHub name of the person who approved the text. |
| `system` | `str` | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `str` |  |
| `title` | `str` |  |
| `url` | `str` | The code's page on this site. |

#### Example: Load

```python
code = client.Code().load({"id": "code_id"})
```

#### Example: List

```python
codes = client.Code().list()
```


### Data

Create an instance: `data = client.Data()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_at` | `str` | When the data file was built, in UTC. |
| `data_version` | `str` | The data release, such as `2026.09`. |
| `datasets` | `dict` | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `str` | The version of the server. |
| `vpic_release` | `str` | The NHTSA vPIC release the data was built from. |

#### Example: Load

```python
data = client.Data().load()
```


### Engine

Create an instance: `engine = client.Engine()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `label` | `str` |  |
| `preset` | `bool` | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `str | None` | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

#### Example: List

```python
engines = client.Engine().list({"make": "example", "model": "example", "year": 1})
```


### Entry

Create an instance: `entry = client.Entry()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `str | None` |  |
| `drive` | `str | None` |  |
| `engine` | `str | None` |  |
| `id` | `str` | The stable id. |
| `make` | `str` |  |
| `model` | `str` |  |
| `submodel` | `str | None` |  |
| `summary` | `str` | One line naming everything above that is known. |
| `transmission` | `str | None` |  |
| `vehicle_types` | `list` | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `int` |  |

#### Example: Load

```python
entry = client.Entry().load({"id": "entry_id"})
```

#### Example: List

```python
entrys = client.Entry().list({"q": "example"})
```


### Job

Create an instance: `job = client.Job()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `list` | The credit the labour estimates ask for. |
| `components` | `list` |  |
| `estimates` | `list | None` | The job's class-scope figures. |
| `excludes` | `list` | Work often done at the same visit that is not part of this job. |
| `id` | `str` | The job's id. |
| `includes` | `list` | The work the job covers. |
| `name` | `str` |  |
| `note` | `str` | What an estimate is not. |
| `related` | `list` |  |
| `system` | `str` | The id of the system the job belongs to. |
| `system_name` | `str` |  |
| `url` | `str` | The job's page on this site. |

#### Example: Load

```python
job = client.Job().load({"id": "job_id"})
```

#### Example: List

```python
jobs = client.Job().list()
```


### Make

Create an instance: `make = client.Make()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` | The make's id form. |
| `links` | `Any` |  |
| `name` | `str` |  |
| `popular` | `bool` | Whether it is on the list of popular makes. |

#### Example: Load

```python
make = client.Make().load({"id": "make_id"})
```

#### Example: List

```python
makes = client.Make().list()
```


### Model

Create an instance: `model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `dict` | The day each country's recall data was current. |
| `attribution` | `list` |  |
| `id` | `str` | The model's id form. |
| `lookup` | `dict` | Where to check one vehicle for open recalls. |
| `make` | `dict` | A make or a model: its id form and its name. |
| `may_apply` | `bool` | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `dict` | A make or a model: its id form and its name. |
| `name` | `str` |  |
| `year_from` | `int` | The first and last model year the model exists in. |
| `year_to` | `int` |  |
| `years` | `list` |  |

#### Example: Load

```python
model = client.Model().load({"make": "make", "model": "model"})
```

#### Example: List

```python
models = client.Model().list({"make": "example"})
```


### Overview

Create an instance: `overview = client.Overview()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `str` |  |
| `suggestions` | `list` | VINs the caller may have meant. |

#### Example: List

```python
overviews = client.Overview().list({"vehicle_id": "example"})
```


### PartsCard

Create an instance: `parts_card = client.PartsCard()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `list` |  |
| `engine_settled` | `bool` | Whether the decode settled one catalog engine. |
| `lines` | `list` |  |
| `text` | `str` | The lines as plain text, one `Label: value` each. |
| `vehicle` | `Any` |  |
| `vin` | `str` |  |
| `warnings` | `list` |  |

#### Example: List

```python
parts_cards = client.PartsCard().list({"vin_id": "example"})
```


### PayrollDeduction

Create an instance: `payroll_deduction = client.PayrollDeduction()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meaning` | `str` | What the factor means. |
| `name` | `str` | The name the engine gives the factor. |
| `value` | `float` | The value used, after rounding. |

#### Example: List

```python
payroll_deductions = client.PayrollDeduction().list()
```


### Recall

Create an instance: `recall = client.Recall()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `str | None` | The day this publisher's data was current. |
| `attribution` | `list` |  |
| `built_from` | `str | None` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `str | None` |  |
| `campaign` | `str` | The publisher's campaign number. |
| `completion` | `Any` |  |
| `component` | `str | None` | The component, as the source words it. |
| `consequence` | `str | None` |  |
| `country` | `str` | `us` or `ca`. |
| `date` | `str | None` | The day the campaign was reported. |
| `do_not_drive` | `bool | None` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `Any` |  |
| `id` | `str` |  |
| `lookup` | `dict` | Where to check one vehicle for open recalls. |
| `manufacturer` | `str | None` |  |
| `match` | `str | None` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `bool` | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `str | None` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `list` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `str | None` |  |
| `notification` | `str | None` | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `str | None` | The day owners were notified. |
| `park_outside` | `bool | None` | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `str | None` | The manufacturer's part numbers, separated by commas. |
| `remedy` | `str | None` |  |
| `source` | `str` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `str | None` | What is wrong, in the source's words. |
| `units` | `int | None` | Units potentially affected. |
| `url` | `str` | The campaign's page on this site. |
| `vehicles` | `list` | Every vehicle the campaign lists, by make, model and year. |

#### Example: Load

```python
recall = client.Recall().load({"campaign": "campaign", "source": "source"})
```

#### Example: List

```python
recalls = client.Recall().list()
```


### RecallInvestigation

Create an instance: `recall_investigation = client.RecallInvestigation()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` | NHTSA's action number. |
| `campaigns` | `list` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `str | None` | The day it was closed. |
| `component` | `str | None` | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `str` | The letters the number starts with. |
| `kind_name` | `str | None` | The kind in words. |
| `manufacturer` | `str | None` | The manufacturers it names, separated by `; `. |
| `match` | `str | None` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `list` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `str | None` | The day it was opened. |
| `subject` | `str | None` | NHTSA's one-line subject. |
| `summary` | `str | None` | NHTSA's summary. |

#### Example: List

```python
recall_investigations = client.RecallInvestigation().list({"campaign": "example", "recall_id": "example"})
```


### Recent

Create an instance: `recent = client.Recent()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `recall` | `dict` | One recall campaign in a list. |
| `vehicles` | `list` | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `int` | How many vehicles the campaign lists in all. |

#### Example: List

```python
recents = client.Recent().list()
```


### Submodel

Create an instance: `submodel = client.Submodel()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `kind` | `str` | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `str` |  |

#### Example: List

```python
submodels = client.Submodel().list({"make": "example", "model": "example", "year": 1})
```


### Vehicle

Create an instance: `vehicle = client.Vehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
vehicles = client.Vehicle().list()
```


### VehicleBulletin

Create an instance: `vehicle_bulletin = client.VehicleBulletin()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component` | `str | None` | NHTSA's components, in its words, separated by `; `. |
| `date` | `str | None` | The manufacturer's own date. |
| `date_added` | `str` | The day NHTSA published it. |
| `document` | `Any` |  |
| `document_id` | `str | None` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `str` |  |
| `mfr_campaign` | `str | None` | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `int` | NHTSA's id number for the communication. |
| `summary` | `str | None` | NHTSA's summary of the communication. |
| `type` | `str` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `str` | The type in words. |
| `url` | `str` | The bulletin's page on this site. |

#### Example: List

```python
vehicle_bulletins = client.VehicleBulletin().list({"id": "example"})
```


### VehicleCode

Create an instance: `vehicle_code = client.VehicleCode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `list` |  |
| `bulletins` | `Any` |  |
| `code` | `str` |  |
| `description` | `str` |  |
| `generic` | `bool` | Whether every maker uses the code the same way. |
| `id` | `str` |  |
| `note` | `str` |  |
| `related` | `dict` | What else is held for the model year about the components a code concerns. |
| `url` | `str` | The page of this code on this model year. |
| `vehicle` | `dict` | The model year an answer is about. |

#### Example: Load

```python
vehicle_code = client.VehicleCode().load({"id": "vehicle_code_id", "vehicle_id": "vehicle_id"})
```


### VehicleComplaint

Create an instance: `vehicle_complaint = client.VehicleComplaint()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `complaints` | `int` |  |
| `crashes` | `int` | Complaints that report a crash. |
| `fires` | `int` | Complaints that report a fire. |
| `id` | `str` | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `int` | Complaints that report at least one person injured. |
| `median_km` | `int | None` | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `int | None` | The same in miles, as NHTSA records it. |
| `name` | `str` |  |
| `parent` | `str | None` | The system a part belongs to. |

#### Example: List

```python
vehicle_complaints = client.VehicleComplaint().list({"id": "example"})
```


### VehicleFluid

Create an instance: `vehicle_fluid = client.VehicleFluid()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `str | None` | The day EPA's oil grades were current. |
| `attribution` | `list` |  |
| `brake` | `list` |  |
| `checked_as_of` | `str | None` | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `list` |  |
| `engine_oil` | `list` |  |
| `engine_oil_checked` | `list` |  |
| `id` | `str` |  |
| `refrigerant` | `list` |  |
| `transmission` | `list` |  |
| `vehicle` | `dict` | The model year an answer is about. |

#### Example: List

```python
vehicle_fluids = client.VehicleFluid().list({"id": "example"})
```


### VehicleFuel

Create an instance: `vehicle_fuel = client.VehicleFuel()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `co2_g_km` | `int | None` | Tailpipe carbon dioxide, combined. |
| `confidence` | `str` | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `str` | `us` or `ca`. |
| `cylinders` | `int | None` |  |
| `described_as` | `str` | The source's own name for the vehicle rated. |
| `displacement_l` | `float | None` |  |
| `drive` | `str | None` |  |
| `engine` | `Any` |  |
| `fuel_grade` | `str` | The fuel the figures are for, which is the recommended grade. |
| `id` | `str` |  |
| `kwh_100km` | `float | None` | Combined electricity use. |
| `l_100km` | `Any` |  |
| `match` | `str` | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `Any` |  |
| `range_km` | `int | None` | On a full battery. |
| `range_mi` | `int | None` |  |
| `second_fuel` | `str | None` | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `str` | `epa` or `nrcan`. |
| `source_id` | `str | None` | EPA's id for the rating. |
| `transmission` | `str | None` |  |

#### Example: List

```python
vehicle_fuels = client.VehicleFuel().list({"id": "example"})
```


### VehicleInvestigation

Create an instance: `vehicle_investigation = client.VehicleInvestigation()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `str` | NHTSA's action number. |
| `campaigns` | `list` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `str | None` | The day it was closed. |
| `component` | `str | None` | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `str` |  |
| `kind` | `str` | The letters the number starts with. |
| `kind_name` | `str | None` | The kind in words. |
| `manufacturer` | `str | None` | The manufacturers it names, separated by `; `. |
| `match` | `str | None` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `list` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `str | None` | The day it was opened. |
| `subject` | `str | None` | NHTSA's one-line subject. |
| `summary` | `str | None` | NHTSA's summary. |

#### Example: List

```python
vehicle_investigations = client.VehicleInvestigation().list({"id": "example"})
```


### VehicleLabor

Create an instance: `vehicle_labor = client.VehicleLabor()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `str | None` | The newest day an estimate was changed. |
| `attribution` | `list` |  |
| `basis` | `str` | `expert`: written by a person who does the work. |
| `class` | `Any` | The class, for a class-scope figure. |
| `class_name` | `str | None` |  |
| `engine` | `str | None` | The engine the vehicle id named, as an id form. |
| `estimates` | `list` | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `dict` | Hours, as numbers of hours. |
| `id` | `str` |  |
| `job` | `str` | The job's id. |
| `name` | `str` |  |
| `note` | `str` | "An estimate, not a quote. |
| `notes` | `str | None` |  |
| `sample` | `Any` |  |
| `scope` | `str` | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `str` | The day the figure was last changed. |
| `url` | `str` | The job's page on this site. |
| `vehicle` | `dict` | The model year an answer is about. |
| `years` | `Any` |  |

#### Example: Load

```python
vehicle_labor = client.VehicleLabor().load({"id": "vehicle_labor_id", "vehicle_id": "vehicle_id"})
```

#### Example: List

```python
vehicle_labors = client.VehicleLabor().list({"id": "example"})
```


### VehicleRecall

Create an instance: `vehicle_recall = client.VehicleRecall()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_from` | `str | None` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `str | None` |  |
| `campaign` | `str` | The publisher's campaign number. |
| `component` | `str | None` | The component, as the source words it. |
| `country` | `str` | `us` or `ca`. |
| `date` | `str | None` | The day the campaign was reported. |
| `do_not_drive` | `bool | None` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `str` |  |
| `manufacturer` | `str | None` |  |
| `match` | `str | None` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `str | None` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `list` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `str | None` | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `bool | None` | NHTSA's advisory to park outside, away from buildings. |
| `source` | `str` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `str | None` | What is wrong, in the source's words. |
| `units` | `int | None` | Units potentially affected. |
| `url` | `str` | The campaign's page on this site. |

#### Example: List

```python
vehicle_recalls = client.VehicleRecall().list({"id": "example"})
```


### VehicleSafety

Create an instance: `vehicle_safety = client.VehicleSafety()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body_style` | `str | None` |  |
| `curb_weight_kg` | `int | None` | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `int | None` |  |
| `description` | `str` | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `str | None` |  |
| `features` | `dict` | The safety features NHTSA lists with a rating. |
| `id` | `str` |  |
| `match` | `str` | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `str` | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `list` | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `int` | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `float | None` | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `bool | None` | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `dict` | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `str | None` |  |

#### Example: List

```python
vehicle_safetys = client.VehicleSafety().list({"id": "example"})
```


### VehicleSpec

Create an instance: `vehicle_spec = client.VehicleSpec()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `battery_type` | `str | None` |  |
| `battery_voltage` | `int | None` |  |
| `confidence` | `str` | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `bool | None` |  |
| `cylinder_deactivation_name` | `str | None` | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `str` |  |
| `drive` | `str | None` |  |
| `electrification` | `str | None` | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `list` |  |
| `engine` | `Any` |  |
| `ev_motor` | `str | None` |  |
| `exhaust_valves` | `int | None` |  |
| `fuel_grade` | `str` |  |
| `fuel_usage` | `str | None` | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `int | None` |  |
| `id` | `str` |  |
| `intake_valves` | `int | None` | Per cylinder. |
| `luggage_volume_ft3` | `int | None` |  |
| `luggage_volume_l` | `int | None` |  |
| `motor_kw` | `str | None` | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `int | None` |  |
| `passenger_volume_l` | `int | None` |  |
| `size_class` | `str` |  |
| `source` | `str` |  |
| `source_id` | `str` |  |
| `start_stop` | `bool | None` |  |
| `supercharger` | `bool` |  |
| `transmission` | `str | None` |  |
| `transmission_type` | `str | None` |  |
| `turbo` | `bool` |  |
| `variable_valve_lift` | `bool | None` |  |
| `variable_valve_timing` | `bool | None` |  |

#### Example: List

```python
vehicle_specs = client.VehicleSpec().list({"id": "example"})
```


### VehicleTire

Create an instance: `vehicle_tire = client.VehicleTire()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bolt_pattern` | `str | None` |  |
| `checked` | `str` |  |
| `id` | `str` |  |
| `lug_torque_lbft` | `int | None` |  |
| `lug_torque_nm` | `int | None` |  |
| `lug_torque_written_in` | `str | None` | `nm` or `lbft`. |
| `market` | `str | None` |  |
| `pressure_kpa` | `Any` |  |
| `pressure_psi` | `Any` |  |
| `pressure_written_in` | `str | None` | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `str` | The size as printed. |
| `size_rear` | `str | None` | The rear size, only when it differs from the front. |
| `source` | `str` |  |
| `trims` | `list` | The trims the document ties the size to, as it names them. |

#### Example: List

```python
vehicle_tires = client.VehicleTire().list({"id": "example"})
```


### Vin

Create an instance: `vin = client.Vin()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_price_usd` | `float | None` | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `str | None` |  |
| `catalog` | `Any` |  |
| `check_digit` | `dict` |  |
| `doors` | `int | None` |  |
| `drivetrain` | `str | None` |  |
| `engine` | `Any` |  |
| `gvwr` | `str | None` | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `str` |  |
| `make` | `str | None` |  |
| `manufacturer` | `dict` |  |
| `model` | `str | None` |  |
| `plant` | `dict` | Where the vehicle was built. |
| `recalls` | `Any` |  |
| `safety` | `Any` |  |
| `seat_rows` | `int | None` |  |
| `seats` | `int | None` |  |
| `series` | `str | None` |  |
| `transmission` | `str | None` |  |
| `transmission_speeds` | `int | None` |  |
| `trim` | `str | None` |  |
| `valid` | `bool` | Whether the check digit, position 9, is right. |
| `vin` | `str` |  |
| `warnings` | `list` | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `int | None` | Front wheel diameter in inches. |
| `wheel_size_rear` | `int | None` | Rear wheel diameter in inches. |
| `year` | `int | None` |  |

#### Example: Load

```python
vin = client.Vin().load({"id": "vin_id"})
```


### VinBulletin

Create an instance: `vin_bulletin = client.VinBulletin()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `str | None` |  |
| `attribution` | `list` |  |
| `bulletins` | `list` |  |
| `counts` | `dict` | What the bulletins of one model year are, in numbers. |
| `decode` | `dict` | What a VIN decoded to, as far as recalls need it. |
| `id` | `str` |  |
| `next_cursor` | `str | None` |  |
| `note` | `str` |  |
| `vehicle` | `Any` |  |
| `warnings` | `list` |  |

#### Example: List

```python
vin_bulletins = client.VinBulletin().list({"id": "example"})
```


### VinFluid

Create an instance: `vin_fluid = client.VinFluid()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `str | None` |  |
| `attribution` | `list` |  |
| `brake` | `list` |  |
| `checked_as_of` | `str | None` |  |
| `coolant` | `list` |  |
| `decode` | `dict` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Any` |  |
| `engine_oil` | `list` |  |
| `engine_oil_checked` | `list` | Narrowed as `engine_oil` is. |
| `engine_settled` | `bool` | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `str` |  |
| `refrigerant` | `list` |  |
| `transmission` | `list` |  |
| `vehicle` | `Any` |  |
| `warnings` | `list` |  |

#### Example: List

```python
vin_fluids = client.VinFluid().list({"id": "example"})
```


### VinFuel

Create an instance: `vin_fuel = client.VinFuel()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `dict` | The day each country's fuel ratings were current. |
| `attribution` | `list` |  |
| `decode` | `dict` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Any` |  |
| `engine_settled` | `bool` | Whether `ratings` is narrowed to `engine`. |
| `id` | `str` |  |
| `ratings` | `list` |  |
| `vehicle` | `Any` |  |
| `warnings` | `list` |  |

#### Example: List

```python
vin_fuels = client.VinFuel().list({"id": "example"})
```


### VinLabor

Create an instance: `vin_labor = client.VinLabor()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `str | None` |  |
| `attribution` | `list` |  |
| `class` | `Any` |  |
| `decode` | `dict` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `str | None` |  |
| `estimates` | `list` |  |
| `id` | `str` |  |
| `note` | `str` |  |
| `vehicle` | `Any` |  |
| `warnings` | `list` |  |

#### Example: Load

```python
vin_labor = client.VinLabor().load({"id": "vin_labor_id", "vin_id": "vin_id"})
```

#### Example: List

```python
vin_labors = client.VinLabor().list({"id": "example"})
```


### VinRecall

Create an instance: `vin_recall = client.VinRecall()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `dict` | The day each country's recall data was current. |
| `attribution` | `list` |  |
| `decode` | `dict` | What a VIN decoded to, as far as recalls need it. |
| `id` | `str` |  |
| `lookup` | `dict` | Where to check one vehicle for open recalls. |
| `may_apply` | `bool` | Always `true`. |
| `recalls` | `list` |  |
| `vehicle` | `Any` |  |
| `warnings` | `list` | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

#### Example: List

```python
vin_recalls = client.VinRecall().list({"id": "example"})
```


### VinSpec

Create an instance: `vin_spec = client.VinSpec()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `str | None` |  |
| `attribution` | `list` |  |
| `decode` | `dict` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Any` |  |
| `engine_settled` | `bool` | Whether `specs` is narrowed to `engine`. |
| `id` | `str` |  |
| `specs` | `list` |  |
| `vehicle` | `Any` |  |
| `warnings` | `list` |  |

#### Example: List

```python
vin_specs = client.VinSpec().list({"id": "example"})
```


### VinTire

Create an instance: `vin_tire = client.VinTire()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `str | None` |  |
| `attribution` | `list` |  |
| `decode` | `dict` | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `list` | Every fitment of the model year. |
| `id` | `str` |  |
| `vehicle` | `Any` |  |
| `warnings` | `list` |  |

#### Example: List

```python
vin_tires = client.VinTire().list({"id": "example"})
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── wenmarvin_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`wenmarvin_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
entry = client.Entry()
entry.list({"q": "example"})

# entry.data_get() now returns the entry data from the last list
# entry.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
