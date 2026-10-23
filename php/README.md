# WenmarVin PHP SDK



The PHP SDK for the WenmarVin API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Batch()` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/wenmar-vin-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/wenmar-vin-sdk
composer config repositories.wenmar-vin-sdk path ./wenmar-vin-sdk/php
composer require voxgig-sdk/wenmar-vin-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'wenmarvin_sdk.php';

$client = new WenmarVinSDK();
```

### 3. Load a vehiclecode

VehicleCode is nested under vehicle, so provide the `vehicle_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the VehicleCode record (throws on error).
    $vehiclecode = $client->VehicleCode()->load(["vehicle_id" => "example_vehicle_id", "id" => "example_id"]);
    print_r($vehiclecode->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Batch record.
$created = $client->Batch()->create(["vins" => []]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $entrys = $client->Entry()->list(["q" => "example"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = WenmarVinSDK::test([
    "entity" => ["entry" => ["test01" => ["id" => "test01", "q" => "example"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$entry = $client->Entry()->list(["q" => "example"]);
print_r(array_map(fn($item) => $item->data_get(), $entry));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new WenmarVinSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
WENMAR_VIN_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### WenmarVinSDK

```php
require_once 'wenmarvin_sdk.php';
$client = new WenmarVinSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = WenmarVinSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### WenmarVinSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Batch` | `($data): BatchEntity` | Create a Batch entity instance. |
| `Bulletin` | `($data): BulletinEntity` | Create a Bulletin entity instance. |
| `Code` | `($data): CodeEntity` | Create a Code entity instance. |
| `Data` | `($data): DataEntity` | Create a Data entity instance. |
| `Engine` | `($data): EngineEntity` | Create an Engine entity instance. |
| `Entry` | `($data): EntryEntity` | Create an Entry entity instance. |
| `Job` | `($data): JobEntity` | Create a Job entity instance. |
| `Make` | `($data): MakeEntity` | Create a Make entity instance. |
| `Model` | `($data): ModelEntity` | Create a Model entity instance. |
| `Overview` | `($data): OverviewEntity` | Create an Overview entity instance. |
| `PartsCard` | `($data): PartsCardEntity` | Create a PartsCard entity instance. |
| `PayrollDeduction` | `($data): PayrollDeductionEntity` | Create a PayrollDeduction entity instance. |
| `Recall` | `($data): RecallEntity` | Create a Recall entity instance. |
| `RecallInvestigation` | `($data): RecallInvestigationEntity` | Create a RecallInvestigation entity instance. |
| `Recent` | `($data): RecentEntity` | Create a Recent entity instance. |
| `Submodel` | `($data): SubmodelEntity` | Create a Submodel entity instance. |
| `Vehicle` | `($data): VehicleEntity` | Create a Vehicle entity instance. |
| `VehicleBulletin` | `($data): VehicleBulletinEntity` | Create a VehicleBulletin entity instance. |
| `VehicleCode` | `($data): VehicleCodeEntity` | Create a VehicleCode entity instance. |
| `VehicleComplaint` | `($data): VehicleComplaintEntity` | Create a VehicleComplaint entity instance. |
| `VehicleFluid` | `($data): VehicleFluidEntity` | Create a VehicleFluid entity instance. |
| `VehicleFuel` | `($data): VehicleFuelEntity` | Create a VehicleFuel entity instance. |
| `VehicleInvestigation` | `($data): VehicleInvestigationEntity` | Create a VehicleInvestigation entity instance. |
| `VehicleLabor` | `($data): VehicleLaborEntity` | Create a VehicleLabor entity instance. |
| `VehicleRecall` | `($data): VehicleRecallEntity` | Create a VehicleRecall entity instance. |
| `VehicleSafety` | `($data): VehicleSafetyEntity` | Create a VehicleSafety entity instance. |
| `VehicleSpec` | `($data): VehicleSpecEntity` | Create a VehicleSpec entity instance. |
| `VehicleTire` | `($data): VehicleTireEntity` | Create a VehicleTire entity instance. |
| `Vin` | `($data): VinEntity` | Create a Vin entity instance. |
| `VinBulletin` | `($data): VinBulletinEntity` | Create a VinBulletin entity instance. |
| `VinFluid` | `($data): VinFluidEntity` | Create a VinFluid entity instance. |
| `VinFuel` | `($data): VinFuelEntity` | Create a VinFuel entity instance. |
| `VinLabor` | `($data): VinLaborEntity` | Create a VinLabor entity instance. |
| `VinRecall` | `($data): VinRecallEntity` | Create a VinRecall entity instance. |
| `VinSpec` | `($data): VinSpecEntity` | Create a VinSpec entity instance. |
| `VinTire` | `($data): VinTireEntity` | Create a VinTire entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `create` | `($reqdata, $ctrl): mixed` | Create a new entity, and return it. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$batch = $client->Batch();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `vins` | `array` | At most 50 VINs. |

