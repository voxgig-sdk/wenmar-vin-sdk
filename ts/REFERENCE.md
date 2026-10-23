# WenmarVin TypeScript SDK Reference

Complete API reference for the WenmarVin TypeScript SDK.


## WenmarVinSDK

### Constructor

```ts
new WenmarVinSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WenmarVinSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = WenmarVinSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `WenmarVinSDK` instance in test mode.


### Instance Methods

#### `Batch(data?: object)`

Create a new `Batch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BatchEntity` instance.

#### `Bulletin(data?: object)`

Create a new `Bulletin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BulletinEntity` instance.

#### `Code(data?: object)`

Create a new `Code` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CodeEntity` instance.

#### `Data(data?: object)`

Create a new `Data` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DataEntity` instance.

#### `Engine(data?: object)`

Create a new `Engine` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EngineEntity` instance.

#### `Entry(data?: object)`

Create a new `Entry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EntryEntity` instance.

#### `Job(data?: object)`

Create a new `Job` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `JobEntity` instance.

#### `Make(data?: object)`

Create a new `Make` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MakeEntity` instance.

#### `Model(data?: object)`

Create a new `Model` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ModelEntity` instance.

#### `Overview(data?: object)`

Create a new `Overview` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OverviewEntity` instance.

#### `PartsCard(data?: object)`

Create a new `PartsCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PartsCardEntity` instance.

#### `PayrollDeduction(data?: object)`

Create a new `PayrollDeduction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PayrollDeductionEntity` instance.

#### `Recall(data?: object)`

Create a new `Recall` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecallEntity` instance.

#### `RecallInvestigation(data?: object)`

Create a new `RecallInvestigation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecallInvestigationEntity` instance.

#### `Recent(data?: object)`

Create a new `Recent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecentEntity` instance.

#### `Submodel(data?: object)`

Create a new `Submodel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SubmodelEntity` instance.

#### `Vehicle(data?: object)`

Create a new `Vehicle` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleEntity` instance.

#### `VehicleBulletin(data?: object)`

Create a new `VehicleBulletin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleBulletinEntity` instance.

#### `VehicleCode(data?: object)`

Create a new `VehicleCode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleCodeEntity` instance.

#### `VehicleComplaint(data?: object)`

Create a new `VehicleComplaint` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleComplaintEntity` instance.

#### `VehicleFluid(data?: object)`

Create a new `VehicleFluid` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleFluidEntity` instance.

#### `VehicleFuel(data?: object)`

Create a new `VehicleFuel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleFuelEntity` instance.

#### `VehicleInvestigation(data?: object)`

Create a new `VehicleInvestigation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleInvestigationEntity` instance.

#### `VehicleLabor(data?: object)`

Create a new `VehicleLabor` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleLaborEntity` instance.

#### `VehicleRecall(data?: object)`

Create a new `VehicleRecall` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleRecallEntity` instance.

#### `VehicleSafety(data?: object)`

Create a new `VehicleSafety` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleSafetyEntity` instance.

#### `VehicleSpec(data?: object)`

Create a new `VehicleSpec` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleSpecEntity` instance.

#### `VehicleTire(data?: object)`

Create a new `VehicleTire` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleTireEntity` instance.

#### `Vin(data?: object)`

Create a new `Vin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VinEntity` instance.

#### `VinBulletin(data?: object)`

Create a new `VinBulletin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VinBulletinEntity` instance.

#### `VinFluid(data?: object)`

Create a new `VinFluid` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VinFluidEntity` instance.

#### `VinFuel(data?: object)`

Create a new `VinFuel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VinFuelEntity` instance.

#### `VinLabor(data?: object)`

Create a new `VinLabor` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VinLaborEntity` instance.

#### `VinRecall(data?: object)`

Create a new `VinRecall` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VinRecallEntity` instance.

#### `VinSpec(data?: object)`

Create a new `VinSpec` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VinSpecEntity` instance.

#### `VinTire(data?: object)`

