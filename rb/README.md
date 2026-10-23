# WenmarVin Ruby SDK



The Ruby SDK for the WenmarVin API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Batch` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/wenmar-vin-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/wenmar-vin-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-wenmar-vin-sdk", path: "./wenmar-vin-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "WenmarVin_sdk"

client = WenmarVinSDK.new
```

### 3. Load a vehiclecode

VehicleCode is nested under vehicle, so provide the `vehicle_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the VehicleCode record (raises on error).
  vehiclecode = client.VehicleCode.load({ "vehicle_id" => "example_vehicle_id", "id" => "example_id" })
  puts vehiclecode.data_get
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Batch record.
created = client.Batch.create({ "vins" => [] })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  entrys = client.Entry.list({ "q" => "example" })
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = WenmarVinSDK.test({
  "entity" => { "entry" => { "test01" => { "id" => "test01", "q" => "example" } } },
})

# list returns an Array of Entry entities, one per mock record (raises on
# error); data_get reads each record.
entrys = client.Entry.list({ "q" => "example" })
entrys.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = WenmarVinSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### WenmarVinSDK

```ruby
require_relative "WenmarVin_sdk"
client = WenmarVinSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = WenmarVinSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### WenmarVinSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`WenmarVinError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `batch = client.Batch`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `vins` | `Array` | At most 50 VINs. |

#### Example: Create

```ruby
batch = client.Batch.create({
  "vins" => [], # Array
})
```


### Bulletin

Create an instance: `bulletin = client.Bulletin`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Object` |  |
| `attribution` | `Array` |  |
| `codes` | `Array` | The trouble codes the summary names. |
| `component` | `Object` | NHTSA's components, in its words, separated by `; `. |
| `components` | `Array` | The components it is about, systems first. |
| `date` | `Object` | The manufacturer's own date. |
| `date_added` | `String` | The day NHTSA published it. |
| `document` | `Object` |  |
| `document_id` | `Object` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `String` |  |
| `mfr_campaign` | `Object` | The manufacturer's campaign id or software version. |
| `mfr_system` | `Object` | The manufacturer's own words for the system. |
| `nhtsa_id` | `Integer` | NHTSA's id number for the communication. |
| `note` | `String` |  |
| `replaces` | `Object` | The number of the bulletin this one replaces. |
| `summary` | `Object` | NHTSA's summary of the communication. |
| `topics` | `Array` |  |
| `type` | `String` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `String` | The type in words. |
| `url` | `String` | The bulletin's page on this site. |
| `vehicles` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Bulletin record (raises on error).
bulletin = client.Bulletin.load({ "id" => "bulletin_id" })
```

#### Example: List

```ruby
# list returns an Array of Bulletin entities, one per record (raises on error).
bulletins = client.Bulletin.list
bulletins.each { |item| puts item.data_get }
```


### Code

Create an instance: `code = client.Code`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `Array` | The credit lines the data's licences ask for. |
| `checked` | `String` | The day it was approved. |
| `checks` | `Array` | What a technician usually verifies first. |
| `code` | `String` |  |
| `common_causes` | `Array` | General causes, not about one make. |
| `components` | `Array` |  |
| `generic` | `Boolean` | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `String` |  |
| `meaning` | `String` | What the code tells a service advisor. |
| `note` | `String` | What a description is and is not. |
| `related` | `Array` | Related codes that are described too. |
| `reviewer` | `String` | The GitHub name of the person who approved the text. |
| `system` | `String` | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `String` |  |
| `title` | `String` |  |
| `url` | `String` | The code's page on this site. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Code record (raises on error).
code = client.Code.load({ "id" => "code_id" })
```

#### Example: List

```ruby
# list returns an Array of Code entities, one per record (raises on error).
codes = client.Code.list
codes.each { |item| puts item.data_get }
```


### Data

Create an instance: `data = client.Data`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_at` | `String` | When the data file was built, in UTC. |
| `data_version` | `String` | The data release, such as `2026.09`. |
| `datasets` | `Hash` | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `String` | The version of the server. |
| `vpic_release` | `String` | The NHTSA vPIC release the data was built from. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Data record (raises on error).
data = client.Data.load()
```


### Engine

Create an instance: `engine = client.Engine`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `label` | `String` |  |
| `preset` | `Boolean` | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `Object` | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

#### Example: List

```ruby
# list returns an Array of Engine entities, one per record (raises on error).
engines = client.Engine.list({ "make" => "example", "model" => "example", "year" => 1 })
engines.each { |item| puts item.data_get }
```


### Entry

Create an instance: `entry = client.Entry`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `Object` |  |
| `drive` | `Object` |  |
| `engine` | `Object` |  |
| `id` | `String` | The stable id. |
| `make` | `String` |  |
| `model` | `String` |  |
| `submodel` | `Object` |  |
| `summary` | `String` | One line naming everything above that is known. |
| `transmission` | `Object` |  |
| `vehicle_types` | `Array` | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Entry record (raises on error).
entry = client.Entry.load({ "id" => "entry_id" })
```