#### Example: Create

```php
$batch = $client->Batch()->create([
    "vins" => null, // array
]);
```


### Bulletin

Create an instance: `$bulletin = $client->Bulletin();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `mixed` |  |
| `attribution` | `array` |  |
| `codes` | `array` | The trouble codes the summary names. |
| `component` | `mixed` | NHTSA's components, in its words, separated by `; `. |
| `components` | `array` | The components it is about, systems first. |
| `date` | `mixed` | The manufacturer's own date. |
| `date_added` | `string` | The day NHTSA published it. |
| `document` | `mixed` |  |
| `document_id` | `mixed` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` |  |
| `mfr_campaign` | `mixed` | The manufacturer's campaign id or software version. |
| `mfr_system` | `mixed` | The manufacturer's own words for the system. |
| `nhtsa_id` | `int` | NHTSA's id number for the communication. |
| `note` | `string` |  |
| `replaces` | `mixed` | The number of the bulletin this one replaces. |
| `summary` | `mixed` | NHTSA's summary of the communication. |
| `topics` | `array` |  |
| `type` | `string` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | The type in words. |
| `url` | `string` | The bulletin's page on this site. |
| `vehicles` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Bulletin record (throws on error).
$bulletin = $client->Bulletin()->load(["id" => "bulletin_id"]);
```

#### Example: List

```php
// list() returns an array of Bulletin entities, one per record (throws on error).
$bulletins = $client->Bulletin()->list();
```


### Code

Create an instance: `$code = $client->Code();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `array` | The credit lines the data's licences ask for. |
| `checked` | `string` | The day it was approved. |
| `checks` | `array` | What a technician usually verifies first. |
| `code` | `string` |  |
| `common_causes` | `array` | General causes, not about one make. |
| `components` | `array` |  |
| `generic` | `bool` | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `string` |  |
| `meaning` | `string` | What the code tells a service advisor. |
| `note` | `string` | What a description is and is not. |
| `related` | `array` | Related codes that are described too. |
| `reviewer` | `string` | The GitHub name of the person who approved the text. |
| `system` | `string` | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `string` |  |
| `title` | `string` |  |
| `url` | `string` | The code's page on this site. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Code record (throws on error).
$code = $client->Code()->load(["id" => "code_id"]);
```

#### Example: List

```php
// list() returns an array of Code entities, one per record (throws on error).
$codes = $client->Code()->list();
```


### Data

Create an instance: `$data = $client->Data();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_at` | `string` | When the data file was built, in UTC. |
| `data_version` | `string` | The data release, such as `2026.09`. |
| `datasets` | `array` | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `string` | The version of the server. |
| `vpic_release` | `string` | The NHTSA vPIC release the data was built from. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Data record (throws on error).
$data = $client->Data()->load();
```


### Engine

