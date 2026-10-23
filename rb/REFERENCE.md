# WenmarVin Ruby SDK Reference

Complete API reference for the WenmarVin Ruby SDK.


## WenmarVinSDK

### Constructor

```ruby
require_relative 'WenmarVin_sdk'

client = WenmarVinSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WenmarVinSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = WenmarVinSDK.test
```


### Instance Methods

#### `Batch(data = nil)`

Create a new `Batch` entity instance. Pass `nil` for no initial data.

#### `Bulletin(data = nil)`

Create a new `Bulletin` entity instance. Pass `nil` for no initial data.

#### `Code(data = nil)`

Create a new `Code` entity instance. Pass `nil` for no initial data.

#### `Data(data = nil)`

Create a new `Data` entity instance. Pass `nil` for no initial data.

#### `Engine(data = nil)`

Create a new `Engine` entity instance. Pass `nil` for no initial data.

#### `Entry(data = nil)`

Create a new `Entry` entity instance. Pass `nil` for no initial data.

#### `Job(data = nil)`

Create a new `Job` entity instance. Pass `nil` for no initial data.

#### `Make(data = nil)`

Create a new `Make` entity instance. Pass `nil` for no initial data.

#### `Model(data = nil)`

Create a new `Model` entity instance. Pass `nil` for no initial data.

#### `Overview(data = nil)`

Create a new `Overview` entity instance. Pass `nil` for no initial data.

#### `PartsCard(data = nil)`

Create a new `PartsCard` entity instance. Pass `nil` for no initial data.

#### `PayrollDeduction(data = nil)`

Create a new `PayrollDeduction` entity instance. Pass `nil` for no initial data.

#### `Recall(data = nil)`

Create a new `Recall` entity instance. Pass `nil` for no initial data.

#### `RecallInvestigation(data = nil)`

Create a new `RecallInvestigation` entity instance. Pass `nil` for no initial data.

#### `Recent(data = nil)`

Create a new `Recent` entity instance. Pass `nil` for no initial data.

#### `Submodel(data = nil)`

