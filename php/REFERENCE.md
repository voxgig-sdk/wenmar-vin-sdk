# WenmarVin PHP SDK Reference

Complete API reference for the WenmarVin PHP SDK.


## WenmarVinSDK

### Constructor

```php
require_once __DIR__ . '/wenmarvin_sdk.php';

$client = new WenmarVinSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WenmarVinSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = WenmarVinSDK::test();
```


### Instance Methods

#### `Batch($data = null)`

Create a new `BatchEntity` instance. Pass `null` for no initial data.

#### `Bulletin($data = null)`

Create a new `BulletinEntity` instance. Pass `null` for no initial data.

#### `Code($data = null)`

Create a new `CodeEntity` instance. Pass `null` for no initial data.

#### `Data($data = null)`

Create a new `DataEntity` instance. Pass `null` for no initial data.

#### `Engine($data = null)`

Create a new `EngineEntity` instance. Pass `null` for no initial data.

#### `Entry($data = null)`

Create a new `EntryEntity` instance. Pass `null` for no initial data.

#### `Job($data = null)`

Create a new `JobEntity` instance. Pass `null` for no initial data.

#### `Make($data = null)`

Create a new `MakeEntity` instance. Pass `null` for no initial data.

#### `Model($data = null)`

Create a new `ModelEntity` instance. Pass `null` for no initial data.

#### `Overview($data = null)`

Create a new `OverviewEntity` instance. Pass `null` for no initial data.

#### `PartsCard($data = null)`

Create a new `PartsCardEntity` instance. Pass `null` for no initial data.

#### `PayrollDeduction($data = null)`

Create a new `PayrollDeductionEntity` instance. Pass `null` for no initial data.

#### `Recall($data = null)`

Create a new `RecallEntity` instance. Pass `null` for no initial data.

#### `RecallInvestigation($data = null)`

Create a new `RecallInvestigationEntity` instance. Pass `null` for no initial data.

#### `Recent($data = null)`

Create a new `RecentEntity` instance. Pass `null` for no initial data.

#### `Submodel($data = null)`

Create a new `SubmodelEntity` instance. Pass `null` for no initial data.

#### `Vehicle($data = null)`

Create a new `VehicleEntity` instance. Pass `null` for no initial data.

#### `VehicleBulletin($data = null)`

Create a new `VehicleBulletinEntity` instance. Pass `null` for no initial data.

#### `VehicleCode($data = null)`

Create a new `VehicleCodeEntity` instance. Pass `null` for no initial data.

#### `VehicleComplaint($data = null)`

Create a new `VehicleComplaintEntity` instance. Pass `null` for no initial data.

#### `VehicleFluid($data = null)`

Create a new `VehicleFluidEntity` instance. Pass `null` for no initial data.

#### `VehicleFuel($data = null)`

Create a new `VehicleFuelEntity` instance. Pass `null` for no initial data.

#### `VehicleInvestigation($data = null)`

Create a new `VehicleInvestigationEntity` instance. Pass `null` for no initial data.

#### `VehicleLabor($data = null)`

Create a new `VehicleLaborEntity` instance. Pass `null` for no initial data.

#### `VehicleRecall($data = null)`

Create a new `VehicleRecallEntity` instance. Pass `null` for no initial data.

#### `VehicleSafety($data = null)`

Create a new `VehicleSafetyEntity` instance. Pass `null` for no initial data.

#### `VehicleSpec($data = null)`

Create a new `VehicleSpecEntity` instance. Pass `null` for no initial data.

#### `VehicleTire($data = null)`

Create a new `VehicleTireEntity` instance. Pass `null` for no initial data.

#### `Vin($data = null)`

Create a new `VinEntity` instance. Pass `null` for no initial data.

#### `VinBulletin($data = null)`

Create a new `VinBulletinEntity` instance. Pass `null` for no initial data.

#### `VinFluid($data = null)`

Create a new `VinFluidEntity` instance. Pass `null` for no initial data.

#### `VinFuel($data = null)`

Create a new `VinFuelEntity` instance. Pass `null` for no initial data.

#### `VinLabor($data = null)`

Create a new `VinLaborEntity` instance. Pass `null` for no initial data.

#### `VinRecall($data = null)`

