# WenmarVin TypeScript SDK



The TypeScript SDK for the WenmarVin API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Batch()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/wenmar-vin-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/wenmar-vin-sdk
npm install ./wenmar-vin-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { WenmarVinSDK } from '@voxgig-sdk/wenmar-vin-sdk'

const client = new WenmarVinSDK()
```

### 3. Load a vehiclecode

VehicleCode is nested under vehicle, so provide the `vehicle_id`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const vehiclecode = await client.VehicleCode().load({
    vehicle_id: 'example_vehicle_id',
    id: 'example_id',
  })
  console.log(vehiclecode.data())
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Batch ENTITY (.data() for the record)
const created = await client.Batch().create({
  vins: [],
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const entrys = await client.Entry().list({ q: "example" })
  console.log(entrys.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = WenmarVinSDK.test()

const entrys = await client.Entry().list({ q: 'example_q' })
// entrys is an array of Entry entities, one per mock record
console.log(entrys.map((entry) => entry.data()))
```

You can also use the instance method:

```ts
const client = new WenmarVinSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Entry()

// First call runs the operation and stores its result
await entity.list({ q: 'example_q' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new WenmarVinSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
WENMAR_VIN_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### WenmarVinSDK

#### Constructor

```ts
new WenmarVinSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Batch(data?)` | `BatchEntity` | Create a Batch entity instance. |
| `Bulletin(data?)` | `BulletinEntity` | Create a Bulletin entity instance. |
| `Code(data?)` | `CodeEntity` | Create a Code entity instance. |
| `Data(data?)` | `DataEntity` | Create a Data entity instance. |
| `Engine(data?)` | `EngineEntity` | Create an Engine entity instance. |
| `Entry(data?)` | `EntryEntity` | Create an Entry entity instance. |
| `Job(data?)` | `JobEntity` | Create a Job entity instance. |
| `Make(data?)` | `MakeEntity` | Create a Make entity instance. |
| `Model(data?)` | `ModelEntity` | Create a Model entity instance. |
| `Overview(data?)` | `OverviewEntity` | Create an Overview entity instance. |
| `PartsCard(data?)` | `PartsCardEntity` | Create a PartsCard entity instance. |
| `PayrollDeduction(data?)` | `PayrollDeductionEntity` | Create a PayrollDeduction entity instance. |
| `Recall(data?)` | `RecallEntity` | Create a Recall entity instance. |
| `RecallInvestigation(data?)` | `RecallInvestigationEntity` | Create a RecallInvestigation entity instance. |
| `Recent(data?)` | `RecentEntity` | Create a Recent entity instance. |
| `Submodel(data?)` | `SubmodelEntity` | Create a Submodel entity instance. |
| `Vehicle(data?)` | `VehicleEntity` | Create a Vehicle entity instance. |
| `VehicleBulletin(data?)` | `VehicleBulletinEntity` | Create a VehicleBulletin entity instance. |
| `VehicleCode(data?)` | `VehicleCodeEntity` | Create a VehicleCode entity instance. |
| `VehicleComplaint(data?)` | `VehicleComplaintEntity` | Create a VehicleComplaint entity instance. |
| `VehicleFluid(data?)` | `VehicleFluidEntity` | Create a VehicleFluid entity instance. |
| `VehicleFuel(data?)` | `VehicleFuelEntity` | Create a VehicleFuel entity instance. |
| `VehicleInvestigation(data?)` | `VehicleInvestigationEntity` | Create a VehicleInvestigation entity instance. |
| `VehicleLabor(data?)` | `VehicleLaborEntity` | Create a VehicleLabor entity instance. |
| `VehicleRecall(data?)` | `VehicleRecallEntity` | Create a VehicleRecall entity instance. |
| `VehicleSafety(data?)` | `VehicleSafetyEntity` | Create a VehicleSafety entity instance. |
| `VehicleSpec(data?)` | `VehicleSpecEntity` | Create a VehicleSpec entity instance. |
| `VehicleTire(data?)` | `VehicleTireEntity` | Create a VehicleTire entity instance. |
| `Vin(data?)` | `VinEntity` | Create a Vin entity instance. |
| `VinBulletin(data?)` | `VinBulletinEntity` | Create a VinBulletin entity instance. |
| `VinFluid(data?)` | `VinFluidEntity` | Create a VinFluid entity instance. |
| `VinFuel(data?)` | `VinFuelEntity` | Create a VinFuel entity instance. |
| `VinLabor(data?)` | `VinLaborEntity` | Create a VinLabor entity instance. |
| `VinRecall(data?)` | `VinRecallEntity` | Create a VinRecall entity instance. |
| `VinSpec(data?)` | `VinSpecEntity` | Create a VinSpec entity instance. |
| `VinTire(data?)` | `VinTireEntity` | Create a VinTire entity instance. |
| `tester(testopts?, sdkopts?)` | `WenmarVinSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `WenmarVinSDK.test(testopts?, sdkopts?)` | `WenmarVinSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): WenmarVinSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Batch

| Field | Description |
| --- | --- |
| `vins` | At most 50 VINs. |

Operations: create.

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

Operations: list, load.

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

Operations: list, load.

API path: `/v1/codes`

#### Data

| Field | Description |
| --- | --- |
| `built_at` | When the data file was built, in UTC. |
| `data_version` | The data release, such as `2026.09`. |
| `datasets` | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | The version of the server. |
| `vpic_release` | The NHTSA vPIC release the data was built from. |

Operations: load.

API path: `/v1/meta`

#### Engine

| Field | Description |
| --- | --- |
| `id` |  |
| `label` |  |
| `preset` | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

Operations: list.

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

Operations: list, load.

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

Operations: list, load.

API path: `/v1/jobs`

#### Make

| Field | Description |
| --- | --- |
| `id` | The make's id form. |
| `links` |  |
| `name` |  |
| `popular` | Whether it is on the list of popular makes. |

Operations: list, load.

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

Operations: list, load.

API path: `/v1/vehicles/models`

#### Overview

| Field | Description |
| --- | --- |
| `code` | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` |  |
| `suggestions` | VINs the caller may have meant. |