#### Example: List

```ruby
# list returns an Array of Entry entities, one per record (raises on error).
entrys = client.Entry.list({ "q" => "example" })
entrys.each { |item| puts item.data_get }
```


### Job

Create an instance: `job = client.Job`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `Array` | The credit the labour estimates ask for. |
| `components` | `Array` |  |
| `estimates` | `Object` | The job's class-scope figures. |
| `excludes` | `Array` | Work often done at the same visit that is not part of this job. |
| `id` | `String` | The job's id. |
| `includes` | `Array` | The work the job covers. |
| `name` | `String` |  |
| `note` | `String` | What an estimate is not. |
| `related` | `Array` |  |
| `system` | `String` | The id of the system the job belongs to. |
| `system_name` | `String` |  |
| `url` | `String` | The job's page on this site. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Job record (raises on error).
job = client.Job.load({ "id" => "job_id" })
```

#### Example: List

```ruby
# list returns an Array of Job entities, one per record (raises on error).
jobs = client.Job.list
jobs.each { |item| puts item.data_get }
```


### Make

Create an instance: `make = client.Make`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` | The make's id form. |
| `links` | `Object` |  |
| `name` | `String` |  |
| `popular` | `Boolean` | Whether it is on the list of popular makes. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Make record (raises on error).
make = client.Make.load({ "id" => "make_id" })
```

#### Example: List

```ruby
# list returns an Array of Make entities, one per record (raises on error).
makes = client.Make.list
makes.each { |item| puts item.data_get }
```


### Model

Create an instance: `model = client.Model`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Hash` | The day each country's recall data was current. |
| `attribution` | `Array` |  |
| `id` | `String` | The model's id form. |
| `lookup` | `Hash` | Where to check one vehicle for open recalls. |
| `make` | `Hash` | A make or a model: its id form and its name. |
| `may_apply` | `Boolean` | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `Hash` | A make or a model: its id form and its name. |
| `name` | `String` |  |
| `year_from` | `Integer` | The first and last model year the model exists in. |
| `year_to` | `Integer` |  |
| `years` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Model record (raises on error).
model = client.Model.load({ "make" => "make", "model" => "model" })
```

#### Example: List

```ruby
# list returns an Array of Model entities, one per record (raises on error).
models = client.Model.list({ "make" => "example" })
models.each { |item| puts item.data_get }
```


### Overview

Create an instance: `overview = client.Overview`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `String` | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `String` |  |
| `suggestions` | `Array` | VINs the caller may have meant. |

#### Example: List

```ruby
# list returns an Array of Overview entities, one per record (raises on error).
overviews = client.Overview.list({ "vehicle_id" => "example" })
overviews.each { |item| puts item.data_get }
```


### PartsCard

Create an instance: `parts_card = client.PartsCard`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `Array` |  |
| `engine_settled` | `Boolean` | Whether the decode settled one catalog engine. |
| `lines` | `Array` |  |
| `text` | `String` | The lines as plain text, one `Label: value` each. |
| `vehicle` | `Object` |  |
| `vin` | `String` |  |
| `warnings` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of PartsCard entities, one per record (raises on error).
parts_cards = client.PartsCard.list({ "vin_id" => "example" })
parts_cards.each { |item| puts item.data_get }
```


