# WenmarVin Lua SDK Reference

Complete API reference for the WenmarVin Lua SDK.


## WenmarVinSDK

### Constructor

```lua
local sdk = require("wenmar-vin_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Batch(data)`

Create a new `Batch` entity instance. Pass `nil` for no initial data.

#### `Bulletin(data)`

Create a new `Bulletin` entity instance. Pass `nil` for no initial data.

#### `Code(data)`

Create a new `Code` entity instance. Pass `nil` for no initial data.

#### `Data(data)`

Create a new `Data` entity instance. Pass `nil` for no initial data.

#### `Engine(data)`

Create a new `Engine` entity instance. Pass `nil` for no initial data.

#### `Entry(data)`

Create a new `Entry` entity instance. Pass `nil` for no initial data.

#### `Job(data)`

Create a new `Job` entity instance. Pass `nil` for no initial data.

#### `Make(data)`

Create a new `Make` entity instance. Pass `nil` for no initial data.

#### `Model(data)`

Create a new `Model` entity instance. Pass `nil` for no initial data.

#### `Overview(data)`

Create a new `Overview` entity instance. Pass `nil` for no initial data.

#### `PartsCard(data)`

Create a new `PartsCard` entity instance. Pass `nil` for no initial data.

#### `PayrollDeduction(data)`

Create a new `PayrollDeduction` entity instance. Pass `nil` for no initial data.

#### `Recall(data)`

Create a new `Recall` entity instance. Pass `nil` for no initial data.

#### `RecallInvestigation(data)`

Create a new `RecallInvestigation` entity instance. Pass `nil` for no initial data.

#### `Recent(data)`

Create a new `Recent` entity instance. Pass `nil` for no initial data.

#### `Submodel(data)`