Operations: list.

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

Operations: list.

API path: `/v1/vin/{vin}/parts-card`

#### PayrollDeduction

| Field | Description |
| --- | --- |
| `meaning` | What the factor means. |
| `name` | The name the engine gives the factor. |
| `value` | The value used, after rounding. |

Operations: list.

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

Operations: list, load.

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

Operations: list.

API path: `/v1/recalls/{source}/{campaign}/investigations`

#### Recent

| Field | Description |
| --- | --- |
| `recall` | One recall campaign in a list. |
| `vehicles` | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | How many vehicles the campaign lists in all. |

Operations: list.

API path: `/v1/recalls/recent`

#### Submodel

| Field | Description |
| --- | --- |
| `id` |  |
| `kind` | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` |  |

Operations: list.

API path: `/v1/vehicles/submodels`

#### Vehicle

| Field | Description |
| --- | --- |

Operations: list.

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

Operations: list.

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

Operations: load.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list, load.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: load.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list, load.

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

Operations: list.

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

Operations: list.

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

Operations: list.

API path: `/v1/vin/{vin}/tires`



## Entities


### Batch

Create an instance: `const batch = client.Batch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `vins` | `any[]` | At most 50 VINs. |

#### Example: Create

```ts
const batch = await client.Batch().create({
  vins: [],
})
```


### Bulletin

