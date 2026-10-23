# WenmarVin Python SDK Reference

Complete API reference for the WenmarVin Python SDK.


## WenmarVinSDK

### Constructor

```python
from wenmarvin_sdk import WenmarVinSDK

client = WenmarVinSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WenmarVinSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = WenmarVinSDK.test()
```


### Instance Methods

#### `Batch(data=None)`

Create a new `BatchEntity` instance. Pass `None` for no initial data.

#### `Bulletin(data=None)`

Create a new `BulletinEntity` instance. Pass `None` for no initial data.

#### `Code(data=None)`

Create a new `CodeEntity` instance. Pass `None` for no initial data.

#### `Data(data=None)`

Create a new `DataEntity` instance. Pass `None` for no initial data.

#### `Engine(data=None)`

Create a new `EngineEntity` instance. Pass `None` for no initial data.

#### `Entry(data=None)`

Create a new `EntryEntity` instance. Pass `None` for no initial data.

#### `Job(data=None)`

Create a new `JobEntity` instance. Pass `None` for no initial data.

#### `Make(data=None)`

Create a new `MakeEntity` instance. Pass `None` for no initial data.

#### `Model(data=None)`

Create a new `ModelEntity` instance. Pass `None` for no initial data.

#### `Overview(data=None)`

Create a new `OverviewEntity` instance. Pass `None` for no initial data.

#### `PartsCard(data=None)`

Create a new `PartsCardEntity` instance. Pass `None` for no initial data.

#### `PayrollDeduction(data=None)`

Create a new `PayrollDeductionEntity` instance. Pass `None` for no initial data.

#### `Recall(data=None)`

Create a new `RecallEntity` instance. Pass `None` for no initial data.

#### `RecallInvestigation(data=None)`

Create a new `RecallInvestigationEntity` instance. Pass `None` for no initial data.

#### `Recent(data=None)`

Create a new `RecentEntity` instance. Pass `None` for no initial data.

#### `Submodel(data=None)`

Create a new `SubmodelEntity` instance. Pass `None` for no initial data.

#### `Vehicle(data=None)`

Create a new `VehicleEntity` instance. Pass `None` for no initial data.

#### `VehicleBulletin(data=None)`

Create a new `VehicleBulletinEntity` instance. Pass `None` for no initial data.

#### `VehicleCode(data=None)`

Create a new `VehicleCodeEntity` instance. Pass `None` for no initial data.

#### `VehicleComplaint(data=None)`

Create a new `VehicleComplaintEntity` instance. Pass `None` for no initial data.

#### `VehicleFluid(data=None)`

Create a new `VehicleFluidEntity` instance. Pass `None` for no initial data.

#### `VehicleFuel(data=None)`

Create a new `VehicleFuelEntity` instance. Pass `None` for no initial data.

#### `VehicleInvestigation(data=None)`

Create a new `VehicleInvestigationEntity` instance. Pass `None` for no initial data.

#### `VehicleLabor(data=None)`

Create a new `VehicleLaborEntity` instance. Pass `None` for no initial data.

#### `VehicleRecall(data=None)`

Create a new `VehicleRecallEntity` instance. Pass `None` for no initial data.

#### `VehicleSafety(data=None)`

Create a new `VehicleSafetyEntity` instance. Pass `None` for no initial data.

#### `VehicleSpec(data=None)`

Create a new `VehicleSpecEntity` instance. Pass `None` for no initial data.

#### `VehicleTire(data=None)`

Create a new `VehicleTireEntity` instance. Pass `None` for no initial data.

#### `Vin(data=None)`

Create a new `VinEntity` instance. Pass `None` for no initial data.

#### `VinBulletin(data=None)`

Create a new `VinBulletinEntity` instance. Pass `None` for no initial data.

#### `VinFluid(data=None)`

Create a new `VinFluidEntity` instance. Pass `None` for no initial data.

#### `VinFuel(data=None)`