Create an instance: `$engine = $client->Engine();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `label` | `string` |  |
| `preset` | `bool` | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `mixed` | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

#### Example: List

```php
// list() returns an array of Engine entities, one per record (throws on error).
$engines = $client->Engine()->list(["make" => "example", "model" => "example", "year" => 1]);
```


### Entry

Create an instance: `$entry = $client->Entry();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `mixed` |  |
| `drive` | `mixed` |  |
| `engine` | `mixed` |  |
| `id` | `string` | The stable id. |
| `make` | `string` |  |
| `model` | `string` |  |
| `submodel` | `mixed` |  |
| `summary` | `string` | One line naming everything above that is known. |
| `transmission` | `mixed` |  |
| `vehicle_types` | `array` | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Entry record (throws on error).
$entry = $client->Entry()->load(["id" => "entry_id"]);
```

#### Example: List

```php
// list() returns an array of Entry entities, one per record (throws on error).
$entrys = $client->Entry()->list(["q" => "example"]);
```


### Job

Create an instance: `$job = $client->Job();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `array` | The credit the labour estimates ask for. |
| `components` | `array` |  |
| `estimates` | `mixed` | The job's class-scope figures. |
| `excludes` | `array` | Work often done at the same visit that is not part of this job. |
| `id` | `string` | The job's id. |
| `includes` | `array` | The work the job covers. |
| `name` | `string` |  |
| `note` | `string` | What an estimate is not. |
| `related` | `array` |  |
| `system` | `string` | The id of the system the job belongs to. |
| `system_name` | `string` |  |
| `url` | `string` | The job's page on this site. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Job record (throws on error).
$job = $client->Job()->load(["id" => "job_id"]);
```

#### Example: List

```php
// list() returns an array of Job entities, one per record (throws on error).
$jobs = $client->Job()->list();
```


### Make

Create an instance: `$make = $client->Make();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | The make's id form. |
| `links` | `mixed` |  |
| `name` | `string` |  |
| `popular` | `bool` | Whether it is on the list of popular makes. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Make record (throws on error).
$make = $client->Make()->load(["id" => "make_id"]);
```

#### Example: List

```php
// list() returns an array of Make entities, one per record (throws on error).
$makes = $client->Make()->list();
```


### Model

Create an instance: `$model = $client->Model();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `array` | The day each country's recall data was current. |
| `attribution` | `array` |  |
| `id` | `string` | The model's id form. |
| `lookup` | `array` | Where to check one vehicle for open recalls. |
| `make` | `array` | A make or a model: its id form and its name. |
| `may_apply` | `bool` | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `array` | A make or a model: its id form and its name. |
| `name` | `string` |  |
| `year_from` | `int` | The first and last model year the model exists in. |
| `year_to` | `int` |  |
| `years` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Model record (throws on error).
$model = $client->Model()->load(["make" => "make", "model" => "model"]);
```

#### Example: List

```php
// list() returns an array of Model entities, one per record (throws on error).
$models = $client->Model()->list(["make" => "example"]);
```


### Overview

Create an instance: `$overview = $client->Overview();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `string` |  |
| `suggestions` | `array` | VINs the caller may have meant. |

#### Example: List

```php
// list() returns an array of Overview entities, one per record (throws on error).
$overviews = $client->Overview()->list(["vehicle_id" => "example"]);
```


### PartsCard

