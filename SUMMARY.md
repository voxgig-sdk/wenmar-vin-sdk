# Wenmar Open

Free vehicle data for auto repair shops: VIN decoding and a year, make, model, submodel and engine catalog. No API key and no account. Responses are plain JSON with no wrapper. Errors are `&#123; &quot;error&quot;: &#123; &quot;code&quot;, &quot;message&quot;, &quot;details&quot; &#125; &#125;`. Fields and endpoints are only ever added. One address may make 600 requests a minute.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 36 entities and 47 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Batch

Results: One item per VIN, in order.

SDK operations: `create`.

Key fields to recognise:

- `vins`: At most 50 VINs.

### Bulletin

Results: One page of bulletins.; The bulletin.

SDK operations: `list`, `load`.

Key fields to recognise:

- `codes`: The trouble codes the summary names.
- `component`: NHTSA&#39;s components, in its words, separated by `; `.
- `components`: The components it is about, systems first.
- `date`: The manufacturer&#39;s own date.
- `date_added`: The day NHTSA published it. Lists are ordered by it.

### Code

Results: One page of codes.; The code&#39;s description.

SDK operations: `list`, `load`.

Key fields to recognise:

- `attribution`: The credit lines the data&#39;s licences ask for.
- `checked`: The day it was approved.
- `checks`: What a technician usually verifies first.
- `code`: A stable code to branch on. One of `invalid_vin`, `validation_failed`, `not_found`, `dataset_unavailable`, `method_not_allowed`, `payload_too_large`, `uri_too_long`, `rate_limited`, `unavailable`, `internal_error`.
- `common_causes`: General causes, not about one make.

### Data

Results: About the data being served.

SDK operations: `load`.

Key fields to recognise:

- `built_at`: When the data file was built, in UTC.
- `data_version`: The data release, such as `2026.09`. Also sent as `X-Data-Version`.
- `datasets`: The datasets served beside the catalog, such as `recalls_us`, by id. Empty when the server has none. A route for a dataset that is not listed answers `404` with the code `dataset_unavailable`.
- `server_version`: The version of the server.
- `vpic_release`: The NHTSA vPIC release the data was built from.

### Engine

Results: Engines.

SDK operations: `list`.

Key fields to recognise:

- `preset`: Whether the engine comes from this project&#39;s list instead of NHTSA.
- `vin8`: The characters in position 8 of a VIN that mean this engine and no other for this model year, where the data settles it.

### Entry

Results: Entries, best first.; The entry.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: The stable id. It stays the same from one data release to the next for as long as the names do.
- `summary`: One line naming everything above that is known.
- `vehicle_types`: NHTSA&#39;s vehicle types for this model year, such as `Truck`.

### Job

Results: Every job.; The job.

SDK operations: `list`, `load`.

Key fields to recognise:

- `attribution`: The credit the labour estimates ask for. Empty without them.
- `estimates`: The job&#39;s class-scope figures. `null` where labour estimates are not held.
- `excludes`: Work often done at the same visit that is not part of this job.
- `id`: The job&#39;s id. It never changes.
- `includes`: The work the job covers.

### Make

Results: Makes.; The make. `links` is `null` when none are recorded.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: The make&#39;s id form.
- `popular`: Whether it is on the list of popular makes, which are given first.

### Model

Results: Models.; The model years. `recalls` is `null` in each when this server holds no recalls.

SDK operations: `list`, `load`.

Key fields to recognise:

- `as_of`: The day each country&#39;s recall data was current. `null` for a country this server holds no recalls for.
- `id`: The model&#39;s id form. Unique within its make.
- `lookup`: Where to check one vehicle for open recalls. Neither government publishes recalls by VIN as data, so no answer here can say a recall applies to a VIN: these lookups can.
- `make`: A make or a model: its id form and its name.
- `may_apply`: Always `true`: a recall count is of campaigns that may apply to the model year.

### Overview

Results: The overview. `decode` is `null`.; The overview, with `decode`.

SDK operations: `list`.

Key fields to recognise:

- `code`: `invalid_check_digit`, `model_year_unknown`, `no_patterns` or `model_unresolved`. More may be added.
- `message`: A sentence for a person to read.
- `suggestions`: VINs the caller may have meant.