Create a new `VinFuelEntity` instance. Pass `None` for no initial data.

#### `VinLabor(data=None)`

Create a new `VinLaborEntity` instance. Pass `None` for no initial data.

#### `VinRecall(data=None)`

Create a new `VinRecallEntity` instance. Pass `None` for no initial data.

#### `VinSpec(data=None)`

Create a new `VinSpecEntity` instance. Pass `None` for no initial data.

#### `VinTire(data=None)`

Create a new `VinTireEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BatchEntity

```python
batch = client.Batch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `vins` | `list` | Yes | At most 50 VINs. |

### Operations

#### `create(reqdata, ctrl=None) -> BatchEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Batch().create({
    "vins": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BatchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BulletinEntity

```python
bulletin = client.Bulletin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `str | None` | No |  |
| `attribution` | `list` | Yes |  |
| `codes` | `list` | Yes | The trouble codes the summary names. |
| `component` | `str | None` | No | NHTSA's components, in its words, separated by `; `. |
| `components` | `list` | Yes | The components it is about, systems first. |
| `date` | `str | None` | No | The manufacturer's own date. |
| `date_added` | `str` | Yes | The day NHTSA published it. |
| `document` | `Any` | No |  |
| `document_id` | `str | None` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `str` | No |  |
| `mfr_campaign` | `str | None` | No | The manufacturer's campaign id or software version. |
| `mfr_system` | `str | None` | No | The manufacturer's own words for the system. |
| `nhtsa_id` | `int` | Yes | NHTSA's id number for the communication. |
| `note` | `str` | Yes |  |
| `replaces` | `str | None` | No | The number of the bulletin this one replaces. |
| `summary` | `str | None` | No | NHTSA's summary of the communication. |
| `topics` | `list` | Yes |  |
| `type` | `str` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `str` | Yes | The type in words. |
| `url` | `str` | Yes | The bulletin's page on this site. |
| `vehicles` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[BulletinEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Bulletin().list()
for bulletin in results:
    print(bulletin.data_get())
```

#### `load(reqmatch, ctrl=None) -> BulletinEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Bulletin().load({"id": "bulletin_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulletinEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CodeEntity

```python
code = client.Code()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `list` | Yes | The credit lines the data's licences ask for. |
| `checked` | `str` | Yes | The day it was approved. |
| `checks` | `list` | Yes | What a technician usually verifies first. |
| `code` | `str` | Yes |  |
| `common_causes` | `list` | Yes | General causes, not about one make. |
| `components` | `list` | Yes |  |
| `generic` | `bool` | Yes | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `str` | No |  |
| `meaning` | `str` | Yes | What the code tells a service advisor. |
| `note` | `str` | Yes | What a description is and is not. |
| `related` | `list` | Yes | Related codes that are described too. |
| `reviewer` | `str` | Yes | The GitHub name of the person who approved the text. |
| `system` | `str` | Yes | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `url` | `str` | Yes | The code's page on this site. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CodeEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Code().list()
for code in results:
    print(code.data_get())
```

#### `load(reqmatch, ctrl=None) -> CodeEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Code().load({"id": "code_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DataEntity

```python
data = client.Data()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_at` | `str` | Yes | When the data file was built, in UTC. |
| `data_version` | `str` | Yes | The data release, such as `2026.09`. |
| `datasets` | `dict` | Yes | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `str` | Yes | The version of the server. |
| `vpic_release` | `str` | Yes | The NHTSA vPIC release the data was built from. |

### Operations

#### `load(reqmatch, ctrl=None) -> DataEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Data().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EngineEntity

