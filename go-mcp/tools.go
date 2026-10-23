package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/wenmar-vin-sdk/go"
)

// ListArgs is what an agent sends to wenmar-vin_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: bulletin | code | engine | entry | job | make | model | overview | parts_card | payroll_deduction | recall | recall_investigation | recent | submodel | vehicle | vehicle_bulletin | vehicle_complaint | vehicle_fluid | vehicle_fuel | vehicle_investigation | vehicle_labor | vehicle_recall | vehicle_safety | vehicle_spec | vehicle_tire | vin_bulletin | vin_fluid | vin_fuel | vin_labor | vin_recall | vin_spec | vin_tire"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to wenmar-vin_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: bulletin | code | data | entry | job | make | model | recall | vehicle_code | vehicle_labor | vin | vin_labor"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.WenmarVinSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "wenmar-vin_list",
		Description: "List records from WenmarVin. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("bulletin", "code", "engine", "entry", "job", "make", "model", "overview", "parts_card", "payroll_deduction", "recall", "recall_investigation", "recent", "submodel", "vehicle", "vehicle_bulletin", "vehicle_complaint", "vehicle_fluid", "vehicle_fuel", "vehicle_investigation", "vehicle_labor", "vehicle_recall", "vehicle_safety", "vehicle_spec", "vehicle_tire", "vin_bulletin", "vin_fluid", "vin_fuel", "vin_labor", "vin_recall", "vin_spec", "vin_tire"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "wenmar-vin_load",
		Description: "Load one record from WenmarVin. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("bulletin", "code", "data", "entry", "job", "make", "model", "recall", "vehicle_code", "vehicle_labor", "vin", "vin_labor"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.WenmarVinSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.WenmarVinSDK, name string) (sdk.WenmarVinEntity, error) {
	switch strings.ToLower(name) {
	case "batch":
		return client.Batch(nil), nil
	case "bulletin":
		return client.Bulletin(nil), nil
	case "code":
		return client.Code(nil), nil
	case "data":
		return client.Data(nil), nil
	case "engine":
		return client.Engine(nil), nil
	case "entry":
		return client.Entry(nil), nil
	case "job":
		return client.Job(nil), nil
	case "make":
		return client.Make(nil), nil
	case "model":
		return client.Model(nil), nil
	case "overview":
		return client.Overview(nil), nil
	case "parts_card":
		return client.PartsCard(nil), nil
	case "payroll_deduction":
		return client.PayrollDeduction(nil), nil
	case "recall":
		return client.Recall(nil), nil
	case "recall_investigation":
		return client.RecallInvestigation(nil), nil
	case "recent":
		return client.Recent(nil), nil
	case "submodel":
		return client.Submodel(nil), nil
	case "vehicle":
		return client.Vehicle(nil), nil
	case "vehicle_bulletin":
		return client.VehicleBulletin(nil), nil
	case "vehicle_code":
		return client.VehicleCode(nil), nil
	case "vehicle_complaint":
		return client.VehicleComplaint(nil), nil
	case "vehicle_fluid":
		return client.VehicleFluid(nil), nil
	case "vehicle_fuel":
		return client.VehicleFuel(nil), nil
	case "vehicle_investigation":
		return client.VehicleInvestigation(nil), nil
	case "vehicle_labor":
		return client.VehicleLabor(nil), nil
	case "vehicle_recall":
		return client.VehicleRecall(nil), nil
	case "vehicle_safety":
		return client.VehicleSafety(nil), nil
	case "vehicle_spec":
		return client.VehicleSpec(nil), nil
	case "vehicle_tire":
		return client.VehicleTire(nil), nil
	case "vin":
		return client.Vin(nil), nil
	case "vin_bulletin":
		return client.VinBulletin(nil), nil
	case "vin_fluid":
		return client.VinFluid(nil), nil
	case "vin_fuel":
		return client.VinFuel(nil), nil
	case "vin_labor":
		return client.VinLabor(nil), nil
	case "vin_recall":
		return client.VinRecall(nil), nil
	case "vin_spec":
		return client.VinSpec(nil), nil
	case "vin_tire":
		return client.VinTire(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