Create an instance: `const bulletin = client.Bulletin()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string | null` |  |
| `attribution` | `any[]` |  |
| `codes` | `any[]` | The trouble codes the summary names. |
| `component` | `string | null` | NHTSA's components, in its words, separated by `; `. |
| `components` | `any[]` | The components it is about, systems first. |
| `date` | `string | null` | The manufacturer's own date. |
| `date_added` | `string` | The day NHTSA published it. |
| `document` | `any` |  |
| `document_id` | `string | null` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` |  |
| `mfr_campaign` | `string | null` | The manufacturer's campaign id or software version. |
| `mfr_system` | `string | null` | The manufacturer's own words for the system. |
| `nhtsa_id` | `number` | NHTSA's id number for the communication. |
| `note` | `string` |  |
| `replaces` | `string | null` | The number of the bulletin this one replaces. |
| `summary` | `string | null` | NHTSA's summary of the communication. |
| `topics` | `any[]` |  |
| `type` | `string` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | The type in words. |
| `url` | `string` | The bulletin's page on this site. |
| `vehicles` | `any[]` |  |

#### Example: Load

```ts
const bulletin = await client.Bulletin().load({ id: 'bulletin_id' })
```

#### Example: List

```ts
const bulletins = await client.Bulletin().list()
```


### Code

Create an instance: `const code = client.Code()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `any[]` | The credit lines the data's licences ask for. |
| `checked` | `string` | The day it was approved. |
| `checks` | `any[]` | What a technician usually verifies first. |
| `code` | `string` |  |
| `common_causes` | `any[]` | General causes, not about one make. |
| `components` | `any[]` |  |
| `generic` | `boolean` | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `string` |  |
| `meaning` | `string` | What the code tells a service advisor. |
| `note` | `string` | What a description is and is not. |
| `related` | `any[]` | Related codes that are described too. |
| `reviewer` | `string` | The GitHub name of the person who approved the text. |
| `system` | `string` | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `string` |  |
| `title` | `string` |  |
| `url` | `string` | The code's page on this site. |

#### Example: Load

```ts
const code = await client.Code().load({ id: 'code_id' })
```

#### Example: List

```ts
const codes = await client.Code().list()
```


### Data

Create an instance: `const data = client.Data()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_at` | `string` | When the data file was built, in UTC. |
| `data_version` | `string` | The data release, such as `2026.09`. |
| `datasets` | `Record<string, any>` | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `string` | The version of the server. |
| `vpic_release` | `string` | The NHTSA vPIC release the data was built from. |

#### Example: Load

```ts
const data = await client.Data().load()
```


### Engine

Create an instance: `const engine = client.Engine()`

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
| `vin8` | `string | null` | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

#### Example: List

```ts
const engines = await client.Engine().list({ make: "example", model: "example", year: 1 })
```


### Entry

Create an instance: `const entry = client.Entry()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string | null` |  |
| `drive` | `string | null` |  |
| `engine` | `string | null` |  |
| `id` | `string` | The stable id. |
| `make` | `string` |  |
| `model` | `string` |  |
| `submodel` | `string | null` |  |
| `summary` | `string` | One line naming everything above that is known. |
| `transmission` | `string | null` |  |
| `vehicle_types` | `any[]` | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `number` |  |

#### Example: Load

```ts
const entry = await client.Entry().load({ id: 'entry_id' })
```

#### Example: List

```ts
const entrys = await client.Entry().list({ q: "example" })
```


### Job