Create a new `VinRecallEntity` instance. Pass `null` for no initial data.

#### `VinSpec($data = null)`

Create a new `VinSpecEntity` instance. Pass `null` for no initial data.

#### `VinTire($data = null)`

Create a new `VinTireEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): WenmarVinUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BatchEntity

```php
$batch = $client->Batch();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `vins` | `array` | Yes | At most 50 VINs. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Batch()->create([
  "vins" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BatchEntity`

Create a new `BatchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BulletinEntity

```php
$bulletin = $client->Bulletin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `mixed` | No |  |
| `attribution` | `array` | Yes |  |
| `codes` | `array` | Yes | The trouble codes the summary names. |
| `component` | `mixed` | No | NHTSA's components, in its words, separated by `; `. |
| `components` | `array` | Yes | The components it is about, systems first. |
| `date` | `mixed` | No | The manufacturer's own date. |
| `date_added` | `string` | Yes | The day NHTSA published it. |
| `document` | `mixed` | No |  |
| `document_id` | `mixed` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` | No |  |
| `mfr_campaign` | `mixed` | No | The manufacturer's campaign id or software version. |
| `mfr_system` | `mixed` | No | The manufacturer's own words for the system. |
| `nhtsa_id` | `int` | Yes | NHTSA's id number for the communication. |
| `note` | `string` | Yes |  |
| `replaces` | `mixed` | No | The number of the bulletin this one replaces. |
| `summary` | `mixed` | No | NHTSA's summary of the communication. |
| `topics` | `array` | Yes |  |
| `type` | `string` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | Yes | The type in words. |
| `url` | `string` | Yes | The bulletin's page on this site. |
| `vehicles` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Bulletin()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Bulletin()->load(["id" => "bulletin_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BulletinEntity`

Create a new `BulletinEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CodeEntity

```php
$code = $client->Code();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `array` | Yes | The credit lines the data's licences ask for. |
| `checked` | `string` | Yes | The day it was approved. |
| `checks` | `array` | Yes | What a technician usually verifies first. |
| `code` | `string` | Yes |  |
| `common_causes` | `array` | Yes | General causes, not about one make. |
| `components` | `array` | Yes |  |
| `generic` | `bool` | Yes | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `string` | No |  |
| `meaning` | `string` | Yes | What the code tells a service advisor. |
| `note` | `string` | Yes | What a description is and is not. |
| `related` | `array` | Yes | Related codes that are described too. |
| `reviewer` | `string` | Yes | The GitHub name of the person who approved the text. |
| `system` | `string` | Yes | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `url` | `string` | Yes | The code's page on this site. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Code()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Code()->load(["id" => "code_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CodeEntity`

Create a new `CodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DataEntity

```php
$data = $client->Data();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_at` | `string` | Yes | When the data file was built, in UTC. |
| `data_version` | `string` | Yes | The data release, such as `2026.09`. |
| `datasets` | `array` | Yes | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `string` | Yes | The version of the server. |
| `vpic_release` | `string` | Yes | The NHTSA vPIC release the data was built from. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Data()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DataEntity`

Create a new `DataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EngineEntity

```php
$engine = $client->Engine();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `preset` | `bool` | Yes | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `mixed` | No | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Engine()->list(["make" => "example", "model" => "example", "year" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EngineEntity`

Create a new `EngineEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EntryEntity

```php
$entry = $client->Entry();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `mixed` | No |  |
| `drive` | `mixed` | No |  |
| `engine` | `mixed` | No |  |
| `id` | `string` | Yes | The stable id. |
| `make` | `string` | Yes |  |
| `model` | `string` | Yes |  |
| `submodel` | `mixed` | No |  |
| `summary` | `string` | Yes | One line naming everything above that is known. |
| `transmission` | `mixed` | No |  |
| `vehicle_types` | `array` | Yes | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `int` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Entry()->list(["q" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Entry()->load(["id" => "entry_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EntryEntity`

Create a new `EntryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## JobEntity

```php
$job = $client->Job();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `array` | Yes | The credit the labour estimates ask for. |
| `components` | `array` | Yes |  |
| `estimates` | `mixed` | No | The job's class-scope figures. |
| `excludes` | `array` | Yes | Work often done at the same visit that is not part of this job. |
| `id` | `string` | Yes | The job's id. |
| `includes` | `array` | Yes | The work the job covers. |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes | What an estimate is not. |
| `related` | `array` | Yes |  |
| `system` | `string` | Yes | The id of the system the job belongs to. |
| `system_name` | `string` | Yes |  |
| `url` | `string` | Yes | The job's page on this site. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Job()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Job()->load(["id" => "job_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): JobEntity`

Create a new `JobEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MakeEntity

```php
$make = $client->Make();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | The make's id form. |
| `links` | `mixed` | No |  |
| `name` | `string` | Yes |  |
| `popular` | `bool` | Yes | Whether it is on the list of popular makes. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Make()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Make()->load(["id" => "make_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MakeEntity`

Create a new `MakeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ModelEntity

```php
$model = $client->Model();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `array` | Yes | The day each country's recall data was current. |
| `attribution` | `array` | Yes |  |
| `id` | `string` | Yes | The model's id form. |
| `lookup` | `array` | Yes | Where to check one vehicle for open recalls. |
| `make` | `array` | Yes | A make or a model: its id form and its name. |
| `may_apply` | `bool` | Yes | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `array` | Yes | A make or a model: its id form and its name. |
| `name` | `string` | Yes |  |
| `year_from` | `int` | Yes | The first and last model year the model exists in. |
| `year_to` | `int` | Yes |  |
| `years` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Model()->list(["make" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Model()->load(["make" => "make", "model" => "model"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ModelEntity`

Create a new `ModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OverviewEntity

```php
$overview = $client->Overview();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `string` | Yes |  |
| `suggestions` | `array` | No | VINs the caller may have meant. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Overview()->list(["vehicle_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OverviewEntity`

Create a new `OverviewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PartsCardEntity

```php
$parts_card = $client->PartsCard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `array` | Yes |  |
| `engine_settled` | `bool` | Yes | Whether the decode settled one catalog engine. |
| `lines` | `array` | Yes |  |
| `text` | `string` | Yes | The lines as plain text, one `Label: value` each. |
| `vehicle` | `mixed` | No |  |
| `vin` | `string` | Yes |  |
| `warnings` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PartsCard()->list(["vin_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PartsCardEntity`

Create a new `PartsCardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PayrollDeductionEntity

```php
$payroll_deduction = $client->PayrollDeduction();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meaning` | `string` | Yes | What the factor means. |
| `name` | `string` | Yes | The name the engine gives the factor. |
| `value` | `float` | Yes | The value used, after rounding. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PayrollDeduction()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PayrollDeductionEntity`

Create a new `PayrollDeductionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecallEntity

```php
$recall = $client->Recall();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `mixed` | No | The day this publisher's data was current. |
| `attribution` | `array` | Yes |  |
| `built_from` | `mixed` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `mixed` | No |  |
| `campaign` | `string` | Yes | The publisher's campaign number. |
| `completion` | `mixed` | No |  |
| `component` | `mixed` | No | The component, as the source words it. |
| `consequence` | `mixed` | No |  |
| `country` | `string` | Yes | `us` or `ca`. |
| `date` | `mixed` | No | The day the campaign was reported. |
| `do_not_drive` | `mixed` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `mixed` | No |  |
| `id` | `string` | No |  |
| `lookup` | `array` | Yes | Where to check one vehicle for open recalls. |
| `manufacturer` | `mixed` | No |  |
| `match` | `mixed` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `bool` | Yes | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `mixed` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `array` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `mixed` | No |  |
| `notification` | `mixed` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `mixed` | No | The day owners were notified. |
| `park_outside` | `mixed` | No | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `mixed` | No | The manufacturer's part numbers, separated by commas. |
| `remedy` | `mixed` | No |  |
| `source` | `string` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `mixed` | No | What is wrong, in the source's words. |
| `units` | `mixed` | No | Units potentially affected. |
| `url` | `string` | Yes | The campaign's page on this site. |
| `vehicles` | `array` | Yes | Every vehicle the campaign lists, by make, model and year. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Recall()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Recall()->load(["campaign" => "campaign", "source" => "source"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecallEntity`

Create a new `RecallEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecallInvestigationEntity

```php
$recall_investigation = $client->RecallInvestigation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | NHTSA's action number. |
| `campaigns` | `array` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `mixed` | No | The day it was closed. |
| `component` | `mixed` | No | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `string` | Yes | The letters the number starts with. |
| `kind_name` | `mixed` | No | The kind in words. |
| `manufacturer` | `mixed` | No | The manufacturers it names, separated by `; `. |
| `match` | `mixed` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `array` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `mixed` | No | The day it was opened. |
| `subject` | `mixed` | No | NHTSA's one-line subject. |
| `summary` | `mixed` | No | NHTSA's summary. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->RecallInvestigation()->list(["campaign" => "example", "recall_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecallInvestigationEntity`

Create a new `RecallInvestigationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecentEntity

```php
$recent = $client->Recent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `recall` | `array` | Yes | One recall campaign in a list. |
| `vehicles` | `array` | Yes | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `int` | Yes | How many vehicles the campaign lists in all. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Recent()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecentEntity`

Create a new `RecentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SubmodelEntity

```php
$submodel = $client->Submodel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Submodel()->list(["make" => "example", "model" => "example", "year" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SubmodelEntity`

Create a new `SubmodelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleEntity

```php
$vehicle = $client->Vehicle();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Vehicle()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleEntity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleBulletinEntity

```php
$vehicle_bulletin = $client->VehicleBulletin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component` | `mixed` | No | NHTSA's components, in its words, separated by `; `. |
| `date` | `mixed` | No | The manufacturer's own date. |
| `date_added` | `string` | Yes | The day NHTSA published it. |
| `document` | `mixed` | No |  |
| `document_id` | `mixed` | No | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` | No |  |
| `mfr_campaign` | `mixed` | No | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `int` | Yes | NHTSA's id number for the communication. |
| `summary` | `mixed` | No | NHTSA's summary of the communication. |
| `type` | `string` | Yes | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | Yes | The type in words. |
| `url` | `string` | Yes | The bulletin's page on this site. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleBulletin()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleBulletinEntity`

Create a new `VehicleBulletinEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleCodeEntity

```php
$vehicle_code = $client->VehicleCode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `array` | Yes |  |
| `bulletins` | `mixed` | No |  |
| `code` | `string` | Yes |  |
| `description` | `string` | No |  |
| `generic` | `bool` | Yes | Whether every maker uses the code the same way. |
| `id` | `string` | No |  |
| `note` | `string` | Yes |  |
| `related` | `array` | Yes | What else is held for the model year about the components a code concerns. |
| `url` | `string` | Yes | The page of this code on this model year. |
| `vehicle` | `array` | Yes | The model year an answer is about. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VehicleCode()->load(["id" => "vehicle_code_id", "vehicle_id" => "vehicle_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleCodeEntity`

Create a new `VehicleCodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleComplaintEntity

```php
$vehicle_complaint = $client->VehicleComplaint();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `complaints` | `int` | Yes |  |
| `crashes` | `int` | Yes | Complaints that report a crash. |
| `fires` | `int` | Yes | Complaints that report a fire. |
| `id` | `string` | Yes | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `int` | Yes | Complaints that report at least one person injured. |
| `median_km` | `mixed` | No | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `mixed` | No | The same in miles, as NHTSA records it. |
| `name` | `string` | Yes |  |
| `parent` | `mixed` | No | The system a part belongs to. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleComplaint()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleComplaintEntity`

Create a new `VehicleComplaintEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleFluidEntity

```php
$vehicle_fluid = $client->VehicleFluid();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `mixed` | No | The day EPA's oil grades were current. |
| `attribution` | `array` | Yes |  |
| `brake` | `array` | Yes |  |
| `checked_as_of` | `mixed` | No | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `array` | Yes |  |
| `engine_oil` | `array` | Yes |  |
| `engine_oil_checked` | `array` | Yes |  |
| `id` | `string` | No |  |
| `refrigerant` | `array` | Yes |  |
| `transmission` | `array` | Yes |  |
| `vehicle` | `array` | Yes | The model year an answer is about. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleFluid()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleFluidEntity`

Create a new `VehicleFluidEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleFuelEntity

```php
$vehicle_fuel = $client->VehicleFuel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `co2_g_km` | `mixed` | No | Tailpipe carbon dioxide, combined. |
| `confidence` | `string` | Yes | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `string` | Yes | `us` or `ca`. |
| `cylinders` | `mixed` | No |  |
| `described_as` | `string` | Yes | The source's own name for the vehicle rated. |
| `displacement_l` | `mixed` | No |  |
| `drive` | `mixed` | No |  |
| `engine` | `mixed` | No |  |
| `fuel_grade` | `string` | Yes | The fuel the figures are for, which is the recommended grade. |
| `id` | `string` | No |  |
| `kwh_100km` | `mixed` | No | Combined electricity use. |
| `l_100km` | `mixed` | No |  |
| `match` | `string` | Yes | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `mixed` | No |  |
| `range_km` | `mixed` | No | On a full battery. |
| `range_mi` | `mixed` | No |  |
| `second_fuel` | `mixed` | No | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `string` | Yes | `epa` or `nrcan`. |
| `source_id` | `mixed` | No | EPA's id for the rating. |
| `transmission` | `mixed` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleFuel()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleFuelEntity`

Create a new `VehicleFuelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleInvestigationEntity

```php
$vehicle_investigation = $client->VehicleInvestigation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes | NHTSA's action number. |
| `campaigns` | `array` | Yes | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `mixed` | No | The day it was closed. |
| `component` | `mixed` | No | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `string` | No |  |
| `kind` | `string` | Yes | The letters the number starts with. |
| `kind_name` | `mixed` | No | The kind in words. |
| `manufacturer` | `mixed` | No | The manufacturers it names, separated by `; `. |
| `match` | `mixed` | No | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `array` | Yes | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Yes | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `mixed` | No | The day it was opened. |
| `subject` | `mixed` | No | NHTSA's one-line subject. |
| `summary` | `mixed` | No | NHTSA's summary. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleInvestigation()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleInvestigationEntity`

Create a new `VehicleInvestigationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleLaborEntity

```php
$vehicle_labor = $client->VehicleLabor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `mixed` | No | The newest day an estimate was changed. |
| `attribution` | `array` | Yes |  |
| `basis` | `string` | Yes | `expert`: written by a person who does the work. |
| `class` | `mixed` | No | The class, for a class-scope figure. |
| `class_name` | `mixed` | No |  |
| `engine` | `mixed` | No | The engine the vehicle id named, as an id form. |
| `estimates` | `array` | Yes | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `array` | Yes | Hours, as numbers of hours. |
| `id` | `string` | No |  |
| `job` | `string` | Yes | The job's id. |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes | "An estimate, not a quote. |
| `notes` | `mixed` | No |  |
| `sample` | `mixed` | No |  |
| `scope` | `string` | Yes | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `string` | Yes | The day the figure was last changed. |
| `url` | `string` | Yes | The job's page on this site. |
| `vehicle` | `array` | Yes | The model year an answer is about. |
| `years` | `mixed` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleLabor()->list(["id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VehicleLabor()->load(["id" => "vehicle_labor_id", "vehicle_id" => "vehicle_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleLaborEntity`

Create a new `VehicleLaborEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleRecallEntity

```php
$vehicle_recall = $client->VehicleRecall();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `built_from` | `mixed` | No | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `mixed` | No |  |
| `campaign` | `string` | Yes | The publisher's campaign number. |
| `component` | `mixed` | No | The component, as the source words it. |
| `country` | `string` | Yes | `us` or `ca`. |
| `date` | `mixed` | No | The day the campaign was reported. |
| `do_not_drive` | `mixed` | No | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `string` | No |  |
| `manufacturer` | `mixed` | No |  |
| `match` | `mixed` | No | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `mixed` | No | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `array` | Yes | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `mixed` | No | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `mixed` | No | NHTSA's advisory to park outside, away from buildings. |
| `source` | `string` | Yes | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `mixed` | No | What is wrong, in the source's words. |
| `units` | `mixed` | No | Units potentially affected. |
| `url` | `string` | Yes | The campaign's page on this site. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleRecall()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleRecallEntity`

Create a new `VehicleRecallEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleSafetyEntity

```php
$vehicle_safety = $client->VehicleSafety();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body_style` | `mixed` | No |  |
| `curb_weight_kg` | `mixed` | No | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `mixed` | No |  |
| `description` | `string` | Yes | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `mixed` | No |  |
| `features` | `array` | Yes | The safety features NHTSA lists with a rating. |
| `id` | `string` | No |  |
| `match` | `string` | Yes | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `string` | Yes | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `array` | Yes | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `int` | Yes | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `mixed` | No | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `mixed` | No | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `array` | Yes | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `mixed` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleSafety()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleSafetyEntity`

Create a new `VehicleSafetyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleSpecEntity

```php
$vehicle_spec = $client->VehicleSpec();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `battery_type` | `mixed` | No |  |
| `battery_voltage` | `mixed` | No |  |
| `confidence` | `string` | Yes | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `mixed` | No |  |
| `cylinder_deactivation_name` | `mixed` | No | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `string` | Yes |  |
| `drive` | `mixed` | No |  |
| `electrification` | `mixed` | No | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `array` | Yes |  |
| `engine` | `mixed` | No |  |
| `ev_motor` | `mixed` | No |  |
| `exhaust_valves` | `mixed` | No |  |
| `fuel_grade` | `string` | Yes |  |
| `fuel_usage` | `mixed` | No | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `mixed` | No |  |
| `id` | `string` | No |  |
| `intake_valves` | `mixed` | No | Per cylinder. |
| `luggage_volume_ft3` | `mixed` | No |  |
| `luggage_volume_l` | `mixed` | No |  |
| `motor_kw` | `mixed` | No | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `mixed` | No |  |
| `passenger_volume_l` | `mixed` | No |  |
| `size_class` | `string` | Yes |  |
| `source` | `string` | Yes |  |
| `source_id` | `string` | Yes |  |
| `start_stop` | `mixed` | No |  |
| `supercharger` | `bool` | Yes |  |
| `transmission` | `mixed` | No |  |
| `transmission_type` | `mixed` | No |  |
| `turbo` | `bool` | Yes |  |
| `variable_valve_lift` | `mixed` | No |  |
| `variable_valve_timing` | `mixed` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleSpec()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleSpecEntity`

Create a new `VehicleSpecEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleTireEntity

```php
$vehicle_tire = $client->VehicleTire();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bolt_pattern` | `mixed` | No |  |
| `checked` | `string` | Yes |  |
| `id` | `string` | No |  |
| `lug_torque_lbft` | `mixed` | No |  |
| `lug_torque_nm` | `mixed` | No |  |
| `lug_torque_written_in` | `mixed` | No | `nm` or `lbft`. |
| `market` | `mixed` | No |  |
| `pressure_kpa` | `mixed` | No |  |
| `pressure_psi` | `mixed` | No |  |
| `pressure_written_in` | `mixed` | No | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `string` | Yes | The size as printed. |
| `size_rear` | `mixed` | No | The rear size, only when it differs from the front. |
| `source` | `string` | Yes |  |
| `trims` | `array` | Yes | The trims the document ties the size to, as it names them. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VehicleTire()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleTireEntity`

Create a new `VehicleTireEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VinEntity

```php
$vin = $client->Vin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base_price_usd` | `mixed` | No | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `mixed` | No |  |
| `catalog` | `mixed` | No |  |
| `check_digit` | `array` | Yes |  |
| `doors` | `mixed` | No |  |
| `drivetrain` | `mixed` | No |  |
| `engine` | `mixed` | No |  |
| `gvwr` | `mixed` | No | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `string` | No |  |
| `make` | `mixed` | No |  |
| `manufacturer` | `array` | Yes |  |
| `model` | `mixed` | No |  |
| `plant` | `array` | Yes | Where the vehicle was built. |
| `recalls` | `mixed` | No |  |
| `safety` | `mixed` | No |  |
| `seat_rows` | `mixed` | No |  |
| `seats` | `mixed` | No |  |
| `series` | `mixed` | No |  |
| `transmission` | `mixed` | No |  |
| `transmission_speeds` | `mixed` | No |  |
| `trim` | `mixed` | No |  |
| `valid` | `bool` | Yes | Whether the check digit, position 9, is right. |
| `vin` | `string` | Yes |  |
| `warnings` | `array` | Yes | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `mixed` | No | Front wheel diameter in inches. |
| `wheel_size_rear` | `mixed` | No | Rear wheel diameter in inches. |
| `year` | `mixed` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Vin()->load(["id" => "vin_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VinEntity`

Create a new `VinEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VinBulletinEntity

```php
$vin_bulletin = $client->VinBulletin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `mixed` | No |  |
| `attribution` | `array` | Yes |  |
| `bulletins` | `array` | Yes |  |
| `counts` | `array` | Yes | What the bulletins of one model year are, in numbers. |
| `decode` | `array` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` | No |  |
| `next_cursor` | `mixed` | No |  |
| `note` | `string` | Yes |  |
| `vehicle` | `mixed` | No |  |
| `warnings` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VinBulletin()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VinBulletinEntity`

Create a new `VinBulletinEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VinFluidEntity

```php
$vin_fluid = $client->VinFluid();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `mixed` | No |  |
| `attribution` | `array` | Yes |  |
| `brake` | `array` | Yes |  |
| `checked_as_of` | `mixed` | No |  |
| `coolant` | `array` | Yes |  |
| `decode` | `array` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `mixed` | No |  |
| `engine_oil` | `array` | Yes |  |
| `engine_oil_checked` | `array` | Yes | Narrowed as `engine_oil` is. |
| `engine_settled` | `bool` | Yes | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `refrigerant` | `array` | Yes |  |
| `transmission` | `array` | Yes |  |
| `vehicle` | `mixed` | No |  |
| `warnings` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VinFluid()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VinFluidEntity`

Create a new `VinFluidEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VinFuelEntity

```php
$vin_fuel = $client->VinFuel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `array` | Yes | The day each country's fuel ratings were current. |
| `attribution` | `array` | Yes |  |
| `decode` | `array` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `mixed` | No |  |
| `engine_settled` | `bool` | Yes | Whether `ratings` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `ratings` | `array` | Yes |  |
| `vehicle` | `mixed` | No |  |
| `warnings` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VinFuel()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VinFuelEntity`

Create a new `VinFuelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VinLaborEntity

```php
$vin_labor = $client->VinLabor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `mixed` | No |  |
| `attribution` | `array` | Yes |  |
| `class` | `mixed` | No |  |
| `decode` | `array` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `mixed` | No |  |
| `estimates` | `array` | Yes |  |
| `id` | `string` | No |  |
| `note` | `string` | Yes |  |
| `vehicle` | `mixed` | No |  |
| `warnings` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VinLabor()->list(["id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VinLabor()->load(["id" => "vin_labor_id", "vin_id" => "vin_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VinLaborEntity`

Create a new `VinLaborEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VinRecallEntity

```php
$vin_recall = $client->VinRecall();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `array` | Yes | The day each country's recall data was current. |
| `attribution` | `array` | Yes |  |
| `decode` | `array` | Yes | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` | No |  |
| `lookup` | `array` | Yes | Where to check one vehicle for open recalls. |
| `may_apply` | `bool` | Yes | Always `true`. |
| `recalls` | `array` | Yes |  |
| `vehicle` | `mixed` | No |  |
| `warnings` | `array` | Yes | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VinRecall()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VinRecallEntity`

Create a new `VinRecallEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VinSpecEntity

```php
$vin_spec = $client->VinSpec();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `mixed` | No |  |
| `attribution` | `array` | Yes |  |
| `decode` | `array` | Yes | What a VIN decoded to, as far as recalls need it. |
| `engine` | `mixed` | No |  |
| `engine_settled` | `bool` | Yes | Whether `specs` is narrowed to `engine`. |
| `id` | `string` | No |  |
| `specs` | `array` | Yes |  |
| `vehicle` | `mixed` | No |  |
| `warnings` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VinSpec()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VinSpecEntity`

Create a new `VinSpecEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VinTireEntity

```php
$vin_tire = $client->VinTire();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_of` | `mixed` | No |  |
| `attribution` | `array` | Yes |  |
| `decode` | `array` | Yes | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `array` | Yes | Every fitment of the model year. |
| `id` | `string` | No |  |
| `vehicle` | `mixed` | No |  |
| `warnings` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->VinTire()->list(["id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VinTireEntity`

Create a new `VinTireEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new WenmarVinSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