### PayrollDeduction

Create an instance: `payroll_deduction = client.PayrollDeduction`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meaning` | `String` | What the factor means. |
| `name` | `String` | The name the engine gives the factor. |
| `value` | `Float` | The value used, after rounding. |

#### Example: List

```ruby
# list returns an Array of PayrollDeduction entities, one per record (raises on error).
payroll_deductions = client.PayrollDeduction.list
payroll_deductions.each { |item| puts item.data_get }
```


### Recall

Create an instance: `recall = client.Recall`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Object` | The day this publisher's data was current. |
| `attribution` | `Array` |  |
| `built_from` | `Object` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `Object` |  |
| `campaign` | `String` | The publisher's campaign number. |
| `completion` | `Object` |  |
| `component` | `Object` | The component, as the source words it. |
| `consequence` | `Object` |  |
| `country` | `String` | `us` or `ca`. |
| `date` | `Object` | The day the campaign was reported. |
| `do_not_drive` | `Object` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `Object` |  |
| `id` | `String` |  |
| `lookup` | `Hash` | Where to check one vehicle for open recalls. |
| `manufacturer` | `Object` |  |
| `match` | `Object` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `Boolean` | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `Object` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `Array` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `Object` |  |
| `notification` | `Object` | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `Object` | The day owners were notified. |
| `park_outside` | `Object` | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `Object` | The manufacturer's part numbers, separated by commas. |
| `remedy` | `Object` |  |
| `source` | `String` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `Object` | What is wrong, in the source's words. |
| `units` | `Object` | Units potentially affected. |
| `url` | `String` | The campaign's page on this site. |
| `vehicles` | `Array` | Every vehicle the campaign lists, by make, model and year. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Recall record (raises on error).
recall = client.Recall.load({ "campaign" => "campaign", "source" => "source" })
```

#### Example: List

```ruby
# list returns an Array of Recall entities, one per record (raises on error).
recalls = client.Recall.list
recalls.each { |item| puts item.data_get }
```


### RecallInvestigation

Create an instance: `recall_investigation = client.RecallInvestigation`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` | NHTSA's action number. |
| `campaigns` | `Array` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `Object` | The day it was closed. |
| `component` | `Object` | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `String` | The letters the number starts with. |
| `kind_name` | `Object` | The kind in words. |
| `manufacturer` | `Object` | The manufacturers it names, separated by `; `. |
| `match` | `Object` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `Array` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `Boolean` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `Object` | The day it was opened. |
| `subject` | `Object` | NHTSA's one-line subject. |
| `summary` | `Object` | NHTSA's summary. |

#### Example: List

```ruby
# list returns an Array of RecallInvestigation entities, one per record (raises on error).
recall_investigations = client.RecallInvestigation.list({ "campaign" => "example", "recall_id" => "example" })
recall_investigations.each { |item| puts item.data_get }
```


### Recent

Create an instance: `recent = client.Recent`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `recall` | `Hash` | One recall campaign in a list. |
| `vehicles` | `Array` | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `Integer` | How many vehicles the campaign lists in all. |

#### Example: List

```ruby
# list returns an Array of Recent entities, one per record (raises on error).
recents = client.Recent.list
recents.each { |item| puts item.data_get }
```


### Submodel

Create an instance: `submodel = client.Submodel`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `kind` | `String` | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Submodel entities, one per record (raises on error).
submodels = client.Submodel.list({ "make" => "example", "model" => "example", "year" => 1 })
submodels.each { |item| puts item.data_get }
```


### Vehicle

Create an instance: `vehicle = client.Vehicle`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of Vehicle entities, one per record (raises on error).
vehicles = client.Vehicle.list
vehicles.each { |item| puts item.data_get }
```


### VehicleBulletin