### PartsCard

Results: The card.

SDK operations: `list`.

Key fields to recognise:

- `engine_settled`: Whether the decode settled one catalog engine. The catalog engine and emission standard lines are there only when it did.
- `text`: The lines as plain text, one `Label: value` each.

### PayrollDeduction

Results: The deductions from the pay, the net pay, the employer&#39;s share and every T4127 factor used. An estimate.

SDK operations: `list`.

Key fields to recognise:

- `meaning`: What the factor means.
- `name`: The name the engine gives the factor.
- `value`: The value used, after rounding.

### Recall

Results: One page of campaigns.; The campaign.

SDK operations: `list`, `load`.

Key fields to recognise:

- `as_of`: The day each country&#39;s recall data was current. `null` for a country this server holds no recalls for.
- `built_from`: In an answer about one model year: the first and last build date the campaign gives. Compare them with the date on the door sticker.
- `campaign`: The publisher&#39;s campaign number.
- `component`: The component, as the source words it.
- `country`: `us` or `ca`.

### RecallInvestigation

Results: The investigations, oldest first.

SDK operations: `list`.

Key fields to recognise:

- `action`: NHTSA&#39;s action number.
- `campaigns`: The recall campaigns it led to, as NHTSA numbers them. Empty when it led to none, or to none yet.
- `closed`: The day it was closed. `null` while it is open, and for some old investigations whose closing NHTSA&#39;s file does not record.
- `component`: The components it names, as NHTSA words them, separated by `; `.
- `kind`: The letters the number starts with.

### Recent

Results: One page of campaigns.

SDK operations: `list`.

Key fields to recognise:

- `recall`: One recall campaign in a list.
- `vehicles`: The vehicles the campaign lists: at most 200 of them. Every one is at `/v1/recalls/&#123;source&#125;/&#123;campaign&#125;`.
- `vehicles_listed`: How many vehicles the campaign lists in all.

### Submodel

Results: Submodels.

SDK operations: `list`.

Key fields to recognise:

- `kind`: `trim` or `series` as NHTSA has it, or `preset` from this project&#39;s own list.

### Vehicle

Results: Model years, newest first.

SDK operations: `list`.

### VehicleBulletin

Results: One page of bulletins, newest first.

SDK operations: `list`.

Key fields to recognise:

- `component`: NHTSA&#39;s components, in its words, separated by `; `.
- `date`: The manufacturer&#39;s own date.
- `date_added`: The day NHTSA published it. Lists are ordered by it.
- `document_id`: The manufacturer&#39;s own number for the document, which a dealer looks it up by.
- `id`: What to pass as `type`, `component`, `code` or `topic`.

### VehicleCode

Results: What is held about the code for the model year.

SDK operations: `load`.

Key fields to recognise:

- `attribution`: The credit lines the data&#39;s licences ask for.
- `bulletins`: The newest, newest first.
- `code`: A stable code to branch on. One of `invalid_vin`, `validation_failed`, `not_found`, `dataset_unavailable`, `method_not_allowed`, `payload_too_large`, `uri_too_long`, `rate_limited`, `unavailable`, `internal_error`.
- `generic`: Whether every maker uses the code the same way. A code that is not generic is never described, and may still be named by bulletins.
- `id`: The id of the year, make and model.

### VehicleComplaint

Results: The counts. All zero when no complaint names the model year.

SDK operations: `list`.

Key fields to recognise:

- `complaints`: Every complaint about the model year. Not a rate: a model that sold more has more.
- `crashes`: Complaints that report a crash.
- `fires`: Complaints that report a fire.
- `id`: A component id, such as `steering` or `brake-pad`.
- `injuries`: Complaints that report at least one person injured.

### VehicleFluid

Results: The engine oil grades by engine, and the records read by hand.

SDK operations: `list`.

Key fields to recognise:

- `as_of`: The day EPA&#39;s oil grades were current. `null` on a server without them.
- `checked_as_of`: The day of the newest hand-read record the server holds, for any vehicle. `null` on a server without them.
- `id`: The engine&#39;s id form, as in a vehicle id.
- `vehicle`: The model year an answer is about.

### VehicleFuel

Results: The ratings, EPA&#39;s first, each by engine size.