Create a new `Submodel` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data)`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `VehicleBulletin(data)`

Create a new `VehicleBulletin` entity instance. Pass `nil` for no initial data.

#### `VehicleCode(data)`

Create a new `VehicleCode` entity instance. Pass `nil` for no initial data.

#### `VehicleComplaint(data)`

Create a new `VehicleComplaint` entity instance. Pass `nil` for no initial data.

#### `VehicleFluid(data)`

Create a new `VehicleFluid` entity instance. Pass `nil` for no initial data.

#### `VehicleFuel(data)`

Create a new `VehicleFuel` entity instance. Pass `nil` for no initial data.

#### `VehicleInvestigation(data)`

Create a new `VehicleInvestigation` entity instance. Pass `nil` for no initial data.

#### `VehicleLabor(data)`

Create a new `VehicleLabor` entity instance. Pass `nil` for no initial data.

#### `VehicleRecall(data)`

Create a new `VehicleRecall` entity instance. Pass `nil` for no initial data.

#### `VehicleSafety(data)`

Create a new `VehicleSafety` entity instance. Pass `nil` for no initial data.

#### `VehicleSpec(data)`

Create a new `VehicleSpec` entity instance. Pass `nil` for no initial data.

#### `VehicleTire(data)`

Create a new `VehicleTire` entity instance. Pass `nil` for no initial data.

#### `Vin(data)`

Create a new `Vin` entity instance. Pass `nil` for no initial data.

#### `VinBulletin(data)`

Create a new `VinBulletin` entity instance. Pass `nil` for no initial data.

#### `VinFluid(data)`

Create a new `VinFluid` entity instance. Pass `nil` for no initial data.

#### `VinFuel(data)`

Create a new `VinFuel` entity instance. Pass `nil` for no initial data.

#### `VinLabor(data)`

Create a new `VinLabor` entity instance. Pass `nil` for no initial data.

#### `VinRecall(data)`

Create a new `VinRecall` entity instance. Pass `nil` for no initial data.

#### `VinSpec(data)`

Create a new `VinSpec` entity instance. Pass `nil` for no initial data.

#### `VinTire(data)`

Create a new `VinTire` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BatchEntity

```lua
local batch = client:Batch(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `vins` | `table` | Yes | At most 50 VINs. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Batch():create({
  vins = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BatchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BulletinEntity

```lua
local bulletin = client:Bulletin(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string|nil` | No |  |
| `attribution` | `table` | Yes |  |
| `codes` | `table` | Yes | The trouble codes the summary names. |
| `component` | `string|nil` | No | NHTSA's components, in its words, separated by `; `. |
| `components` | `table` | Yes | The components it is about, systems first. |
| `date` | `string|nil` | No | The manufacturer's own date. |
| `date_added` | `string` | Yes | The day NHTSA published it. |
| `document` | `any` | No |  |
| `document_id` | `string|nil` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` | No |  |
| `mfr_campaign` | `string|nil` | No | The manufacturer's campaign id or software version. |
| `mfr_system` | `string|nil` | No | The manufacturer's own words for the system. |
| `nhtsa_id` | `number` | Yes | NHTSA's id number for the communication. |
| `note` | `string` | Yes |  |
| `replaces` | `string|nil` | No | The number of the bulletin this one replaces. |
| `summary` | `string|nil` | No | NHTSA's summary of the communication. |
| `topics` | `table` | Yes |  |
| `type` | `string` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | Yes | The type in words. |
| `url` | `string` | Yes | The bulletin's page on this site. |
| `vehicles` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Bulletin():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Bulletin():load({ id = "bulletin_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulletinEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CodeEntity

```lua
local code = client:Code(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `table` | Yes | The credit lines the data's licences ask for. |
| `checked` | `string` | Yes | The day it was approved. |
| `checks` | `table` | Yes | What a technician usually verifies first. |
| `code` | `string` | Yes |  |
| `common_causes` | `table` | Yes | General causes, not about one make. |
| `components` | `table` | Yes |  |
| `generic` | `boolean` | Yes | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `string` | No |  |
| `meaning` | `string` | Yes | What the code tells a service advisor. |
| `note` | `string` | Yes | What a description is and is not. |
| `related` | `table` | Yes | Related codes that are described too. |
| `reviewer` | `string` | Yes | The GitHub name of the person who approved the text. |
| `system` | `string` | Yes | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `url` | `string` | Yes | The code's page on this site. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Code():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Code():load({ id = "code_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CodeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DataEntity

```lua
local data = client:Data(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_at` | `string` | Yes | When the data file was built, in UTC. |
| `data_version` | `string` | Yes | The data release, such as `2026.09`. |
| `datasets` | `table` | Yes | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `string` | Yes | The version of the server. |
| `vpic_release` | `string` | Yes | The NHTSA vPIC release the data was built from. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Data():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EngineEntity

```lua
local engine = client:Engine(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `preset` | `boolean` | Yes | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `string|nil` | No | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Engine():list({ make = "example", model = "example", year = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EngineEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EntryEntity

```lua
local entry = client:Entry(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `string|nil` | No |  |
| `drive` | `string|nil` | No |  |
| `engine` | `string|nil` | No |  |
| `id` | `string` | Yes | The stable id. |
| `make` | `string` | Yes |  |
| `model` | `string` | Yes |  |
| `submodel` | `string|nil` | No |  |
| `summary` | `string` | Yes | One line naming everything above that is known. |
| `transmission` | `string|nil` | No |  |
| `vehicle_types` | `table` | Yes | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `number` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Entry():list({ q = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Entry():load({ id = "entry_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## JobEntity

```lua
local job = client:Job(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `table` | Yes | The credit the labour estimates ask for. |
| `components` | `table` | Yes |  |
| `estimates` | `table|nil` | No | The job's class-scope figures. |
| `excludes` | `table` | Yes | Work often done at the same visit that is not part of this job. |
| `id` | `string` | Yes | The job's id. |
| `includes` | `table` | Yes | The work the job covers. |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes | What an estimate is not. |
| `related` | `table` | Yes |  |
| `system` | `string` | Yes | The id of the system the job belongs to. |
| `system_name` | `string` | Yes |  |
| `url` | `string` | Yes | The job's page on this site. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Job():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Job():load({ id = "job_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JobEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MakeEntity

```lua
local make = client:Make(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | The make's id form. |
| `links` | `any` | No |  |
| `name` | `string` | Yes |  |
| `popular` | `boolean` | Yes | Whether it is on the list of popular makes. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Make():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Make():load({ id = "make_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MakeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ModelEntity

```lua
local model = client:Model(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `table` | Yes | The day each country's recall data was current. |
| `attribution` | `table` | Yes |  |
| `id` | `string` | Yes | The model's id form. |
| `lookup` | `table` | Yes | Where to check one vehicle for open recalls. |
| `make` | `table` | Yes | A make or a model: its id form and its name. |
| `may_apply` | `boolean` | Yes | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `table` | Yes | A make or a model: its id form and its name. |
| `name` | `string` | Yes |  |
| `year_from` | `number` | Yes | The first and last model year the model exists in. |
| `year_to` | `number` | Yes |  |
| `years` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Model():list({ make = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Model():load({ make = "make", model = "model" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OverviewEntity

```lua
local overview = client:Overview(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `string` | Yes |  |
| `suggestions` | `table` | No | VINs the caller may have meant. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Overview():list({ vehicle_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OverviewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PartsCardEntity

```lua
local parts_card = client:PartsCard(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `table` | Yes |  |
| `engine_settled` | `boolean` | Yes | Whether the decode settled one catalog engine. |
| `lines` | `table` | Yes |  |
| `text` | `string` | Yes | The lines as plain text, one `Label: value` each. |
| `vehicle` | `any` | No |  |
| `vin` | `string` | Yes |  |
| `warnings` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PartsCard():list({ vin_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PartsCardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PayrollDeductionEntity

```lua
local payroll_deduction = client:PayrollDeduction(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meaning` | `string` | Yes | What the factor means. |
| `name` | `string` | Yes | The name the engine gives the factor. |
| `value` | `number` | Yes | The value used, after rounding. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PayrollDeduction():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PayrollDeductionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RecallEntity

```lua
local recall = client:Recall(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string|nil` | No | The day this publisher's data was current. |
| `attribution` | `table` | Yes |  |
| `built_from` | `string|nil` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `string|nil` | No |  |
| `campaign` | `string` | Yes | The publisher's campaign number. |
| `completion` | `any` | No |  |
| `component` | `string|nil` | No | The component, as the source words it. |
| `consequence` | `string|nil` | No |  |
| `country` | `string` | Yes | `us` or `ca`. |
| `date` | `string|nil` | No | The day the campaign was reported. |
| `do_not_drive` | `boolean|nil` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `any` | No |  |
| `id` | `string` | No |  |
| `lookup` | `table` | Yes | Where to check one vehicle for open recalls. |
| `manufacturer` | `string|nil` | No |  |
| `match` | `string|nil` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `boolean` | Yes | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `string|nil` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `table` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `string|nil` | No |  |
| `notification` | `string|nil` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `string|nil` | No | The day owners were notified. |
| `park_outside` | `boolean|nil` | No | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `string|nil` | No | The manufacturer's part numbers, separated by commas. |
| `remedy` | `string|nil` | No |  |
| `source` | `string` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `string|nil` | No | What is wrong, in the source's words. |
| `units` | `number|nil` | No | Units potentially affected. |
| `url` | `string` | Yes | The campaign's page on this site. |
| `vehicles` | `table` | Yes | Every vehicle the campaign lists, by make, model and year. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Recall():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Recall():load({ campaign = "campaign", source = "source" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecallEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RecallInvestigationEntity

```lua
local recall_investigation = client:RecallInvestigation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | NHTSA's action number. |
| `campaigns` | `table` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `string|nil` | No | The day it was closed. |
| `component` | `string|nil` | No | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `string` | Yes | The letters the number starts with. |
| `kind_name` | `string|nil` | No | The kind in words. |
| `manufacturer` | `string|nil` | No | The manufacturers it names, separated by `; `. |
| `match` | `string|nil` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `table` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `boolean` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `string|nil` | No | The day it was opened. |
| `subject` | `string|nil` | No | NHTSA's one-line subject. |
| `summary` | `string|nil` | No | NHTSA's summary. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:RecallInvestigation():list({ campaign = "example", recall_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecallInvestigationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RecentEntity

```lua
local recent = client:Recent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recall` | `table` | Yes | One recall campaign in a list. |
| `vehicles` | `table` | Yes | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `number` | Yes | How many vehicles the campaign lists in all. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Recent():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SubmodelEntity

```lua
local submodel = client:Submodel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Submodel():list({ make = "example", model = "example", year = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubmodelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleEntity

```lua
local vehicle = client:Vehicle(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Vehicle():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleBulletinEntity

```lua
local vehicle_bulletin = client:VehicleBulletin(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component` | `string|nil` | No | NHTSA's components, in its words, separated by `; `. |
| `date` | `string|nil` | No | The manufacturer's own date. |
| `date_added` | `string` | Yes | The day NHTSA published it. |
| `document` | `any` | No |  |
| `document_id` | `string|nil` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` | No |  |
| `mfr_campaign` | `string|nil` | No | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `number` | Yes | NHTSA's id number for the communication. |
| `summary` | `string|nil` | No | NHTSA's summary of the communication. |
| `type` | `string` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | Yes | The type in words. |
| `url` | `string` | Yes | The bulletin's page on this site. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleBulletin():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleBulletinEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleCodeEntity

```lua
local vehicle_code = client:VehicleCode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `table` | Yes |  |
| `bulletins` | `any` | No |  |
| `code` | `string` | Yes |  |
| `description` | `string` | No |  |
| `generic` | `boolean` | Yes | Whether every maker uses the code the same way. |
| `id` | `string` | No |  |
| `note` | `string` | Yes |  |
| `related` | `table` | Yes | What else is held for the model year about the components a code concerns. |
| `url` | `string` | Yes | The page of this code on this model year. |
| `vehicle` | `table` | Yes | The model year an answer is about. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VehicleCode():load({ id = "vehicle_code_id", vehicle_id = "vehicle_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleCodeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleComplaintEntity

```lua
local vehicle_complaint = client:VehicleComplaint(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `complaints` | `number` | Yes |  |
| `crashes` | `number` | Yes | Complaints that report a crash. |
| `fires` | `number` | Yes | Complaints that report a fire. |
| `id` | `string` | Yes | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `number` | Yes | Complaints that report at least one person injured. |
| `median_km` | `number|nil` | No | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `number|nil` | No | The same in miles, as NHTSA records it. |
| `name` | `string` | Yes |  |
| `parent` | `string|nil` | No | The system a part belongs to. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleComplaint():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleComplaintEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleFluidEntity

```lua
local vehicle_fluid = client:VehicleFluid(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string|nil` | No | The day EPA's oil grades were current. |
| `attribution` | `table` | Yes |  |
| `brake` | `table` | Yes |  |
| `checked_as_of` | `string|nil` | No | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `table` | Yes |  |
| `engine_oil` | `table` | Yes |  |
| `engine_oil_checked` | `table` | Yes |  |
| `id` | `string` | No |  |
| `refrigerant` | `table` | Yes |  |
| `transmission` | `table` | Yes |  |
| `vehicle` | `table` | Yes | The model year an answer is about. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleFluid():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleFluidEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleFuelEntity

```lua
local vehicle_fuel = client:VehicleFuel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `co2_g_km` | `number|nil` | No | Tailpipe carbon dioxide, combined. |
| `confidence` | `string` | Yes | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `string` | Yes | `us` or `ca`. |
| `cylinders` | `number|nil` | No |  |
| `described_as` | `string` | Yes | The source's own name for the vehicle rated. |
| `displacement_l` | `number|nil` | No |  |
| `drive` | `string|nil` | No |  |
| `engine` | `any` | No |  |
| `fuel_grade` | `string` | Yes | The fuel the figures are for, which is the recommended grade. |
| `id` | `string` | No |  |
| `kwh_100km` | `number|nil` | No | Combined electricity use. |
| `l_100km` | `any` | No |  |
| `match` | `string` | Yes | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `any` | No |  |
| `range_km` | `number|nil` | No | On a full battery. |
| `range_mi` | `number|nil` | No |  |
| `second_fuel` | `string|nil` | No | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `string` | Yes | `epa` or `nrcan`. |
| `source_id` | `string|nil` | No | EPA's id for the rating. |
| `transmission` | `string|nil` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleFuel():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleFuelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleInvestigationEntity

```lua
local vehicle_investigation = client:VehicleInvestigation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | NHTSA's action number. |
| `campaigns` | `table` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `string|nil` | No | The day it was closed. |
| `component` | `string|nil` | No | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `string` | No |  |
| `kind` | `string` | Yes | The letters the number starts with. |
| `kind_name` | `string|nil` | No | The kind in words. |
| `manufacturer` | `string|nil` | No | The manufacturers it names, separated by `; `. |
| `match` | `string|nil` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `table` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `boolean` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `string|nil` | No | The day it was opened. |
| `subject` | `string|nil` | No | NHTSA's one-line subject. |
| `summary` | `string|nil` | No | NHTSA's summary. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleInvestigation():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleInvestigationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleLaborEntity

```lua
local vehicle_labor = client:VehicleLabor(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string|nil` | No | The newest day an estimate was changed. |
| `attribution` | `table` | Yes |  |
| `basis` | `string` | Yes | `expert`: written by a person who does the work. |
| `class` | `any` | No | The class, for a class-scope figure. |
| `class_name` | `string|nil` | No |  |
| `engine` | `string|nil` | No | The engine the vehicle id named, as an id form. |
| `estimates` | `table` | Yes | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `table` | Yes | Hours, as numbers of hours. |
| `id` | `string` | No |  |
| `job` | `string` | Yes | The job's id. |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes | "An estimate, not a quote. |
| `notes` | `string|nil` | No |  |
| `sample` | `any` | No |  |
| `scope` | `string` | Yes | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `string` | Yes | The day the figure was last changed. |
| `url` | `string` | Yes | The job's page on this site. |
| `vehicle` | `table` | Yes | The model year an answer is about. |
| `years` | `any` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleLabor():list({ id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VehicleLabor():load({ id = "vehicle_labor_id", vehicle_id = "vehicle_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleLaborEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleRecallEntity

```lua
local vehicle_recall = client:VehicleRecall(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_from` | `string|nil` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `string|nil` | No |  |
| `campaign` | `string` | Yes | The publisher's campaign number. |
| `component` | `string|nil` | No | The component, as the source words it. |
| `country` | `string` | Yes | `us` or `ca`. |
| `date` | `string|nil` | No | The day the campaign was reported. |
| `do_not_drive` | `boolean|nil` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `string` | No |  |
| `manufacturer` | `string|nil` | No |  |
| `match` | `string|nil` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `string|nil` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `table` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `string|nil` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `boolean|nil` | No | NHTSA's advisory to park outside, away from buildings. |
| `source` | `string` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `string|nil` | No | What is wrong, in the source's words. |
| `units` | `number|nil` | No | Units potentially affected. |
| `url` | `string` | Yes | The campaign's page on this site. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleRecall():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleRecallEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleSafetyEntity

```lua
local vehicle_safety = client:VehicleSafety(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body_style` | `string|nil` | No |  |
| `curb_weight_kg` | `number|nil` | No | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `number|nil` | No |  |
| `description` | `string` | Yes | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `string|nil` | No |  |
| `features` | `table` | Yes | The safety features NHTSA lists with a rating. |
| `id` | `string` | No |  |
| `match` | `string` | Yes | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `string` | Yes | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `table` | Yes | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `number` | Yes | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `number|nil` | No | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `boolean|nil` | No | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `table` | Yes | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `string|nil` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleSafety():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleSafetyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleSpecEntity

```lua
local vehicle_spec = client:VehicleSpec(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `battery_type` | `string|nil` | No |  |
| `battery_voltage` | `number|nil` | No |  |
| `confidence` | `string` | Yes | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `boolean|nil` | No |  |
| `cylinder_deactivation_name` | `string|nil` | No | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `string` | Yes |  |
| `drive` | `string|nil` | No |  |
| `electrification` | `string|nil` | No | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `table` | Yes |  |
| `engine` | `any` | No |  |
| `ev_motor` | `string|nil` | No |  |
| `exhaust_valves` | `number|nil` | No |  |
| `fuel_grade` | `string` | Yes |  |
| `fuel_usage` | `string|nil` | No | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `number|nil` | No |  |
| `id` | `string` | No |  |
| `intake_valves` | `number|nil` | No | Per cylinder. |
| `luggage_volume_ft3` | `number|nil` | No |  |
| `luggage_volume_l` | `number|nil` | No |  |
| `motor_kw` | `string|nil` | No | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `number|nil` | No |  |
| `passenger_volume_l` | `number|nil` | No |  |
| `size_class` | `string` | Yes |  |
| `source` | `string` | Yes |  |
| `source_id` | `string` | Yes |  |
| `start_stop` | `boolean|nil` | No |  |
| `supercharger` | `boolean` | Yes |  |
| `transmission` | `string|nil` | No |  |
| `transmission_type` | `string|nil` | No |  |
| `turbo` | `boolean` | Yes |  |
| `variable_valve_lift` | `boolean|nil` | No |  |
| `variable_valve_timing` | `boolean|nil` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleSpec():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleSpecEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleTireEntity

```lua
local vehicle_tire = client:VehicleTire(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bolt_pattern` | `string|nil` | No |  |
| `checked` | `string` | Yes |  |
| `id` | `string` | No |  |
| `lug_torque_lbft` | `number|nil` | No |  |
| `lug_torque_nm` | `number|nil` | No |  |
| `lug_torque_written_in` | `string|nil` | No | `nm` or `lbft`. |
| `market` | `string|nil` | No |  |
| `pressure_kpa` | `any` | No |  |
| `pressure_psi` | `any` | No |  |
| `pressure_written_in` | `string|nil` | No | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `string` | Yes | The size as printed. |
| `size_rear` | `string|nil` | No | The rear size, only when it differs from the front. |
| `source` | `string` | Yes |  |
| `trims` | `table` | Yes | The trims the document ties the size to, as it names them. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VehicleTire():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleTireEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VinEntity

```lua
local vin = client:Vin(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_price_usd` | `number|nil` | No | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `string|nil` | No |  |
| `catalog` | `any` | No |  |
| `check_digit` | `table` | Yes |  |
| `doors` | `number|nil` | No |  |
| `drivetrain` | `string|nil` | No |  |
| `engine` | `any` | No |  |
| `gvwr` | `string|nil` | No | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `string` | No |  |
| `make` | `string|nil` | No |  |
| `manufacturer` | `table` | Yes |  |
| `model` | `string|nil` | No |  |
| `plant` | `table` | Yes | Where the vehicle was built. |
| `recalls` | `any` | No |  |
| `safety` | `any` | No |  |
| `seat_rows` | `number|nil` | No |  |
| `seats` | `number|nil` | No |  |
| `series` | `string|nil` | No |  |
| `transmission` | `string|nil` | No |  |
| `transmission_speeds` | `number|nil` | No |  |
| `trim` | `string|nil` | No |  |
| `valid` | `boolean` | Yes | Whether the check digit, position 9, is right. |
| `vin` | `string` | Yes |  |
| `warnings` | `table` | Yes | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `number|nil` | No | Front wheel diameter in inches. |
| `wheel_size_rear` | `number|nil` | No | Rear wheel diameter in inches. |
| `year` | `number|nil` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Vin():load({ id = "vin_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VinBulletinEntity

```lua
local vin_bulletin = client:VinBulletin(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string|nil` | No |  |
| `attribution` | `table` | Yes |  |
| `bulletins` | `table` | Yes |  |
| `counts` | `table` | Yes | What the bulletins of one model year are, in numbers. |
| `decode` | `table` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` | No |  |
| `next_cursor` | `string|nil` | No |  |
| `note` | `string` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VinBulletin():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinBulletinEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VinFluidEntity

```lua
local vin_fluid = client:VinFluid(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string|nil` | No |  |
| `attribution` | `table` | Yes |  |
| `brake` | `table` | Yes |  |
| `checked_as_of` | `string|nil` | No |  |
| `coolant` | `table` | Yes |  |
| `decode` | `table` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `engine_oil` | `table` | Yes |  |
| `engine_oil_checked` | `table` | Yes | Narrowed as `engine_oil` is. |
| `engine_settled` | `boolean` | Yes | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `refrigerant` | `table` | Yes |  |
| `transmission` | `table` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VinFluid():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinFluidEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VinFuelEntity

```lua
local vin_fuel = client:VinFuel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `table` | Yes | The day each country's fuel ratings were current. |
| `attribution` | `table` | Yes |  |
| `decode` | `table` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `engine_settled` | `boolean` | Yes | Whether `ratings` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `ratings` | `table` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VinFuel():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinFuelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VinLaborEntity

```lua
local vin_labor = client:VinLabor(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string|nil` | No |  |
| `attribution` | `table` | Yes |  |
| `class` | `any` | No |  |
| `decode` | `table` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `string|nil` | No |  |
| `estimates` | `table` | Yes |  |
| `id` | `string` | No |  |
| `note` | `string` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VinLabor():list({ id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VinLabor():load({ id = "vin_labor_id", vin_id = "vin_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinLaborEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VinRecallEntity

```lua
local vin_recall = client:VinRecall(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `table` | Yes | The day each country's recall data was current. |
| `attribution` | `table` | Yes |  |
| `decode` | `table` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` | No |  |
| `lookup` | `table` | Yes | Where to check one vehicle for open recalls. |
| `may_apply` | `boolean` | Yes | Always `true`. |
| `recalls` | `table` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `table` | Yes | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VinRecall():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinRecallEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VinSpecEntity

```lua
local vin_spec = client:VinSpec(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string|nil` | No |  |
| `attribution` | `table` | Yes |  |
| `decode` | `table` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `engine_settled` | `boolean` | Yes | Whether `specs` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `specs` | `table` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VinSpec():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinSpecEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VinTireEntity

```lua
local vin_tire = client:VinTire(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string|nil` | No |  |
| `attribution` | `table` | Yes |  |
| `decode` | `table` | Yes | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `table` | Yes | Every fitment of the model year. |
| `id` | `string` | No |  |
| `vehicle` | `any` | No |  |
| `warnings` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:VinTire():list({ id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinTireEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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

