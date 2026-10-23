# WenmarVin Lua SDK



The Lua SDK for the WenmarVin API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Batch()` — each with the same small set of operations (`list`, `load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/wenmar-vin-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("wenmar-vin_sdk")

local client = sdk.new()
```

### 3. Load a vehiclecode

VehicleCode is nested under vehicle, so provide the `vehicle_id`.

`load` returns the entity; `data_get()` reads its record.

```lua
local vehiclecode, err = client:VehicleCode():load({ vehicle_id = "example_vehicle_id", id = "example_id" })
if err then error(err) end
local rec = vehiclecode:data_get()
print(rec["id"])
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Batch():create({ vins = {} })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local entrys, err = client:Entry():list({ q = "example" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Entry():list({ q = "example" })
-- result is an array of entities, one per mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### WenmarVinSDK

```lua
local sdk = require("wenmar-vin_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### WenmarVinSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local bulletin, err = client:Bulletin():load({ id = "example_id" })
    if err then error(err) end
    -- bulletin is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local batch = client:Batch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `vins` | `table` | At most 50 VINs. |

#### Example: Create

```lua
local batch, err = client:Batch():create({
  vins = {}, -- table
})
```


### Bulletin

Create an instance: `local bulletin = client:Bulletin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string|nil` |  |
| `attribution` | `table` |  |
| `codes` | `table` | The trouble codes the summary names. |
| `component` | `string|nil` | NHTSA's components, in its words, separated by `; `. |
| `components` | `table` | The components it is about, systems first. |
| `date` | `string|nil` | The manufacturer's own date. |
| `date_added` | `string` | The day NHTSA published it. |
| `document` | `any` |  |
| `document_id` | `string|nil` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` |  |
| `mfr_campaign` | `string|nil` | The manufacturer's campaign id or software version. |
| `mfr_system` | `string|nil` | The manufacturer's own words for the system. |
| `nhtsa_id` | `number` | NHTSA's id number for the communication. |
| `note` | `string` |  |
| `replaces` | `string|nil` | The number of the bulletin this one replaces. |
| `summary` | `string|nil` | NHTSA's summary of the communication. |
| `topics` | `table` |  |
| `type` | `string` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | The type in words. |
| `url` | `string` | The bulletin's page on this site. |
| `vehicles` | `table` |  |

#### Example: Load

```lua
local bulletin, err = client:Bulletin():load({ id = "bulletin_id" })
```

#### Example: List

```lua
local bulletins, err = client:Bulletin():list()
```


### Code

Create an instance: `local code = client:Code(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `table` | The credit lines the data's licences ask for. |
| `checked` | `string` | The day it was approved. |
| `checks` | `table` | What a technician usually verifies first. |
| `code` | `string` |  |
| `common_causes` | `table` | General causes, not about one make. |
| `components` | `table` |  |
| `generic` | `boolean` | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `string` |  |
| `meaning` | `string` | What the code tells a service advisor. |
| `note` | `string` | What a description is and is not. |
| `related` | `table` | Related codes that are described too. |
| `reviewer` | `string` | The GitHub name of the person who approved the text. |
| `system` | `string` | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `string` |  |
| `title` | `string` |  |
| `url` | `string` | The code's page on this site. |

#### Example: Load

```lua
local code, err = client:Code():load({ id = "code_id" })
```

#### Example: List

```lua
local codes, err = client:Code():list()
```


### Data

Create an instance: `local data = client:Data(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_at` | `string` | When the data file was built, in UTC. |
| `data_version` | `string` | The data release, such as `2026.09`. |
| `datasets` | `table` | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `string` | The version of the server. |
| `vpic_release` | `string` | The NHTSA vPIC release the data was built from. |

#### Example: Load

```lua
local data, err = client:Data():load()
```


### Engine

Create an instance: `local engine = client:Engine(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `label` | `string` |  |
| `preset` | `boolean` | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `string|nil` | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

#### Example: List

```lua
local engines, err = client:Engine():list({ make = "example", model = "example", year = 1 })
```


### Entry

Create an instance: `local entry = client:Entry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string|nil` |  |
| `drive` | `string|nil` |  |
| `engine` | `string|nil` |  |
| `id` | `string` | The stable id. |
| `make` | `string` |  |
| `model` | `string` |  |
| `submodel` | `string|nil` |  |
| `summary` | `string` | One line naming everything above that is known. |
| `transmission` | `string|nil` |  |
| `vehicle_types` | `table` | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `number` |  |

#### Example: Load

```lua
local entry, err = client:Entry():load({ id = "entry_id" })
```

#### Example: List

```lua
local entrys, err = client:Entry():list({ q = "example" })
```


### Job

Create an instance: `local job = client:Job(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `table` | The credit the labour estimates ask for. |
| `components` | `table` |  |
| `estimates` | `table|nil` | The job's class-scope figures. |
| `excludes` | `table` | Work often done at the same visit that is not part of this job. |
| `id` | `string` | The job's id. |
| `includes` | `table` | The work the job covers. |
| `name` | `string` |  |
| `note` | `string` | What an estimate is not. |
| `related` | `table` |  |
| `system` | `string` | The id of the system the job belongs to. |
| `system_name` | `string` |  |
| `url` | `string` | The job's page on this site. |

#### Example: Load

```lua
local job, err = client:Job():load({ id = "job_id" })
```

#### Example: List

```lua
local jobs, err = client:Job():list()
```


### Make

Create an instance: `local make = client:Make(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | The make's id form. |
| `links` | `any` |  |
| `name` | `string` |  |
| `popular` | `boolean` | Whether it is on the list of popular makes. |

#### Example: Load

```lua
local make, err = client:Make():load({ id = "make_id" })
```

#### Example: List

```lua
local makes, err = client:Make():list()
```


### Model

Create an instance: `local model = client:Model(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `table` | The day each country's recall data was current. |
| `attribution` | `table` |  |
| `id` | `string` | The model's id form. |
| `lookup` | `table` | Where to check one vehicle for open recalls. |
| `make` | `table` | A make or a model: its id form and its name. |
| `may_apply` | `boolean` | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `table` | A make or a model: its id form and its name. |
| `name` | `string` |  |
| `year_from` | `number` | The first and last model year the model exists in. |
| `year_to` | `number` |  |
| `years` | `table` |  |

#### Example: Load

```lua
local model, err = client:Model():load({ make = "make", model = "model" })
```

#### Example: List

```lua
local models, err = client:Model():list({ make = "example" })
```


### Overview

Create an instance: `local overview = client:Overview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `string` |  |
| `suggestions` | `table` | VINs the caller may have meant. |

#### Example: List

```lua
local overviews, err = client:Overview():list({ vehicle_id = "example" })
```


### PartsCard

Create an instance: `local parts_card = client:PartsCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `table` |  |
| `engine_settled` | `boolean` | Whether the decode settled one catalog engine. |
| `lines` | `table` |  |
| `text` | `string` | The lines as plain text, one `Label: value` each. |
| `vehicle` | `any` |  |
| `vin` | `string` |  |
| `warnings` | `table` |  |

#### Example: List

```lua
local parts_cards, err = client:PartsCard():list({ vin_id = "example" })
```


### PayrollDeduction

Create an instance: `local payroll_deduction = client:PayrollDeduction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meaning` | `string` | What the factor means. |
| `name` | `string` | The name the engine gives the factor. |
| `value` | `number` | The value used, after rounding. |

#### Example: List

```lua
local payroll_deductions, err = client:PayrollDeduction():list()
```


### Recall

Create an instance: `local recall = client:Recall(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string|nil` | The day this publisher's data was current. |
| `attribution` | `table` |  |
| `built_from` | `string|nil` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `string|nil` |  |
| `campaign` | `string` | The publisher's campaign number. |
| `completion` | `any` |  |
| `component` | `string|nil` | The component, as the source words it. |
| `consequence` | `string|nil` |  |
| `country` | `string` | `us` or `ca`. |
| `date` | `string|nil` | The day the campaign was reported. |
| `do_not_drive` | `boolean|nil` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `any` |  |
| `id` | `string` |  |
| `lookup` | `table` | Where to check one vehicle for open recalls. |
| `manufacturer` | `string|nil` |  |
| `match` | `string|nil` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `boolean` | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `string|nil` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `table` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `string|nil` |  |
| `notification` | `string|nil` | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `string|nil` | The day owners were notified. |
| `park_outside` | `boolean|nil` | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `string|nil` | The manufacturer's part numbers, separated by commas. |
| `remedy` | `string|nil` |  |
| `source` | `string` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `string|nil` | What is wrong, in the source's words. |
| `units` | `number|nil` | Units potentially affected. |
| `url` | `string` | The campaign's page on this site. |
| `vehicles` | `table` | Every vehicle the campaign lists, by make, model and year. |

#### Example: Load

```lua
local recall, err = client:Recall():load({ campaign = "campaign", source = "source" })
```

#### Example: List

```lua
local recalls, err = client:Recall():list()
```


### RecallInvestigation

Create an instance: `local recall_investigation = client:RecallInvestigation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | NHTSA's action number. |
| `campaigns` | `table` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `string|nil` | The day it was closed. |
| `component` | `string|nil` | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `string` | The letters the number starts with. |
| `kind_name` | `string|nil` | The kind in words. |
| `manufacturer` | `string|nil` | The manufacturers it names, separated by `; `. |
| `match` | `string|nil` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `table` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `boolean` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `string|nil` | The day it was opened. |
| `subject` | `string|nil` | NHTSA's one-line subject. |
| `summary` | `string|nil` | NHTSA's summary. |

#### Example: List

```lua
local recall_investigations, err = client:RecallInvestigation():list({ campaign = "example", recall_id = "example" })
```


### Recent

Create an instance: `local recent = client:Recent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `recall` | `table` | One recall campaign in a list. |
| `vehicles` | `table` | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `number` | How many vehicles the campaign lists in all. |

#### Example: List

```lua
local recents, err = client:Recent():list()
```


### Submodel

Create an instance: `local submodel = client:Submodel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `kind` | `string` | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `string` |  |

#### Example: List

```lua
local submodels, err = client:Submodel():list({ make = "example", model = "example", year = 1 })
```


### Vehicle

Create an instance: `local vehicle = client:Vehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local vehicles, err = client:Vehicle():list()
```


### VehicleBulletin

Create an instance: `local vehicle_bulletin = client:VehicleBulletin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component` | `string|nil` | NHTSA's components, in its words, separated by `; `. |
| `date` | `string|nil` | The manufacturer's own date. |
| `date_added` | `string` | The day NHTSA published it. |
| `document` | `any` |  |
| `document_id` | `string|nil` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` |  |
| `mfr_campaign` | `string|nil` | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `number` | NHTSA's id number for the communication. |
| `summary` | `string|nil` | NHTSA's summary of the communication. |
| `type` | `string` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | The type in words. |
| `url` | `string` | The bulletin's page on this site. |

#### Example: List

```lua
local vehicle_bulletins, err = client:VehicleBulletin():list({ id = "example" })
```


### VehicleCode

Create an instance: `local vehicle_code = client:VehicleCode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `table` |  |
| `bulletins` | `any` |  |
| `code` | `string` |  |
| `description` | `string` |  |
| `generic` | `boolean` | Whether every maker uses the code the same way. |
| `id` | `string` |  |
| `note` | `string` |  |
| `related` | `table` | What else is held for the model year about the components a code concerns. |
| `url` | `string` | The page of this code on this model year. |
| `vehicle` | `table` | The model year an answer is about. |

#### Example: Load

```lua
local vehicle_code, err = client:VehicleCode():load({ id = "vehicle_code_id", vehicle_id = "vehicle_id" })
```


### VehicleComplaint

Create an instance: `local vehicle_complaint = client:VehicleComplaint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `complaints` | `number` |  |
| `crashes` | `number` | Complaints that report a crash. |
| `fires` | `number` | Complaints that report a fire. |
| `id` | `string` | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `number` | Complaints that report at least one person injured. |
| `median_km` | `number|nil` | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `number|nil` | The same in miles, as NHTSA records it. |
| `name` | `string` |  |
| `parent` | `string|nil` | The system a part belongs to. |

#### Example: List

```lua
local vehicle_complaints, err = client:VehicleComplaint():list({ id = "example" })
```


### VehicleFluid

Create an instance: `local vehicle_fluid = client:VehicleFluid(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string|nil` | The day EPA's oil grades were current. |
| `attribution` | `table` |  |
| `brake` | `table` |  |
| `checked_as_of` | `string|nil` | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `table` |  |
| `engine_oil` | `table` |  |
| `engine_oil_checked` | `table` |  |
| `id` | `string` |  |
| `refrigerant` | `table` |  |
| `transmission` | `table` |  |
| `vehicle` | `table` | The model year an answer is about. |

#### Example: List

```lua
local vehicle_fluids, err = client:VehicleFluid():list({ id = "example" })
```


### VehicleFuel

Create an instance: `local vehicle_fuel = client:VehicleFuel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `co2_g_km` | `number|nil` | Tailpipe carbon dioxide, combined. |
| `confidence` | `string` | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `string` | `us` or `ca`. |
| `cylinders` | `number|nil` |  |
| `described_as` | `string` | The source's own name for the vehicle rated. |
| `displacement_l` | `number|nil` |  |
| `drive` | `string|nil` |  |
| `engine` | `any` |  |
| `fuel_grade` | `string` | The fuel the figures are for, which is the recommended grade. |
| `id` | `string` |  |
| `kwh_100km` | `number|nil` | Combined electricity use. |
| `l_100km` | `any` |  |
| `match` | `string` | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `any` |  |
| `range_km` | `number|nil` | On a full battery. |
| `range_mi` | `number|nil` |  |
| `second_fuel` | `string|nil` | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `string` | `epa` or `nrcan`. |
| `source_id` | `string|nil` | EPA's id for the rating. |
| `transmission` | `string|nil` |  |

#### Example: List

```lua
local vehicle_fuels, err = client:VehicleFuel():list({ id = "example" })
```


### VehicleInvestigation

Create an instance: `local vehicle_investigation = client:VehicleInvestigation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | NHTSA's action number. |
| `campaigns` | `table` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `string|nil` | The day it was closed. |
| `component` | `string|nil` | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `string` |  |
| `kind` | `string` | The letters the number starts with. |
| `kind_name` | `string|nil` | The kind in words. |
| `manufacturer` | `string|nil` | The manufacturers it names, separated by `; `. |
| `match` | `string|nil` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `table` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `boolean` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `string|nil` | The day it was opened. |
| `subject` | `string|nil` | NHTSA's one-line subject. |
| `summary` | `string|nil` | NHTSA's summary. |

#### Example: List

```lua
local vehicle_investigations, err = client:VehicleInvestigation():list({ id = "example" })
```


### VehicleLabor

Create an instance: `local vehicle_labor = client:VehicleLabor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string|nil` | The newest day an estimate was changed. |
| `attribution` | `table` |  |
| `basis` | `string` | `expert`: written by a person who does the work. |
| `class` | `any` | The class, for a class-scope figure. |
| `class_name` | `string|nil` |  |
| `engine` | `string|nil` | The engine the vehicle id named, as an id form. |
| `estimates` | `table` | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `table` | Hours, as numbers of hours. |
| `id` | `string` |  |
| `job` | `string` | The job's id. |
| `name` | `string` |  |
| `note` | `string` | "An estimate, not a quote. |
| `notes` | `string|nil` |  |
| `sample` | `any` |  |
| `scope` | `string` | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `string` | The day the figure was last changed. |
| `url` | `string` | The job's page on this site. |
| `vehicle` | `table` | The model year an answer is about. |
| `years` | `any` |  |

#### Example: Load

```lua
local vehicle_labor, err = client:VehicleLabor():load({ id = "vehicle_labor_id", vehicle_id = "vehicle_id" })
```

#### Example: List

```lua
local vehicle_labors, err = client:VehicleLabor():list({ id = "example" })
```


### VehicleRecall

Create an instance: `local vehicle_recall = client:VehicleRecall(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_from` | `string|nil` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `string|nil` |  |
| `campaign` | `string` | The publisher's campaign number. |
| `component` | `string|nil` | The component, as the source words it. |
| `country` | `string` | `us` or `ca`. |
| `date` | `string|nil` | The day the campaign was reported. |
| `do_not_drive` | `boolean|nil` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `string` |  |
| `manufacturer` | `string|nil` |  |
| `match` | `string|nil` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `string|nil` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `table` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `string|nil` | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `boolean|nil` | NHTSA's advisory to park outside, away from buildings. |
| `source` | `string` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `string|nil` | What is wrong, in the source's words. |
| `units` | `number|nil` | Units potentially affected. |
| `url` | `string` | The campaign's page on this site. |

#### Example: List

```lua
local vehicle_recalls, err = client:VehicleRecall():list({ id = "example" })
```


### VehicleSafety

Create an instance: `local vehicle_safety = client:VehicleSafety(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body_style` | `string|nil` |  |
| `curb_weight_kg` | `number|nil` | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `number|nil` |  |
| `description` | `string` | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `string|nil` |  |
| `features` | `table` | The safety features NHTSA lists with a rating. |
| `id` | `string` |  |
| `match` | `string` | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `string` | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `table` | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `number` | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `number|nil` | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `boolean|nil` | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `table` | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `string|nil` |  |

#### Example: List

```lua
local vehicle_safetys, err = client:VehicleSafety():list({ id = "example" })
```


### VehicleSpec

Create an instance: `local vehicle_spec = client:VehicleSpec(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `battery_type` | `string|nil` |  |
| `battery_voltage` | `number|nil` |  |
| `confidence` | `string` | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `boolean|nil` |  |
| `cylinder_deactivation_name` | `string|nil` | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `string` |  |
| `drive` | `string|nil` |  |
| `electrification` | `string|nil` | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `table` |  |
| `engine` | `any` |  |
| `ev_motor` | `string|nil` |  |
| `exhaust_valves` | `number|nil` |  |
| `fuel_grade` | `string` |  |
| `fuel_usage` | `string|nil` | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `number|nil` |  |
| `id` | `string` |  |
| `intake_valves` | `number|nil` | Per cylinder. |
| `luggage_volume_ft3` | `number|nil` |  |
| `luggage_volume_l` | `number|nil` |  |
| `motor_kw` | `string|nil` | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `number|nil` |  |
| `passenger_volume_l` | `number|nil` |  |
| `size_class` | `string` |  |
| `source` | `string` |  |
| `source_id` | `string` |  |
| `start_stop` | `boolean|nil` |  |
| `supercharger` | `boolean` |  |
| `transmission` | `string|nil` |  |
| `transmission_type` | `string|nil` |  |
| `turbo` | `boolean` |  |
| `variable_valve_lift` | `boolean|nil` |  |
| `variable_valve_timing` | `boolean|nil` |  |

#### Example: List

```lua
local vehicle_specs, err = client:VehicleSpec():list({ id = "example" })
```


### VehicleTire

Create an instance: `local vehicle_tire = client:VehicleTire(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bolt_pattern` | `string|nil` |  |
| `checked` | `string` |  |
| `id` | `string` |  |
| `lug_torque_lbft` | `number|nil` |  |
| `lug_torque_nm` | `number|nil` |  |
| `lug_torque_written_in` | `string|nil` | `nm` or `lbft`. |
| `market` | `string|nil` |  |
| `pressure_kpa` | `any` |  |
| `pressure_psi` | `any` |  |
| `pressure_written_in` | `string|nil` | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `string` | The size as printed. |
| `size_rear` | `string|nil` | The rear size, only when it differs from the front. |
| `source` | `string` |  |
| `trims` | `table` | The trims the document ties the size to, as it names them. |

#### Example: List

```lua
local vehicle_tires, err = client:VehicleTire():list({ id = "example" })
```


### Vin

Create an instance: `local vin = client:Vin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_price_usd` | `number|nil` | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `string|nil` |  |
| `catalog` | `any` |  |
| `check_digit` | `table` |  |
| `doors` | `number|nil` |  |
| `drivetrain` | `string|nil` |  |
| `engine` | `any` |  |
| `gvwr` | `string|nil` | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `string` |  |
| `make` | `string|nil` |  |
| `manufacturer` | `table` |  |
| `model` | `string|nil` |  |
| `plant` | `table` | Where the vehicle was built. |
| `recalls` | `any` |  |
| `safety` | `any` |  |
| `seat_rows` | `number|nil` |  |
| `seats` | `number|nil` |  |
| `series` | `string|nil` |  |
| `transmission` | `string|nil` |  |
| `transmission_speeds` | `number|nil` |  |
| `trim` | `string|nil` |  |
| `valid` | `boolean` | Whether the check digit, position 9, is right. |
| `vin` | `string` |  |
| `warnings` | `table` | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `number|nil` | Front wheel diameter in inches. |
| `wheel_size_rear` | `number|nil` | Rear wheel diameter in inches. |
| `year` | `number|nil` |  |

#### Example: Load

```lua
local vin, err = client:Vin():load({ id = "vin_id" })
```


### VinBulletin

Create an instance: `local vin_bulletin = client:VinBulletin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string|nil` |  |
| `attribution` | `table` |  |
| `bulletins` | `table` |  |
| `counts` | `table` | What the bulletins of one model year are, in numbers. |
| `decode` | `table` | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` |  |
| `next_cursor` | `string|nil` |  |
| `note` | `string` |  |
| `vehicle` | `any` |  |
| `warnings` | `table` |  |

#### Example: List

```lua
local vin_bulletins, err = client:VinBulletin():list({ id = "example" })
```


### VinFluid

Create an instance: `local vin_fluid = client:VinFluid(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string|nil` |  |
| `attribution` | `table` |  |
| `brake` | `table` |  |
| `checked_as_of` | `string|nil` |  |
| `coolant` | `table` |  |
| `decode` | `table` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `engine_oil` | `table` |  |
| `engine_oil_checked` | `table` | Narrowed as `engine_oil` is. |
| `engine_settled` | `boolean` | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `string` |  |
| `refrigerant` | `table` |  |
| `transmission` | `table` |  |
| `vehicle` | `any` |  |
| `warnings` | `table` |  |

#### Example: List

```lua
local vin_fluids, err = client:VinFluid():list({ id = "example" })
```


### VinFuel

Create an instance: `local vin_fuel = client:VinFuel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `table` | The day each country's fuel ratings were current. |
| `attribution` | `table` |  |
| `decode` | `table` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `engine_settled` | `boolean` | Whether `ratings` is narrowed to `engine`. |
| `id` | `string` |  |
| `ratings` | `table` |  |
| `vehicle` | `any` |  |
| `warnings` | `table` |  |

#### Example: List

```lua
local vin_fuels, err = client:VinFuel():list({ id = "example" })
```


### VinLabor

Create an instance: `local vin_labor = client:VinLabor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string|nil` |  |
| `attribution` | `table` |  |
| `class` | `any` |  |
| `decode` | `table` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `string|nil` |  |
| `estimates` | `table` |  |
| `id` | `string` |  |
| `note` | `string` |  |
| `vehicle` | `any` |  |
| `warnings` | `table` |  |

#### Example: Load

```lua
local vin_labor, err = client:VinLabor():load({ id = "vin_labor_id", vin_id = "vin_id" })
```

#### Example: List

```lua
local vin_labors, err = client:VinLabor():list({ id = "example" })
```


### VinRecall

Create an instance: `local vin_recall = client:VinRecall(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `table` | The day each country's recall data was current. |
| `attribution` | `table` |  |
| `decode` | `table` | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` |  |
| `lookup` | `table` | Where to check one vehicle for open recalls. |
| `may_apply` | `boolean` | Always `true`. |
| `recalls` | `table` |  |
| `vehicle` | `any` |  |
| `warnings` | `table` | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

#### Example: List

```lua
local vin_recalls, err = client:VinRecall():list({ id = "example" })
```


### VinSpec

Create an instance: `local vin_spec = client:VinSpec(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string|nil` |  |
| `attribution` | `table` |  |
| `decode` | `table` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `engine_settled` | `boolean` | Whether `specs` is narrowed to `engine`. |
| `id` | `string` |  |
| `specs` | `table` |  |
| `vehicle` | `any` |  |
| `warnings` | `table` |  |

#### Example: List

```lua
local vin_specs, err = client:VinSpec():list({ id = "example" })
```


### VinTire

Create an instance: `local vin_tire = client:VinTire(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string|nil` |  |
| `attribution` | `table` |  |
| `decode` | `table` | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `table` | Every fitment of the model year. |
| `id` | `string` |  |
| `vehicle` | `any` |  |
| `warnings` | `table` |  |

#### Example: List

```lua
local vin_tires, err = client:VinTire():list({ id = "example" })
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── wenmar-vin_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`wenmar-vin_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local entry = client:Entry()
entry:list({ q = "example" })

-- entry:data_get() now returns the entry data from the last list
-- entry:match_get() returns the last match criteria
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