Create an instance: `$parts_card = $client->PartsCard();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `array` |  |
| `engine_settled` | `bool` | Whether the decode settled one catalog engine. |
| `lines` | `array` |  |
| `text` | `string` | The lines as plain text, one `Label: value` each. |
| `vehicle` | `mixed` |  |
| `vin` | `string` |  |
| `warnings` | `array` |  |

#### Example: List

```php
// list() returns an array of PartsCard entities, one per record (throws on error).
$parts_cards = $client->PartsCard()->list(["vin_id" => "example"]);
```


### PayrollDeduction

Create an instance: `$payroll_deduction = $client->PayrollDeduction();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meaning` | `string` | What the factor means. |
| `name` | `string` | The name the engine gives the factor. |
| `value` | `float` | The value used, after rounding. |

#### Example: List

```php
// list() returns an array of PayrollDeduction entities, one per record (throws on error).
$payroll_deductions = $client->PayrollDeduction()->list();
```


### Recall

Create an instance: `$recall = $client->Recall();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `mixed` | The day this publisher's data was current. |
| `attribution` | `array` |  |
| `built_from` | `mixed` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `mixed` |  |
| `campaign` | `string` | The publisher's campaign number. |
| `completion` | `mixed` |  |
| `component` | `mixed` | The component, as the source words it. |
| `consequence` | `mixed` |  |
| `country` | `string` | `us` or `ca`. |
| `date` | `mixed` | The day the campaign was reported. |
| `do_not_drive` | `mixed` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `mixed` |  |
| `id` | `string` |  |
| `lookup` | `array` | Where to check one vehicle for open recalls. |
| `manufacturer` | `mixed` |  |
| `match` | `mixed` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `bool` | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `mixed` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `array` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `mixed` |  |
| `notification` | `mixed` | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `mixed` | The day owners were notified. |
| `park_outside` | `mixed` | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `mixed` | The manufacturer's part numbers, separated by commas. |
| `remedy` | `mixed` |  |
| `source` | `string` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `mixed` | What is wrong, in the source's words. |
| `units` | `mixed` | Units potentially affected. |
| `url` | `string` | The campaign's page on this site. |
| `vehicles` | `array` | Every vehicle the campaign lists, by make, model and year. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Recall record (throws on error).
$recall = $client->Recall()->load(["campaign" => "campaign", "source" => "source"]);
```

#### Example: List

```php
// list() returns an array of Recall entities, one per record (throws on error).
$recalls = $client->Recall()->list();
```


### RecallInvestigation

Create an instance: `$recall_investigation = $client->RecallInvestigation();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | NHTSA's action number. |
| `campaigns` | `array` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `mixed` | The day it was closed. |
| `component` | `mixed` | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `string` | The letters the number starts with. |
| `kind_name` | `mixed` | The kind in words. |
| `manufacturer` | `mixed` | The manufacturers it names, separated by `; `. |
| `match` | `mixed` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `array` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `mixed` | The day it was opened. |
| `subject` | `mixed` | NHTSA's one-line subject. |
| `summary` | `mixed` | NHTSA's summary. |

#### Example: List

```php
// list() returns an array of RecallInvestigation entities, one per record (throws on error).
$recall_investigations = $client->RecallInvestigation()->list(["campaign" => "example", "recall_id" => "example"]);
```


### Recent

Create an instance: `$recent = $client->Recent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `recall` | `array` | One recall campaign in a list. |
| `vehicles` | `array` | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `int` | How many vehicles the campaign lists in all. |

#### Example: List

```php
// list() returns an array of Recent entities, one per record (throws on error).
$recents = $client->Recent()->list();
```


### Submodel

Create an instance: `$submodel = $client->Submodel();`

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

```php
// list() returns an array of Submodel entities, one per record (throws on error).
$submodels = $client->Submodel()->list(["make" => "example", "model" => "example", "year" => 1]);
```


### Vehicle

Create an instance: `$vehicle = $client->Vehicle();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of Vehicle entities, one per record (throws on error).
$vehicles = $client->Vehicle()->list();
```


### VehicleBulletin

Create an instance: `$vehicle_bulletin = $client->VehicleBulletin();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component` | `mixed` | NHTSA's components, in its words, separated by `; `. |
| `date` | `mixed` | The manufacturer's own date. |
| `date_added` | `string` | The day NHTSA published it. |
| `document` | `mixed` |  |
| `document_id` | `mixed` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` |  |
| `mfr_campaign` | `mixed` | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `int` | NHTSA's id number for the communication. |
| `summary` | `mixed` | NHTSA's summary of the communication. |
| `type` | `string` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | The type in words. |
| `url` | `string` | The bulletin's page on this site. |