Create an instance: `const job = client.Job()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `any[]` | The credit the labour estimates ask for. |
| `components` | `any[]` |  |
| `estimates` | `any[] | null` | The job's class-scope figures. |
| `excludes` | `any[]` | Work often done at the same visit that is not part of this job. |
| `id` | `string` | The job's id. |
| `includes` | `any[]` | The work the job covers. |
| `name` | `string` |  |
| `note` | `string` | What an estimate is not. |
| `related` | `any[]` |  |
| `system` | `string` | The id of the system the job belongs to. |
| `system_name` | `string` |  |
| `url` | `string` | The job's page on this site. |

#### Example: Load

```ts
const job = await client.Job().load({ id: 'job_id' })
```

#### Example: List

```ts
const jobs = await client.Job().list()
```


### Make

Create an instance: `const make = client.Make()`

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

```ts
const make = await client.Make().load({ id: 'make_id' })
```

#### Example: List

```ts
const makes = await client.Make().list()
```


### Model

Create an instance: `const model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Record<string, any>` | The day each country's recall data was current. |
| `attribution` | `any[]` |  |
| `id` | `string` | The model's id form. |
| `lookup` | `Record<string, any>` | Where to check one vehicle for open recalls. |
| `make` | `Record<string, any>` | A make or a model: its id form and its name. |
| `may_apply` | `boolean` | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `Record<string, any>` | A make or a model: its id form and its name. |
| `name` | `string` |  |
| `year_from` | `number` | The first and last model year the model exists in. |
| `year_to` | `number` |  |
| `years` | `any[]` |  |

#### Example: Load

```ts
const model = await client.Model().load({ make: 'make', model: 'model' })
```

#### Example: List

```ts
const models = await client.Model().list({ make: "example" })
```


### Overview

Create an instance: `const overview = client.Overview()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `string` |  |
| `suggestions` | `any[]` | VINs the caller may have meant. |

#### Example: List

```ts
const overviews = await client.Overview().list({ vehicle_id: "example" })
```


### PartsCard

Create an instance: `const parts_card = client.PartsCard()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `any[]` |  |
| `engine_settled` | `boolean` | Whether the decode settled one catalog engine. |
| `lines` | `any[]` |  |
| `text` | `string` | The lines as plain text, one `Label: value` each. |
| `vehicle` | `any` |  |
| `vin` | `string` |  |
| `warnings` | `any[]` |  |

#### Example: List

```ts
const parts_cards = await client.PartsCard().list({ vin_id: "example" })
```


### PayrollDeduction

Create an instance: `const payroll_deduction = client.PayrollDeduction()`

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

```ts
const payroll_deductions = await client.PayrollDeduction().list()
```


### Recall

Create an instance: `const recall = client.Recall()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string | null` | The day this publisher's data was current. |
| `attribution` | `any[]` |  |
| `built_from` | `string | null` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `string | null` |  |
| `campaign` | `string` | The publisher's campaign number. |
| `completion` | `any` |  |
| `component` | `string | null` | The component, as the source words it. |
| `consequence` | `string | null` |  |
| `country` | `string` | `us` or `ca`. |
| `date` | `string | null` | The day the campaign was reported. |
| `do_not_drive` | `boolean | null` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `any` |  |
| `id` | `string` |  |
| `lookup` | `Record<string, any>` | Where to check one vehicle for open recalls. |
| `manufacturer` | `string | null` |  |
| `match` | `string | null` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `boolean` | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `string | null` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `any[]` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `string | null` |  |
| `notification` | `string | null` | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `string | null` | The day owners were notified. |
| `park_outside` | `boolean | null` | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `string | null` | The manufacturer's part numbers, separated by commas. |
| `remedy` | `string | null` |  |
| `source` | `string` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `string | null` | What is wrong, in the source's words. |
| `units` | `number | null` | Units potentially affected. |
| `url` | `string` | The campaign's page on this site. |
| `vehicles` | `any[]` | Every vehicle the campaign lists, by make, model and year. |

#### Example: Load

```ts
const recall = await client.Recall().load({ campaign: 'campaign', source: 'source' })
```

#### Example: List

```ts
const recalls = await client.Recall().list()
```


### RecallInvestigation

Create an instance: `const recall_investigation = client.RecallInvestigation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | NHTSA's action number. |
| `campaigns` | `any[]` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `string | null` | The day it was closed. |
| `component` | `string | null` | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `string` | The letters the number starts with. |
| `kind_name` | `string | null` | The kind in words. |
| `manufacturer` | `string | null` | The manufacturers it names, separated by `; `. |
| `match` | `string | null` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `any[]` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `boolean` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `string | null` | The day it was opened. |
| `subject` | `string | null` | NHTSA's one-line subject. |
| `summary` | `string | null` | NHTSA's summary. |

#### Example: List

```ts
const recall_investigations = await client.RecallInvestigation().list({ campaign: "example", recall_id: "example" })
```