Create a new `VinTire` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VinTireEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `WenmarVinSDK.test()`.

**Returns:** `WenmarVinSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## BatchEntity

```ts
const batch = client.Batch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `vins` | `any[]` | Yes | At most 50 VINs. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Batch().create({
  vins: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BatchEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BulletinEntity

```ts
const bulletin = client.Bulletin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string | null` | No |  |
| `attribution` | `any[]` | Yes |  |
| `codes` | `any[]` | Yes | The trouble codes the summary names. |
| `component` | `string | null` | No | NHTSA's components, in its words, separated by `; `. |
| `components` | `any[]` | Yes | The components it is about, systems first. |
| `date` | `string | null` | No | The manufacturer's own date. |
| `date_added` | `string` | Yes | The day NHTSA published it. |
| `document` | `any` | No |  |
| `document_id` | `string | null` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` | No |  |
| `mfr_campaign` | `string | null` | No | The manufacturer's campaign id or software version. |
| `mfr_system` | `string | null` | No | The manufacturer's own words for the system. |
| `nhtsa_id` | `number` | Yes | NHTSA's id number for the communication. |
| `note` | `string` | Yes |  |
| `replaces` | `string | null` | No | The number of the bulletin this one replaces. |
| `summary` | `string | null` | No | NHTSA's summary of the communication. |
| `topics` | `any[]` | Yes |  |
| `type` | `string` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | Yes | The type in words. |
| `url` | `string` | Yes | The bulletin's page on this site. |
| `vehicles` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Bulletin().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Bulletin().load({ id: 'bulletin_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BulletinEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CodeEntity

```ts
const code = client.Code()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `any[]` | Yes | The credit lines the data's licences ask for. |
| `checked` | `string` | Yes | The day it was approved. |
| `checks` | `any[]` | Yes | What a technician usually verifies first. |
| `code` | `string` | Yes |  |
| `common_causes` | `any[]` | Yes | General causes, not about one make. |
| `components` | `any[]` | Yes |  |
| `generic` | `boolean` | Yes | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `string` | No |  |
| `meaning` | `string` | Yes | What the code tells a service advisor. |
| `note` | `string` | Yes | What a description is and is not. |
| `related` | `any[]` | Yes | Related codes that are described too. |
| `reviewer` | `string` | Yes | The GitHub name of the person who approved the text. |
| `system` | `string` | Yes | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `url` | `string` | Yes | The code's page on this site. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Code().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Code().load({ id: 'code_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DataEntity

```ts
const data = client.Data()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_at` | `string` | Yes | When the data file was built, in UTC. |
| `data_version` | `string` | Yes | The data release, such as `2026.09`. |
| `datasets` | `Record<string, any>` | Yes | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `string` | Yes | The version of the server. |
| `vpic_release` | `string` | Yes | The NHTSA vPIC release the data was built from. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Data().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DataEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EngineEntity

```ts
const engine = client.Engine()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `preset` | `boolean` | Yes | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `string | null` | No | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Engine().list({ make: "example", model: "example", year: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EngineEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EntryEntity

```ts
const entry = client.Entry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `string | null` | No |  |
| `drive` | `string | null` | No |  |
| `engine` | `string | null` | No |  |
| `id` | `string` | Yes | The stable id. |
| `make` | `string` | Yes |  |
| `model` | `string` | Yes |  |
| `submodel` | `string | null` | No |  |
| `summary` | `string` | Yes | One line naming everything above that is known. |
| `transmission` | `string | null` | No |  |
| `vehicle_types` | `any[]` | Yes | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Entry().list({ q: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Entry().load({ id: 'entry_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EntryEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## JobEntity

```ts
const job = client.Job()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `any[]` | Yes | The credit the labour estimates ask for. |
| `components` | `any[]` | Yes |  |
| `estimates` | `any[] | null` | No | The job's class-scope figures. |
| `excludes` | `any[]` | Yes | Work often done at the same visit that is not part of this job. |
| `id` | `string` | Yes | The job's id. |
| `includes` | `any[]` | Yes | The work the job covers. |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes | What an estimate is not. |
| `related` | `any[]` | Yes |  |
| `system` | `string` | Yes | The id of the system the job belongs to. |
| `system_name` | `string` | Yes |  |
| `url` | `string` | Yes | The job's page on this site. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Job().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Job().load({ id: 'job_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `JobEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MakeEntity

```ts
const make = client.Make()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | The make's id form. |
| `links` | `any` | No |  |
| `name` | `string` | Yes |  |
| `popular` | `boolean` | Yes | Whether it is on the list of popular makes. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Make().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Make().load({ id: 'make_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MakeEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ModelEntity

```ts
const model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Record<string, any>` | Yes | The day each country's recall data was current. |
| `attribution` | `any[]` | Yes |  |
| `id` | `string` | Yes | The model's id form. |
| `lookup` | `Record<string, any>` | Yes | Where to check one vehicle for open recalls. |
| `make` | `Record<string, any>` | Yes | A make or a model: its id form and its name. |
| `may_apply` | `boolean` | Yes | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `Record<string, any>` | Yes | A make or a model: its id form and its name. |
| `name` | `string` | Yes |  |
| `year_from` | `number` | Yes | The first and last model year the model exists in. |
| `year_to` | `number` | Yes |  |
| `years` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Model().list({ make: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Model().load({ make: 'make', model: 'model' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OverviewEntity

```ts
const overview = client.Overview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `string` | Yes |  |
| `suggestions` | `any[]` | No | VINs the caller may have meant. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Overview().list({ vehicle_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OverviewEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PartsCardEntity

```ts
const parts_card = client.PartsCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `any[]` | Yes |  |
| `engine_settled` | `boolean` | Yes | Whether the decode settled one catalog engine. |
| `lines` | `any[]` | Yes |  |
| `text` | `string` | Yes | The lines as plain text, one `Label: value` each. |
| `vehicle` | `any` | No |  |
| `vin` | `string` | Yes |  |
| `warnings` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PartsCard().list({ vin_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PartsCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PayrollDeductionEntity

```ts
const payroll_deduction = client.PayrollDeduction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meaning` | `string` | Yes | What the factor means. |
| `name` | `string` | Yes | The name the engine gives the factor. |
| `value` | `number` | Yes | The value used, after rounding. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PayrollDeduction().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PayrollDeductionEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecallEntity

```ts
const recall = client.Recall()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string | null` | No | The day this publisher's data was current. |
| `attribution` | `any[]` | Yes |  |
| `built_from` | `string | null` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `string | null` | No |  |
| `campaign` | `string` | Yes | The publisher's campaign number. |
| `completion` | `any` | No |  |
| `component` | `string | null` | No | The component, as the source words it. |
| `consequence` | `string | null` | No |  |
| `country` | `string` | Yes | `us` or `ca`. |
| `date` | `string | null` | No | The day the campaign was reported. |
| `do_not_drive` | `boolean | null` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `any` | No |  |
| `id` | `string` | No |  |
| `lookup` | `Record<string, any>` | Yes | Where to check one vehicle for open recalls. |
| `manufacturer` | `string | null` | No |  |
| `match` | `string | null` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `boolean` | Yes | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `string | null` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `any[]` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `string | null` | No |  |
| `notification` | `string | null` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `string | null` | No | The day owners were notified. |
| `park_outside` | `boolean | null` | No | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `string | null` | No | The manufacturer's part numbers, separated by commas. |
| `remedy` | `string | null` | No |  |
| `source` | `string` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `string | null` | No | What is wrong, in the source's words. |
| `units` | `number | null` | No | Units potentially affected. |
| `url` | `string` | Yes | The campaign's page on this site. |
| `vehicles` | `any[]` | Yes | Every vehicle the campaign lists, by make, model and year. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Recall().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Recall().load({ campaign: 'campaign', source: 'source' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecallEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecallInvestigationEntity

```ts
const recall_investigation = client.RecallInvestigation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | NHTSA's action number. |
| `campaigns` | `any[]` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `string | null` | No | The day it was closed. |
| `component` | `string | null` | No | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `string` | Yes | The letters the number starts with. |
| `kind_name` | `string | null` | No | The kind in words. |
| `manufacturer` | `string | null` | No | The manufacturers it names, separated by `; `. |
| `match` | `string | null` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `any[]` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `boolean` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `string | null` | No | The day it was opened. |
| `subject` | `string | null` | No | NHTSA's one-line subject. |
| `summary` | `string | null` | No | NHTSA's summary. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.RecallInvestigation().list({ campaign: "example", recall_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecallInvestigationEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecentEntity

```ts
const recent = client.Recent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recall` | `Record<string, any>` | Yes | One recall campaign in a list. |
| `vehicles` | `any[]` | Yes | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `number` | Yes | How many vehicles the campaign lists in all. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Recent().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecentEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SubmodelEntity

```ts
const submodel = client.Submodel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Submodel().list({ make: "example", model: "example", year: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SubmodelEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleEntity

```ts
const vehicle = client.Vehicle()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `year` | `/v1/vehicles/years` | `client.Vehicle().list({ $action: 'year', ... })` |

An action returns that action's OWN response, which is not necessarily a
Vehicle record — check the API definition for its shape.

```ts
const result = await client.Vehicle().list({
  $action: 'year',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Vehicle().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleBulletinEntity

```ts
const vehicle_bulletin = client.VehicleBulletin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component` | `string | null` | No | NHTSA's components, in its words, separated by `; `. |
| `date` | `string | null` | No | The manufacturer's own date. |
| `date_added` | `string` | Yes | The day NHTSA published it. |
| `document` | `any` | No |  |
| `document_id` | `string | null` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` | No |  |
| `mfr_campaign` | `string | null` | No | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `number` | Yes | NHTSA's id number for the communication. |
| `summary` | `string | null` | No | NHTSA's summary of the communication. |
| `type` | `string` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | Yes | The type in words. |
| `url` | `string` | Yes | The bulletin's page on this site. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleBulletin().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleBulletinEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleCodeEntity

```ts
const vehicle_code = client.VehicleCode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `any[]` | Yes |  |
| `bulletins` | `any` | No |  |
| `code` | `string` | Yes |  |
| `description` | `string` | No |  |
| `generic` | `boolean` | Yes | Whether every maker uses the code the same way. |
| `id` | `string` | No |  |
| `note` | `string` | Yes |  |
| `related` | `Record<string, any>` | Yes | What else is held for the model year about the components a code concerns. |
| `url` | `string` | Yes | The page of this code on this model year. |
| `vehicle` | `Record<string, any>` | Yes | The model year an answer is about. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.VehicleCode().load({ id: 'vehicle_code_id', vehicle_id: 'vehicle_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleCodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleComplaintEntity

```ts
const vehicle_complaint = client.VehicleComplaint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `complaints` | `number` | Yes |  |
| `crashes` | `number` | Yes | Complaints that report a crash. |
| `fires` | `number` | Yes | Complaints that report a fire. |
| `id` | `string` | Yes | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `number` | Yes | Complaints that report at least one person injured. |
| `median_km` | `number | null` | No | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `number | null` | No | The same in miles, as NHTSA records it. |
| `name` | `string` | Yes |  |
| `parent` | `string | null` | No | The system a part belongs to. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleComplaint().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleComplaintEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleFluidEntity

```ts
const vehicle_fluid = client.VehicleFluid()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string | null` | No | The day EPA's oil grades were current. |
| `attribution` | `any[]` | Yes |  |
| `brake` | `any[]` | Yes |  |
| `checked_as_of` | `string | null` | No | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `any[]` | Yes |  |
| `engine_oil` | `any[]` | Yes |  |
| `engine_oil_checked` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `refrigerant` | `any[]` | Yes |  |
| `transmission` | `any[]` | Yes |  |
| `vehicle` | `Record<string, any>` | Yes | The model year an answer is about. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleFluid().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleFluidEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleFuelEntity

```ts
const vehicle_fuel = client.VehicleFuel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `co2_g_km` | `number | null` | No | Tailpipe carbon dioxide, combined. |
| `confidence` | `string` | Yes | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `string` | Yes | `us` or `ca`. |
| `cylinders` | `number | null` | No |  |
| `described_as` | `string` | Yes | The source's own name for the vehicle rated. |
| `displacement_l` | `number | null` | No |  |
| `drive` | `string | null` | No |  |
| `engine` | `any` | No |  |
| `fuel_grade` | `string` | Yes | The fuel the figures are for, which is the recommended grade. |
| `id` | `string` | No |  |
| `kwh_100km` | `number | null` | No | Combined electricity use. |
| `l_100km` | `any` | No |  |
| `match` | `string` | Yes | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `any` | No |  |
| `range_km` | `number | null` | No | On a full battery. |
| `range_mi` | `number | null` | No |  |
| `second_fuel` | `string | null` | No | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `string` | Yes | `epa` or `nrcan`. |
| `source_id` | `string | null` | No | EPA's id for the rating. |
| `transmission` | `string | null` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleFuel().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleFuelEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleInvestigationEntity

```ts
const vehicle_investigation = client.VehicleInvestigation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | NHTSA's action number. |
| `campaigns` | `any[]` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `string | null` | No | The day it was closed. |
| `component` | `string | null` | No | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `string` | No |  |
| `kind` | `string` | Yes | The letters the number starts with. |
| `kind_name` | `string | null` | No | The kind in words. |
| `manufacturer` | `string | null` | No | The manufacturers it names, separated by `; `. |
| `match` | `string | null` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `any[]` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `boolean` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `string | null` | No | The day it was opened. |
| `subject` | `string | null` | No | NHTSA's one-line subject. |
| `summary` | `string | null` | No | NHTSA's summary. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleInvestigation().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleInvestigationEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleLaborEntity

```ts
const vehicle_labor = client.VehicleLabor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string | null` | No | The newest day an estimate was changed. |
| `attribution` | `any[]` | Yes |  |
| `basis` | `string` | Yes | `expert`: written by a person who does the work. |
| `class` | `any` | No | The class, for a class-scope figure. |
| `class_name` | `string | null` | No |  |
| `engine` | `string | null` | No | The engine the vehicle id named, as an id form. |
| `estimates` | `any[]` | Yes | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `Record<string, any>` | Yes | Hours, as numbers of hours. |
| `id` | `string` | No |  |
| `job` | `string` | Yes | The job's id. |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes | "An estimate, not a quote. |
| `notes` | `string | null` | No |  |
| `sample` | `any` | No |  |
| `scope` | `string` | Yes | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `string` | Yes | The day the figure was last changed. |
| `url` | `string` | Yes | The job's page on this site. |
| `vehicle` | `Record<string, any>` | Yes | The model year an answer is about. |
| `years` | `any` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleLabor().list({ id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.VehicleLabor().load({ id: 'vehicle_labor_id', vehicle_id: 'vehicle_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleLaborEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleRecallEntity

```ts
const vehicle_recall = client.VehicleRecall()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_from` | `string | null` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `string | null` | No |  |
| `campaign` | `string` | Yes | The publisher's campaign number. |
| `component` | `string | null` | No | The component, as the source words it. |
| `country` | `string` | Yes | `us` or `ca`. |
| `date` | `string | null` | No | The day the campaign was reported. |
| `do_not_drive` | `boolean | null` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `string` | No |  |
| `manufacturer` | `string | null` | No |  |
| `match` | `string | null` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `string | null` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `any[]` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `string | null` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `boolean | null` | No | NHTSA's advisory to park outside, away from buildings. |
| `source` | `string` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `string | null` | No | What is wrong, in the source's words. |
| `units` | `number | null` | No | Units potentially affected. |
| `url` | `string` | Yes | The campaign's page on this site. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleRecall().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleRecallEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleSafetyEntity

```ts
const vehicle_safety = client.VehicleSafety()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body_style` | `string | null` | No |  |
| `curb_weight_kg` | `number | null` | No | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `number | null` | No |  |
| `description` | `string` | Yes | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `string | null` | No |  |
| `features` | `Record<string, any>` | Yes | The safety features NHTSA lists with a rating. |
| `id` | `string` | No |  |
| `match` | `string` | Yes | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `string` | Yes | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `any[]` | Yes | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `number` | Yes | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `number | null` | No | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `boolean | null` | No | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `Record<string, any>` | Yes | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `string | null` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleSafety().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleSafetyEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleSpecEntity

```ts
const vehicle_spec = client.VehicleSpec()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `battery_type` | `string | null` | No |  |
| `battery_voltage` | `number | null` | No |  |
| `confidence` | `string` | Yes | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `boolean | null` | No |  |
| `cylinder_deactivation_name` | `string | null` | No | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `string` | Yes |  |
| `drive` | `string | null` | No |  |
| `electrification` | `string | null` | No | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `any[]` | Yes |  |
| `engine` | `any` | No |  |
| `ev_motor` | `string | null` | No |  |
| `exhaust_valves` | `number | null` | No |  |
| `fuel_grade` | `string` | Yes |  |
| `fuel_usage` | `string | null` | No | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `number | null` | No |  |
| `id` | `string` | No |  |
| `intake_valves` | `number | null` | No | Per cylinder. |
| `luggage_volume_ft3` | `number | null` | No |  |
| `luggage_volume_l` | `number | null` | No |  |
| `motor_kw` | `string | null` | No | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `number | null` | No |  |
| `passenger_volume_l` | `number | null` | No |  |
| `size_class` | `string` | Yes |  |
| `source` | `string` | Yes |  |
| `source_id` | `string` | Yes |  |
| `start_stop` | `boolean | null` | No |  |
| `supercharger` | `boolean` | Yes |  |
| `transmission` | `string | null` | No |  |
| `transmission_type` | `string | null` | No |  |
| `turbo` | `boolean` | Yes |  |
| `variable_valve_lift` | `boolean | null` | No |  |
| `variable_valve_timing` | `boolean | null` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleSpec().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleSpecEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleTireEntity

```ts
const vehicle_tire = client.VehicleTire()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bolt_pattern` | `string | null` | No |  |
| `checked` | `string` | Yes |  |
| `id` | `string` | No |  |
| `lug_torque_lbft` | `number | null` | No |  |
| `lug_torque_nm` | `number | null` | No |  |
| `lug_torque_written_in` | `string | null` | No | `nm` or `lbft`. |
| `market` | `string | null` | No |  |
| `pressure_kpa` | `any` | No |  |
| `pressure_psi` | `any` | No |  |
| `pressure_written_in` | `string | null` | No | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `string` | Yes | The size as printed. |
| `size_rear` | `string | null` | No | The rear size, only when it differs from the front. |
| `source` | `string` | Yes |  |
| `trims` | `any[]` | Yes | The trims the document ties the size to, as it names them. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VehicleTire().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleTireEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VinEntity

```ts
const vin = client.Vin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_price_usd` | `number | null` | No | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `string | null` | No |  |
| `catalog` | `any` | No |  |
| `check_digit` | `Record<string, any>` | Yes |  |
| `doors` | `number | null` | No |  |
| `drivetrain` | `string | null` | No |  |
| `engine` | `any` | No |  |
| `gvwr` | `string | null` | No | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `string` | No |  |
| `make` | `string | null` | No |  |
| `manufacturer` | `Record<string, any>` | Yes |  |
| `model` | `string | null` | No |  |
| `plant` | `Record<string, any>` | Yes | Where the vehicle was built. |
| `recalls` | `any` | No |  |
| `safety` | `any` | No |  |
| `seat_rows` | `number | null` | No |  |
| `seats` | `number | null` | No |  |
| `series` | `string | null` | No |  |
| `transmission` | `string | null` | No |  |
| `transmission_speeds` | `number | null` | No |  |
| `trim` | `string | null` | No |  |
| `valid` | `boolean` | Yes | Whether the check digit, position 9, is right. |
| `vin` | `string` | Yes |  |
| `warnings` | `any[]` | Yes | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `number | null` | No | Front wheel diameter in inches. |
| `wheel_size_rear` | `number | null` | No | Rear wheel diameter in inches. |
| `year` | `number | null` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Vin().load({ id: 'vin_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VinEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VinBulletinEntity

```ts
const vin_bulletin = client.VinBulletin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string | null` | No |  |
| `attribution` | `any[]` | Yes |  |
| `bulletins` | `any[]` | Yes |  |
| `counts` | `Record<string, any>` | Yes | What the bulletins of one model year are, in numbers. |
| `decode` | `Record<string, any>` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` | No |  |
| `next_cursor` | `string | null` | No |  |
| `note` | `string` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VinBulletin().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VinBulletinEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VinFluidEntity

```ts
const vin_fluid = client.VinFluid()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string | null` | No |  |
| `attribution` | `any[]` | Yes |  |
| `brake` | `any[]` | Yes |  |
| `checked_as_of` | `string | null` | No |  |
| `coolant` | `any[]` | Yes |  |
| `decode` | `Record<string, any>` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `engine_oil` | `any[]` | Yes |  |
| `engine_oil_checked` | `any[]` | Yes | Narrowed as `engine_oil` is. |
| `engine_settled` | `boolean` | Yes | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `refrigerant` | `any[]` | Yes |  |
| `transmission` | `any[]` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VinFluid().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VinFluidEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VinFuelEntity

```ts
const vin_fuel = client.VinFuel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Record<string, any>` | Yes | The day each country's fuel ratings were current. |
| `attribution` | `any[]` | Yes |  |
| `decode` | `Record<string, any>` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `engine_settled` | `boolean` | Yes | Whether `ratings` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `ratings` | `any[]` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VinFuel().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VinFuelEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VinLaborEntity

```ts
const vin_labor = client.VinLabor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string | null` | No |  |
| `attribution` | `any[]` | Yes |  |
| `class` | `any` | No |  |
| `decode` | `Record<string, any>` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `string | null` | No |  |
| `estimates` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `note` | `string` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VinLabor().list({ id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.VinLabor().load({ id: 'vin_labor_id', vin_id: 'vin_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VinLaborEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VinRecallEntity

```ts
const vin_recall = client.VinRecall()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `Record<string, any>` | Yes | The day each country's recall data was current. |
| `attribution` | `any[]` | Yes |  |
| `decode` | `Record<string, any>` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` | No |  |
| `lookup` | `Record<string, any>` | Yes | Where to check one vehicle for open recalls. |
| `may_apply` | `boolean` | Yes | Always `true`. |
| `recalls` | `any[]` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `any[]` | Yes | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VinRecall().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VinRecallEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VinSpecEntity

```ts
const vin_spec = client.VinSpec()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string | null` | No |  |
| `attribution` | `any[]` | Yes |  |
| `decode` | `Record<string, any>` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` | No |  |
| `engine_settled` | `boolean` | Yes | Whether `specs` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `specs` | `any[]` | Yes |  |
| `vehicle` | `any` | No |  |
| `warnings` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VinSpec().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VinSpecEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VinTireEntity

```ts
const vin_tire = client.VinTire()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `string | null` | No |  |
| `attribution` | `any[]` | Yes |  |
| `decode` | `Record<string, any>` | Yes | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `any[]` | Yes | Every fitment of the model year. |
| `id` | `string` | No |  |
| `vehicle` | `any` | No |  |
| `warnings` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.VinTire().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VinTireEntity` instance with the same client and
options.

#### `client()`

Return the parent `WenmarVinSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new WenmarVinSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