#### Example: List

```php
// list() returns an array of VehicleBulletin entities, one per record (throws on error).
$vehicle_bulletins = $client->VehicleBulletin()->list(["id" => "example"]);
```


### VehicleCode

Create an instance: `$vehicle_code = $client->VehicleCode();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `array` |  |
| `bulletins` | `mixed` |  |
| `code` | `string` |  |
| `description` | `string` |  |
| `generic` | `bool` | Whether every maker uses the code the same way. |
| `id` | `string` |  |
| `note` | `string` |  |
| `related` | `array` | What else is held for the model year about the components a code concerns. |
| `url` | `string` | The page of this code on this model year. |
| `vehicle` | `array` | The model year an answer is about. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VehicleCode record (throws on error).
$vehicle_code = $client->VehicleCode()->load(["id" => "vehicle_code_id", "vehicle_id" => "vehicle_id"]);
```


### VehicleComplaint

Create an instance: `$vehicle_complaint = $client->VehicleComplaint();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `complaints` | `int` |  |
| `crashes` | `int` | Complaints that report a crash. |
| `fires` | `int` | Complaints that report a fire. |
| `id` | `string` | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `int` | Complaints that report at least one person injured. |
| `median_km` | `mixed` | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `mixed` | The same in miles, as NHTSA records it. |
| `name` | `string` |  |
| `parent` | `mixed` | The system a part belongs to. |

#### Example: List

```php
// list() returns an array of VehicleComplaint entities, one per record (throws on error).
$vehicle_complaints = $client->VehicleComplaint()->list(["id" => "example"]);
```


### VehicleFluid

Create an instance: `$vehicle_fluid = $client->VehicleFluid();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `mixed` | The day EPA's oil grades were current. |
| `attribution` | `array` |  |
| `brake` | `array` |  |
| `checked_as_of` | `mixed` | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `array` |  |
| `engine_oil` | `array` |  |
| `engine_oil_checked` | `array` |  |
| `id` | `string` |  |
| `refrigerant` | `array` |  |
| `transmission` | `array` |  |
| `vehicle` | `array` | The model year an answer is about. |

#### Example: List

```php
// list() returns an array of VehicleFluid entities, one per record (throws on error).
$vehicle_fluids = $client->VehicleFluid()->list(["id" => "example"]);
```


### VehicleFuel

Create an instance: `$vehicle_fuel = $client->VehicleFuel();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `co2_g_km` | `mixed` | Tailpipe carbon dioxide, combined. |
| `confidence` | `string` | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `string` | `us` or `ca`. |
| `cylinders` | `mixed` |  |
| `described_as` | `string` | The source's own name for the vehicle rated. |
| `displacement_l` | `mixed` |  |
| `drive` | `mixed` |  |
| `engine` | `mixed` |  |
| `fuel_grade` | `string` | The fuel the figures are for, which is the recommended grade. |
| `id` | `string` |  |
| `kwh_100km` | `mixed` | Combined electricity use. |
| `l_100km` | `mixed` |  |
| `match` | `string` | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `mixed` |  |
| `range_km` | `mixed` | On a full battery. |
| `range_mi` | `mixed` |  |
| `second_fuel` | `mixed` | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `string` | `epa` or `nrcan`. |
| `source_id` | `mixed` | EPA's id for the rating. |
| `transmission` | `mixed` |  |

#### Example: List

```php
// list() returns an array of VehicleFuel entities, one per record (throws on error).
$vehicle_fuels = $client->VehicleFuel()->list(["id" => "example"]);
```


### VehicleInvestigation

Create an instance: `$vehicle_investigation = $client->VehicleInvestigation();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | NHTSA's action number. |
| `campaigns` | `array` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `mixed` | The day it was closed. |
| `component` | `mixed` | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `string` |  |
| `kind` | `string` | The letters the number starts with. |
| `kind_name` | `mixed` | The kind in words. |
| `manufacturer` | `mixed` | The manufacturers it names, separated by `; `. |
| `match` | `mixed` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `array` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `mixed` | The day it was opened. |
| `subject` | `mixed` | NHTSA's one-line subject. |
| `summary` | `mixed` | NHTSA's summary. |