### Recent

Create an instance: `const recent = client.Recent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `recall` | `Record<string, any>` | One recall campaign in a list. |
| `vehicles` | `any[]` | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `number` | How many vehicles the campaign lists in all. |

#### Example: List

```ts
const recents = await client.Recent().list()
```


### Submodel

Create an instance: `const submodel = client.Submodel()`

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

```ts
const submodels = await client.Submodel().list({ make: "example", model: "example", year: 1 })
```


### Vehicle

Create an instance: `const vehicle = client.Vehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const vehicles = await client.Vehicle().list()
```


### VehicleBulletin

Create an instance: `const vehicle_bulletin = client.VehicleBulletin()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component` | `string | null` | NHTSA's components, in its words, separated by `; `. |
| `date` | `string | null` | The manufacturer's own date. |
| `date_added` | `string` | The day NHTSA published it. |
| `document` | `any` |  |
| `document_id` | `string | null` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` |  |
| `mfr_campaign` | `string | null` | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `number` | NHTSA's id number for the communication. |
| `summary` | `string | null` | NHTSA's summary of the communication. |
| `type` | `string` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | The type in words. |
| `url` | `string` | The bulletin's page on this site. |

#### Example: List

```ts
const vehicle_bulletins = await client.VehicleBulletin().list({ id: "example" })
```


### VehicleCode

Create an instance: `const vehicle_code = client.VehicleCode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `any[]` |  |
| `bulletins` | `any` |  |
| `code` | `string` |  |
| `description` | `string` |  |
| `generic` | `boolean` | Whether every maker uses the code the same way. |
| `id` | `string` |  |
| `note` | `string` |  |
| `related` | `Record<string, any>` | What else is held for the model year about the components a code concerns. |
| `url` | `string` | The page of this code on this model year. |
| `vehicle` | `Record<string, any>` | The model year an answer is about. |

#### Example: Load

```ts
const vehicle_code = await client.VehicleCode().load({ id: 'vehicle_code_id', vehicle_id: 'vehicle_id' })
```


### VehicleComplaint

Create an instance: `const vehicle_complaint = client.VehicleComplaint()`

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
| `median_km` | `number | null` | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `number | null` | The same in miles, as NHTSA records it. |
| `name` | `string` |  |
| `parent` | `string | null` | The system a part belongs to. |

#### Example: List

```ts
const vehicle_complaints = await client.VehicleComplaint().list({ id: "example" })
```


### VehicleFluid

Create an instance: `const vehicle_fluid = client.VehicleFluid()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string | null` | The day EPA's oil grades were current. |
| `attribution` | `any[]` |  |
| `brake` | `any[]` |  |
| `checked_as_of` | `string | null` | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `any[]` |  |
| `engine_oil` | `any[]` |  |
| `engine_oil_checked` | `any[]` |  |
| `id` | `string` |  |
| `refrigerant` | `any[]` |  |
| `transmission` | `any[]` |  |
| `vehicle` | `Record<string, any>` | The model year an answer is about. |

#### Example: List

```ts
const vehicle_fluids = await client.VehicleFluid().list({ id: "example" })
```


### VehicleFuel

Create an instance: `const vehicle_fuel = client.VehicleFuel()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `co2_g_km` | `number | null` | Tailpipe carbon dioxide, combined. |
| `confidence` | `string` | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `string` | `us` or `ca`. |
| `cylinders` | `number | null` |  |
| `described_as` | `string` | The source's own name for the vehicle rated. |
| `displacement_l` | `number | null` |  |
| `drive` | `string | null` |  |
| `engine` | `any` |  |
| `fuel_grade` | `string` | The fuel the figures are for, which is the recommended grade. |
| `id` | `string` |  |
| `kwh_100km` | `number | null` | Combined electricity use. |
| `l_100km` | `any` |  |
| `match` | `string` | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `any` |  |
| `range_km` | `number | null` | On a full battery. |
| `range_mi` | `number | null` |  |
| `second_fuel` | `string | null` | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `string` | `epa` or `nrcan`. |
| `source_id` | `string | null` | EPA's id for the rating. |
| `transmission` | `string | null` |  |