SDK operations: `list`.

Key fields to recognise:

- `co2_g_km`: Tailpipe carbon dioxide, combined.
- `confidence`: How far the rating was matched: `model` (the model year only), `engine` (one engine) or `submodel` (an engine and a trim).
- `country`: `us` or `ca`.
- `described_as`: The source&#39;s own name for the vehicle rated.
- `fuel_grade`: The fuel the figures are for, which is the recommended grade.

### VehicleInvestigation

Results: The investigations, newest first. An empty list when none lists the model year.

SDK operations: `list`.

Key fields to recognise:

- `action`: NHTSA&#39;s action number.
- `campaigns`: The recall campaigns it led to, as NHTSA numbers them. Empty when it led to none, or to none yet.
- `closed`: The day it was closed. `null` while it is open, and for some old investigations whose closing NHTSA&#39;s file does not record.
- `component`: The components it names, as NHTSA words them, separated by `; `.
- `id`: The id of the year, make and model.

### VehicleLabor

Results: One estimate for each job that has a figure covering the vehicle.; The estimate, when there is one.

SDK operations: `list`, `load`.

Key fields to recognise:

- `as_of`: The newest day an estimate was changed.
- `basis`: `expert`: written by a person who does the work. `observed`: measured from repair orders; `sample` then says how many.
- `class`: The class, for a class-scope figure.
- `engine`: The engine the vehicle id named, as an id form. `null` when it named none: no engine-scope figure can then answer.
- `estimates`: One for each job that has a figure covering the vehicle, in the order of the job list.

### VehicleRecall

Results: Recalls that may apply, newest first.

SDK operations: `list`.

Key fields to recognise:

- `built_from`: In an answer about one model year: the first and last build date the campaign gives. Compare them with the date on the door sticker.
- `campaign`: The publisher&#39;s campaign number.
- `component`: The component, as the source words it.
- `country`: `us` or `ca`.
- `date`: The day the campaign was reported.

### VehicleSafety

Results: Every rating NHTSA gave a vehicle of the model year.

SDK operations: `list`.

Key fields to recognise:

- `curb_weight_kg`: The weight of the vehicle NHTSA tested. NHTSA gives pounds; the kilograms are worked out from them and rounded.
- `description`: The vehicle NHTSA rated, in NHTSA&#39;s words, on one line.
- `features`: The safety features NHTSA lists with a rating. A feature is `standard`, `optional`, `both` (standard on some versions, optional on others) or `no`. An evaluation is `meets`, `does_not_meet`, `standard_only`, `upgrade_only` or `pending`. `null` where NHTSA&#39;s file does not say. For the four driver-assistance features (forward collision warning, lane departure warning, crash imminent braking, dynamic brake support) NHTSA&#39;s file means two things by its years. Through model year 2022, `standard`, `optional` and `both` say the feature is fitted and met NHTSA&#39;s performance criteria, `no` says it is not fitted or did not meet them, and there is no evaluation. From model year 2023 the value says only whether the feature is fitted, and the evaluation says what NHTSA&#39;s test found.
- `id`: The id of the year, make and model.
- `match`: How NHTSA&#39;s model name reached this model: `exact`, `base` (NHTSA names a body or a version of it) or `curated`.

### VehicleSpec

Results: The specifications, by engine size.

SDK operations: `list`.

Key fields to recognise:

- `confidence`: `model`, `engine` or `submodel`, as on a fuel rating.
- `cylinder_deactivation_name`: The maker&#39;s name for it, such as `Active Fuel Management`.
- `electrification`: EPA&#39;s kind of alternative powertrain: `Hybrid`, `Plug-in Hybrid`, `EV`, `FFV`, `Diesel`.
- `fuel_usage`: Whether the grade is recommended or required, in EPA&#39;s words.
- `id`: The engine&#39;s id form, as in a vehicle id.

### VehicleTire

Results: The fitments, in the order they were recorded.

SDK operations: `list`.

Key fields to recognise:

- `id`: The id of the year, make and model.
- `lug_torque_written_in`: `nm` or `lbft`.
- `pressure_written_in`: The unit the document printed: `kpa`, `bar` or `psi`. The other figures were worked out from it.
- `size`: The size as printed. The front size when `size_rear` is given.
- `size_rear`: The rear size, only when it differs from the front.