#### Example: List

```php
// list() returns an array of VehicleInvestigation entities, one per record (throws on error).
$vehicle_investigations = $client->VehicleInvestigation()->list(["id" => "example"]);
```


### VehicleLabor

Create an instance: `$vehicle_labor = $client->VehicleLabor();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `mixed` | The newest day an estimate was changed. |
| `attribution` | `array` |  |
| `basis` | `string` | `expert`: written by a person who does the work. |
| `class` | `mixed` | The class, for a class-scope figure. |
| `class_name` | `mixed` |  |
| `engine` | `mixed` | The engine the vehicle id named, as an id form. |
| `estimates` | `array` | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `array` | Hours, as numbers of hours. |
| `id` | `string` |  |
| `job` | `string` | The job's id. |
| `name` | `string` |  |
| `note` | `string` | "An estimate, not a quote. |
| `notes` | `mixed` |  |
| `sample` | `mixed` |  |
| `scope` | `string` | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `string` | The day the figure was last changed. |
| `url` | `string` | The job's page on this site. |
| `vehicle` | `array` | The model year an answer is about. |
| `years` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VehicleLabor record (throws on error).
$vehicle_labor = $client->VehicleLabor()->load(["id" => "vehicle_labor_id", "vehicle_id" => "vehicle_id"]);
```

#### Example: List

```php
// list() returns an array of VehicleLabor entities, one per record (throws on error).
$vehicle_labors = $client->VehicleLabor()->list(["id" => "example"]);
```


### VehicleRecall

Create an instance: `$vehicle_recall = $client->VehicleRecall();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_from` | `mixed` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `mixed` |  |
| `campaign` | `string` | The publisher's campaign number. |
| `component` | `mixed` | The component, as the source words it. |
| `country` | `string` | `us` or `ca`. |
| `date` | `mixed` | The day the campaign was reported. |
| `do_not_drive` | `mixed` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `string` |  |
| `manufacturer` | `mixed` |  |
| `match` | `mixed` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `mixed` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `array` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `mixed` | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `mixed` | NHTSA's advisory to park outside, away from buildings. |
| `source` | `string` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `mixed` | What is wrong, in the source's words. |
| `units` | `mixed` | Units potentially affected. |
| `url` | `string` | The campaign's page on this site. |

#### Example: List

```php
// list() returns an array of VehicleRecall entities, one per record (throws on error).
$vehicle_recalls = $client->VehicleRecall()->list(["id" => "example"]);
```


### VehicleSafety

Create an instance: `$vehicle_safety = $client->VehicleSafety();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body_style` | `mixed` |  |
| `curb_weight_kg` | `mixed` | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `mixed` |  |
| `description` | `string` | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `mixed` |  |
| `features` | `array` | The safety features NHTSA lists with a rating. |
| `id` | `string` |  |
| `match` | `string` | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `string` | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `array` | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `int` | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `mixed` | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `mixed` | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `array` | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `mixed` |  |

#### Example: List

```php
// list() returns an array of VehicleSafety entities, one per record (throws on error).
$vehicle_safetys = $client->VehicleSafety()->list(["id" => "example"]);
```


### VehicleSpec