#### Example: List

```ts
const vehicle_fuels = await client.VehicleFuel().list({ id: "example" })
```


### VehicleInvestigation

Create an instance: `const vehicle_investigation = client.VehicleInvestigation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | NHTSA's action number. |
| `campaigns` | `any[]` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `string | null` | The day it was closed. |
| `component` | `string | null` | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `string` |  |
| `kind` | `string` | The letters the number starts with. |
| `kind_name` | `string | null` | The kind in words. |
| `manufacturer` | `string | null` | The manufacturers it names, separated by `; `. |
| `match` | `string | null` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `any[]` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `boolean` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `string | null` | The day it was opened. |
| `subject` | `string | null` | NHTSA's one-line subject. |
| `summary` | `string | null` | NHTSA's summary. |

#### Example: List

```ts
const vehicle_investigations = await client.VehicleInvestigation().list({ id: "example" })
```


### VehicleLabor

Create an instance: `const vehicle_labor = client.VehicleLabor()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string | null` | The newest day an estimate was changed. |
| `attribution` | `any[]` |  |
| `basis` | `string` | `expert`: written by a person who does the work. |
| `class` | `any` | The class, for a class-scope figure. |
| `class_name` | `string | null` |  |
| `engine` | `string | null` | The engine the vehicle id named, as an id form. |
| `estimates` | `any[]` | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `Record<string, any>` | Hours, as numbers of hours. |
| `id` | `string` |  |
| `job` | `string` | The job's id. |
| `name` | `string` |  |
| `note` | `string` | "An estimate, not a quote. |
| `notes` | `string | null` |  |
| `sample` | `any` |  |
| `scope` | `string` | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `string` | The day the figure was last changed. |
| `url` | `string` | The job's page on this site. |
| `vehicle` | `Record<string, any>` | The model year an answer is about. |
| `years` | `any` |  |

#### Example: Load

```ts
const vehicle_labor = await client.VehicleLabor().load({ id: 'vehicle_labor_id', vehicle_id: 'vehicle_id' })
```

#### Example: List

```ts
const vehicle_labors = await client.VehicleLabor().list({ id: "example" })
```


### VehicleRecall

Create an instance: `const vehicle_recall = client.VehicleRecall()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_from` | `string | null` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `string | null` |  |
| `campaign` | `string` | The publisher's campaign number. |
| `component` | `string | null` | The component, as the source words it. |
| `country` | `string` | `us` or `ca`. |
| `date` | `string | null` | The day the campaign was reported. |
| `do_not_drive` | `boolean | null` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `string` |  |
| `manufacturer` | `string | null` |  |
| `match` | `string | null` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `string | null` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `any[]` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `string | null` | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `boolean | null` | NHTSA's advisory to park outside, away from buildings. |
| `source` | `string` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `string | null` | What is wrong, in the source's words. |
| `units` | `number | null` | Units potentially affected. |
| `url` | `string` | The campaign's page on this site. |

#### Example: List

```ts
const vehicle_recalls = await client.VehicleRecall().list({ id: "example" })
```


### VehicleSafety

Create an instance: `const vehicle_safety = client.VehicleSafety()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body_style` | `string | null` |  |
| `curb_weight_kg` | `number | null` | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `number | null` |  |
| `description` | `string` | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `string | null` |  |
| `features` | `Record<string, any>` | The safety features NHTSA lists with a rating. |
| `id` | `string` |  |
| `match` | `string` | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `string` | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `any[]` | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `number` | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `number | null` | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `boolean | null` | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `Record<string, any>` | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `string | null` |  |

#### Example: List

```ts
const vehicle_safetys = await client.VehicleSafety().list({ id: "example" })
```


### VehicleSpec

Create an instance: `const vehicle_spec = client.VehicleSpec()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `battery_type` | `string | null` |  |
| `battery_voltage` | `number | null` |  |
| `confidence` | `string` | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `boolean | null` |  |
| `cylinder_deactivation_name` | `string | null` | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `string` |  |
| `drive` | `string | null` |  |
| `electrification` | `string | null` | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `any[]` |  |
| `engine` | `any` |  |
| `ev_motor` | `string | null` |  |
| `exhaust_valves` | `number | null` |  |
| `fuel_grade` | `string` |  |
| `fuel_usage` | `string | null` | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `number | null` |  |
| `id` | `string` |  |
| `intake_valves` | `number | null` | Per cylinder. |
| `luggage_volume_ft3` | `number | null` |  |
| `luggage_volume_l` | `number | null` |  |
| `motor_kw` | `string | null` | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `number | null` |  |
| `passenger_volume_l` | `number | null` |  |
| `size_class` | `string` |  |
| `source` | `string` |  |
| `source_id` | `string` |  |
| `start_stop` | `boolean | null` |  |
| `supercharger` | `boolean` |  |
| `transmission` | `string | null` |  |
| `transmission_type` | `string | null` |  |
| `turbo` | `boolean` |  |
| `variable_valve_lift` | `boolean | null` |  |
| `variable_valve_timing` | `boolean | null` |  |