Create an instance: `vehicle_bulletin = client.VehicleBulletin`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component` | `Object` | NHTSA's components, in its words, separated by `; `. |
| `date` | `Object` | The manufacturer's own date. |
| `date_added` | `String` | The day NHTSA published it. |
| `document` | `Object` |  |
| `document_id` | `Object` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `String` |  |
| `mfr_campaign` | `Object` | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `Integer` | NHTSA's id number for the communication. |
| `summary` | `Object` | NHTSA's summary of the communication. |
| `type` | `String` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `String` | The type in words. |
| `url` | `String` | The bulletin's page on this site. |

#### Example: List

```ruby
# list returns an Array of VehicleBulletin entities, one per record (raises on error).
vehicle_bulletins = client.VehicleBulletin.list({ "id" => "example" })
vehicle_bulletins.each { |item| puts item.data_get }
```


### VehicleCode

Create an instance: `vehicle_code = client.VehicleCode`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `Array` |  |
| `bulletins` | `Object` |  |
| `code` | `String` |  |
| `description` | `String` |  |
| `generic` | `Boolean` | Whether every maker uses the code the same way. |
| `id` | `String` |  |
| `note` | `String` |  |
| `related` | `Hash` | What else is held for the model year about the components a code concerns. |
| `url` | `String` | The page of this code on this model year. |
| `vehicle` | `Hash` | The model year an answer is about. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VehicleCode record (raises on error).
vehicle_code = client.VehicleCode.load({ "id" => "vehicle_code_id", "vehicle_id" => "vehicle_id" })
```


### VehicleComplaint

Create an instance: `vehicle_complaint = client.VehicleComplaint`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `complaints` | `Integer` |  |
| `crashes` | `Integer` | Complaints that report a crash. |
| `fires` | `Integer` | Complaints that report a fire. |
| `id` | `String` | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `Integer` | Complaints that report at least one person injured. |
| `median_km` | `Object` | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `Object` | The same in miles, as NHTSA records it. |
| `name` | `String` |  |
| `parent` | `Object` | The system a part belongs to. |

#### Example: List

```ruby
# list returns an Array of VehicleComplaint entities, one per record (raises on error).
vehicle_complaints = client.VehicleComplaint.list({ "id" => "example" })
vehicle_complaints.each { |item| puts item.data_get }
```


### VehicleFluid

Create an instance: `vehicle_fluid = client.VehicleFluid`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Object` | The day EPA's oil grades were current. |
| `attribution` | `Array` |  |
| `brake` | `Array` |  |
| `checked_as_of` | `Object` | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `Array` |  |
| `engine_oil` | `Array` |  |
| `engine_oil_checked` | `Array` |  |
| `id` | `String` |  |
| `refrigerant` | `Array` |  |
| `transmission` | `Array` |  |
| `vehicle` | `Hash` | The model year an answer is about. |

#### Example: List

```ruby
# list returns an Array of VehicleFluid entities, one per record (raises on error).
vehicle_fluids = client.VehicleFluid.list({ "id" => "example" })
vehicle_fluids.each { |item| puts item.data_get }
```


### VehicleFuel

Create an instance: `vehicle_fuel = client.VehicleFuel`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `co2_g_km` | `Object` | Tailpipe carbon dioxide, combined. |
| `confidence` | `String` | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `String` | `us` or `ca`. |
| `cylinders` | `Object` |  |
| `described_as` | `String` | The source's own name for the vehicle rated. |
| `displacement_l` | `Object` |  |
| `drive` | `Object` |  |
| `engine` | `Object` |  |
| `fuel_grade` | `String` | The fuel the figures are for, which is the recommended grade. |
| `id` | `String` |  |
| `kwh_100km` | `Object` | Combined electricity use. |
| `l_100km` | `Object` |  |
| `match` | `String` | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `Object` |  |
| `range_km` | `Object` | On a full battery. |
| `range_mi` | `Object` |  |
| `second_fuel` | `Object` | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `String` | `epa` or `nrcan`. |
| `source_id` | `Object` | EPA's id for the rating. |
| `transmission` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of VehicleFuel entities, one per record (raises on error).
vehicle_fuels = client.VehicleFuel.list({ "id" => "example" })
vehicle_fuels.each { |item| puts item.data_get }
```


### VehicleInvestigation