Create an instance: `$vehicle_spec = $client->VehicleSpec();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `battery_type` | `mixed` |  |
| `battery_voltage` | `mixed` |  |
| `confidence` | `string` | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `mixed` |  |
| `cylinder_deactivation_name` | `mixed` | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `string` |  |
| `drive` | `mixed` |  |
| `electrification` | `mixed` | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `array` |  |
| `engine` | `mixed` |  |
| `ev_motor` | `mixed` |  |
| `exhaust_valves` | `mixed` |  |
| `fuel_grade` | `string` |  |
| `fuel_usage` | `mixed` | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `mixed` |  |
| `id` | `string` |  |
| `intake_valves` | `mixed` | Per cylinder. |
| `luggage_volume_ft3` | `mixed` |  |
| `luggage_volume_l` | `mixed` |  |
| `motor_kw` | `mixed` | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `mixed` |  |
| `passenger_volume_l` | `mixed` |  |
| `size_class` | `string` |  |
| `source` | `string` |  |
| `source_id` | `string` |  |
| `start_stop` | `mixed` |  |
| `supercharger` | `bool` |  |
| `transmission` | `mixed` |  |
| `transmission_type` | `mixed` |  |
| `turbo` | `bool` |  |
| `variable_valve_lift` | `mixed` |  |
| `variable_valve_timing` | `mixed` |  |

#### Example: List

```php
// list() returns an array of VehicleSpec entities, one per record (throws on error).
$vehicle_specs = $client->VehicleSpec()->list(["id" => "example"]);
```


### VehicleTire

Create an instance: `$vehicle_tire = $client->VehicleTire();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bolt_pattern` | `mixed` |  |
| `checked` | `string` |  |
| `id` | `string` |  |
| `lug_torque_lbft` | `mixed` |  |
| `lug_torque_nm` | `mixed` |  |
| `lug_torque_written_in` | `mixed` | `nm` or `lbft`. |
| `market` | `mixed` |  |
| `pressure_kpa` | `mixed` |  |
| `pressure_psi` | `mixed` |  |
| `pressure_written_in` | `mixed` | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `string` | The size as printed. |
| `size_rear` | `mixed` | The rear size, only when it differs from the front. |
| `source` | `string` |  |
| `trims` | `array` | The trims the document ties the size to, as it names them. |

#### Example: List

```php
// list() returns an array of VehicleTire entities, one per record (throws on error).
$vehicle_tires = $client->VehicleTire()->list(["id" => "example"]);
```


### Vin

Create an instance: `$vin = $client->Vin();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_price_usd` | `mixed` | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `mixed` |  |
| `catalog` | `mixed` |  |
| `check_digit` | `array` |  |
| `doors` | `mixed` |  |
| `drivetrain` | `mixed` |  |
| `engine` | `mixed` |  |
| `gvwr` | `mixed` | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `string` |  |
| `make` | `mixed` |  |
| `manufacturer` | `array` |  |
| `model` | `mixed` |  |
| `plant` | `array` | Where the vehicle was built. |
| `recalls` | `mixed` |  |
| `safety` | `mixed` |  |
| `seat_rows` | `mixed` |  |
| `seats` | `mixed` |  |
| `series` | `mixed` |  |
| `transmission` | `mixed` |  |
| `transmission_speeds` | `mixed` |  |
| `trim` | `mixed` |  |
| `valid` | `bool` | Whether the check digit, position 9, is right. |
| `vin` | `string` |  |
| `warnings` | `array` | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `mixed` | Front wheel diameter in inches. |
| `wheel_size_rear` | `mixed` | Rear wheel diameter in inches. |
| `year` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Vin record (throws on error).
$vin = $client->Vin()->load(["id" => "vin_id"]);
```


### VinBulletin

Create an instance: `$vin_bulletin = $client->VinBulletin();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `mixed` |  |
| `attribution` | `array` |  |
| `bulletins` | `array` |  |
| `counts` | `array` | What the bulletins of one model year are, in numbers. |
| `decode` | `array` | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` |  |
| `next_cursor` | `mixed` |  |
| `note` | `string` |  |
| `vehicle` | `mixed` |  |
| `warnings` | `array` |  |

#### Example: List

```php
// list() returns an array of VinBulletin entities, one per record (throws on error).
$vin_bulletins = $client->VinBulletin()->list(["id" => "example"]);
```


### VinFluid