#### Example: List

```ts
const vehicle_specs = await client.VehicleSpec().list({ id: "example" })
```


### VehicleTire

Create an instance: `const vehicle_tire = client.VehicleTire()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bolt_pattern` | `string | null` |  |
| `checked` | `string` |  |
| `id` | `string` |  |
| `lug_torque_lbft` | `number | null` |  |
| `lug_torque_nm` | `number | null` |  |
| `lug_torque_written_in` | `string | null` | `nm` or `lbft`. |
| `market` | `string | null` |  |
| `pressure_kpa` | `any` |  |
| `pressure_psi` | `any` |  |
| `pressure_written_in` | `string | null` | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `string` | The size as printed. |
| `size_rear` | `string | null` | The rear size, only when it differs from the front. |
| `source` | `string` |  |
| `trims` | `any[]` | The trims the document ties the size to, as it names them. |

#### Example: List

```ts
const vehicle_tires = await client.VehicleTire().list({ id: "example" })
```


### Vin

Create an instance: `const vin = client.Vin()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_price_usd` | `number | null` | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `string | null` |  |
| `catalog` | `any` |  |
| `check_digit` | `Record<string, any>` |  |
| `doors` | `number | null` |  |
| `drivetrain` | `string | null` |  |
| `engine` | `any` |  |
| `gvwr` | `string | null` | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `string` |  |
| `make` | `string | null` |  |
| `manufacturer` | `Record<string, any>` |  |
| `model` | `string | null` |  |
| `plant` | `Record<string, any>` | Where the vehicle was built. |
| `recalls` | `any` |  |
| `safety` | `any` |  |
| `seat_rows` | `number | null` |  |
| `seats` | `number | null` |  |
| `series` | `string | null` |  |
| `transmission` | `string | null` |  |
| `transmission_speeds` | `number | null` |  |
| `trim` | `string | null` |  |
| `valid` | `boolean` | Whether the check digit, position 9, is right. |
| `vin` | `string` |  |
| `warnings` | `any[]` | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `number | null` | Front wheel diameter in inches. |
| `wheel_size_rear` | `number | null` | Rear wheel diameter in inches. |
| `year` | `number | null` |  |

#### Example: Load

```ts
const vin = await client.Vin().load({ id: 'vin_id' })
```


### VinBulletin

