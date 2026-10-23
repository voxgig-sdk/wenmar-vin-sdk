# wenmar-vin-mcp

[MCP](https://modelcontextprotocol.io) server exposing the WenmarVin SDK as
2 agent tools, `wenmar-vin_list` and `wenmar-vin_load`, built on the
[official Go MCP SDK](https://github.com/modelcontextprotocol/go-sdk) and the
sibling Go SDK at `../go`. Runs over **stdio** (default, for spawnable installs)
or **streamable HTTP** (one shared server for several agents).

The server only reads. Create, update, patch and remove become tools too when the
SDK's own model sets `main: kit: target: 'go-mcp': tool: write: true`; they are off by default, as an agent calling
them changes the API's data.

## Examples

```sh
# 1. Build a native binary (-> dist/<os>-<arch>/wenmar-vin-mcp)
make build

# 2. Provide credentials via the environment
export WENMAR_VIN_APIKEY=sk_live_xxx

# 3a. Install into Claude Code over stdio (most common)
claude mcp add --scope user wenmar-vin \
  -- /absolute/path/to/wenmar-vin-mcp -transport stdio

# 3b. …or run a shared HTTP server instead
./wenmar-vin-mcp -transport http -addr :8080
```

Tool-call arguments (what an agent sends):

```jsonc
// wenmar-vin_list: first page of records
{ "entity": "bulletin" }

// wenmar-vin_load: one record
{ "entity": "bulletin", "query": { "id": "example_id" } }
```

> The rest of this guide follows the [Diátaxis](https://diataxis.fr) framework:
> a hands-on **Tutorial**, task-focused **How-to guides**, a factual
> **Reference**, and background **Explanation**.

## Tutorial: install and call a tool

1. **Build** the server from this `go-mcp/` directory:

   ```sh
   make build          # -> dist/<os>-<arch>/wenmar-vin-mcp
   ```

2. **Set your API key:**

   ```sh
   export WENMAR_VIN_APIKEY=sk_live_xxx
   ```

3. **Install it into Claude Code** (stdio transport):

   ```sh
   claude mcp add --scope user wenmar-vin \
     -- "$PWD"/dist/*/wenmar-vin-mcp -transport stdio
   ```

4. **Restart Claude Code.** The `wenmar-vin_list` and `wenmar-vin_load` tools now appear in new
   sessions. Ask the agent to *"list bulletin using wenmar-vin"*
   and it calls `wenmar-vin_list` with `{"entity":"bulletin"}`.

## How-to guides

### Authenticate and choose an environment

Configuration is read from the environment — nothing is written to disk:

```sh
export WENMAR_VIN_APIKEY=sk_live_xxx            # API key
export WENMAR_VIN_BASE=https://api.example.com  # optional: override the API base URL
```

Set these in the shell that launches the server (or in the `claude mcp add`
environment) so every tool call is authenticated.

### Run as a shared HTTP server

```sh
./wenmar-vin-mcp -transport http -addr :8080
```

Streamable HTTP lets several agents share one running process; stdio (the
default) spawns a fresh process per client.

### Call the `wenmar-vin_list` tool

Args: `entity` (required), `query` (optional: optional filter map; omit it for the first page).
Returns the first page of records as JSON:

```jsonc
{ "entity": "bulletin" }
```

### Call the `wenmar-vin_load` tool

Args: `entity` (required), `query` (required: match map naming the record, such as {"id":1}).
Returns the record as JSON:

```jsonc
{ "entity": "bulletin", "query": { "id": "example_id" } }
```

### Turn on the write tools

In the SDK's own model (`.sdk/model/sdk.aontu`), then regenerate:

```
main: kit: target: 'go-mcp': tool: write: true
```

### Cross-compile release binaries

```sh
make build       # native binary for this machine
make build-all   # linux/darwin/windows x amd64/arm64, under dist/<os>-<arch>/
```

## Reference

### Tools

| Tool | Args | Returns | MCP hints |
|------|------|---------|-----------|
| `wenmar-vin_list` | `entity`, `query` (optional map) | The first page of records as JSON | read-only |
| `wenmar-vin_load` | `entity`, `query` (required map) | The record as JSON | read-only |

On error, a tool returns an MCP error result (`isError: true`) whose text is the
failure message (e.g. unknown entity, or an API error).

### Entities

Each tool takes as its `entity` argument one of the entities that has its
operation, of the 36 the SDK has:

| Tool | Entities |
|------|----------|
| `wenmar-vin_list` | bulletin, code, engine, entry, job, make, model, overview, parts_card, payroll_deduction, recall, recall_investigation, recent, submodel, vehicle, vehicle_bulletin, vehicle_complaint, vehicle_fluid, vehicle_fuel, vehicle_investigation, vehicle_labor, vehicle_recall, vehicle_safety, vehicle_spec, vehicle_tire, vin_bulletin, vin_fluid, vin_fuel, vin_labor, vin_recall, vin_spec, vin_tire |
| `wenmar-vin_load` | bulletin, code, data, entry, job, make, model, recall, vehicle_code, vehicle_labor, vin, vin_labor |

JSON schemas are emitted by the SDK from each tool's argument struct's
`json` / `jsonschema` tags — no schema is hand-written. Each tool's
`entity` is an `enum` of the entities in its row, so the server refuses
any other before it runs a call.

### Transports & flags

| Flag | Default | Purpose |
|------|---------|---------|
| `-transport` | `stdio` | `stdio` (spawnable) or `http` (streamable HTTP). |
| `-addr` | `:8080` | Listen address for the `http` transport. |

### Environment variables

| Variable | Purpose |
|----------|---------|
| `WENMAR_VIN_APIKEY` | API key sent with every request. |
| `WENMAR_VIN_BASE` | Optional override of the API base URL. |

### Smoke test via HTTP (raw JSON-RPC)

```sh
./wenmar-vin-mcp -transport http -addr :18080 &

# initialize, grab the session id
curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -D headers \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"smoke","version":"0"}}}'

SESSION=$(awk '/Mcp-Session-Id/ {print $2}' headers | tr -d '\r')

curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H "Mcp-Session-Id: $SESSION" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"wenmar-vin_list","arguments":{"entity":"bulletin"}}}'
```

## Explanation

### How tools map to the SDK

`main.go` builds the SDK client (configured from the environment) and registers
one tool per operation the SDK's entities have. Each dispatches on the
`entity` argument to the matching entity in the sibling Go SDK at `../go`,
calls its operation, unwraps the `Entity` wrappers to plain data, and returns
it as pretty-printed JSON.

### Why two transports

**stdio** is the standard for agent hosts that spawn a server per client
(Claude Code's `claude mcp add`). **streamable HTTP** keeps one process running
that many agents can share — handy for a long-lived deployment.

### Schema generation

The input schema is derived from each tool's argument struct's `json` /
`jsonschema` tags at registration time, so the advertised tool schema can
never drift from the code that consumes it. The `entity` enum comes from the
same list the tool is registered for.

## Generated by

sdkgen `go-mcp` target. See the target source under `.sdk/src/cmp/go-mcp/` in
this repo, or upstream at
`github.com/voxgig/sdkgen/project/.sdk/src/cmp/go-mcp/`.