Create an instance: `vehicle_investigation = client.VehicleInvestigation`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `String` | NHTSA's action number. |
| `campaigns` | `Array` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `Object` | The day it was closed. |
| `component` | `Object` | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `String` |  |
| `kind` | `String` | The letters the number starts with. |
| `kind_name` | `Object` | The kind in words. |
| `manufacturer` | `Object` | The manufacturers it names, separated by `; `. |
| `match` | `Object` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `Array` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `Boolean` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `Object` | The day it was opened. |
| `subject` | `Object` | NHTSA's one-line subject. |
| `summary` | `Object` | NHTSA's summary. |

#### Example: List

```ruby
# list returns an Array of VehicleInvestigation entities, one per record (raises on error).
vehicle_investigations = client.VehicleInvestigation.list({ "id" => "example" })
vehicle_investigations.each { |item| puts item.data_get }
```


### VehicleLabor

Create an instance: `vehicle_labor = client.VehicleLabor`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Object` | The newest day an estimate was changed. |
| `attribution` | `Array` |  |
| `basis` | `String` | `expert`: written by a person who does the work. |
| `class` | `Object` | The class, for a class-scope figure. |
| `class_name` | `Object` |  |
| `engine` | `Object` | The engine the vehicle id named, as an id form. |
| `estimates` | `Array` | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `Hash` | Hours, as numbers of hours. |
| `id` | `String` |  |
| `job` | `String` | The job's id. |
| `name` | `String` |  |
| `note` | `String` | "An estimate, not a quote. |
| `notes` | `Object` |  |
| `sample` | `Object` |  |
| `scope` | `String` | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `String` | The day the figure was last changed. |
| `url` | `String` | The job's page on this site. |
| `vehicle` | `Hash` | The model year an answer is about. |
| `years` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VehicleLabor record (raises on error).
vehicle_labor = client.VehicleLabor.load({ "id" => "vehicle_labor_id", "vehicle_id" => "vehicle_id" })
```

#### Example: List

```ruby
# list returns an Array of VehicleLabor entities, one per record (raises on error).
vehicle_labors = client.VehicleLabor.list({ "id" => "example" })
vehicle_labors.each { |item| puts item.data_get }
```


### VehicleRecall

Create an instance: `vehicle_recall = client.VehicleRecall`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_from` | `Object` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `Object` |  |
| `campaign` | `String` | The publisher's campaign number. |
| `component` | `Object` | The component, as the source words it. |
| `country` | `String` | `us` or `ca`. |
| `date` | `Object` | The day the campaign was reported. |
| `do_not_drive` | `Object` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `String` |  |
| `manufacturer` | `Object` |  |
| `match` | `Object` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `Object` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `Array` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `Object` | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `Object` | NHTSA's advisory to park outside, away from buildings. |
| `source` | `String` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `Object` | What is wrong, in the source's words. |
| `units` | `Object` | Units potentially affected. |
| `url` | `String` | The campaign's page on this site. |

#### Example: List

```ruby
# list returns an Array of VehicleRecall entities, one per record (raises on error).
vehicle_recalls = client.VehicleRecall.list({ "id" => "example" })
vehicle_recalls.each { |item| puts item.data_get }
```


### VehicleSafety

Create an instance: `vehicle_safety = client.VehicleSafety`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body_style` | `Object` |  |
| `curb_weight_kg` | `Object` | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `Object` |  |
| `description` | `String` | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `Object` |  |
| `features` | `Hash` | The safety features NHTSA lists with a rating. |
| `id` | `String` |  |
| `match` | `String` | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `String` | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `Array` | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `Integer` | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `Object` | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `Object` | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `Hash` | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of VehicleSafety entities, one per record (raises on error).
vehicle_safetys = client.VehicleSafety.list({ "id" => "example" })
vehicle_safetys.each { |item| puts item.data_get }
```


### VehicleSpec

Create an instance: `vehicle_spec = client.VehicleSpec`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `battery_type` | `Object` |  |
| `battery_voltage` | `Object` |  |
| `confidence` | `String` | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `Object` |  |
| `cylinder_deactivation_name` | `Object` | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `String` |  |
| `drive` | `Object` |  |
| `electrification` | `Object` | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `Array` |  |
| `engine` | `Object` |  |
| `ev_motor` | `Object` |  |
| `exhaust_valves` | `Object` |  |
| `fuel_grade` | `String` |  |
| `fuel_usage` | `Object` | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `Object` |  |
| `id` | `String` |  |
| `intake_valves` | `Object` | Per cylinder. |
| `luggage_volume_ft3` | `Object` |  |
| `luggage_volume_l` | `Object` |  |
| `motor_kw` | `Object` | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `Object` |  |
| `passenger_volume_l` | `Object` |  |
| `size_class` | `String` |  |
| `source` | `String` |  |
| `source_id` | `String` |  |
| `start_stop` | `Object` |  |
| `supercharger` | `Boolean` |  |
| `transmission` | `Object` |  |
| `transmission_type` | `Object` |  |
| `turbo` | `Boolean` |  |
| `variable_valve_lift` | `Object` |  |
| `variable_valve_timing` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of VehicleSpec entities, one per record (raises on error).
vehicle_specs = client.VehicleSpec.list({ "id" => "example" })
vehicle_specs.each { |item| puts item.data_get }
```