Create an instance: `const vin_bulletin = client.VinBulletin()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string | null` |  |
| `attribution` | `any[]` |  |
| `bulletins` | `any[]` |  |
| `counts` | `Record<string, any>` | What the bulletins of one model year are, in numbers. |
| `decode` | `Record<string, any>` | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` |  |
| `next_cursor` | `string | null` |  |
| `note` | `string` |  |
| `vehicle` | `any` |  |
| `warnings` | `any[]` |  |

#### Example: List

```ts
const vin_bulletins = await client.VinBulletin().list({ id: "example" })
```


### VinFluid

Create an instance: `const vin_fluid = client.VinFluid()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string | null` |  |
| `attribution` | `any[]` |  |
| `brake` | `any[]` |  |
| `checked_as_of` | `string | null` |  |
| `coolant` | `any[]` |  |
| `decode` | `Record<string, any>` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `engine_oil` | `any[]` |  |
| `engine_oil_checked` | `any[]` | Narrowed as `engine_oil` is. |
| `engine_settled` | `boolean` | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `string` |  |
| `refrigerant` | `any[]` |  |
| `transmission` | `any[]` |  |
| `vehicle` | `any` |  |
| `warnings` | `any[]` |  |

#### Example: List

```ts
const vin_fluids = await client.VinFluid().list({ id: "example" })
```


### VinFuel

Create an instance: `const vin_fuel = client.VinFuel()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Record<string, any>` | The day each country's fuel ratings were current. |
| `attribution` | `any[]` |  |
| `decode` | `Record<string, any>` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `engine_settled` | `boolean` | Whether `ratings` is narrowed to `engine`. |
| `id` | `string` |  |
| `ratings` | `any[]` |  |
| `vehicle` | `any` |  |
| `warnings` | `any[]` |  |

#### Example: List

```ts
const vin_fuels = await client.VinFuel().list({ id: "example" })
```


### VinLabor

Create an instance: `const vin_labor = client.VinLabor()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string | null` |  |
| `attribution` | `any[]` |  |
| `class` | `any` |  |
| `decode` | `Record<string, any>` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `string | null` |  |
| `estimates` | `any[]` |  |
| `id` | `string` |  |
| `note` | `string` |  |
| `vehicle` | `any` |  |
| `warnings` | `any[]` |  |

#### Example: Load

```ts
const vin_labor = await client.VinLabor().load({ id: 'vin_labor_id', vin_id: 'vin_id' })
```

#### Example: List

```ts
const vin_labors = await client.VinLabor().list({ id: "example" })
```


### VinRecall

Create an instance: `const vin_recall = client.VinRecall()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `Record<string, any>` | The day each country's recall data was current. |
| `attribution` | `any[]` |  |
| `decode` | `Record<string, any>` | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` |  |
| `lookup` | `Record<string, any>` | Where to check one vehicle for open recalls. |
| `may_apply` | `boolean` | Always `true`. |
| `recalls` | `any[]` |  |
| `vehicle` | `any` |  |
| `warnings` | `any[]` | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

#### Example: List

```ts
const vin_recalls = await client.VinRecall().list({ id: "example" })
```


### VinSpec

Create an instance: `const vin_spec = client.VinSpec()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string | null` |  |
| `attribution` | `any[]` |  |
| `decode` | `Record<string, any>` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `engine_settled` | `boolean` | Whether `specs` is narrowed to `engine`. |
| `id` | `string` |  |
| `specs` | `any[]` |  |
| `vehicle` | `any` |  |
| `warnings` | `any[]` |  |

#### Example: List

```ts
const vin_specs = await client.VinSpec().list({ id: "example" })
```


### VinTire

Create an instance: `const vin_tire = client.VinTire()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `string | null` |  |
| `attribution` | `any[]` |  |
| `decode` | `Record<string, any>` | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `any[]` | Every fitment of the model year. |
| `id` | `string` |  |
| `vehicle` | `any` |  |
| `warnings` | `any[]` |  |

#### Example: List

```ts
const vin_tires = await client.VinTire().list({ id: "example" })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
wenmar-vin/
├── src/
│   ├── WenmarVinSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { WenmarVinSDK } from '@voxgig-sdk/wenmar-vin-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const entry = client.Entry()
await entry.list({ q: "example" })

// entry.data() now returns the entry data from the last `list`
// entry.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