Create an instance: `$vin_fluid = $client->VinFluid();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `mixed` |  |
| `attribution` | `array` |  |
| `brake` | `array` |  |
| `checked_as_of` | `mixed` |  |
| `coolant` | `array` |  |
| `decode` | `array` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `mixed` |  |
| `engine_oil` | `array` |  |
| `engine_oil_checked` | `array` | Narrowed as `engine_oil` is. |
| `engine_settled` | `bool` | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `string` |  |
| `refrigerant` | `array` |  |
| `transmission` | `array` |  |
| `vehicle` | `mixed` |  |
| `warnings` | `array` |  |

#### Example: List

```php
// list() returns an array of VinFluid entities, one per record (throws on error).
$vin_fluids = $client->VinFluid()->list(["id" => "example"]);
```


### VinFuel

Create an instance: `$vin_fuel = $client->VinFuel();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `array` | The day each country's fuel ratings were current. |
| `attribution` | `array` |  |
| `decode` | `array` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `mixed` |  |
| `engine_settled` | `bool` | Whether `ratings` is narrowed to `engine`. |
| `id` | `string` |  |
| `ratings` | `array` |  |
| `vehicle` | `mixed` |  |
| `warnings` | `array` |  |

#### Example: List

```php
// list() returns an array of VinFuel entities, one per record (throws on error).
$vin_fuels = $client->VinFuel()->list(["id" => "example"]);
```


### VinLabor

Create an instance: `$vin_labor = $client->VinLabor();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `mixed` |  |
| `attribution` | `array` |  |
| `class` | `mixed` |  |
| `decode` | `array` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `mixed` |  |
| `estimates` | `array` |  |
| `id` | `string` |  |
| `note` | `string` |  |
| `vehicle` | `mixed` |  |
| `warnings` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the VinLabor record (throws on error).
$vin_labor = $client->VinLabor()->load(["id" => "vin_labor_id", "vin_id" => "vin_id"]);
```

#### Example: List

```php
// list() returns an array of VinLabor entities, one per record (throws on error).
$vin_labors = $client->VinLabor()->list(["id" => "example"]);
```


### VinRecall

Create an instance: `$vin_recall = $client->VinRecall();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `array` | The day each country's recall data was current. |
| `attribution` | `array` |  |
| `decode` | `array` | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` |  |
| `lookup` | `array` | Where to check one vehicle for open recalls. |
| `may_apply` | `bool` | Always `true`. |
| `recalls` | `array` |  |
| `vehicle` | `mixed` |  |
| `warnings` | `array` | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

#### Example: List

```php
// list() returns an array of VinRecall entities, one per record (throws on error).
$vin_recalls = $client->VinRecall()->list(["id" => "example"]);
```


### VinSpec

Create an instance: `$vin_spec = $client->VinSpec();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `mixed` |  |
| `attribution` | `array` |  |
| `decode` | `array` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `mixed` |  |
| `engine_settled` | `bool` | Whether `specs` is narrowed to `engine`. |
| `id` | `string` |  |
| `specs` | `array` |  |
| `vehicle` | `mixed` |  |
| `warnings` | `array` |  |

#### Example: List

```php
// list() returns an array of VinSpec entities, one per record (throws on error).
$vin_specs = $client->VinSpec()->list(["id" => "example"]);
```


### VinTire

Create an instance: `$vin_tire = $client->VinTire();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `mixed` |  |
| `attribution` | `array` |  |
| `decode` | `array` | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `array` | Every fitment of the model year. |
| `id` | `string` |  |
| `vehicle` | `mixed` |  |
| `warnings` | `array` |  |

#### Example: List

```php
// list() returns an array of VinTire entities, one per record (throws on error).
$vin_tires = $client->VinTire()->list(["id" => "example"]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── wenmarvin_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`wenmarvin_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$entry = $client->Entry();
$entry->list(["q" => "example"]);

// $entry->data_get() now returns the entry data from the last list
// $entry->match_get() returns the last match criteria
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
