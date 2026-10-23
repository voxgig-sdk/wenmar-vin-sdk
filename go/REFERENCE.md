# WenmarVin Golang SDK Reference

Complete API reference for the WenmarVin Golang SDK.


## WenmarVinSDK

### Constructor

```go
func NewWenmarVinSDK(options map[string]any) *WenmarVinSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *WenmarVinSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *WenmarVinSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Batch(data map[string]any) WenmarVinEntity`

Create a new `Batch` entity instance. Pass `nil` for no initial data.

#### `Bulletin(data map[string]any) WenmarVinEntity`

Create a new `Bulletin` entity instance. Pass `nil` for no initial data.

#### `Code(data map[string]any) WenmarVinEntity`

Create a new `Code` entity instance. Pass `nil` for no initial data.

#### `Data(data map[string]any) WenmarVinEntity`

Create a new `Data` entity instance. Pass `nil` for no initial data.

#### `Engine(data map[string]any) WenmarVinEntity`

Create a new `Engine` entity instance. Pass `nil` for no initial data.

#### `Entry(data map[string]any) WenmarVinEntity`

Create a new `Entry` entity instance. Pass `nil` for no initial data.

#### `Job(data map[string]any) WenmarVinEntity`

Create a new `Job` entity instance. Pass `nil` for no initial data.

#### `Make(data map[string]any) WenmarVinEntity`

Create a new `Make` entity instance. Pass `nil` for no initial data.

#### `Model(data map[string]any) WenmarVinEntity`

Create a new `Model` entity instance. Pass `nil` for no initial data.

#### `Overview(data map[string]any) WenmarVinEntity`

Create a new `Overview` entity instance. Pass `nil` for no initial data.

#### `PartsCard(data map[string]any) WenmarVinEntity`

Create a new `PartsCard` entity instance. Pass `nil` for no initial data.

#### `PayrollDeduction(data map[string]any) WenmarVinEntity`

Create a new `PayrollDeduction` entity instance. Pass `nil` for no initial data.

#### `Recall(data map[string]any) WenmarVinEntity`

Create a new `Recall` entity instance. Pass `nil` for no initial data.

#### `RecallInvestigation(data map[string]any) WenmarVinEntity`

Create a new `RecallInvestigation` entity instance. Pass `nil` for no initial data.

#### `Recent(data map[string]any) WenmarVinEntity`

Create a new `Recent` entity instance. Pass `nil` for no initial data.

#### `Submodel(data map[string]any) WenmarVinEntity`

Create a new `Submodel` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data map[string]any) WenmarVinEntity`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `VehicleBulletin(data map[string]any) WenmarVinEntity`

Create a new `VehicleBulletin` entity instance. Pass `nil` for no initial data.

#### `VehicleCode(data map[string]any) WenmarVinEntity`

Create a new `VehicleCode` entity instance. Pass `nil` for no initial data.

#### `VehicleComplaint(data map[string]any) WenmarVinEntity`

Create a new `VehicleComplaint` entity instance. Pass `nil` for no initial data.

#### `VehicleFluid(data map[string]any) WenmarVinEntity`

Create a new `VehicleFluid` entity instance. Pass `nil` for no initial data.

#### `VehicleFuel(data map[string]any) WenmarVinEntity`

Create a new `VehicleFuel` entity instance. Pass `nil` for no initial data.

#### `VehicleInvestigation(data map[string]any) WenmarVinEntity`

Create a new `VehicleInvestigation` entity instance. Pass `nil` for no initial data.

#### `VehicleLabor(data map[string]any) WenmarVinEntity`

Create a new `VehicleLabor` entity instance. Pass `nil` for no initial data.

#### `VehicleRecall(data map[string]any) WenmarVinEntity`

Create a new `VehicleRecall` entity instance. Pass `nil` for no initial data.

#### `VehicleSafety(data map[string]any) WenmarVinEntity`

Create a new `VehicleSafety` entity instance. Pass `nil` for no initial data.

#### `VehicleSpec(data map[string]any) WenmarVinEntity`

Create a new `VehicleSpec` entity instance. Pass `nil` for no initial data.

#### `VehicleTire(data map[string]any) WenmarVinEntity`

Create a new `VehicleTire` entity instance. Pass `nil` for no initial data.

#### `Vin(data map[string]any) WenmarVinEntity`

Create a new `Vin` entity instance. Pass `nil` for no initial data.

#### `VinBulletin(data map[string]any) WenmarVinEntity`

Create a new `VinBulletin` entity instance. Pass `nil` for no initial data.

#### `VinFluid(data map[string]any) WenmarVinEntity`

Create a new `VinFluid` entity instance. Pass `nil` for no initial data.

#### `VinFuel(data map[string]any) WenmarVinEntity`

Create a new `VinFuel` entity instance. Pass `nil` for no initial data.

#### `VinLabor(data map[string]any) WenmarVinEntity`

Create a new `VinLabor` entity instance. Pass `nil` for no initial data.

#### `VinRecall(data map[string]any) WenmarVinEntity`

Create a new `VinRecall` entity instance. Pass `nil` for no initial data.

#### `VinSpec(data map[string]any) WenmarVinEntity`

Create a new `VinSpec` entity instance. Pass `nil` for no initial data.

#### `VinTire(data map[string]any) WenmarVinEntity`

Create a new `VinTire` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BatchEntity

```go
batch := client.Batch(nil)
fmt.Println(batch.GetName()) // "batch"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `vins` | `[]any` | Yes | At most 50 VINs. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Batch(nil).Create(map[string]any{
    "vins": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BatchEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BulletinEntity