### VehicleTire

Create an instance: `vehicle_tire = client.VehicleTire`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bolt_pattern` | `Object` |  |
| `checked` | `String` |  |
| `id` | `String` |  |
| `lug_torque_lbft` | `Object` |  |
| `lug_torque_nm` | `Object` |  |
| `lug_torque_written_in` | `Object` | `nm` or `lbft`. |
| `market` | `Object` |  |
| `pressure_kpa` | `Object` |  |
| `pressure_psi` | `Object` |  |
| `pressure_written_in` | `Object` | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `String` | The size as printed. |
| `size_rear` | `Object` | The rear size, only when it differs from the front. |
| `source` | `String` |  |
| `trims` | `Array` | The trims the document ties the size to, as it names them. |

#### Example: List

```ruby
# list returns an Array of VehicleTire entities, one per record (raises on error).
vehicle_tires = client.VehicleTire.list({ "id" => "example" })
vehicle_tires.each { |item| puts item.data_get }
```


### Vin

Create an instance: `vin = client.Vin`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_price_usd` | `Object` | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `Object` |  |
| `catalog` | `Object` |  |
| `check_digit` | `Hash` |  |
| `doors` | `Object` |  |
| `drivetrain` | `Object` |  |
| `engine` | `Object` |  |
| `gvwr` | `Object` | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `String` |  |
| `make` | `Object` |  |
| `manufacturer` | `Hash` |  |
| `model` | `Object` |  |
| `plant` | `Hash` | Where the vehicle was built. |
| `recalls` | `Object` |  |
| `safety` | `Object` |  |
| `seat_rows` | `Object` |  |
| `seats` | `Object` |  |
| `series` | `Object` |  |
| `transmission` | `Object` |  |
| `transmission_speeds` | `Object` |  |
| `trim` | `Object` |  |
| `valid` | `Boolean` | Whether the check digit, position 9, is right. |
| `vin` | `String` |  |
| `warnings` | `Array` | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `Object` | Front wheel diameter in inches. |
| `wheel_size_rear` | `Object` | Rear wheel diameter in inches. |
| `year` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Vin record (raises on error).
vin = client.Vin.load({ "id" => "vin_id" })
```


### VinBulletin

Create an instance: `vin_bulletin = client.VinBulletin`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Object` |  |
| `attribution` | `Array` |  |
| `bulletins` | `Array` |  |
| `counts` | `Hash` | What the bulletins of one model year are, in numbers. |
| `decode` | `Hash` | What a VIN decoded to, as far as recalls need it. |
| `id` | `String` |  |
| `next_cursor` | `Object` |  |
| `note` | `String` |  |
| `vehicle` | `Object` |  |
| `warnings` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of VinBulletin entities, one per record (raises on error).
vin_bulletins = client.VinBulletin.list({ "id" => "example" })
vin_bulletins.each { |item| puts item.data_get }
```


### VinFluid

Create an instance: `vin_fluid = client.VinFluid`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Object` |  |
| `attribution` | `Array` |  |
| `brake` | `Array` |  |
| `checked_as_of` | `Object` |  |
| `coolant` | `Array` |  |
| `decode` | `Hash` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Object` |  |
| `engine_oil` | `Array` |  |
| `engine_oil_checked` | `Array` | Narrowed as `engine_oil` is. |
| `engine_settled` | `Boolean` | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `String` |  |
| `refrigerant` | `Array` |  |
| `transmission` | `Array` |  |
| `vehicle` | `Object` |  |
| `warnings` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of VinFluid entities, one per record (raises on error).
vin_fluids = client.VinFluid.list({ "id" => "example" })
vin_fluids.each { |item| puts item.data_get }
```