Create a new `Submodel` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data = nil)`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `VehicleBulletin(data = nil)`

Create a new `VehicleBulletin` entity instance. Pass `nil` for no initial data.

#### `VehicleCode(data = nil)`

Create a new `VehicleCode` entity instance. Pass `nil` for no initial data.

#### `VehicleComplaint(data = nil)`

Create a new `VehicleComplaint` entity instance. Pass `nil` for no initial data.

#### `VehicleFluid(data = nil)`

Create a new `VehicleFluid` entity instance. Pass `nil` for no initial data.

#### `VehicleFuel(data = nil)`

Create a new `VehicleFuel` entity instance. Pass `nil` for no initial data.

#### `VehicleInvestigation(data = nil)`

Create a new `VehicleInvestigation` entity instance. Pass `nil` for no initial data.

#### `VehicleLabor(data = nil)`

Create a new `VehicleLabor` entity instance. Pass `nil` for no initial data.

#### `VehicleRecall(data = nil)`

Create a new `VehicleRecall` entity instance. Pass `nil` for no initial data.

#### `VehicleSafety(data = nil)`

Create a new `VehicleSafety` entity instance. Pass `nil` for no initial data.

#### `VehicleSpec(data = nil)`

Create a new `VehicleSpec` entity instance. Pass `nil` for no initial data.

#### `VehicleTire(data = nil)`

Create a new `VehicleTire` entity instance. Pass `nil` for no initial data.

#### `Vin(data = nil)`

Create a new `Vin` entity instance. Pass `nil` for no initial data.

#### `VinBulletin(data = nil)`

Create a new `VinBulletin` entity instance. Pass `nil` for no initial data.

#### `VinFluid(data = nil)`

Create a new `VinFluid` entity instance. Pass `nil` for no initial data.

#### `VinFuel(data = nil)`

Create a new `VinFuel` entity instance. Pass `nil` for no initial data.

#### `VinLabor(data = nil)`

Create a new `VinLabor` entity instance. Pass `nil` for no initial data.

#### `VinRecall(data = nil)`

Create a new `VinRecall` entity instance. Pass `nil` for no initial data.

#### `VinSpec(data = nil)`

Create a new `VinSpec` entity instance. Pass `nil` for no initial data.

#### `VinTire(data = nil)`

Create a new `VinTire` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BatchEntity

```ruby
batch = client.Batch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `vins` | `Array` | Yes | At most 50 VINs. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Batch.create({
  "vins" => [], # Array
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BatchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BulletinEntity

```ruby
bulletin = client.Bulletin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Object` | No |  |
| `attribution` | `Array` | Yes |  |
| `codes` | `Array` | Yes | The trouble codes the summary names. |
| `component` | `Object` | No | NHTSA's components, in its words, separated by `; `. |
| `components` | `Array` | Yes | The components it is about, systems first. |
| `date` | `Object` | No | The manufacturer's own date. |
| `date_added` | `String` | Yes | The day NHTSA published it. |
| `document` | `Object` | No |  |
| `document_id` | `Object` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `String` | No |  |
| `mfr_campaign` | `Object` | No | The manufacturer's campaign id or software version. |
| `mfr_system` | `Object` | No | The manufacturer's own words for the system. |
| `nhtsa_id` | `Integer` | Yes | NHTSA's id number for the communication. |
| `note` | `String` | Yes |  |
| `replaces` | `Object` | No | The number of the bulletin this one replaces. |
| `summary` | `Object` | No | NHTSA's summary of the communication. |
| `topics` | `Array` | Yes |  |
| `type` | `String` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `String` | Yes | The type in words. |
| `url` | `String` | Yes | The bulletin's page on this site. |
| `vehicles` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Bulletin.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Bulletin.load({ "id" => "bulletin_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BulletinEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CodeEntity

```ruby
code = client.Code
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `Array` | Yes | The credit lines the data's licences ask for. |
| `checked` | `String` | Yes | The day it was approved. |
| `checks` | `Array` | Yes | What a technician usually verifies first. |
| `code` | `String` | Yes |  |
| `common_causes` | `Array` | Yes | General causes, not about one make. |
| `components` | `Array` | Yes |  |
| `generic` | `Boolean` | Yes | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `String` | No |  |
| `meaning` | `String` | Yes | What the code tells a service advisor. |
| `note` | `String` | Yes | What a description is and is not. |
| `related` | `Array` | Yes | Related codes that are described too. |
| `reviewer` | `String` | Yes | The GitHub name of the person who approved the text. |
| `system` | `String` | Yes | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `url` | `String` | Yes | The code's page on this site. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Code.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Code.load({ "id" => "code_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DataEntity

```ruby
data = client.Data
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_at` | `String` | Yes | When the data file was built, in UTC. |
| `data_version` | `String` | Yes | The data release, such as `2026.09`. |
| `datasets` | `Hash` | Yes | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `String` | Yes | The version of the server. |
| `vpic_release` | `String` | Yes | The NHTSA vPIC release the data was built from. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Data.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EngineEntity

```ruby
engine = client.Engine
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes |  |
| `label` | `String` | Yes |  |
| `preset` | `Boolean` | Yes | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `Object` | No | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Engine.list({ "make" => "example", "model" => "example", "year" => 1 })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EngineEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EntryEntity

```ruby
entry = client.Entry
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `Object` | No |  |
| `drive` | `Object` | No |  |
| `engine` | `Object` | No |  |
| `id` | `String` | Yes | The stable id. |
| `make` | `String` | Yes |  |
| `model` | `String` | Yes |  |
| `submodel` | `Object` | No |  |
| `summary` | `String` | Yes | One line naming everything above that is known. |
| `transmission` | `Object` | No |  |
| `vehicle_types` | `Array` | Yes | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `Integer` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Entry.list({ "q" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Entry.load({ "id" => "entry_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EntryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## JobEntity

```ruby
job = client.Job
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `Array` | Yes | The credit the labour estimates ask for. |
| `components` | `Array` | Yes |  |
| `estimates` | `Object` | No | The job's class-scope figures. |
| `excludes` | `Array` | Yes | Work often done at the same visit that is not part of this job. |
| `id` | `String` | Yes | The job's id. |
| `includes` | `Array` | Yes | The work the job covers. |
| `name` | `String` | Yes |  |
| `note` | `String` | Yes | What an estimate is not. |
| `related` | `Array` | Yes |  |
| `system` | `String` | Yes | The id of the system the job belongs to. |
| `system_name` | `String` | Yes |  |
| `url` | `String` | Yes | The job's page on this site. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Job.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Job.load({ "id" => "job_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `JobEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MakeEntity

```ruby
make = client.Make
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes | The make's id form. |
| `links` | `Object` | No |  |
| `name` | `String` | Yes |  |
| `popular` | `Boolean` | Yes | Whether it is on the list of popular makes. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Make.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Make.load({ "id" => "make_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MakeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ModelEntity

```ruby
model = client.Model
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Hash` | Yes | The day each country's recall data was current. |
| `attribution` | `Array` | Yes |  |
| `id` | `String` | Yes | The model's id form. |
| `lookup` | `Hash` | Yes | Where to check one vehicle for open recalls. |
| `make` | `Hash` | Yes | A make or a model: its id form and its name. |
| `may_apply` | `Boolean` | Yes | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `Hash` | Yes | A make or a model: its id form and its name. |
| `name` | `String` | Yes |  |
| `year_from` | `Integer` | Yes | The first and last model year the model exists in. |
| `year_to` | `Integer` | Yes |  |
| `years` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Model.list({ "make" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Model.load({ "make" => "make", "model" => "model" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OverviewEntity

```ruby
overview = client.Overview
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | Yes | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `String` | Yes |  |
| `suggestions` | `Array` | No | VINs the caller may have meant. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Overview.list({ "vehicle_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OverviewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PartsCardEntity

```ruby
parts_card = client.PartsCard
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `Array` | Yes |  |
| `engine_settled` | `Boolean` | Yes | Whether the decode settled one catalog engine. |
| `lines` | `Array` | Yes |  |
| `text` | `String` | Yes | The lines as plain text, one `Label: value` each. |
| `vehicle` | `Object` | No |  |
| `vin` | `String` | Yes |  |
| `warnings` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PartsCard.list({ "vin_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PartsCardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PayrollDeductionEntity

```ruby
payroll_deduction = client.PayrollDeduction
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meaning` | `String` | Yes | What the factor means. |
| `name` | `String` | Yes | The name the engine gives the factor. |
| `value` | `Float` | Yes | The value used, after rounding. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PayrollDeduction.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PayrollDeductionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RecallEntity

```ruby
recall = client.Recall
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Object` | No | The day this publisher's data was current. |
| `attribution` | `Array` | Yes |  |
| `built_from` | `Object` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `Object` | No |  |
| `campaign` | `String` | Yes | The publisher's campaign number. |
| `completion` | `Object` | No |  |
| `component` | `Object` | No | The component, as the source words it. |
| `consequence` | `Object` | No |  |
| `country` | `String` | Yes | `us` or `ca`. |
| `date` | `Object` | No | The day the campaign was reported. |
| `do_not_drive` | `Object` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `Object` | No |  |
| `id` | `String` | No |  |
| `lookup` | `Hash` | Yes | Where to check one vehicle for open recalls. |
| `manufacturer` | `Object` | No |  |
| `match` | `Object` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `Boolean` | Yes | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `Object` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `Array` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `Object` | No |  |
| `notification` | `Object` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `Object` | No | The day owners were notified. |
| `park_outside` | `Object` | No | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `Object` | No | The manufacturer's part numbers, separated by commas. |
| `remedy` | `Object` | No |  |
| `source` | `String` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `Object` | No | What is wrong, in the source's words. |
| `units` | `Object` | No | Units potentially affected. |
| `url` | `String` | Yes | The campaign's page on this site. |
| `vehicles` | `Array` | Yes | Every vehicle the campaign lists, by make, model and year. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Recall.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Recall.load({ "campaign" => "campaign", "source" => "source" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RecallEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RecallInvestigationEntity

```ruby
recall_investigation = client.RecallInvestigation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes | NHTSA's action number. |
| `campaigns` | `Array` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `Object` | No | The day it was closed. |
| `component` | `Object` | No | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `String` | Yes | The letters the number starts with. |
| `kind_name` | `Object` | No | The kind in words. |
| `manufacturer` | `Object` | No | The manufacturers it names, separated by `; `. |
| `match` | `Object` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `Array` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `Boolean` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `Object` | No | The day it was opened. |
| `subject` | `Object` | No | NHTSA's one-line subject. |
| `summary` | `Object` | No | NHTSA's summary. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.RecallInvestigation.list({ "campaign" => "example", "recall_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RecallInvestigationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RecentEntity

```ruby
recent = client.Recent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recall` | `Hash` | Yes | One recall campaign in a list. |
| `vehicles` | `Array` | Yes | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `Integer` | Yes | How many vehicles the campaign lists in all. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Recent.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RecentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SubmodelEntity

```ruby
submodel = client.Submodel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Submodel.list({ "make" => "example", "model" => "example", "year" => 1 })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SubmodelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleEntity

```ruby
vehicle = client.Vehicle
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Vehicle.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleBulletinEntity

```ruby
vehicle_bulletin = client.VehicleBulletin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component` | `Object` | No | NHTSA's components, in its words, separated by `; `. |
| `date` | `Object` | No | The manufacturer's own date. |
| `date_added` | `String` | Yes | The day NHTSA published it. |
| `document` | `Object` | No |  |
| `document_id` | `Object` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `String` | No |  |
| `mfr_campaign` | `Object` | No | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `Integer` | Yes | NHTSA's id number for the communication. |
| `summary` | `Object` | No | NHTSA's summary of the communication. |
| `type` | `String` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `String` | Yes | The type in words. |
| `url` | `String` | Yes | The bulletin's page on this site. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleBulletin.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleBulletinEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleCodeEntity

```ruby
vehicle_code = client.VehicleCode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `Array` | Yes |  |
| `bulletins` | `Object` | No |  |
| `code` | `String` | Yes |  |
| `description` | `String` | No |  |
| `generic` | `Boolean` | Yes | Whether every maker uses the code the same way. |
| `id` | `String` | No |  |
| `note` | `String` | Yes |  |
| `related` | `Hash` | Yes | What else is held for the model year about the components a code concerns. |
| `url` | `String` | Yes | The page of this code on this model year. |
| `vehicle` | `Hash` | Yes | The model year an answer is about. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VehicleCode.load({ "id" => "vehicle_code_id", "vehicle_id" => "vehicle_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleCodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleComplaintEntity

```ruby
vehicle_complaint = client.VehicleComplaint
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `complaints` | `Integer` | Yes |  |
| `crashes` | `Integer` | Yes | Complaints that report a crash. |
| `fires` | `Integer` | Yes | Complaints that report a fire. |
| `id` | `String` | Yes | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `Integer` | Yes | Complaints that report at least one person injured. |
| `median_km` | `Object` | No | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `Object` | No | The same in miles, as NHTSA records it. |
| `name` | `String` | Yes |  |
| `parent` | `Object` | No | The system a part belongs to. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleComplaint.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleComplaintEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleFluidEntity

```ruby
vehicle_fluid = client.VehicleFluid
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Object` | No | The day EPA's oil grades were current. |
| `attribution` | `Array` | Yes |  |
| `brake` | `Array` | Yes |  |
| `checked_as_of` | `Object` | No | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `Array` | Yes |  |
| `engine_oil` | `Array` | Yes |  |
| `engine_oil_checked` | `Array` | Yes |  |
| `id` | `String` | No |  |
| `refrigerant` | `Array` | Yes |  |
| `transmission` | `Array` | Yes |  |
| `vehicle` | `Hash` | Yes | The model year an answer is about. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleFluid.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleFluidEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleFuelEntity

```ruby
vehicle_fuel = client.VehicleFuel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `co2_g_km` | `Object` | No | Tailpipe carbon dioxide, combined. |
| `confidence` | `String` | Yes | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `String` | Yes | `us` or `ca`. |
| `cylinders` | `Object` | No |  |
| `described_as` | `String` | Yes | The source's own name for the vehicle rated. |
| `displacement_l` | `Object` | No |  |
| `drive` | `Object` | No |  |
| `engine` | `Object` | No |  |
| `fuel_grade` | `String` | Yes | The fuel the figures are for, which is the recommended grade. |
| `id` | `String` | No |  |
| `kwh_100km` | `Object` | No | Combined electricity use. |
| `l_100km` | `Object` | No |  |
| `match` | `String` | Yes | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `Object` | No |  |
| `range_km` | `Object` | No | On a full battery. |
| `range_mi` | `Object` | No |  |
| `second_fuel` | `Object` | No | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `String` | Yes | `epa` or `nrcan`. |
| `source_id` | `Object` | No | EPA's id for the rating. |
| `transmission` | `Object` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleFuel.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleFuelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleInvestigationEntity

```ruby
vehicle_investigation = client.VehicleInvestigation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `String` | Yes | NHTSA's action number. |
| `campaigns` | `Array` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `Object` | No | The day it was closed. |
| `component` | `Object` | No | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `String` | No |  |
| `kind` | `String` | Yes | The letters the number starts with. |
| `kind_name` | `Object` | No | The kind in words. |
| `manufacturer` | `Object` | No | The manufacturers it names, separated by `; `. |
| `match` | `Object` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `Array` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `Boolean` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `Object` | No | The day it was opened. |
| `subject` | `Object` | No | NHTSA's one-line subject. |
| `summary` | `Object` | No | NHTSA's summary. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleInvestigation.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleInvestigationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleLaborEntity

```ruby
vehicle_labor = client.VehicleLabor
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Object` | No | The newest day an estimate was changed. |
| `attribution` | `Array` | Yes |  |
| `basis` | `String` | Yes | `expert`: written by a person who does the work. |
| `class` | `Object` | No | The class, for a class-scope figure. |
| `class_name` | `Object` | No |  |
| `engine` | `Object` | No | The engine the vehicle id named, as an id form. |
| `estimates` | `Array` | Yes | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `Hash` | Yes | Hours, as numbers of hours. |
| `id` | `String` | No |  |
| `job` | `String` | Yes | The job's id. |
| `name` | `String` | Yes |  |
| `note` | `String` | Yes | "An estimate, not a quote. |
| `notes` | `Object` | No |  |
| `sample` | `Object` | No |  |
| `scope` | `String` | Yes | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `String` | Yes | The day the figure was last changed. |
| `url` | `String` | Yes | The job's page on this site. |
| `vehicle` | `Hash` | Yes | The model year an answer is about. |
| `years` | `Object` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleLabor.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VehicleLabor.load({ "id" => "vehicle_labor_id", "vehicle_id" => "vehicle_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleLaborEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleRecallEntity

```ruby
vehicle_recall = client.VehicleRecall
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_from` | `Object` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `Object` | No |  |
| `campaign` | `String` | Yes | The publisher's campaign number. |
| `component` | `Object` | No | The component, as the source words it. |
| `country` | `String` | Yes | `us` or `ca`. |
| `date` | `Object` | No | The day the campaign was reported. |
| `do_not_drive` | `Object` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `String` | No |  |
| `manufacturer` | `Object` | No |  |
| `match` | `Object` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `Object` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `Array` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `Object` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `Object` | No | NHTSA's advisory to park outside, away from buildings. |
| `source` | `String` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `Object` | No | What is wrong, in the source's words. |
| `units` | `Object` | No | Units potentially affected. |
| `url` | `String` | Yes | The campaign's page on this site. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleRecall.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleRecallEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleSafetyEntity

```ruby
vehicle_safety = client.VehicleSafety
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body_style` | `Object` | No |  |
| `curb_weight_kg` | `Object` | No | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `Object` | No |  |
| `description` | `String` | Yes | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `Object` | No |  |
| `features` | `Hash` | Yes | The safety features NHTSA lists with a rating. |
| `id` | `String` | No |  |
| `match` | `String` | Yes | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `String` | Yes | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `Array` | Yes | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `Integer` | Yes | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `Object` | No | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `Object` | No | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `Hash` | Yes | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `Object` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleSafety.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleSafetyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleSpecEntity

```ruby
vehicle_spec = client.VehicleSpec
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `battery_type` | `Object` | No |  |
| `battery_voltage` | `Object` | No |  |
| `confidence` | `String` | Yes | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `Object` | No |  |
| `cylinder_deactivation_name` | `Object` | No | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `String` | Yes |  |
| `drive` | `Object` | No |  |
| `electrification` | `Object` | No | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `Array` | Yes |  |
| `engine` | `Object` | No |  |
| `ev_motor` | `Object` | No |  |
| `exhaust_valves` | `Object` | No |  |
| `fuel_grade` | `String` | Yes |  |
| `fuel_usage` | `Object` | No | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `Object` | No |  |
| `id` | `String` | No |  |
| `intake_valves` | `Object` | No | Per cylinder. |
| `luggage_volume_ft3` | `Object` | No |  |
| `luggage_volume_l` | `Object` | No |  |
| `motor_kw` | `Object` | No | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `Object` | No |  |
| `passenger_volume_l` | `Object` | No |  |
| `size_class` | `String` | Yes |  |
| `source` | `String` | Yes |  |
| `source_id` | `String` | Yes |  |
| `start_stop` | `Object` | No |  |
| `supercharger` | `Boolean` | Yes |  |
| `transmission` | `Object` | No |  |
| `transmission_type` | `Object` | No |  |
| `turbo` | `Boolean` | Yes |  |
| `variable_valve_lift` | `Object` | No |  |
| `variable_valve_timing` | `Object` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleSpec.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleSpecEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleTireEntity

```ruby
vehicle_tire = client.VehicleTire
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bolt_pattern` | `Object` | No |  |
| `checked` | `String` | Yes |  |
| `id` | `String` | No |  |
| `lug_torque_lbft` | `Object` | No |  |
| `lug_torque_nm` | `Object` | No |  |
| `lug_torque_written_in` | `Object` | No | `nm` or `lbft`. |
| `market` | `Object` | No |  |
| `pressure_kpa` | `Object` | No |  |
| `pressure_psi` | `Object` | No |  |
| `pressure_written_in` | `Object` | No | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `String` | Yes | The size as printed. |
| `size_rear` | `Object` | No | The rear size, only when it differs from the front. |
| `source` | `String` | Yes |  |
| `trims` | `Array` | Yes | The trims the document ties the size to, as it names them. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VehicleTire.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleTireEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VinEntity

```ruby
vin = client.Vin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_price_usd` | `Object` | No | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `Object` | No |  |
| `catalog` | `Object` | No |  |
| `check_digit` | `Hash` | Yes |  |
| `doors` | `Object` | No |  |
| `drivetrain` | `Object` | No |  |
| `engine` | `Object` | No |  |
| `gvwr` | `Object` | No | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `String` | No |  |
| `make` | `Object` | No |  |
| `manufacturer` | `Hash` | Yes |  |
| `model` | `Object` | No |  |
| `plant` | `Hash` | Yes | Where the vehicle was built. |
| `recalls` | `Object` | No |  |
| `safety` | `Object` | No |  |
| `seat_rows` | `Object` | No |  |
| `seats` | `Object` | No |  |
| `series` | `Object` | No |  |
| `transmission` | `Object` | No |  |
| `transmission_speeds` | `Object` | No |  |
| `trim` | `Object` | No |  |
| `valid` | `Boolean` | Yes | Whether the check digit, position 9, is right. |
| `vin` | `String` | Yes |  |
| `warnings` | `Array` | Yes | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `Object` | No | Front wheel diameter in inches. |
| `wheel_size_rear` | `Object` | No | Rear wheel diameter in inches. |
| `year` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Vin.load({ "id" => "vin_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VinEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VinBulletinEntity

```ruby
vin_bulletin = client.VinBulletin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Object` | No |  |
| `attribution` | `Array` | Yes |  |
| `bulletins` | `Array` | Yes |  |
| `counts` | `Hash` | Yes | What the bulletins of one model year are, in numbers. |
| `decode` | `Hash` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `String` | No |  |
| `next_cursor` | `Object` | No |  |
| `note` | `String` | Yes |  |
| `vehicle` | `Object` | No |  |
| `warnings` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VinBulletin.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VinBulletinEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VinFluidEntity

```ruby
vin_fluid = client.VinFluid
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Object` | No |  |
| `attribution` | `Array` | Yes |  |
| `brake` | `Array` | Yes |  |
| `checked_as_of` | `Object` | No |  |
| `coolant` | `Array` | Yes |  |
| `decode` | `Hash` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Object` | No |  |
| `engine_oil` | `Array` | Yes |  |
| `engine_oil_checked` | `Array` | Yes | Narrowed as `engine_oil` is. |
| `engine_settled` | `Boolean` | Yes | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `String` | No |  |
| `refrigerant` | `Array` | Yes |  |
| `transmission` | `Array` | Yes |  |
| `vehicle` | `Object` | No |  |
| `warnings` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VinFluid.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VinFluidEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VinFuelEntity

```ruby
vin_fuel = client.VinFuel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Hash` | Yes | The day each country's fuel ratings were current. |
| `attribution` | `Array` | Yes |  |
| `decode` | `Hash` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Object` | No |  |
| `engine_settled` | `Boolean` | Yes | Whether `ratings` is narrowed to `engine`. |
| `id` | `String` | No |  |
| `ratings` | `Array` | Yes |  |
| `vehicle` | `Object` | No |  |
| `warnings` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VinFuel.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VinFuelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VinLaborEntity

```ruby
vin_labor = client.VinLabor
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Object` | No |  |
| `attribution` | `Array` | Yes |  |
| `class` | `Object` | No |  |
| `decode` | `Hash` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Object` | No |  |
| `estimates` | `Array` | Yes |  |
| `id` | `String` | No |  |
| `note` | `String` | Yes |  |
| `vehicle` | `Object` | No |  |
| `warnings` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VinLabor.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VinLabor.load({ "id" => "vin_labor_id", "vin_id" => "vin_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VinLaborEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VinRecallEntity

```ruby
vin_recall = client.VinRecall
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Hash` | Yes | The day each country's recall data was current. |
| `attribution` | `Array` | Yes |  |
| `decode` | `Hash` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `String` | No |  |
| `lookup` | `Hash` | Yes | Where to check one vehicle for open recalls. |
| `may_apply` | `Boolean` | Yes | Always `true`. |
| `recalls` | `Array` | Yes |  |
| `vehicle` | `Object` | No |  |
| `warnings` | `Array` | Yes | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VinRecall.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VinRecallEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VinSpecEntity

```ruby
vin_spec = client.VinSpec
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Object` | No |  |
| `attribution` | `Array` | Yes |  |
| `decode` | `Hash` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Object` | No |  |
| `engine_settled` | `Boolean` | Yes | Whether `specs` is narrowed to `engine`. |
| `id` | `String` | No |  |
| `specs` | `Array` | Yes |  |
| `vehicle` | `Object` | No |  |
| `warnings` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VinSpec.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VinSpecEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VinTireEntity

```ruby
vin_tire = client.VinTire
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Object` | No |  |
| `attribution` | `Array` | Yes |  |
| `decode` | `Hash` | Yes | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `Array` | Yes | Every fitment of the model year. |
| `id` | `String` | No |  |
| `vehicle` | `Object` | No |  |
| `warnings` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.VinTire.list({ "id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VinTireEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ruby
client = WenmarVinSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