```go
bulletin := client.Bulletin(nil)
fmt.Println(bulletin.GetName()) // "bulletin"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `any` | No |  |
| `attribution` | `[]any` | Yes |  |
| `codes` | `[]any` | Yes | The trouble codes the summary names. |
| `component` | `any` | No | NHTSA's components, in its words, separated by `; `. |
| `components` | `[]any` | Yes | The components it is about, systems first. |
| `date` | `any` | No | The manufacturer's own date. |
| `date_added` | `string` | Yes | The day NHTSA published it. |
| `document` | `any` | No |  |
| `document_id` | `any` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` | No |  |
| `mfr_campaign` | `any` | No | The manufacturer's campaign id or software version. |
| `mfr_system` | `any` | No | The manufacturer's own words for the system. |
| `nhtsa_id` | `int` | Yes | NHTSA's id number for the communication. |
| `note` | `string` | Yes |  |
| `replaces` | `any` | No | The number of the bulletin this one replaces. |
| `summary` | `any` | No | NHTSA's summary of the communication. |
| `topics` | `[]any` | Yes |  |
| `type` | `string` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | Yes | The type in words. |
| `url` | `string` | Yes | The bulletin's page on this site. |
| `vehicles` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Bulletin(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Bulletin(nil).Load(map[string]any{"id": "bulletin_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BulletinEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CodeEntity

```go
code := client.Code(nil)
fmt.Println(code.GetName()) // "code"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `[]any` | Yes | The credit lines the data's licences ask for. |
| `checked` | `string` | Yes | The day it was approved. |
| `checks` | `[]any` | Yes | What a technician usually verifies first. |
| `code` | `string` | Yes |  |
| `common_causes` | `[]any` | Yes | General causes, not about one make. |
| `components` | `[]any` | Yes |  |
| `generic` | `bool` | Yes | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `string` | No |  |
| `meaning` | `string` | Yes | What the code tells a service advisor. |
| `note` | `string` | Yes | What a description is and is not. |
| `related` | `[]any` | Yes | Related codes that are described too. |
| `reviewer` | `string` | Yes | The GitHub name of the person who approved the text. |
| `system` | `string` | Yes | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `url` | `string` | Yes | The code's page on this site. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Code(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Code(nil).Load(map[string]any{"id": "code_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CodeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DataEntity

```go
data := client.Data(nil)
fmt.Println(data.GetName()) // "data"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_at` | `string` | Yes | When the data file was built, in UTC. |
| `data_version` | `string` | Yes | The data release, such as `2026.09`. |
| `datasets` | `map[string]any` | Yes | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `string` | Yes | The version of the server. |
| `vpic_release` | `string` | Yes | The NHTSA vPIC release the data was built from. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Data(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DataEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EngineEntity

```go
engine := client.Engine(nil)
fmt.Println(engine.GetName()) // "engine"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `preset` | `bool` | Yes | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `any` | No | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Engine(nil).List(map[string]any{"make": "example", "model": "example", "year": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EngineEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## EntryEntity

```go
entry := client.Entry(nil)
fmt.Println(entry.GetName()) // "entry"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `any` | No |  |
| `drive` | `any` | No |  |
| `engine` | `any` | No |  |
| `id` | `string` | Yes | The stable id. |
| `make` | `string` | Yes |  |
| `model` | `string` | Yes |  |
| `submodel` | `any` | No |  |
| `summary` | `string` | Yes | One line naming everything above that is known. |
| `transmission` | `any` | No |  |
| `vehicle_types` | `[]any` | Yes | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Entry(nil).List(map[string]any{"q": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Entry(nil).Load(map[string]any{"id": "entry_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EntryEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## JobEntity

```go
job := client.Job(nil)
fmt.Println(job.GetName()) // "job"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `[]any` | Yes | The credit the labour estimates ask for. |
| `components` | `[]any` | Yes |  |
| `estimates` | `any` | No | The job's class-scope figures. |
| `excludes` | `[]any` | Yes | Work often done at the same visit that is not part of this job. |
| `id` | `string` | Yes | The job's id. |
| `includes` | `[]any` | Yes | The work the job covers. |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes | What an estimate is not. |
| `related` | `[]any` | Yes |  |
| `system` | `string` | Yes | The id of the system the job belongs to. |
| `system_name` | `string` | Yes |  |
| `url` | `string` | Yes | The job's page on this site. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Job(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Job(nil).Load(map[string]any{"id": "job_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `JobEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MakeEntity

```go
make := client.Make(nil)
fmt.Println(make.GetName()) // "make"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | The make's id form. |
| `links` | `any` | No |  |
| `name` | `string` | Yes |  |
| `popular` | `bool` | Yes | Whether it is on the list of popular makes. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Make(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Make(nil).Load(map[string]any{"id": "make_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MakeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ModelEntity

```go
model := client.Model(nil)
fmt.Println(model.GetName()) // "model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `map[string]any` | Yes | The day each country's recall data was current. |
| `attribution` | `[]any` | Yes |  |
| `id` | `string` | Yes | The model's id form. |
| `lookup` | `map[string]any` | Yes | Where to check one vehicle for open recalls. |
| `make` | `map[string]any` | Yes | A make or a model: its id form and its name. |
| `may_apply` | `bool` | Yes | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `map[string]any` | Yes | A make or a model: its id form and its name. |
| `name` | `string` | Yes |  |
| `year_from` | `int` | Yes | The first and last model year the model exists in. |
| `year_to` | `int` | Yes |  |
| `years` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Model(nil).List(map[string]any{"make": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Model(nil).Load(map[string]any{"make": "make", "model": "model"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ModelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## OverviewEntity

```go
overview := client.Overview(nil)
fmt.Println(overview.GetName()) // "overview"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `string` | Yes |  |
| `suggestions` | `[]any` | No | VINs the caller may have meant. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Overview(nil).List(map[string]any{"vehicle_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OverviewEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PartsCardEntity

```go
partsCard := client.PartsCard(nil)
fmt.Println(partsCard.GetName()) // "parts_card"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `[]any` | Yes |  |
| `engine_settled` | `bool` | Yes | Whether the decode settled one catalog engine. |
| `lines` | `[]any` | Yes |  |
| `text` | `string` | Yes | The lines as plain text, one `Label: value` each. |
| `vehicle` | `any` | No |  |
| `vin` | `string` | Yes |  |
| `warnings` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PartsCard(nil).List(map[string]any{"vin_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PartsCardEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PayrollDeductionEntity

```go
payrollDeduction := client.PayrollDeduction(nil)
fmt.Println(payrollDeduction.GetName()) // "payroll_deduction"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meaning` | `string` | Yes | What the factor means. |
| `name` | `string` | Yes | The name the engine gives the factor. |
| `value` | `float64` | Yes | The value used, after rounding. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PayrollDeduction(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PayrollDeductionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RecallEntity

```go
recall := client.Recall(nil)
fmt.Println(recall.GetName()) // "recall"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `any` | No | The day this publisher's data was current. |
| `attribution` | `[]any` | Yes |  |
| `built_from` | `any` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `any` | No |  |
| `campaign` | `string` | Yes | The publisher's campaign number. |
| `completion` | `any` | No |  |
| `component` | `any` | No | The component, as the source words it. |
| `consequence` | `any` | No |  |
| `country` | `string` | Yes | `us` or `ca`. |
| `date` | `any` | No | The day the campaign was reported. |
| `do_not_drive` | `any` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `any` | No |  |
| `id` | `string` | No |  |
| `lookup` | `map[string]any` | Yes | Where to check one vehicle for open recalls. |
| `manufacturer` | `any` | No |  |
| `match` | `any` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `bool` | Yes | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `any` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `[]any` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `any` | No |  |
| `notification` | `any` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `any` | No | The day owners were notified. |
| `park_outside` | `any` | No | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `any` | No | The manufacturer's part numbers, separated by commas. |
| `remedy` | `any` | No |  |
| `source` | `string` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `any` | No | What is wrong, in the source's words. |
| `units` | `any` | No | Units potentially affected. |
| `url` | `string` | Yes | The campaign's page on this site. |
| `vehicles` | `[]any` | Yes | Every vehicle the campaign lists, by make, model and year. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Recall(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Recall(nil).Load(map[string]any{"campaign": "campaign", "source": "source"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecallEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RecallInvestigationEntity

```go
recallInvestigation := client.RecallInvestigation(nil)
fmt.Println(recallInvestigation.GetName()) // "recall_investigation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | NHTSA's action number. |
| `campaigns` | `[]any` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `any` | No | The day it was closed. |
| `component` | `any` | No | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `string` | Yes | The letters the number starts with. |
| `kind_name` | `any` | No | The kind in words. |
| `manufacturer` | `any` | No | The manufacturers it names, separated by `; `. |
| `match` | `any` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `[]any` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `any` | No | The day it was opened. |
| `subject` | `any` | No | NHTSA's one-line subject. |
| `summary` | `any` | No | NHTSA's summary. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.RecallInvestigation(nil).List(map[string]any{"campaign": "example", "recall_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecallInvestigationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RecentEntity

```go
recent := client.Recent(nil)
fmt.Println(recent.GetName()) // "recent"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recall` | `map[string]any` | Yes | One recall campaign in a list. |
| `vehicles` | `[]any` | Yes | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `int` | Yes | How many vehicles the campaign lists in all. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Recent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SubmodelEntity

```go
submodel := client.Submodel(nil)
fmt.Println(submodel.GetName()) // "submodel"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Submodel(nil).List(map[string]any{"make": "example", "model": "example", "year": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SubmodelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleEntity

```go
vehicle := client.Vehicle(nil)
fmt.Println(vehicle.GetName()) // "vehicle"
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Vehicle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleBulletinEntity

```go
vehicleBulletin := client.VehicleBulletin(nil)
fmt.Println(vehicleBulletin.GetName()) // "vehicle_bulletin"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component` | `any` | No | NHTSA's components, in its words, separated by `; `. |
| `date` | `any` | No | The manufacturer's own date. |
| `date_added` | `string` | Yes | The day NHTSA published it. |
| `document` | `any` | No |  |
| `document_id` | `any` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` | No |  |
| `mfr_campaign` | `any` | No | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `int` | Yes | NHTSA's id number for the communication. |
| `summary` | `any` | No | NHTSA's summary of the communication. |
| `type` | `string` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | Yes | The type in words. |
| `url` | `string` | Yes | The bulletin's page on this site. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleBulletin(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleBulletinEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleCodeEntity

```go
vehicleCode := client.VehicleCode(nil)
fmt.Println(vehicleCode.GetName()) // "vehicle_code"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `[]any` | Yes |  |
| `bulletins` | `any` | No |  |
| `code` | `string` | Yes |  |
| `description` | `string` | No |  |
| `generic` | `bool` | Yes | Whether every maker uses the code the same way. |
| `id` | `string` | No |  |
| `note` | `string` | Yes |  |
| `related` | `map[string]any` | Yes | What else is held for the model year about the components a code concerns. |
| `url` | `string` | Yes | The page of this code on this model year. |
| `vehicle` | `map[string]any` | Yes | The model year an answer is about. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.VehicleCode(nil).Load(map[string]any{"id": "vehicle_code_id", "vehicle_id": "vehicle_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleCodeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleComplaintEntity

```go
vehicleComplaint := client.VehicleComplaint(nil)
fmt.Println(vehicleComplaint.GetName()) // "vehicle_complaint"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `complaints` | `int` | Yes |  |
| `crashes` | `int` | Yes | Complaints that report a crash. |
| `fires` | `int` | Yes | Complaints that report a fire. |
| `id` | `string` | Yes | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `int` | Yes | Complaints that report at least one person injured. |
| `median_km` | `any` | No | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `any` | No | The same in miles, as NHTSA records it. |
| `name` | `string` | Yes |  |
| `parent` | `any` | No | The system a part belongs to. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleComplaint(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleComplaintEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleFluidEntity

```go
vehicleFluid := client.VehicleFluid(nil)
fmt.Println(vehicleFluid.GetName()) // "vehicle_fluid"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `any` | No | The day EPA's oil grades were current. |
| `attribution` | `[]any` | Yes |  |
| `brake` | `[]any` | Yes |  |
| `checked_as_of` | `any` | No | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `[]any` | Yes |  |
| `engine_oil` | `[]any` | Yes |  |
| `engine_oil_checked` | `[]any` | Yes |  |
| `id` | `string` | No |  |
| `refrigerant` | `[]any` | Yes |  |
| `transmission` | `[]any` | Yes |  |
| `vehicle` | `map[string]any` | Yes | The model year an answer is about. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleFluid(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleFluidEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleFuelEntity

```go
vehicleFuel := client.VehicleFuel(nil)
fmt.Println(vehicleFuel.GetName()) // "vehicle_fuel"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `co2_g_km` | `any` | No | Tailpipe carbon dioxide, combined. |
| `confidence` | `string` | Yes | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `string` | Yes | `us` or `ca`. |
| `cylinders` | `any` | No |  |
| `described_as` | `string` | Yes | The source's own name for the vehicle rated. |
| `displacement_l` | `any` | No |  |
| `drive` | `any` | No |  |
| `engine` | `any` | No |  |
| `fuel_grade` | `string` | Yes | The fuel the figures are for, which is the recommended grade. |
| `id` | `string` | No |  |
| `kwh_100km` | `any` | No | Combined electricity use. |
| `l_100km` | `any` | No |  |
| `match` | `string` | Yes | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `any` | No |  |
| `range_km` | `any` | No | On a full battery. |
| `range_mi` | `any` | No |  |
| `second_fuel` | `any` | No | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `string` | Yes | `epa` or `nrcan`. |
| `source_id` | `any` | No | EPA's id for the rating. |
| `transmission` | `any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleFuel(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleFuelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleInvestigationEntity

```go
vehicleInvestigation := client.VehicleInvestigation(nil)
fmt.Println(vehicleInvestigation.GetName()) // "vehicle_investigation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | NHTSA's action number. |
| `campaigns` | `[]any` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `any` | No | The day it was closed. |
| `component` | `any` | No | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `string` | No |  |
| `kind` | `string` | Yes | The letters the number starts with. |
| `kind_name` | `any` | No | The kind in words. |
| `manufacturer` | `any` | No | The manufacturers it names, separated by `; `. |
| `match` | `any` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `[]any` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `any` | No | The day it was opened. |
| `subject` | `any` | No | NHTSA's one-line subject. |
| `summary` | `any` | No | NHTSA's summary. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleInvestigation(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleInvestigationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleLaborEntity

```go
vehicleLabor := client.VehicleLabor(nil)
fmt.Println(vehicleLabor.GetName()) // "vehicle_labor"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `any` | No | The newest day an estimate was changed. |
| `attribution` | `[]any` | Yes |  |
| `basis` | `string` | Yes | `expert`: written by a person who does the work. |
| `class` | `any` | No | The class, for a class-scope figure. |
| `class_name` | `any` | No |  |
| `engine` | `any` | No | The engine the vehicle id named, as an id form. |
| `estimates` | `[]any` | Yes | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `map[string]any` | Yes | Hours, as numbers of hours. |
| `id` | `string` | No |  |
| `job` | `string` | Yes | The job's id. |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes | "An estimate, not a quote. |
| `notes` | `any` | No |  |
| `sample` | `any` | No |  |
| `scope` | `string` | Yes | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `string` | Yes | The day the figure was last changed. |
| `url` | `string` | Yes | The job's page on this site. |
| `vehicle` | `map[string]any` | Yes | The model year an answer is about. |
| `years` | `any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleLabor(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.VehicleLabor(nil).Load(map[string]any{"id": "vehicle_labor_id", "vehicle_id": "vehicle_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleLaborEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleRecallEntity

```go
vehicleRecall := client.VehicleRecall(nil)
fmt.Println(vehicleRecall.GetName()) // "vehicle_recall"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_from` | `any` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `any` | No |  |
| `campaign` | `string` | Yes | The publisher's campaign number. |
| `component` | `any` | No | The component, as the source words it. |
| `country` | `string` | Yes | `us` or `ca`. |
| `date` | `any` | No | The day the campaign was reported. |
| `do_not_drive` | `any` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `string` | No |  |
| `manufacturer` | `any` | No |  |
| `match` | `any` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `any` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `[]any` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `any` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `any` | No | NHTSA's advisory to park outside, away from buildings. |
| `source` | `string` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `any` | No | What is wrong, in the source's words. |
| `units` | `any` | No | Units potentially affected. |
| `url` | `string` | Yes | The campaign's page on this site. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleRecall(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleRecallEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleSafetyEntity

```go
vehicleSafety := client.VehicleSafety(nil)
fmt.Println(vehicleSafety.GetName()) // "vehicle_safety"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body_style` | `any` | No |  |
| `curb_weight_kg` | `any` | No | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `any` | No |  |
| `description` | `string` | Yes | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `any` | No |  |
| `features` | `map[string]any` | Yes | The safety features NHTSA lists with a rating. |
| `id` | `string` | No |  |
| `match` | `string` | Yes | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `string` | Yes | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `[]any` | Yes | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `int` | Yes | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `any` | No | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `any` | No | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `map[string]any` | Yes | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleSafety(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleSafetyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleSpecEntity

```go
vehicleSpec := client.VehicleSpec(nil)
fmt.Println(vehicleSpec.GetName()) // "vehicle_spec"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `battery_type` | `any` | No |  |
| `battery_voltage` | `any` | No |  |
| `confidence` | `string` | Yes | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `any` | No |  |
| `cylinder_deactivation_name` | `any` | No | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `string` | Yes |  |
| `drive` | `any` | No |  |
| `electrification` | `any` | No | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `[]any` | Yes |  |
| `engine` | `any` | No |  |
| `ev_motor` | `any` | No |  |
| `exhaust_valves` | `any` | No |  |
| `fuel_grade` | `string` | Yes |  |
| `fuel_usage` | `any` | No | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `any` | No |  |
| `id` | `string` | No |  |
| `intake_valves` | `any` | No | Per cylinder. |
| `luggage_volume_ft3` | `any` | No |  |
| `luggage_volume_l` | `any` | No |  |
| `motor_kw` | `any` | No | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `any` | No |  |
| `passenger_volume_l` | `any` | No |  |
| `size_class` | `string` | Yes |  |
| `source` | `string` | Yes |  |
| `source_id` | `string` | Yes |  |
| `start_stop` | `any` | No |  |
| `supercharger` | `bool` | Yes |  |
| `transmission` | `any` | No |  |
| `transmission_type` | `any` | No |  |
| `turbo` | `bool` | Yes |  |
| `variable_valve_lift` | `any` | No |  |
| `variable_valve_timing` | `any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleSpec(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleSpecEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VehicleTireEntity

```go
vehicleTire := client.VehicleTire(nil)
fmt.Println(vehicleTire.GetName()) // "vehicle_tire"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bolt_pattern` | `any` | No |  |
| `checked` | `string` | Yes |  |
| `id` | `string` | No |  |
| `lug_torque_lbft` | `any` | No |  |
| `lug_torque_nm` | `any` | No |  |
| `lug_torque_written_in` | `any` | No | `nm` or `lbft`. |
| `market` | `any` | No |  |
| `pressure_kpa` | `any` | No |  |
| `pressure_psi` | `any` | No |  |
| `pressure_written_in` | `any` | No | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `string` | Yes | The size as printed. |
| `size_rear` | `any` | No | The rear size, only when it differs from the front. |
| `source` | `string` | Yes |  |
| `trims` | `[]any` | Yes | The trims the document ties the size to, as it names them. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VehicleTire(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleTireEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VinEntity

```go
vin := client.Vin(nil)
fmt.Println(vin.GetName()) // "vin"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_price_usd` | `any` | No | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `any` | No |  |
| `catalog` | `any` | No |  |
| `check_digit` | `map[string]any` | Yes |  |
| `doors` | `any` | No |  |
| `drivetrain` | `any` | No |  |
| `engine` | `any` | No |  |
| `gvwr` | `any` | No | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `string` | No |  |
| `make` | `any` | No |  |
| `manufacturer` | `map[string]any` | Yes |  |
| `model` | `any` | No |  |
| `plant` | `map[string]any` | Yes | Where the vehicle was built. |
| `recalls` | `any` | No |  |
| `safety` | `any` | No |  |
| `seat_rows` | `any` | No |  |
| `seats` | `any` | No |  |
| `series` | `any` | No |  |
| `transmission` | `any` | No |  |
| `transmission_speeds` | `any` | No |  |
| `trim` | `any` | No |  |
| `valid` | `bool` | Yes | Whether the check digit, position 9, is right. |
| `vin` | `string` | Yes |  |
| `warnings` | `[]any` | Yes | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `any` | No | Front wheel diameter in inches. |
| `wheel_size_rear` | `any` | No | Rear wheel diameter in inches. |
| `year` | `any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Vin(nil).Load(map[string]any{"id": "vin_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VinEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VinBulletinEntity

```go
vinBulletin := client.VinBulletin(nil)
fmt.Println(vinBulletin.GetName()) // "vin_bulletin"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `any` | No |  |
| `attribution` | `[]any` | Yes |  |
| `bulletins` | `[]any` | Yes |  |
| `counts` | `map[string]any` | Yes | What the bulletins of one model year are, in numbers. |
| `decode` | `map[string]any` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` | No |  |
| `next_cursor` | `any` | No |  |
| `note` | `string` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VinBulletin(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VinBulletinEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VinFluidEntity

```go
vinFluid := client.VinFluid(nil)
fmt.Println(vinFluid.GetName()) // "vin_fluid"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `any` | No |  |
| `attribution` | `[]any` | Yes |  |
| `brake` | `[]any` | Yes |  |
| `checked_as_of` | `any` | No |  |
| `coolant` | `[]any` | Yes |  |
| `decode` | `map[string]any` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `engine_oil` | `[]any` | Yes |  |
| `engine_oil_checked` | `[]any` | Yes | Narrowed as `engine_oil` is. |
| `engine_settled` | `bool` | Yes | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `refrigerant` | `[]any` | Yes |  |
| `transmission` | `[]any` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VinFluid(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VinFluidEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VinFuelEntity

```go
vinFuel := client.VinFuel(nil)
fmt.Println(vinFuel.GetName()) // "vin_fuel"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `map[string]any` | Yes | The day each country's fuel ratings were current. |
| `attribution` | `[]any` | Yes |  |
| `decode` | `map[string]any` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `engine_settled` | `bool` | Yes | Whether `ratings` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `ratings` | `[]any` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VinFuel(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VinFuelEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VinLaborEntity

```go
vinLabor := client.VinLabor(nil)
fmt.Println(vinLabor.GetName()) // "vin_labor"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `any` | No |  |
| `attribution` | `[]any` | Yes |  |
| `class` | `any` | No |  |
| `decode` | `map[string]any` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `estimates` | `[]any` | Yes |  |
| `id` | `string` | No |  |
| `note` | `string` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VinLabor(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.VinLabor(nil).Load(map[string]any{"id": "vin_labor_id", "vin_id": "vin_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VinLaborEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VinRecallEntity

```go
vinRecall := client.VinRecall(nil)
fmt.Println(vinRecall.GetName()) // "vin_recall"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `map[string]any` | Yes | The day each country's recall data was current. |
| `attribution` | `[]any` | Yes |  |
| `decode` | `map[string]any` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` | No |  |
| `lookup` | `map[string]any` | Yes | Where to check one vehicle for open recalls. |
| `may_apply` | `bool` | Yes | Always `true`. |
| `recalls` | `[]any` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `[]any` | Yes | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VinRecall(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VinRecallEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VinSpecEntity

```go
vinSpec := client.VinSpec(nil)
fmt.Println(vinSpec.GetName()) // "vin_spec"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `any` | No |  |
| `attribution` | `[]any` | Yes |  |
| `decode` | `map[string]any` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `engine_settled` | `bool` | Yes | Whether `specs` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `specs` | `[]any` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VinSpec(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VinSpecEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VinTireEntity

```go
vinTire := client.VinTire(nil)
fmt.Println(vinTire.GetName()) // "vin_tire"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `any` | No |  |
| `attribution` | `[]any` | Yes |  |
| `decode` | `map[string]any` | Yes | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `[]any` | Yes | Every fitment of the model year. |
| `id` | `string` | No |  |
| `vehicle` | `any` | No |  |
| `warnings` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.VinTire(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VinTireEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewWenmarVinSDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