### VinFuel

Create an instance: `vin_fuel = client.VinFuel`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Hash` | The day each country's fuel ratings were current. |
| `attribution` | `Array` |  |
| `decode` | `Hash` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Object` |  |
| `engine_settled` | `Boolean` | Whether `ratings` is narrowed to `engine`. |
| `id` | `String` |  |
| `ratings` | `Array` |  |
| `vehicle` | `Object` |  |
| `warnings` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of VinFuel entities, one per record (raises on error).
vin_fuels = client.VinFuel.list({ "id" => "example" })
vin_fuels.each { |item| puts item.data_get }
```


### VinLabor

Create an instance: `vin_labor = client.VinLabor`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Object` |  |
| `attribution` | `Array` |  |
| `class` | `Object` |  |
| `decode` | `Hash` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Object` |  |
| `estimates` | `Array` |  |
| `id` | `String` |  |
| `note` | `String` |  |
| `vehicle` | `Object` |  |
| `warnings` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VinLabor record (raises on error).
vin_labor = client.VinLabor.load({ "id" => "vin_labor_id", "vin_id" => "vin_id" })
```

#### Example: List

```ruby
# list returns an Array of VinLabor entities, one per record (raises on error).
vin_labors = client.VinLabor.list({ "id" => "example" })
vin_labors.each { |item| puts item.data_get }
```


### VinRecall

Create an instance: `vin_recall = client.VinRecall`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Hash` | The day each country's recall data was current. |
| `attribution` | `Array` |  |
| `decode` | `Hash` | What a VIN decoded to, as far as recalls need it. |
| `id` | `String` |  |
| `lookup` | `Hash` | Where to check one vehicle for open recalls. |
| `may_apply` | `Boolean` | Always `true`. |
| `recalls` | `Array` |  |
| `vehicle` | `Object` |  |
| `warnings` | `Array` | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

#### Example: List

```ruby
# list returns an Array of VinRecall entities, one per record (raises on error).
vin_recalls = client.VinRecall.list({ "id" => "example" })
vin_recalls.each { |item| puts item.data_get }
```


### VinSpec

Create an instance: `vin_spec = client.VinSpec`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Object` |  |
| `attribution` | `Array` |  |
| `decode` | `Hash` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Object` |  |
| `engine_settled` | `Boolean` | Whether `specs` is narrowed to `engine`. |
| `id` | `String` |  |
| `specs` | `Array` |  |
| `vehicle` | `Object` |  |
| `warnings` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of VinSpec entities, one per record (raises on error).
vin_specs = client.VinSpec.list({ "id" => "example" })
vin_specs.each { |item| puts item.data_get }
```


### VinTire

Create an instance: `vin_tire = client.VinTire`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Object` |  |
| `attribution` | `Array` |  |
| `decode` | `Hash` | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `Array` | Every fitment of the model year. |
| `id` | `String` |  |
| `vehicle` | `Object` |  |
| `warnings` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of VinTire entities, one per record (raises on error).
vin_tires = client.VinTire.list({ "id" => "example" })
vin_tires.each { |item| puts item.data_get }
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── WenmarVin_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`WenmarVin_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
entry = client.Entry
entry.list({ "q" => "example" })

# entry.data_get now returns the entry data from the last list
# entry.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