```python
engine = client.Engine()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes |  |
| `label` | `str` | Yes |  |
| `preset` | `bool` | Yes | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `str | None` | No | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[EngineEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Engine().list({"make": "example", "model": "example", "year": 1})
for engine in results:
    print(engine.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EngineEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EntryEntity

```python
entry = client.Entry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `str | None` | No |  |
| `drive` | `str | None` | No |  |
| `engine` | `str | None` | No |  |
| `id` | `str` | Yes | The stable id. |
| `make` | `str` | Yes |  |
| `model` | `str` | Yes |  |
| `submodel` | `str | None` | No |  |
| `summary` | `str` | Yes | One line naming everything above that is known. |
| `transmission` | `str | None` | No |  |
| `vehicle_types` | `list` | Yes | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[EntryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Entry().list({"q": "example"})
for entry in results:
    print(entry.data_get())
```

#### `load(reqmatch, ctrl=None) -> EntryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Entry().load({"id": "entry_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EntryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JobEntity

```python
job = client.Job()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `list` | Yes | The credit the labour estimates ask for. |
| `components` | `list` | Yes |  |
| `estimates` | `list | None` | No | The job's class-scope figures. |
| `excludes` | `list` | Yes | Work often done at the same visit that is not part of this job. |
| `id` | `str` | Yes | The job's id. |
| `includes` | `list` | Yes | The work the job covers. |
| `name` | `str` | Yes |  |
| `note` | `str` | Yes | What an estimate is not. |
| `related` | `list` | Yes |  |
| `system` | `str` | Yes | The id of the system the job belongs to. |
| `system_name` | `str` | Yes |  |
| `url` | `str` | Yes | The job's page on this site. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[JobEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Job().list()
for job in results:
    print(job.data_get())
```

#### `load(reqmatch, ctrl=None) -> JobEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Job().load({"id": "job_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JobEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MakeEntity

```python
make = client.Make()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes | The make's id form. |
| `links` | `Any` | No |  |
| `name` | `str` | Yes |  |
| `popular` | `bool` | Yes | Whether it is on the list of popular makes. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MakeEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Make().list()
for make in results:
    print(make.data_get())
```

#### `load(reqmatch, ctrl=None) -> MakeEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Make().load({"id": "make_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MakeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ModelEntity

```python
model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `dict` | Yes | The day each country's recall data was current. |
| `attribution` | `list` | Yes |  |
| `id` | `str` | Yes | The model's id form. |
| `lookup` | `dict` | Yes | Where to check one vehicle for open recalls. |
| `make` | `dict` | Yes | A make or a model: its id form and its name. |
| `may_apply` | `bool` | Yes | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `dict` | Yes | A make or a model: its id form and its name. |
| `name` | `str` | Yes |  |
| `year_from` | `int` | Yes | The first and last model year the model exists in. |
| `year_to` | `int` | Yes |  |
| `years` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ModelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Model().list({"make": "example"})
for model in results:
    print(model.data_get())
```

#### `load(reqmatch, ctrl=None) -> ModelEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Model().load({"make": "make", "model": "model"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OverviewEntity

```python
overview = client.Overview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | Yes | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `str` | Yes |  |
| `suggestions` | `list` | No | VINs the caller may have meant. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[OverviewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Overview().list({"vehicle_id": "example"})
for overview in results:
    print(overview.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OverviewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PartsCardEntity

```python
parts_card = client.PartsCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `list` | Yes |  |
| `engine_settled` | `bool` | Yes | Whether the decode settled one catalog engine. |
| `lines` | `list` | Yes |  |
| `text` | `str` | Yes | The lines as plain text, one `Label: value` each. |
| `vehicle` | `Any` | No |  |
| `vin` | `str` | Yes |  |
| `warnings` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PartsCardEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PartsCard().list({"vin_id": "example"})
for parts_card in results:
    print(parts_card.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PartsCardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PayrollDeductionEntity

```python
payroll_deduction = client.PayrollDeduction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meaning` | `str` | Yes | What the factor means. |
| `name` | `str` | Yes | The name the engine gives the factor. |
| `value` | `float` | Yes | The value used, after rounding. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PayrollDeductionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PayrollDeduction().list()
for payroll_deduction in results:
    print(payroll_deduction.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PayrollDeductionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecallEntity

```python
recall = client.Recall()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `str | None` | No | The day this publisher's data was current. |
| `attribution` | `list` | Yes |  |
| `built_from` | `str | None` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `str | None` | No |  |
| `campaign` | `str` | Yes | The publisher's campaign number. |
| `completion` | `Any` | No |  |
| `component` | `str | None` | No | The component, as the source words it. |
| `consequence` | `str | None` | No |  |
| `country` | `str` | Yes | `us` or `ca`. |
| `date` | `str | None` | No | The day the campaign was reported. |
| `do_not_drive` | `bool | None` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `Any` | No |  |
| `id` | `str` | No |  |
| `lookup` | `dict` | Yes | Where to check one vehicle for open recalls. |
| `manufacturer` | `str | None` | No |  |
| `match` | `str | None` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `bool` | Yes | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `str | None` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `list` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `str | None` | No |  |
| `notification` | `str | None` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `str | None` | No | The day owners were notified. |
| `park_outside` | `bool | None` | No | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `str | None` | No | The manufacturer's part numbers, separated by commas. |
| `remedy` | `str | None` | No |  |
| `source` | `str` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `str | None` | No | What is wrong, in the source's words. |
| `units` | `int | None` | No | Units potentially affected. |
| `url` | `str` | Yes | The campaign's page on this site. |
| `vehicles` | `list` | Yes | Every vehicle the campaign lists, by make, model and year. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[RecallEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Recall().list()
for recall in results:
    print(recall.data_get())
```

#### `load(reqmatch, ctrl=None) -> RecallEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Recall().load({"campaign": "campaign", "source": "source"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecallEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecallInvestigationEntity

```python
recall_investigation = client.RecallInvestigation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes | NHTSA's action number. |
| `campaigns` | `list` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `str | None` | No | The day it was closed. |
| `component` | `str | None` | No | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `str` | Yes | The letters the number starts with. |
| `kind_name` | `str | None` | No | The kind in words. |
| `manufacturer` | `str | None` | No | The manufacturers it names, separated by `; `. |
| `match` | `str | None` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `list` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `str | None` | No | The day it was opened. |
| `subject` | `str | None` | No | NHTSA's one-line subject. |
| `summary` | `str | None` | No | NHTSA's summary. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[RecallInvestigationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.RecallInvestigation().list({"campaign": "example", "recall_id": "example"})
for recall_investigation in results:
    print(recall_investigation.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecallInvestigationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecentEntity

```python
recent = client.Recent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recall` | `dict` | Yes | One recall campaign in a list. |
| `vehicles` | `list` | Yes | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `int` | Yes | How many vehicles the campaign lists in all. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[RecentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Recent().list()
for recent in results:
    print(recent.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SubmodelEntity

```python
submodel = client.Submodel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[SubmodelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Submodel().list({"make": "example", "model": "example", "year": 1})
for submodel in results:
    print(submodel.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubmodelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleEntity

```python
vehicle = client.Vehicle()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Vehicle().list()
for vehicle in results:
    print(vehicle.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleBulletinEntity

```python
vehicle_bulletin = client.VehicleBulletin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component` | `str | None` | No | NHTSA's components, in its words, separated by `; `. |
| `date` | `str | None` | No | The manufacturer's own date. |
| `date_added` | `str` | Yes | The day NHTSA published it. |
| `document` | `Any` | No |  |
| `document_id` | `str | None` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `str` | No |  |
| `mfr_campaign` | `str | None` | No | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `int` | Yes | NHTSA's id number for the communication. |
| `summary` | `str | None` | No | NHTSA's summary of the communication. |
| `type` | `str` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `str` | Yes | The type in words. |
| `url` | `str` | Yes | The bulletin's page on this site. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleBulletinEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleBulletin().list({"id": "example"})
for vehicle_bulletin in results:
    print(vehicle_bulletin.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleBulletinEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleCodeEntity

```python
vehicle_code = client.VehicleCode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `list` | Yes |  |
| `bulletins` | `Any` | No |  |
| `code` | `str` | Yes |  |
| `description` | `str` | No |  |
| `generic` | `bool` | Yes | Whether every maker uses the code the same way. |
| `id` | `str` | No |  |
| `note` | `str` | Yes |  |
| `related` | `dict` | Yes | What else is held for the model year about the components a code concerns. |
| `url` | `str` | Yes | The page of this code on this model year. |
| `vehicle` | `dict` | Yes | The model year an answer is about. |

### Operations

#### `load(reqmatch, ctrl=None) -> VehicleCodeEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VehicleCode().load({"id": "vehicle_code_id", "vehicle_id": "vehicle_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleCodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleComplaintEntity

```python
vehicle_complaint = client.VehicleComplaint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `complaints` | `int` | Yes |  |
| `crashes` | `int` | Yes | Complaints that report a crash. |
| `fires` | `int` | Yes | Complaints that report a fire. |
| `id` | `str` | Yes | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `int` | Yes | Complaints that report at least one person injured. |
| `median_km` | `int | None` | No | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `int | None` | No | The same in miles, as NHTSA records it. |
| `name` | `str` | Yes |  |
| `parent` | `str | None` | No | The system a part belongs to. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleComplaintEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleComplaint().list({"id": "example"})
for vehicle_complaint in results:
    print(vehicle_complaint.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleComplaintEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleFluidEntity

```python
vehicle_fluid = client.VehicleFluid()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `str | None` | No | The day EPA's oil grades were current. |
| `attribution` | `list` | Yes |  |
| `brake` | `list` | Yes |  |
| `checked_as_of` | `str | None` | No | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `list` | Yes |  |
| `engine_oil` | `list` | Yes |  |
| `engine_oil_checked` | `list` | Yes |  |
| `id` | `str` | No |  |
| `refrigerant` | `list` | Yes |  |
| `transmission` | `list` | Yes |  |
| `vehicle` | `dict` | Yes | The model year an answer is about. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleFluidEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleFluid().list({"id": "example"})
for vehicle_fluid in results:
    print(vehicle_fluid.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleFluidEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleFuelEntity

```python
vehicle_fuel = client.VehicleFuel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `co2_g_km` | `int | None` | No | Tailpipe carbon dioxide, combined. |
| `confidence` | `str` | Yes | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `str` | Yes | `us` or `ca`. |
| `cylinders` | `int | None` | No |  |
| `described_as` | `str` | Yes | The source's own name for the vehicle rated. |
| `displacement_l` | `float | None` | No |  |
| `drive` | `str | None` | No |  |
| `engine` | `Any` | No |  |
| `fuel_grade` | `str` | Yes | The fuel the figures are for, which is the recommended grade. |
| `id` | `str` | No |  |
| `kwh_100km` | `float | None` | No | Combined electricity use. |
| `l_100km` | `Any` | No |  |
| `match` | `str` | Yes | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `Any` | No |  |
| `range_km` | `int | None` | No | On a full battery. |
| `range_mi` | `int | None` | No |  |
| `second_fuel` | `str | None` | No | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `str` | Yes | `epa` or `nrcan`. |
| `source_id` | `str | None` | No | EPA's id for the rating. |
| `transmission` | `str | None` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleFuelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleFuel().list({"id": "example"})
for vehicle_fuel in results:
    print(vehicle_fuel.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleFuelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleInvestigationEntity

```python
vehicle_investigation = client.VehicleInvestigation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `str` | Yes | NHTSA's action number. |
| `campaigns` | `list` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `str | None` | No | The day it was closed. |
| `component` | `str | None` | No | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `str` | No |  |
| `kind` | `str` | Yes | The letters the number starts with. |
| `kind_name` | `str | None` | No | The kind in words. |
| `manufacturer` | `str | None` | No | The manufacturers it names, separated by `; `. |
| `match` | `str | None` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `list` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `str | None` | No | The day it was opened. |
| `subject` | `str | None` | No | NHTSA's one-line subject. |
| `summary` | `str | None` | No | NHTSA's summary. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleInvestigationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleInvestigation().list({"id": "example"})
for vehicle_investigation in results:
    print(vehicle_investigation.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleInvestigationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleLaborEntity

```python
vehicle_labor = client.VehicleLabor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `str | None` | No | The newest day an estimate was changed. |
| `attribution` | `list` | Yes |  |
| `basis` | `str` | Yes | `expert`: written by a person who does the work. |
| `class` | `Any` | No | The class, for a class-scope figure. |
| `class_name` | `str | None` | No |  |
| `engine` | `str | None` | No | The engine the vehicle id named, as an id form. |
| `estimates` | `list` | Yes | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `dict` | Yes | Hours, as numbers of hours. |
| `id` | `str` | No |  |
| `job` | `str` | Yes | The job's id. |
| `name` | `str` | Yes |  |
| `note` | `str` | Yes | "An estimate, not a quote. |
| `notes` | `str | None` | No |  |
| `sample` | `Any` | No |  |
| `scope` | `str` | Yes | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `str` | Yes | The day the figure was last changed. |
| `url` | `str` | Yes | The job's page on this site. |
| `vehicle` | `dict` | Yes | The model year an answer is about. |
| `years` | `Any` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleLaborEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleLabor().list({"id": "example"})
for vehicle_labor in results:
    print(vehicle_labor.data_get())
```

#### `load(reqmatch, ctrl=None) -> VehicleLaborEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VehicleLabor().load({"id": "vehicle_labor_id", "vehicle_id": "vehicle_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleLaborEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleRecallEntity

```python
vehicle_recall = client.VehicleRecall()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_from` | `str | None` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `str | None` | No |  |
| `campaign` | `str` | Yes | The publisher's campaign number. |
| `component` | `str | None` | No | The component, as the source words it. |
| `country` | `str` | Yes | `us` or `ca`. |
| `date` | `str | None` | No | The day the campaign was reported. |
| `do_not_drive` | `bool | None` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `str` | No |  |
| `manufacturer` | `str | None` | No |  |
| `match` | `str | None` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `str | None` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `list` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `str | None` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `bool | None` | No | NHTSA's advisory to park outside, away from buildings. |
| `source` | `str` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `str | None` | No | What is wrong, in the source's words. |
| `units` | `int | None` | No | Units potentially affected. |
| `url` | `str` | Yes | The campaign's page on this site. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleRecallEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleRecall().list({"id": "example"})
for vehicle_recall in results:
    print(vehicle_recall.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleRecallEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleSafetyEntity

```python
vehicle_safety = client.VehicleSafety()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body_style` | `str | None` | No |  |
| `curb_weight_kg` | `int | None` | No | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `int | None` | No |  |
| `description` | `str` | Yes | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `str | None` | No |  |
| `features` | `dict` | Yes | The safety features NHTSA lists with a rating. |
| `id` | `str` | No |  |
| `match` | `str` | Yes | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `str` | Yes | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `list` | Yes | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `int` | Yes | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `float | None` | No | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `bool | None` | No | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `dict` | Yes | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `str | None` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleSafetyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleSafety().list({"id": "example"})
for vehicle_safety in results:
    print(vehicle_safety.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleSafetyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleSpecEntity

```python
vehicle_spec = client.VehicleSpec()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `battery_type` | `str | None` | No |  |
| `battery_voltage` | `int | None` | No |  |
| `confidence` | `str` | Yes | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `bool | None` | No |  |
| `cylinder_deactivation_name` | `str | None` | No | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `str` | Yes |  |
| `drive` | `str | None` | No |  |
| `electrification` | `str | None` | No | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `list` | Yes |  |
| `engine` | `Any` | No |  |
| `ev_motor` | `str | None` | No |  |
| `exhaust_valves` | `int | None` | No |  |
| `fuel_grade` | `str` | Yes |  |
| `fuel_usage` | `str | None` | No | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `int | None` | No |  |
| `id` | `str` | No |  |
| `intake_valves` | `int | None` | No | Per cylinder. |
| `luggage_volume_ft3` | `int | None` | No |  |
| `luggage_volume_l` | `int | None` | No |  |
| `motor_kw` | `str | None` | No | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `int | None` | No |  |
| `passenger_volume_l` | `int | None` | No |  |
| `size_class` | `str` | Yes |  |
| `source` | `str` | Yes |  |
| `source_id` | `str` | Yes |  |
| `start_stop` | `bool | None` | No |  |
| `supercharger` | `bool` | Yes |  |
| `transmission` | `str | None` | No |  |
| `transmission_type` | `str | None` | No |  |
| `turbo` | `bool` | Yes |  |
| `variable_valve_lift` | `bool | None` | No |  |
| `variable_valve_timing` | `bool | None` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleSpecEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleSpec().list({"id": "example"})
for vehicle_spec in results:
    print(vehicle_spec.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleSpecEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleTireEntity

```python
vehicle_tire = client.VehicleTire()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bolt_pattern` | `str | None` | No |  |
| `checked` | `str` | Yes |  |
| `id` | `str` | No |  |
| `lug_torque_lbft` | `int | None` | No |  |
| `lug_torque_nm` | `int | None` | No |  |
| `lug_torque_written_in` | `str | None` | No | `nm` or `lbft`. |
| `market` | `str | None` | No |  |
| `pressure_kpa` | `Any` | No |  |
| `pressure_psi` | `Any` | No |  |
| `pressure_written_in` | `str | None` | No | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `str` | Yes | The size as printed. |
| `size_rear` | `str | None` | No | The rear size, only when it differs from the front. |
| `source` | `str` | Yes |  |
| `trims` | `list` | Yes | The trims the document ties the size to, as it names them. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VehicleTireEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VehicleTire().list({"id": "example"})
for vehicle_tire in results:
    print(vehicle_tire.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleTireEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VinEntity

```python
vin = client.Vin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_price_usd` | `float | None` | No | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `str | None` | No |  |
| `catalog` | `Any` | No |  |
| `check_digit` | `dict` | Yes |  |
| `doors` | `int | None` | No |  |
| `drivetrain` | `str | None` | No |  |
| `engine` | `Any` | No |  |
| `gvwr` | `str | None` | No | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `str` | No |  |
| `make` | `str | None` | No |  |
| `manufacturer` | `dict` | Yes |  |
| `model` | `str | None` | No |  |
| `plant` | `dict` | Yes | Where the vehicle was built. |
| `recalls` | `Any` | No |  |
| `safety` | `Any` | No |  |
| `seat_rows` | `int | None` | No |  |
| `seats` | `int | None` | No |  |
| `series` | `str | None` | No |  |
| `transmission` | `str | None` | No |  |
| `transmission_speeds` | `int | None` | No |  |
| `trim` | `str | None` | No |  |
| `valid` | `bool` | Yes | Whether the check digit, position 9, is right. |
| `vin` | `str` | Yes |  |
| `warnings` | `list` | Yes | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `int | None` | No | Front wheel diameter in inches. |
| `wheel_size_rear` | `int | None` | No | Rear wheel diameter in inches. |
| `year` | `int | None` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> VinEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Vin().load({"id": "vin_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VinBulletinEntity

```python
vin_bulletin = client.VinBulletin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `str | None` | No |  |
| `attribution` | `list` | Yes |  |
| `bulletins` | `list` | Yes |  |
| `counts` | `dict` | Yes | What the bulletins of one model year are, in numbers. |
| `decode` | `dict` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `str` | No |  |
| `next_cursor` | `str | None` | No |  |
| `note` | `str` | Yes |  |
| `vehicle` | `Any` | No |  |
| `warnings` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VinBulletinEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VinBulletin().list({"id": "example"})
for vin_bulletin in results:
    print(vin_bulletin.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinBulletinEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VinFluidEntity

```python
vin_fluid = client.VinFluid()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `str | None` | No |  |
| `attribution` | `list` | Yes |  |
| `brake` | `list` | Yes |  |
| `checked_as_of` | `str | None` | No |  |
| `coolant` | `list` | Yes |  |
| `decode` | `dict` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Any` | No |  |
| `engine_oil` | `list` | Yes |  |
| `engine_oil_checked` | `list` | Yes | Narrowed as `engine_oil` is. |
| `engine_settled` | `bool` | Yes | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `str` | No |  |
| `refrigerant` | `list` | Yes |  |
| `transmission` | `list` | Yes |  |
| `vehicle` | `Any` | No |  |
| `warnings` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VinFluidEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VinFluid().list({"id": "example"})
for vin_fluid in results:
    print(vin_fluid.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinFluidEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VinFuelEntity

```python
vin_fuel = client.VinFuel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `dict` | Yes | The day each country's fuel ratings were current. |
| `attribution` | `list` | Yes |  |
| `decode` | `dict` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Any` | No |  |
| `engine_settled` | `bool` | Yes | Whether `ratings` is narrowed to `engine`. |
| `id` | `str` | No |  |
| `ratings` | `list` | Yes |  |
| `vehicle` | `Any` | No |  |
| `warnings` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VinFuelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VinFuel().list({"id": "example"})
for vin_fuel in results:
    print(vin_fuel.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinFuelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VinLaborEntity

```python
vin_labor = client.VinLabor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `str | None` | No |  |
| `attribution` | `list` | Yes |  |
| `class` | `Any` | No |  |
| `decode` | `dict` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `str | None` | No |  |
| `estimates` | `list` | Yes |  |
| `id` | `str` | No |  |
| `note` | `str` | Yes |  |
| `vehicle` | `Any` | No |  |
| `warnings` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VinLaborEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VinLabor().list({"id": "example"})
for vin_labor in results:
    print(vin_labor.data_get())
```

#### `load(reqmatch, ctrl=None) -> VinLaborEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VinLabor().load({"id": "vin_labor_id", "vin_id": "vin_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinLaborEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VinRecallEntity

```python
vin_recall = client.VinRecall()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `dict` | Yes | The day each country's recall data was current. |
| `attribution` | `list` | Yes |  |
| `decode` | `dict` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `str` | No |  |
| `lookup` | `dict` | Yes | Where to check one vehicle for open recalls. |
| `may_apply` | `bool` | Yes | Always `true`. |
| `recalls` | `list` | Yes |  |
| `vehicle` | `Any` | No |  |
| `warnings` | `list` | Yes | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VinRecallEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VinRecall().list({"id": "example"})
for vin_recall in results:
    print(vin_recall.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinRecallEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VinSpecEntity

```python
vin_spec = client.VinSpec()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `str | None` | No |  |
| `attribution` | `list` | Yes |  |
| `decode` | `dict` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `Any` | No |  |
| `engine_settled` | `bool` | Yes | Whether `specs` is narrowed to `engine`. |
| `id` | `str` | No |  |
| `specs` | `list` | Yes |  |
| `vehicle` | `Any` | No |  |
| `warnings` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VinSpecEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VinSpec().list({"id": "example"})
for vin_spec in results:
    print(vin_spec.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinSpecEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VinTireEntity

```python
vin_tire = client.VinTire()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `str | None` | No |  |
| `attribution` | `list` | Yes |  |
| `decode` | `dict` | Yes | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `list` | Yes | Every fitment of the model year. |
| `id` | `str` | No |  |
| `vehicle` | `Any` | No |  |
| `warnings` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VinTireEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.VinTire().list({"id": "example"})
for vin_tire in results:
    print(vin_tire.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VinTireEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = WenmarVinSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

