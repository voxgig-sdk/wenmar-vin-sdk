# WenmarVin Golang SDK



The Golang SDK for the WenmarVin API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Batch(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/wenmar-vin-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/wenmar-vin-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/wenmar-vin-sdk/go=../wenmar-vin-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/wenmar-vin-sdk/go"
)

func main() {
    client := sdk.New()

    // Create a batch.
    created, err := client.Batch(nil).Create(map[string]any{"vins": []any{}}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
entrys, err := client.Entry(nil).List(map[string]any{"q": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = entrys
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

entrys, err := client.Entry(nil).List(
    map[string]any{"q": "example"}, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range entrys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewWenmarVinSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewWenmarVinSDK

```go
func NewWenmarVinSDK(options map[string]any) *WenmarVinSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *WenmarVinSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### WenmarVinSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Batch` | `(data map[string]any) WenmarVinEntity` | Create a Batch entity instance. |
| `Bulletin` | `(data map[string]any) WenmarVinEntity` | Create a Bulletin entity instance. |
| `Code` | `(data map[string]any) WenmarVinEntity` | Create a Code entity instance. |
| `Data` | `(data map[string]any) WenmarVinEntity` | Create a Data entity instance. |
| `Engine` | `(data map[string]any) WenmarVinEntity` | Create an Engine entity instance. |
| `Entry` | `(data map[string]any) WenmarVinEntity` | Create an Entry entity instance. |
| `Job` | `(data map[string]any) WenmarVinEntity` | Create a Job entity instance. |
| `Make` | `(data map[string]any) WenmarVinEntity` | Create a Make entity instance. |
| `Model` | `(data map[string]any) WenmarVinEntity` | Create a Model entity instance. |
| `Overview` | `(data map[string]any) WenmarVinEntity` | Create an Overview entity instance. |
| `PartsCard` | `(data map[string]any) WenmarVinEntity` | Create a PartsCard entity instance. |
| `PayrollDeduction` | `(data map[string]any) WenmarVinEntity` | Create a PayrollDeduction entity instance. |
| `Recall` | `(data map[string]any) WenmarVinEntity` | Create a Recall entity instance. |
| `RecallInvestigation` | `(data map[string]any) WenmarVinEntity` | Create a RecallInvestigation entity instance. |
| `Recent` | `(data map[string]any) WenmarVinEntity` | Create a Recent entity instance. |
| `Submodel` | `(data map[string]any) WenmarVinEntity` | Create a Submodel entity instance. |
| `Vehicle` | `(data map[string]any) WenmarVinEntity` | Create a Vehicle entity instance. |
| `VehicleBulletin` | `(data map[string]any) WenmarVinEntity` | Create a VehicleBulletin entity instance. |
| `VehicleCode` | `(data map[string]any) WenmarVinEntity` | Create a VehicleCode entity instance. |
| `VehicleComplaint` | `(data map[string]any) WenmarVinEntity` | Create a VehicleComplaint entity instance. |
| `VehicleFluid` | `(data map[string]any) WenmarVinEntity` | Create a VehicleFluid entity instance. |
| `VehicleFuel` | `(data map[string]any) WenmarVinEntity` | Create a VehicleFuel entity instance. |
| `VehicleInvestigation` | `(data map[string]any) WenmarVinEntity` | Create a VehicleInvestigation entity instance. |
| `VehicleLabor` | `(data map[string]any) WenmarVinEntity` | Create a VehicleLabor entity instance. |
| `VehicleRecall` | `(data map[string]any) WenmarVinEntity` | Create a VehicleRecall entity instance. |
| `VehicleSafety` | `(data map[string]any) WenmarVinEntity` | Create a VehicleSafety entity instance. |
| `VehicleSpec` | `(data map[string]any) WenmarVinEntity` | Create a VehicleSpec entity instance. |
| `VehicleTire` | `(data map[string]any) WenmarVinEntity` | Create a VehicleTire entity instance. |
| `Vin` | `(data map[string]any) WenmarVinEntity` | Create a Vin entity instance. |
| `VinBulletin` | `(data map[string]any) WenmarVinEntity` | Create a VinBulletin entity instance. |
| `VinFluid` | `(data map[string]any) WenmarVinEntity` | Create a VinFluid entity instance. |
| `VinFuel` | `(data map[string]any) WenmarVinEntity` | Create a VinFuel entity instance. |
| `VinLabor` | `(data map[string]any) WenmarVinEntity` | Create a VinLabor entity instance. |
| `VinRecall` | `(data map[string]any) WenmarVinEntity` | Create a VinRecall entity instance. |
| `VinSpec` | `(data map[string]any) WenmarVinEntity` | Create a VinSpec entity instance. |
| `VinTire` | `(data map[string]any) WenmarVinEntity` | Create a VinTire entity instance. |

### Entity interface (WenmarVinEntity)

All entities implement the `WenmarVinEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    batch, err := client.Batch(nil).Create(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // batch is the entity; batch.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Batch

| Field | Description |
| --- | --- |
| `"vins"` | At most 50 VINs. |

Operations: Create.

API path: `/v1/vin/batch`

#### Bulletin

| Field | Description |
| --- | --- |
| `"as_of"` |  |
| `"attribution"` |  |
| `"codes"` | The trouble codes the summary names. |
| `"component"` | NHTSA's components, in its words, separated by `; `. |
| `"components"` | The components it is about, systems first. |
| `"date"` | The manufacturer's own date. |
| `"date_added"` | The day NHTSA published it. |
| `"document"` |  |
| `"document_id"` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `"id"` |  |
| `"mfr_campaign"` | The manufacturer's campaign id or software version. |
| `"mfr_system"` | The manufacturer's own words for the system. |
| `"nhtsa_id"` | NHTSA's id number for the communication. |
| `"note"` |  |
| `"replaces"` | The number of the bulletin this one replaces. |
| `"summary"` | NHTSA's summary of the communication. |
| `"topics"` |  |
| `"type"` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `"type_name"` | The type in words. |
| `"url"` | The bulletin's page on this site. |
| `"vehicles"` |  |

Operations: List, Load.

API path: `/v1/bulletins`

#### Code

| Field | Description |
| --- | --- |
| `"attribution"` | The credit lines the data's licences ask for. |
| `"checked"` | The day it was approved. |
| `"checks"` | What a technician usually verifies first. |
| `"code"` |  |
| `"common_causes"` | General causes, not about one make. |
| `"components"` |  |
| `"generic"` | Always `true` here: only codes every maker uses the same way are described. |
| `"id"` |  |
| `"meaning"` | What the code tells a service advisor. |
| `"note"` | What a description is and is not. |
| `"related"` | Related codes that are described too. |
| `"reviewer"` | The GitHub name of the person who approved the text. |
| `"system"` | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `"system_name"` |  |
| `"title"` |  |
| `"url"` | The code's page on this site. |

Operations: List, Load.

API path: `/v1/codes`

#### Data

| Field | Description |
| --- | --- |
| `"built_at"` | When the data file was built, in UTC. |
| `"data_version"` | The data release, such as `2026.09`. |
| `"datasets"` | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `"server_version"` | The version of the server. |
| `"vpic_release"` | The NHTSA vPIC release the data was built from. |

Operations: Load.

API path: `/v1/meta`

#### Engine

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"label"` |  |
| `"preset"` | Whether the engine comes from this project's list instead of NHTSA. |
| `"vin8"` | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

Operations: List.

API path: `/v1/vehicles/engines`

#### Entry

| Field | Description |
| --- | --- |
| `"body"` |  |
| `"drive"` |  |
| `"engine"` |  |
| `"id"` | The stable id. |
| `"make"` |  |
| `"model"` |  |
| `"submodel"` |  |
| `"summary"` | One line naming everything above that is known. |
| `"transmission"` |  |
| `"vehicle_types"` | NHTSA's vehicle types for this model year, such as `Truck`. |
| `"year"` |  |

Operations: List, Load.

API path: `/v1/vehicles/search`

#### Job

| Field | Description |
| --- | --- |
| `"attribution"` | The credit the labour estimates ask for. |
| `"components"` |  |
| `"estimates"` | The job's class-scope figures. |
| `"excludes"` | Work often done at the same visit that is not part of this job. |
| `"id"` | The job's id. |
| `"includes"` | The work the job covers. |
| `"name"` |  |
| `"note"` | What an estimate is not. |
| `"related"` |  |
| `"system"` | The id of the system the job belongs to. |
| `"system_name"` |  |
| `"url"` | The job's page on this site. |

Operations: List, Load.

API path: `/v1/jobs`

#### Make

| Field | Description |
| --- | --- |
| `"id"` | The make's id form. |
| `"links"` |  |
| `"name"` |  |
| `"popular"` | Whether it is on the list of popular makes. |

Operations: List, Load.

API path: `/v1/vehicles/makes`

#### Model

| Field | Description |
| --- | --- |
| `"as_of"` | The day each country's recall data was current. |
| `"attribution"` |  |
| `"id"` | The model's id form. |
| `"lookup"` | Where to check one vehicle for open recalls. |
| `"make"` | A make or a model: its id form and its name. |
| `"may_apply"` | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `"model"` | A make or a model: its id form and its name. |
| `"name"` |  |
| `"year_from"` | The first and last model year the model exists in. |
| `"year_to"` |  |
| `"years"` |  |

Operations: List, Load.

API path: `/v1/vehicles/models`

#### Overview

| Field | Description |
| --- | --- |
| `"code"` | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `"message"` |  |
| `"suggestions"` | VINs the caller may have meant. |

Operations: List.

API path: `/v1/vehicles/{id}/overview`

#### PartsCard

| Field | Description |
| --- | --- |
| `"attribution"` |  |
| `"engine_settled"` | Whether the decode settled one catalog engine. |
| `"lines"` |  |
| `"text"` | The lines as plain text, one `Label: value` each. |
| `"vehicle"` |  |
| `"vin"` |  |
| `"warnings"` |  |

Operations: List.

API path: `/v1/vin/{vin}/parts-card`

#### PayrollDeduction

| Field | Description |
| --- | --- |
| `"meaning"` | What the factor means. |
| `"name"` | The name the engine gives the factor. |
| `"value"` | The value used, after rounding. |

Operations: List.

API path: `/v1/payroll/deductions`

#### Recall

| Field | Description |
| --- | --- |
| `"as_of"` | The day this publisher's data was current. |
| `"attribution"` |  |
| `"built_from"` | In an answer about one model year: the first and last build date the campaign gives. |
| `"built_to"` |  |
| `"campaign"` | The publisher's campaign number. |
| `"completion"` |  |
| `"component"` | The component, as the source words it. |
| `"consequence"` |  |
| `"country"` | `us` or `ca`. |
| `"date"` | The day the campaign was reported. |
| `"do_not_drive"` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `"french"` |  |
| `"id"` |  |
| `"lookup"` | Where to check one vehicle for open recalls. |
| `"manufacturer"` |  |
| `"match"` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `"may_apply"` | Always `true`: the campaign may apply to a vehicle it lists. |
| `"mfr_campaign"` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `"models"` | In an answer about one model year: the model names the campaign lists that reached it. |
| `"notes"` |  |
| `"notification"` | Transport Canada's notification type, such as `Safety Mfr`. |
| `"owner_notified"` | The day owners were notified. |
| `"park_outside"` | NHTSA's advisory to park outside, away from buildings. |
| `"part_number"` | The manufacturer's part numbers, separated by commas. |
| `"remedy"` |  |
| `"source"` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `"summary"` | What is wrong, in the source's words. |
| `"units"` | Units potentially affected. |
| `"url"` | The campaign's page on this site. |
| `"vehicles"` | Every vehicle the campaign lists, by make, model and year. |

Operations: List, Load.

API path: `/v1/recalls`

#### RecallInvestigation

| Field | Description |
| --- | --- |
| `"action"` | NHTSA's action number. |
| `"campaigns"` | The recall campaigns it led to, as NHTSA numbers them. |
| `"closed"` | The day it was closed. |
| `"component"` | The components it names, as NHTSA words them, separated by `; `. |
| `"kind"` | The letters the number starts with. |
| `"kind_name"` | The kind in words. |
| `"manufacturer"` | The manufacturers it names, separated by `; `. |
| `"match"` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `"models"` | In an answer about one model year: the model names the investigation lists that reached it. |
| `"open"` | Whether it was opened in 2010 or later and has no day closed. |
| `"opened"` | The day it was opened. |
| `"subject"` | NHTSA's one-line subject. |
| `"summary"` | NHTSA's summary. |

Operations: List.

API path: `/v1/recalls/{source}/{campaign}/investigations`

#### Recent

| Field | Description |
| --- | --- |
| `"recall"` | One recall campaign in a list. |
| `"vehicles"` | The vehicles the campaign lists: at most 200 of them. |
| `"vehicles_listed"` | How many vehicles the campaign lists in all. |

Operations: List.

API path: `/v1/recalls/recent`

#### Submodel

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"kind"` | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `"name"` |  |

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
| `"component"` | NHTSA's components, in its words, separated by `; `. |
| `"date"` | The manufacturer's own date. |
| `"date_added"` | The day NHTSA published it. |
| `"document"` |  |
| `"document_id"` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `"id"` |  |
| `"mfr_campaign"` | The manufacturer's campaign id or software version. |
| `"nhtsa_id"` | NHTSA's id number for the communication. |
| `"summary"` | NHTSA's summary of the communication. |
| `"type"` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `"type_name"` | The type in words. |
| `"url"` | The bulletin's page on this site. |

Operations: List.

API path: `/v1/vehicles/{id}/bulletins`

#### VehicleCode

| Field | Description |
| --- | --- |
| `"attribution"` |  |
| `"bulletins"` |  |
| `"code"` |  |
| `"description"` |  |
| `"generic"` | Whether every maker uses the code the same way. |
| `"id"` |  |
| `"note"` |  |
| `"related"` | What else is held for the model year about the components a code concerns. |
| `"url"` | The page of this code on this model year. |
| `"vehicle"` | The model year an answer is about. |

Operations: Load.

API path: `/v1/vehicles/{id}/codes/{code}`

#### VehicleComplaint

| Field | Description |
| --- | --- |
| `"complaints"` |  |
| `"crashes"` | Complaints that report a crash. |
| `"fires"` | Complaints that report a fire. |
| `"id"` | A component id, such as `steering` or `brake-pad`. |
| `"injuries"` | Complaints that report at least one person injured. |
| `"median_km"` | The median of the mileages owners gave, in kilometres. |
| `"median_miles"` | The same in miles, as NHTSA records it. |
| `"name"` |  |
| `"parent"` | The system a part belongs to. |

Operations: List.

API path: `/v1/vehicles/{id}/complaints`

#### VehicleFluid

| Field | Description |
| --- | --- |
| `"as_of"` | The day EPA's oil grades were current. |
| `"attribution"` |  |
| `"brake"` |  |
| `"checked_as_of"` | The day of the newest hand-read record the server holds, for any vehicle. |
| `"coolant"` |  |
| `"engine_oil"` |  |
| `"engine_oil_checked"` |  |
| `"id"` |  |
| `"refrigerant"` |  |
| `"transmission"` |  |
| `"vehicle"` | The model year an answer is about. |

Operations: List.

API path: `/v1/vehicles/{id}/fluids`

#### VehicleFuel

| Field | Description |
| --- | --- |
| `"co2_g_km"` | Tailpipe carbon dioxide, combined. |
| `"confidence"` | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `"country"` | `us` or `ca`. |
| `"cylinders"` |  |
| `"described_as"` | The source's own name for the vehicle rated. |
| `"displacement_l"` |  |
| `"drive"` |  |
| `"engine"` |  |
| `"fuel_grade"` | The fuel the figures are for, which is the recommended grade. |
| `"id"` |  |
| `"kwh_100km"` | Combined electricity use. |
| `"l_100km"` |  |
| `"match"` | How the model was found: `exact`, `base` or `curated`. |
| `"mpg"` |  |
| `"range_km"` | On a full battery. |
| `"range_mi"` |  |
| `"second_fuel"` | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `"source"` | `epa` or `nrcan`. |
| `"source_id"` | EPA's id for the rating. |
| `"transmission"` |  |

Operations: List.

API path: `/v1/vehicles/{id}/fuel`

#### VehicleInvestigation

| Field | Description |
| --- | --- |
| `"action"` | NHTSA's action number. |
| `"campaigns"` | The recall campaigns it led to, as NHTSA numbers them. |
| `"closed"` | The day it was closed. |
| `"component"` | The components it names, as NHTSA words them, separated by `; `. |
| `"id"` |  |
| `"kind"` | The letters the number starts with. |
| `"kind_name"` | The kind in words. |
| `"manufacturer"` | The manufacturers it names, separated by `; `. |
| `"match"` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `"models"` | In an answer about one model year: the model names the investigation lists that reached it. |
| `"open"` | Whether it was opened in 2010 or later and has no day closed. |
| `"opened"` | The day it was opened. |
| `"subject"` | NHTSA's one-line subject. |
| `"summary"` | NHTSA's summary. |

Operations: List.

API path: `/v1/vehicles/{id}/investigations`

#### VehicleLabor

| Field | Description |
| --- | --- |
| `"as_of"` | The newest day an estimate was changed. |
| `"attribution"` |  |
| `"basis"` | `expert`: written by a person who does the work. |
| `"class"` | The class, for a class-scope figure. |
| `"class_name"` |  |
| `"engine"` | The engine the vehicle id named, as an id form. |
| `"estimates"` | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `"hours"` | Hours, as numbers of hours. |
| `"id"` |  |
| `"job"` | The job's id. |
| `"name"` |  |
| `"note"` | "An estimate, not a quote. |
| `"notes"` |  |
| `"sample"` |  |
| `"scope"` | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `"updated"` | The day the figure was last changed. |
| `"url"` | The job's page on this site. |
| `"vehicle"` | The model year an answer is about. |
| `"years"` |  |

Operations: List, Load.

API path: `/v1/vehicles/{id}/labor`

#### VehicleRecall

| Field | Description |
| --- | --- |
| `"built_from"` | In an answer about one model year: the first and last build date the campaign gives. |
| `"built_to"` |  |
| `"campaign"` | The publisher's campaign number. |
| `"component"` | The component, as the source words it. |
| `"country"` | `us` or `ca`. |
| `"date"` | The day the campaign was reported. |
| `"do_not_drive"` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `"id"` |  |
| `"manufacturer"` |  |
| `"match"` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `"mfr_campaign"` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `"models"` | In an answer about one model year: the model names the campaign lists that reached it. |
| `"notification"` | Transport Canada's notification type, such as `Safety Mfr`. |
| `"park_outside"` | NHTSA's advisory to park outside, away from buildings. |
| `"source"` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `"summary"` | What is wrong, in the source's words. |
| `"units"` | Units potentially affected. |
| `"url"` | The campaign's page on this site. |

Operations: List.

API path: `/v1/vehicles/{id}/recalls`

#### VehicleSafety

| Field | Description |
| --- | --- |
| `"body_style"` |  |
| `"curb_weight_kg"` | The weight of the vehicle NHTSA tested. |
| `"curb_weight_lb"` |  |
| `"description"` | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `"drive"` |  |
| `"features"` | The safety features NHTSA lists with a rating. |
| `"id"` |  |
| `"match"` | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `"model"` | The model, body style, vehicle type and drive as NHTSA words them. |
| `"notes"` | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `"release"` | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `"rollover_risk_percent"` | The chance of a rollover in a single-vehicle crash, in percent. |
| `"rollover_tip"` | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `"stars"` | The stars of one rating, each from 1 to 5. |
| `"vehicle_type"` |  |

Operations: List.

API path: `/v1/vehicles/{id}/safety`

#### VehicleSpec

| Field | Description |
| --- | --- |
| `"battery_type"` |  |
| `"battery_voltage"` |  |
| `"confidence"` | `model`, `engine` or `submodel`, as on a fuel rating. |
| `"cylinder_deactivation"` |  |
| `"cylinder_deactivation_name"` | The maker's name for it, such as `Active Fuel Management`. |
| `"described_as"` |  |
| `"drive"` |  |
| `"electrification"` | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `"emission_standards"` |  |
| `"engine"` |  |
| `"ev_motor"` |  |
| `"exhaust_valves"` |  |
| `"fuel_grade"` |  |
| `"fuel_usage"` | Whether the grade is recommended or required, in EPA's words. |
| `"gears"` |  |
| `"id"` |  |
| `"intake_valves"` | Per cylinder. |
| `"luggage_volume_ft3"` |  |
| `"luggage_volume_l"` |  |
| `"motor_kw"` | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `"passenger_volume_ft3"` |  |
| `"passenger_volume_l"` |  |
| `"size_class"` |  |
| `"source"` |  |
| `"source_id"` |  |
| `"start_stop"` |  |
| `"supercharger"` |  |
| `"transmission"` |  |
| `"transmission_type"` |  |
| `"turbo"` |  |
| `"variable_valve_lift"` |  |
| `"variable_valve_timing"` |  |

Operations: List.

API path: `/v1/vehicles/{id}/specs`

#### VehicleTire

| Field | Description |
| --- | --- |
| `"bolt_pattern"` |  |
| `"checked"` |  |
| `"id"` |  |
| `"lug_torque_lbft"` |  |
| `"lug_torque_nm"` |  |
| `"lug_torque_written_in"` | `nm` or `lbft`. |
| `"market"` |  |
| `"pressure_kpa"` |  |
| `"pressure_psi"` |  |
| `"pressure_written_in"` | The unit the document printed: `kpa`, `bar` or `psi`. |
| `"size"` | The size as printed. |
| `"size_rear"` | The rear size, only when it differs from the front. |
| `"source"` |  |
| `"trims"` | The trims the document ties the size to, as it names them. |

Operations: List.

API path: `/v1/vehicles/{id}/tires`

#### Vin

| Field | Description |
| --- | --- |
| `"base_price_usd"` | Manufacturer base price in US dollars, when NHTSA has one. |
| `"body"` |  |
| `"catalog"` |  |
| `"check_digit"` |  |
| `"doors"` |  |
| `"drivetrain"` |  |
| `"engine"` |  |
| `"gvwr"` | Gross vehicle weight rating class, as NHTSA words it. |
| `"id"` |  |
| `"make"` |  |
| `"manufacturer"` |  |
| `"model"` |  |
| `"plant"` | Where the vehicle was built. |
| `"recalls"` |  |
| `"safety"` |  |
| `"seat_rows"` |  |
| `"seats"` |  |
| `"series"` |  |
| `"transmission"` |  |
| `"transmission_speeds"` |  |
| `"trim"` |  |
| `"valid"` | Whether the check digit, position 9, is right. |
| `"vin"` |  |
| `"warnings"` | Things to know about a decode that still succeeded. |
| `"wheel_size_front"` | Front wheel diameter in inches. |
| `"wheel_size_rear"` | Rear wheel diameter in inches. |
| `"year"` |  |

Operations: Load.

API path: `/v1/vin/{vin}`

#### VinBulletin

| Field | Description |
| --- | --- |
| `"as_of"` |  |
| `"attribution"` |  |
| `"bulletins"` |  |
| `"counts"` | What the bulletins of one model year are, in numbers. |
| `"decode"` | What a VIN decoded to, as far as recalls need it. |
| `"id"` |  |
| `"next_cursor"` |  |
| `"note"` |  |
| `"vehicle"` |  |
| `"warnings"` |  |

Operations: List.

API path: `/v1/vin/{vin}/bulletins`

#### VinFluid

| Field | Description |
| --- | --- |
| `"as_of"` |  |
| `"attribution"` |  |
| `"brake"` |  |
| `"checked_as_of"` |  |
| `"coolant"` |  |
| `"decode"` | What a VIN decoded to, as far as recalls need it. |
| `"engine"` |  |
| `"engine_oil"` |  |
| `"engine_oil_checked"` | Narrowed as `engine_oil` is. |
| `"engine_settled"` | Whether `engine_oil` is narrowed to `engine`. |
| `"id"` |  |
| `"refrigerant"` |  |
| `"transmission"` |  |
| `"vehicle"` |  |
| `"warnings"` |  |

Operations: List.

API path: `/v1/vin/{vin}/fluids`

#### VinFuel

| Field | Description |
| --- | --- |
| `"as_of"` | The day each country's fuel ratings were current. |
| `"attribution"` |  |
| `"decode"` | What a VIN decoded to, as far as recalls need it. |
| `"engine"` |  |
| `"engine_settled"` | Whether `ratings` is narrowed to `engine`. |
| `"id"` |  |
| `"ratings"` |  |
| `"vehicle"` |  |
| `"warnings"` |  |

Operations: List.

API path: `/v1/vin/{vin}/fuel`

#### VinLabor

| Field | Description |
| --- | --- |
| `"as_of"` |  |
| `"attribution"` |  |
| `"class"` |  |
| `"decode"` | What a VIN decoded to, as far as recalls need it. |
| `"engine"` |  |
| `"estimates"` |  |
| `"id"` |  |
| `"note"` |  |
| `"vehicle"` |  |
| `"warnings"` |  |

Operations: List, Load.

API path: `/v1/vin/{vin}/labor`

#### VinRecall

| Field | Description |
| --- | --- |
| `"as_of"` | The day each country's recall data was current. |
| `"attribution"` |  |
| `"decode"` | What a VIN decoded to, as far as recalls need it. |
| `"id"` |  |
| `"lookup"` | Where to check one vehicle for open recalls. |
| `"may_apply"` | Always `true`. |
| `"recalls"` |  |
| `"vehicle"` |  |
| `"warnings"` | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

Operations: List.

API path: `/v1/vin/{vin}/recalls`

#### VinSpec

| Field | Description |
| --- | --- |
| `"as_of"` |  |
| `"attribution"` |  |
| `"decode"` | What a VIN decoded to, as far as recalls need it. |
| `"engine"` |  |
| `"engine_settled"` | Whether `specs` is narrowed to `engine`. |
| `"id"` |  |
| `"specs"` |  |
| `"vehicle"` |  |
| `"warnings"` |  |

Operations: List.

API path: `/v1/vin/{vin}/specs`

#### VinTire

| Field | Description |
| --- | --- |
| `"as_of"` |  |
| `"attribution"` |  |
| `"decode"` | What a VIN decoded to, as far as recalls need it. |
| `"fitments"` | Every fitment of the model year. |
| `"id"` |  |
| `"vehicle"` |  |
| `"warnings"` |  |

Operations: List.

API path: `/v1/vin/{vin}/tires`



## Entities


### Batch

Create an instance: `batch := client.Batch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `vins` | `[]any` | At most 50 VINs. |

#### Example: Create

```go
result, err := client.Batch(nil).Create(map[string]any{
    "vins": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Bulletin

Create an instance: `bulletin := client.Bulletin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `any` |  |
| `attribution` | `[]any` |  |
| `codes` | `[]any` | The trouble codes the summary names. |
| `component` | `any` | NHTSA's components, in its words, separated by `; `. |
| `components` | `[]any` | The components it is about, systems first. |
| `date` | `any` | The manufacturer's own date. |
| `date_added` | `string` | The day NHTSA published it. |
| `document` | `any` |  |
| `document_id` | `any` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` |  |
| `mfr_campaign` | `any` | The manufacturer's campaign id or software version. |
| `mfr_system` | `any` | The manufacturer's own words for the system. |
| `nhtsa_id` | `int` | NHTSA's id number for the communication. |
| `note` | `string` |  |
| `replaces` | `any` | The number of the bulletin this one replaces. |
| `summary` | `any` | NHTSA's summary of the communication. |
| `topics` | `[]any` |  |
| `type` | `string` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | The type in words. |
| `url` | `string` | The bulletin's page on this site. |
| `vehicles` | `[]any` |  |

#### Example: Load

```go
bulletin, err := client.Bulletin(nil).Load(map[string]any{"id": "bulletin_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bulletin.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
bulletins, err := client.Bulletin(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range bulletins.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Code

Create an instance: `code := client.Code(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `[]any` | The credit lines the data's licences ask for. |
| `checked` | `string` | The day it was approved. |
| `checks` | `[]any` | What a technician usually verifies first. |
| `code` | `string` |  |
| `common_causes` | `[]any` | General causes, not about one make. |
| `components` | `[]any` |  |
| `generic` | `bool` | Always `true` here: only codes every maker uses the same way are described. |
| `id` | `string` |  |
| `meaning` | `string` | What the code tells a service advisor. |
| `note` | `string` | What a description is and is not. |
| `related` | `[]any` | Related codes that are described too. |
| `reviewer` | `string` | The GitHub name of the person who approved the text. |
| `system` | `string` | Where the index lists it: a group (`powertrain`, `body`, `chassis`, `network`), or a group and an area of it. |
| `system_name` | `string` |  |
| `title` | `string` |  |
| `url` | `string` | The code's page on this site. |

#### Example: Load

```go
code, err := client.Code(nil).Load(map[string]any{"id": "code_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(code.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
codes, err := client.Code(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range codes.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Data

Create an instance: `data := client.Data(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_at` | `string` | When the data file was built, in UTC. |
| `data_version` | `string` | The data release, such as `2026.09`. |
| `datasets` | `map[string]any` | The datasets served beside the catalog, such as `recalls_us`, by id. |
| `server_version` | `string` | The version of the server. |
| `vpic_release` | `string` | The NHTSA vPIC release the data was built from. |

#### Example: Load

```go
data, err := client.Data(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(data.(sdk.Entity).Data()) // the loaded entity's record
```


### Engine

Create an instance: `engine := client.Engine(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `label` | `string` |  |
| `preset` | `bool` | Whether the engine comes from this project's list instead of NHTSA. |
| `vin8` | `any` | The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it. |

#### Example: List

```go
engines, err := client.Engine(nil).List(map[string]any{"make": "example", "model": "example", "year": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range engines.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Entry

Create an instance: `entry := client.Entry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `any` |  |
| `drive` | `any` |  |
| `engine` | `any` |  |
| `id` | `string` | The stable id. |
| `make` | `string` |  |
| `model` | `string` |  |
| `submodel` | `any` |  |
| `summary` | `string` | One line naming everything above that is known. |
| `transmission` | `any` |  |
| `vehicle_types` | `[]any` | NHTSA's vehicle types for this model year, such as `Truck`. |
| `year` | `int` |  |

#### Example: Load

```go
entry, err := client.Entry(nil).Load(map[string]any{"id": "entry_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(entry.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
entrys, err := client.Entry(nil).List(map[string]any{"q": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range entrys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Job

Create an instance: `job := client.Job(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `[]any` | The credit the labour estimates ask for. |
| `components` | `[]any` |  |
| `estimates` | `any` | The job's class-scope figures. |
| `excludes` | `[]any` | Work often done at the same visit that is not part of this job. |
| `id` | `string` | The job's id. |
| `includes` | `[]any` | The work the job covers. |
| `name` | `string` |  |
| `note` | `string` | What an estimate is not. |
| `related` | `[]any` |  |
| `system` | `string` | The id of the system the job belongs to. |
| `system_name` | `string` |  |
| `url` | `string` | The job's page on this site. |

#### Example: Load

```go
job, err := client.Job(nil).Load(map[string]any{"id": "job_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(job.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
jobs, err := client.Job(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range jobs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Make

Create an instance: `make := client.Make(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | The make's id form. |
| `links` | `any` |  |
| `name` | `string` |  |
| `popular` | `bool` | Whether it is on the list of popular makes. |

#### Example: Load

```go
make, err := client.Make(nil).Load(map[string]any{"id": "make_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(make.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
makes, err := client.Make(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range makes.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Model

Create an instance: `model := client.Model(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `map[string]any` | The day each country's recall data was current. |
| `attribution` | `[]any` |  |
| `id` | `string` | The model's id form. |
| `lookup` | `map[string]any` | Where to check one vehicle for open recalls. |
| `make` | `map[string]any` | A make or a model: its id form and its name. |
| `may_apply` | `bool` | Always `true`: a recall count is of campaigns that may apply to the model year. |
| `model` | `map[string]any` | A make or a model: its id form and its name. |
| `name` | `string` |  |
| `year_from` | `int` | The first and last model year the model exists in. |
| `year_to` | `int` |  |
| `years` | `[]any` |  |

#### Example: Load

```go
model, err := client.Model(nil).Load(map[string]any{"make": "make", "model": "model"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(model.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
models, err := client.Model(nil).List(map[string]any{"make": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range models.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Overview

Create an instance: `overview := client.Overview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. |
| `message` | `string` |  |
| `suggestions` | `[]any` | VINs the caller may have meant. |

#### Example: List

```go
overviews, err := client.Overview(nil).List(map[string]any{"vehicle_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range overviews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PartsCard

Create an instance: `partsCard := client.PartsCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `[]any` |  |
| `engine_settled` | `bool` | Whether the decode settled one catalog engine. |
| `lines` | `[]any` |  |
| `text` | `string` | The lines as plain text, one `Label: value` each. |
| `vehicle` | `any` |  |
| `vin` | `string` |  |
| `warnings` | `[]any` |  |

#### Example: List

```go
partsCards, err := client.PartsCard(nil).List(map[string]any{"vin_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range partsCards.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PayrollDeduction

Create an instance: `payrollDeduction := client.PayrollDeduction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meaning` | `string` | What the factor means. |
| `name` | `string` | The name the engine gives the factor. |
| `value` | `float64` | The value used, after rounding. |

#### Example: List

```go
payrollDeductions, err := client.PayrollDeduction(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range payrollDeductions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Recall

Create an instance: `recall := client.Recall(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `any` | The day this publisher's data was current. |
| `attribution` | `[]any` |  |
| `built_from` | `any` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `any` |  |
| `campaign` | `string` | The publisher's campaign number. |
| `completion` | `any` |  |
| `component` | `any` | The component, as the source words it. |
| `consequence` | `any` |  |
| `country` | `string` | `us` or `ca`. |
| `date` | `any` | The day the campaign was reported. |
| `do_not_drive` | `any` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `french` | `any` |  |
| `id` | `string` |  |
| `lookup` | `map[string]any` | Where to check one vehicle for open recalls. |
| `manufacturer` | `any` |  |
| `match` | `any` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `may_apply` | `bool` | Always `true`: the campaign may apply to a vehicle it lists. |
| `mfr_campaign` | `any` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `[]any` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notes` | `any` |  |
| `notification` | `any` | Transport Canada's notification type, such as `Safety Mfr`. |
| `owner_notified` | `any` | The day owners were notified. |
| `park_outside` | `any` | NHTSA's advisory to park outside, away from buildings. |
| `part_number` | `any` | The manufacturer's part numbers, separated by commas. |
| `remedy` | `any` |  |
| `source` | `string` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `any` | What is wrong, in the source's words. |
| `units` | `any` | Units potentially affected. |
| `url` | `string` | The campaign's page on this site. |
| `vehicles` | `[]any` | Every vehicle the campaign lists, by make, model and year. |

#### Example: Load

```go
recall, err := client.Recall(nil).Load(map[string]any{"campaign": "campaign", "source": "source"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(recall.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
recalls, err := client.Recall(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range recalls.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RecallInvestigation

Create an instance: `recallInvestigation := client.RecallInvestigation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | NHTSA's action number. |
| `campaigns` | `[]any` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `any` | The day it was closed. |
| `component` | `any` | The components it names, as NHTSA words them, separated by `; `. |
| `kind` | `string` | The letters the number starts with. |
| `kind_name` | `any` | The kind in words. |
| `manufacturer` | `any` | The manufacturers it names, separated by `; `. |
| `match` | `any` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `[]any` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `any` | The day it was opened. |
| `subject` | `any` | NHTSA's one-line subject. |
| `summary` | `any` | NHTSA's summary. |

#### Example: List

```go
recallInvestigations, err := client.RecallInvestigation(nil).List(map[string]any{"campaign": "example", "recall_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range recallInvestigations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Recent

Create an instance: `recent := client.Recent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `recall` | `map[string]any` | One recall campaign in a list. |
| `vehicles` | `[]any` | The vehicles the campaign lists: at most 200 of them. |
| `vehicles_listed` | `int` | How many vehicles the campaign lists in all. |

#### Example: List

```go
recents, err := client.Recent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range recents.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Submodel

Create an instance: `submodel := client.Submodel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `kind` | `string` | `trim` or `series` as NHTSA has it, or `preset` from this project's own list. |
| `name` | `string` |  |

#### Example: List

```go
submodels, err := client.Submodel(nil).List(map[string]any{"make": "example", "model": "example", "year": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range submodels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Vehicle

Create an instance: `vehicle := client.Vehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
vehicles, err := client.Vehicle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicles.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleBulletin

Create an instance: `vehicleBulletin := client.VehicleBulletin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component` | `any` | NHTSA's components, in its words, separated by `; `. |
| `date` | `any` | The manufacturer's own date. |
| `date_added` | `string` | The day NHTSA published it. |
| `document` | `any` |  |
| `document_id` | `any` | The manufacturer's own number for the document, which a dealer looks it up by. |
| `id` | `string` |  |
| `mfr_campaign` | `any` | The manufacturer's campaign id or software version. |
| `nhtsa_id` | `int` | NHTSA's id number for the communication. |
| `summary` | `any` | NHTSA's summary of the communication. |
| `type` | `string` | `service_bulletin`, `service_campaign`, `warranty_extension`, `over_the_air`, `emissions` or `other`. |
| `type_name` | `string` | The type in words. |
| `url` | `string` | The bulletin's page on this site. |

#### Example: List

```go
vehicleBulletins, err := client.VehicleBulletin(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleBulletins.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleCode

Create an instance: `vehicleCode := client.VehicleCode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `[]any` |  |
| `bulletins` | `any` |  |
| `code` | `string` |  |
| `description` | `string` |  |
| `generic` | `bool` | Whether every maker uses the code the same way. |
| `id` | `string` |  |
| `note` | `string` |  |
| `related` | `map[string]any` | What else is held for the model year about the components a code concerns. |
| `url` | `string` | The page of this code on this model year. |
| `vehicle` | `map[string]any` | The model year an answer is about. |

#### Example: Load

```go
vehicleCode, err := client.VehicleCode(nil).Load(map[string]any{"id": "vehicle_code_id", "vehicle_id": "vehicle_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vehicleCode.(sdk.Entity).Data()) // the loaded entity's record
```


### VehicleComplaint

Create an instance: `vehicleComplaint := client.VehicleComplaint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `complaints` | `int` |  |
| `crashes` | `int` | Complaints that report a crash. |
| `fires` | `int` | Complaints that report a fire. |
| `id` | `string` | A component id, such as `steering` or `brake-pad`. |
| `injuries` | `int` | Complaints that report at least one person injured. |
| `median_km` | `any` | The median of the mileages owners gave, in kilometres. |
| `median_miles` | `any` | The same in miles, as NHTSA records it. |
| `name` | `string` |  |
| `parent` | `any` | The system a part belongs to. |

#### Example: List

```go
vehicleComplaints, err := client.VehicleComplaint(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleComplaints.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleFluid

Create an instance: `vehicleFluid := client.VehicleFluid(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `any` | The day EPA's oil grades were current. |
| `attribution` | `[]any` |  |
| `brake` | `[]any` |  |
| `checked_as_of` | `any` | The day of the newest hand-read record the server holds, for any vehicle. |
| `coolant` | `[]any` |  |
| `engine_oil` | `[]any` |  |
| `engine_oil_checked` | `[]any` |  |
| `id` | `string` |  |
| `refrigerant` | `[]any` |  |
| `transmission` | `[]any` |  |
| `vehicle` | `map[string]any` | The model year an answer is about. |

#### Example: List

```go
vehicleFluids, err := client.VehicleFluid(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleFluids.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleFuel

Create an instance: `vehicleFuel := client.VehicleFuel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `co2_g_km` | `any` | Tailpipe carbon dioxide, combined. |
| `confidence` | `string` | How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim). |
| `country` | `string` | `us` or `ca`. |
| `cylinders` | `any` |  |
| `described_as` | `string` | The source's own name for the vehicle rated. |
| `displacement_l` | `any` |  |
| `drive` | `any` |  |
| `engine` | `any` |  |
| `fuel_grade` | `string` | The fuel the figures are for, which is the recommended grade. |
| `id` | `string` |  |
| `kwh_100km` | `any` | Combined electricity use. |
| `l_100km` | `any` |  |
| `match` | `string` | How the model was found: `exact`, `base` or `curated`. |
| `mpg` | `any` |  |
| `range_km` | `any` | On a full battery. |
| `range_mi` | `any` |  |
| `second_fuel` | `any` | A second fuel the vehicle takes, such as `E85` or `Electricity`. |
| `source` | `string` | `epa` or `nrcan`. |
| `source_id` | `any` | EPA's id for the rating. |
| `transmission` | `any` |  |

#### Example: List

```go
vehicleFuels, err := client.VehicleFuel(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleFuels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleInvestigation

Create an instance: `vehicleInvestigation := client.VehicleInvestigation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `string` | NHTSA's action number. |
| `campaigns` | `[]any` | The recall campaigns it led to, as NHTSA numbers them. |
| `closed` | `any` | The day it was closed. |
| `component` | `any` | The components it names, as NHTSA words them, separated by `; `. |
| `id` | `string` |  |
| `kind` | `string` | The letters the number starts with. |
| `kind_name` | `any` | The kind in words. |
| `manufacturer` | `any` | The manufacturers it names, separated by `; `. |
| `match` | `any` | In an answer about one model year: how the investigation's vehicle text reached that model. |
| `models` | `[]any` | In an answer about one model year: the model names the investigation lists that reached it. |
| `open` | `bool` | Whether it was opened in 2010 or later and has no day closed. |
| `opened` | `any` | The day it was opened. |
| `subject` | `any` | NHTSA's one-line subject. |
| `summary` | `any` | NHTSA's summary. |

#### Example: List

```go
vehicleInvestigations, err := client.VehicleInvestigation(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleInvestigations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleLabor

Create an instance: `vehicleLabor := client.VehicleLabor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `any` | The newest day an estimate was changed. |
| `attribution` | `[]any` |  |
| `basis` | `string` | `expert`: written by a person who does the work. |
| `class` | `any` | The class, for a class-scope figure. |
| `class_name` | `any` |  |
| `engine` | `any` | The engine the vehicle id named, as an id form. |
| `estimates` | `[]any` | One for each job that has a figure covering the vehicle, in the order of the job list. |
| `hours` | `map[string]any` | Hours, as numbers of hours. |
| `id` | `string` |  |
| `job` | `string` | The job's id. |
| `name` | `string` |  |
| `note` | `string` | "An estimate, not a quote. |
| `notes` | `any` |  |
| `sample` | `any` |  |
| `scope` | `string` | What the figure is for, and so how far to trust it for one vehicle: `engine`, `generation`, `model` or `class`. |
| `updated` | `string` | The day the figure was last changed. |
| `url` | `string` | The job's page on this site. |
| `vehicle` | `map[string]any` | The model year an answer is about. |
| `years` | `any` |  |

#### Example: Load

```go
vehicleLabor, err := client.VehicleLabor(nil).Load(map[string]any{"id": "vehicle_labor_id", "vehicle_id": "vehicle_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vehicleLabor.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
vehicleLabors, err := client.VehicleLabor(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleLabors.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleRecall

Create an instance: `vehicleRecall := client.VehicleRecall(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `built_from` | `any` | In an answer about one model year: the first and last build date the campaign gives. |
| `built_to` | `any` |  |
| `campaign` | `string` | The publisher's campaign number. |
| `component` | `any` | The component, as the source words it. |
| `country` | `string` | `us` or `ca`. |
| `date` | `any` | The day the campaign was reported. |
| `do_not_drive` | `any` | NHTSA's advisory not to drive the vehicle until it is repaired. |
| `id` | `string` |  |
| `manufacturer` | `any` |  |
| `match` | `any` | In an answer about one model year: how the campaign's vehicle text reached that model. |
| `mfr_campaign` | `any` | The manufacturer's own campaign number, which a dealer looks a recall up by. |
| `models` | `[]any` | In an answer about one model year: the model names the campaign lists that reached it. |
| `notification` | `any` | Transport Canada's notification type, such as `Safety Mfr`. |
| `park_outside` | `any` | NHTSA's advisory to park outside, away from buildings. |
| `source` | `string` | Who published it: `nhtsa` or `tc` (Transport Canada). |
| `summary` | `any` | What is wrong, in the source's words. |
| `units` | `any` | Units potentially affected. |
| `url` | `string` | The campaign's page on this site. |

#### Example: List

```go
vehicleRecalls, err := client.VehicleRecall(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleRecalls.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleSafety

Create an instance: `vehicleSafety := client.VehicleSafety(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body_style` | `any` |  |
| `curb_weight_kg` | `any` | The weight of the vehicle NHTSA tested. |
| `curb_weight_lb` | `any` |  |
| `description` | `string` | The vehicle NHTSA rated, in NHTSA's words, on one line. |
| `drive` | `any` |  |
| `features` | `map[string]any` | The safety features NHTSA lists with a rating. |
| `id` | `string` |  |
| `match` | `string` | How NHTSA's model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`. |
| `model` | `string` | The model, body style, vehicle type and drive as NHTSA words them. |
| `notes` | `[]any` | NHTSA's safety concerns and footnotes: what happened in a test, and which vehicles the rating does not cover. |
| `release` | `int` | 1 for the first release of a model year; 2 or 3 for a later one that NHTSA rated again. |
| `rollover_risk_percent` | `any` | The chance of a rollover in a single-vehicle crash, in percent. |
| `rollover_tip` | `any` | Whether the vehicle tipped up in NHTSA's dynamic test. |
| `stars` | `map[string]any` | The stars of one rating, each from 1 to 5. |
| `vehicle_type` | `any` |  |

#### Example: List

```go
vehicleSafetys, err := client.VehicleSafety(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleSafetys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleSpec

Create an instance: `vehicleSpec := client.VehicleSpec(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `battery_type` | `any` |  |
| `battery_voltage` | `any` |  |
| `confidence` | `string` | `model`, `engine` or `submodel`, as on a fuel rating. |
| `cylinder_deactivation` | `any` |  |
| `cylinder_deactivation_name` | `any` | The maker's name for it, such as `Active Fuel Management`. |
| `described_as` | `string` |  |
| `drive` | `any` |  |
| `electrification` | `any` | EPA's kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`. |
| `emission_standards` | `[]any` |  |
| `engine` | `any` |  |
| `ev_motor` | `any` |  |
| `exhaust_valves` | `any` |  |
| `fuel_grade` | `string` |  |
| `fuel_usage` | `any` | Whether the grade is recommended or required, in EPA's words. |
| `gears` | `any` |  |
| `id` | `string` |  |
| `intake_valves` | `any` | Per cylinder. |
| `luggage_volume_ft3` | `any` |  |
| `luggage_volume_l` | `any` |  |
| `motor_kw` | `any` | Rated motor power in kW, as EPA's file writes it: `135`, `8 and 30`. |
| `passenger_volume_ft3` | `any` |  |
| `passenger_volume_l` | `any` |  |
| `size_class` | `string` |  |
| `source` | `string` |  |
| `source_id` | `string` |  |
| `start_stop` | `any` |  |
| `supercharger` | `bool` |  |
| `transmission` | `any` |  |
| `transmission_type` | `any` |  |
| `turbo` | `bool` |  |
| `variable_valve_lift` | `any` |  |
| `variable_valve_timing` | `any` |  |

#### Example: List

```go
vehicleSpecs, err := client.VehicleSpec(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleSpecs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VehicleTire

Create an instance: `vehicleTire := client.VehicleTire(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bolt_pattern` | `any` |  |
| `checked` | `string` |  |
| `id` | `string` |  |
| `lug_torque_lbft` | `any` |  |
| `lug_torque_nm` | `any` |  |
| `lug_torque_written_in` | `any` | `nm` or `lbft`. |
| `market` | `any` |  |
| `pressure_kpa` | `any` |  |
| `pressure_psi` | `any` |  |
| `pressure_written_in` | `any` | The unit the document printed: `kpa`, `bar` or `psi`. |
| `size` | `string` | The size as printed. |
| `size_rear` | `any` | The rear size, only when it differs from the front. |
| `source` | `string` |  |
| `trims` | `[]any` | The trims the document ties the size to, as it names them. |

#### Example: List

```go
vehicleTires, err := client.VehicleTire(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vehicleTires.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Vin

Create an instance: `vin := client.Vin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base_price_usd` | `any` | Manufacturer base price in US dollars, when NHTSA has one. |
| `body` | `any` |  |
| `catalog` | `any` |  |
| `check_digit` | `map[string]any` |  |
| `doors` | `any` |  |
| `drivetrain` | `any` |  |
| `engine` | `any` |  |
| `gvwr` | `any` | Gross vehicle weight rating class, as NHTSA words it. |
| `id` | `string` |  |
| `make` | `any` |  |
| `manufacturer` | `map[string]any` |  |
| `model` | `any` |  |
| `plant` | `map[string]any` | Where the vehicle was built. |
| `recalls` | `any` |  |
| `safety` | `any` |  |
| `seat_rows` | `any` |  |
| `seats` | `any` |  |
| `series` | `any` |  |
| `transmission` | `any` |  |
| `transmission_speeds` | `any` |  |
| `trim` | `any` |  |
| `valid` | `bool` | Whether the check digit, position 9, is right. |
| `vin` | `string` |  |
| `warnings` | `[]any` | Things to know about a decode that still succeeded. |
| `wheel_size_front` | `any` | Front wheel diameter in inches. |
| `wheel_size_rear` | `any` | Rear wheel diameter in inches. |
| `year` | `any` |  |

#### Example: Load

```go
vin, err := client.Vin(nil).Load(map[string]any{"id": "vin_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vin.(sdk.Entity).Data()) // the loaded entity's record
```


### VinBulletin

Create an instance: `vinBulletin := client.VinBulletin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `any` |  |
| `attribution` | `[]any` |  |
| `bulletins` | `[]any` |  |
| `counts` | `map[string]any` | What the bulletins of one model year are, in numbers. |
| `decode` | `map[string]any` | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` |  |
| `next_cursor` | `any` |  |
| `note` | `string` |  |
| `vehicle` | `any` |  |
| `warnings` | `[]any` |  |

#### Example: List

```go
vinBulletins, err := client.VinBulletin(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vinBulletins.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VinFluid

Create an instance: `vinFluid := client.VinFluid(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `any` |  |
| `attribution` | `[]any` |  |
| `brake` | `[]any` |  |
| `checked_as_of` | `any` |  |
| `coolant` | `[]any` |  |
| `decode` | `map[string]any` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `engine_oil` | `[]any` |  |
| `engine_oil_checked` | `[]any` | Narrowed as `engine_oil` is. |
| `engine_settled` | `bool` | Whether `engine_oil` is narrowed to `engine`. |
| `id` | `string` |  |
| `refrigerant` | `[]any` |  |
| `transmission` | `[]any` |  |
| `vehicle` | `any` |  |
| `warnings` | `[]any` |  |

#### Example: List

```go
vinFluids, err := client.VinFluid(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vinFluids.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VinFuel

Create an instance: `vinFuel := client.VinFuel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `map[string]any` | The day each country's fuel ratings were current. |
| `attribution` | `[]any` |  |
| `decode` | `map[string]any` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `engine_settled` | `bool` | Whether `ratings` is narrowed to `engine`. |
| `id` | `string` |  |
| `ratings` | `[]any` |  |
| `vehicle` | `any` |  |
| `warnings` | `[]any` |  |

#### Example: List

```go
vinFuels, err := client.VinFuel(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vinFuels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VinLabor

Create an instance: `vinLabor := client.VinLabor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `any` |  |
| `attribution` | `[]any` |  |
| `class` | `any` |  |
| `decode` | `map[string]any` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `estimates` | `[]any` |  |
| `id` | `string` |  |
| `note` | `string` |  |
| `vehicle` | `any` |  |
| `warnings` | `[]any` |  |

#### Example: Load

```go
vinLabor, err := client.VinLabor(nil).Load(map[string]any{"id": "vin_labor_id", "vin_id": "vin_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vinLabor.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
vinLabors, err := client.VinLabor(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vinLabors.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VinRecall

Create an instance: `vinRecall := client.VinRecall(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `map[string]any` | The day each country's recall data was current. |
| `attribution` | `[]any` |  |
| `decode` | `map[string]any` | What a VIN decoded to, as far as recalls need it. |
| `id` | `string` |  |
| `lookup` | `map[string]any` | Where to check one vehicle for open recalls. |
| `may_apply` | `bool` | Always `true`. |
| `recalls` | `[]any` |  |
| `vehicle` | `any` |  |
| `warnings` | `[]any` | The decode's warnings, and `no_catalog_vehicle` when the VIN names no model year to list recalls for. |

#### Example: List

```go
vinRecalls, err := client.VinRecall(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vinRecalls.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VinSpec

Create an instance: `vinSpec := client.VinSpec(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `any` |  |
| `attribution` | `[]any` |  |
| `decode` | `map[string]any` | What a VIN decoded to, as far as recalls need it. |
| `engine` | `any` |  |
| `engine_settled` | `bool` | Whether `specs` is narrowed to `engine`. |
| `id` | `string` |  |
| `specs` | `[]any` |  |
| `vehicle` | `any` |  |
| `warnings` | `[]any` |  |

#### Example: List

```go
vinSpecs, err := client.VinSpec(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vinSpecs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VinTire

Create an instance: `vinTire := client.VinTire(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_of` | `any` |  |
| `attribution` | `[]any` |  |
| `decode` | `map[string]any` | What a VIN decoded to, as far as recalls need it. |
| `fitments` | `[]any` | Every fitment of the model year. |
| `id` | `string` |  |
| `vehicle` | `any` |  |
| `warnings` | `[]any` |  |

#### Example: List

```go
vinTires, err := client.VinTire(nil).List(map[string]any{"id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vinTires.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/wenmar-vin-sdk/go/
├── wenmar-vin.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/wenmar-vin-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
entry := client.Entry(nil)
entry.List(map[string]any{"q": "example"}, nil)

// entry.Data() now returns the entry data from the last list
// entry.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