### Vin

Results: The decode.

SDK operations: `load`.

Key fields to recognise:

- `base_price_usd`: Manufacturer base price in US dollars, when NHTSA has one.
- `gvwr`: Gross vehicle weight rating class, as NHTSA words it.
- `id`: The stable id. It stays the same from one data release to the next for as long as the names do.
- `plant`: Where the vehicle was built. `code` is position 11 of the VIN.
- `valid`: Whether the check digit, position 9, is right. Many genuine VINs from outside North America fail it.

### VinBulletin

Results: One page of bulletins, newest first.

SDK operations: `list`.

Key fields to recognise:

- `counts`: What the bulletins of one model year are, in numbers. They count every bulletin of the model year, whatever the list is narrowed by.
- `decode`: What a VIN decoded to, as far as recalls need it.
- `id`: What to pass as `type`, `component`, `code` or `topic`.

### VinFluid

Results: The engine oil grades and the records read by hand.

SDK operations: `list`.

Key fields to recognise:

- `decode`: What a VIN decoded to, as far as recalls need it.
- `engine_oil_checked`: Narrowed as `engine_oil` is. A record for every engine is kept.
- `engine_settled`: Whether `engine_oil` is narrowed to `engine`.
- `id`: The engine&#39;s id form, as in a vehicle id.

### VinFuel

Results: The ratings.

SDK operations: `list`.

Key fields to recognise:

- `as_of`: The day each country&#39;s fuel ratings were current. Null for a country this server holds no ratings for.
- `decode`: What a VIN decoded to, as far as recalls need it.
- `engine_settled`: Whether `ratings` is narrowed to `engine`.
- `id`: The engine&#39;s id form, as in a vehicle id.

### VinLabor

Results: The estimates. `vehicle` is `null` and `estimates` empty when the VIN reaches no catalog vehicle.; The estimate, when there is one.

SDK operations: `list`, `load`.

Key fields to recognise:

- `class`: The class, for a class-scope figure.
- `decode`: What a VIN decoded to, as far as recalls need it.
- `engine`: The engine&#39;s id form, for an engine-scope figure.
- `id`: The id of the year, make and model.

### VinRecall

Results: Recalls that may apply, newest first.

SDK operations: `list`.

Key fields to recognise:

- `as_of`: The day each country&#39;s recall data was current. `null` for a country this server holds no recalls for.
- `decode`: What a VIN decoded to, as far as recalls need it.
- `id`: The id of the year, make and model.
- `lookup`: Where to check one vehicle for open recalls. Neither government publishes recalls by VIN as data, so no answer here can say a recall applies to a VIN: these lookups can.
- `may_apply`: Always `true`. This is not a lookup by VIN: the list is for the model year, and the VIN only names it.

### VinSpec

Results: The specifications.

SDK operations: `list`.

Key fields to recognise:

- `decode`: What a VIN decoded to, as far as recalls need it.
- `engine_settled`: Whether `specs` is narrowed to `engine`.
- `id`: The engine&#39;s id form, as in a vehicle id.

### VinTire

Results: The fitments.

SDK operations: `list`.

Key fields to recognise:

- `decode`: What a VIN decoded to, as far as recalls need it.
- `fitments`: Every fitment of the model year. A VIN does not say which wheels a vehicle left the factory with, so the list is never narrowed.
- `id`: The id of the year, make and model.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Batch | `create` | `POST /v1/vin/batch` | See reference |
| Bulletin | `list` | `GET /v1/bulletins` | See reference |
| Bulletin | `load` | `GET /v1/bulletins/{nhtsa_id}` | See reference |
| Code | `list` | `GET /v1/codes` | See reference |
| Code | `load` | `GET /v1/codes/{code}` | See reference |
| Data | `load` | `GET /v1/meta` | See reference |
| Engine | `list` | `GET /v1/vehicles/engines` | See reference |
| Entry | `list` | `GET /v1/vehicles/search` | See reference |
| Entry | `load` | `GET /v1/vehicles/{id}` | See reference |
| Job | `list` | `GET /v1/jobs` | See reference |
| Job | `load` | `GET /v1/jobs/{job}` | See reference |
| Make | `list` | `GET /v1/vehicles/makes` | See reference |
| Make | `load` | `GET /v1/makes/{make}` | See reference |
| Model | `list` | `GET /v1/vehicles/models` | See reference |
| Model | `load` | `GET /v1/models/{make}/{model}` | See reference |
| Overview | `list` | `GET /v1/vehicles/{id}/overview` | See reference |
| Overview | `list` | `GET /v1/vin/{vin}/overview` | See reference |
| PartsCard | `list` | `GET /v1/vin/{vin}/parts-card` | See reference |
| PayrollDeduction | `list` | `GET /v1/payroll/deductions` | See reference |
| Recall | `list` | `GET /v1/recalls` | See reference |
| Recall | `load` | `GET /v1/recalls/{source}/{campaign}` | See reference |
| RecallInvestigation | `list` | `GET /v1/recalls/{source}/{campaign}/investigations` | See reference |
| Recent | `list` | `GET /v1/recalls/recent` | See reference |
| Submodel | `list` | `GET /v1/vehicles/submodels` | See reference |
| Submodel | `list` | `GET /v1/vehicles/trims` | See reference |
| Vehicle | `list` | `GET /v1/vehicles/years` | See reference |
| VehicleBulletin | `list` | `GET /v1/vehicles/{id}/bulletins` | See reference |
| VehicleCode | `load` | `GET /v1/vehicles/{id}/codes/{code}` | See reference |
| VehicleComplaint | `list` | `GET /v1/vehicles/{id}/complaints` | See reference |
| VehicleFluid | `list` | `GET /v1/vehicles/{id}/fluids` | See reference |
| VehicleFuel | `list` | `GET /v1/vehicles/{id}/fuel` | See reference |
| VehicleInvestigation | `list` | `GET /v1/vehicles/{id}/investigations` | See reference |
| VehicleLabor | `list` | `GET /v1/vehicles/{id}/labor` | See reference |
| VehicleLabor | `load` | `GET /v1/vehicles/{id}/labor/{job}` | See reference |
| VehicleRecall | `list` | `GET /v1/vehicles/{id}/recalls` | See reference |
| VehicleSafety | `list` | `GET /v1/vehicles/{id}/safety` | See reference |
| VehicleSpec | `list` | `GET /v1/vehicles/{id}/specs` | See reference |
| VehicleTire | `list` | `GET /v1/vehicles/{id}/tires` | See reference |
| Vin | `load` | `GET /v1/vin/{vin}` | See reference |
| VinBulletin | `list` | `GET /v1/vin/{vin}/bulletins` | See reference |
| VinFluid | `list` | `GET /v1/vin/{vin}/fluids` | See reference |
| VinFuel | `list` | `GET /v1/vin/{vin}/fuel` | See reference |
| VinLabor | `list` | `GET /v1/vin/{vin}/labor` | See reference |
| VinLabor | `load` | `GET /v1/vin/{vin}/labor/{job}` | See reference |
| VinRecall | `list` | `GET /v1/vin/{vin}/recalls` | See reference |
| VinSpec | `list` | `GET /v1/vin/{vin}/specs` | See reference |
| VinTire | `list` | `GET /v1/vin/{vin}/tires` | See reference |

## Connect to the API

- API server: `https://open.wenmarpro.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `wenmar-vin_list`: List records for an entity. Supported entities: `bulletin`, `code`, `engine`, `entry`, `job`, `make`, `model`, `overview`, `parts_card`, `payroll_deduction`, `recall`, `recall_investigation`, `recent`, `submodel`, `vehicle`, `vehicle_bulletin`, `vehicle_complaint`, `vehicle_fluid`, `vehicle_fuel`, `vehicle_investigation`, `vehicle_labor`, `vehicle_recall`, `vehicle_safety`, `vehicle_spec`, `vehicle_tire`, `vin_bulletin`, `vin_fluid`, `vin_fuel`, `vin_labor`, `vin_recall`, `vin_spec`, `vin_tire`.
- `wenmar-vin_load`: Load one record for an entity. Supported entities: `bulletin`, `code`, `data`, `entry`, `job`, `make`, `model`, `recall`, `vehicle_code`, `vehicle_labor`, `vin`, `vin_labor`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

