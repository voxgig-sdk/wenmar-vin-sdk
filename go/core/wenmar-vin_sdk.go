package core

import (
	"encoding/json"
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/wenmar-vin-sdk/go/utility/struct"
)

type WenmarVinSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewWenmarVinSDK(options map[string]any) *WenmarVinSDK {
	sdk := &WenmarVinSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

// The client holds the credential in its options, so a print or a JSON dump
// carries the name alone. Value receivers: a dereferenced client prints the
// same way.
func (sdk WenmarVinSDK) String() string {
	return "WenmarVin " + vs.Jsonify(map[string]any{"name": "WenmarVin"},
		map[string]any{"indent": 0})
}

func (sdk WenmarVinSDK) GoString() string {
	return sdk.String()
}

func (sdk WenmarVinSDK) MarshalJSON() ([]byte, error) {
	return json.Marshal(map[string]any{"name": "WenmarVin"})
}

func (sdk *WenmarVinSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *WenmarVinSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *WenmarVinSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *WenmarVinSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}
	method = strings.ToUpper(method)

	allowMethodVal := vs.GetPath(options, []any{"allow", "method"})
	if !Allowed(allowMethodVal, method) {
		allowMethod, _ := allowMethodVal.(string)
		return nil, ctx.MakeError("spec_method_allow",
			"Method \""+method+"\" not allowed by SDK option allow.method value: \""+allowMethod+"\"")
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *WenmarVinSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *WenmarVinSDK) opAllowed(op string) bool {
	return Allowed(vs.GetPath(sdk.options, []any{"allow", "op"}), op)
}

func (sdk *WenmarVinSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("WenmarVinSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *WenmarVinSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(sdk.rootctx, err)}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(ctx, fetchErr)}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		var bodyErr error
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
			if unreadable, _ := vs.GetProp(fm, "unreadable").(bool); unreadable {
				var failed error
				if status < 200 || status >= 300 {
					failed = ctx.MakeError("request_status",
						fmt.Sprintf("request: %d: %v", status, vs.GetProp(fm, "statusText")))
				}
				bodyErr = UnreadableBody(ctx, status, headers, vs.GetProp(fm, "body"),
					fetchdef["headers"], failed)
			}
		}

		out := map[string]any{
			"ok":      bodyErr == nil && status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}
		if bodyErr != nil {
			out["err"] = sdk.cleanErr(ctx, bodyErr)
		}
		return out, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// A raw request returns its error rather than passing it through MakeError.
func (sdk *WenmarVinSDK) cleanErr(ctx *Context, err error) error {
	if cleaned, ok := sdk.utility.Clean(ctx, err).(error); ok {
		return cleaned
	}
	return err
}

func (sdk *WenmarVinSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("WenmarVinSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Batch returns a Batch entity bound to this client.
// Idiomatic usage: client.Batch(nil).List(nil, nil) or
// client.Batch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Batch(data map[string]any) WenmarVinEntity {
	return NewBatchEntityFunc(sdk, data)
}


// Bulletin returns a Bulletin entity bound to this client.
// Idiomatic usage: client.Bulletin(nil).List(nil, nil) or
// client.Bulletin(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Bulletin(data map[string]any) WenmarVinEntity {
	return NewBulletinEntityFunc(sdk, data)
}


// Code returns a Code entity bound to this client.
// Idiomatic usage: client.Code(nil).List(nil, nil) or
// client.Code(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Code(data map[string]any) WenmarVinEntity {
	return NewCodeEntityFunc(sdk, data)
}


// Data returns a Data entity bound to this client.
// Idiomatic usage: client.Data(nil).List(nil, nil) or
// client.Data(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Data(data map[string]any) WenmarVinEntity {
	return NewDataEntityFunc(sdk, data)
}


// Engine returns a Engine entity bound to this client.
// Idiomatic usage: client.Engine(nil).List(nil, nil) or
// client.Engine(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Engine(data map[string]any) WenmarVinEntity {
	return NewEngineEntityFunc(sdk, data)
}


// Entry returns a Entry entity bound to this client.
// Idiomatic usage: client.Entry(nil).List(nil, nil) or
// client.Entry(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Entry(data map[string]any) WenmarVinEntity {
	return NewEntryEntityFunc(sdk, data)
}


// Job returns a Job entity bound to this client.
// Idiomatic usage: client.Job(nil).List(nil, nil) or
// client.Job(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Job(data map[string]any) WenmarVinEntity {
	return NewJobEntityFunc(sdk, data)
}


// Make returns a Make entity bound to this client.
// Idiomatic usage: client.Make(nil).List(nil, nil) or
// client.Make(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Make(data map[string]any) WenmarVinEntity {
	return NewMakeEntityFunc(sdk, data)
}


// Model returns a Model entity bound to this client.
// Idiomatic usage: client.Model(nil).List(nil, nil) or
// client.Model(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Model(data map[string]any) WenmarVinEntity {
	return NewModelEntityFunc(sdk, data)
}


// Overview returns a Overview entity bound to this client.
// Idiomatic usage: client.Overview(nil).List(nil, nil) or
// client.Overview(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Overview(data map[string]any) WenmarVinEntity {
	return NewOverviewEntityFunc(sdk, data)
}


// PartsCard returns a PartsCard entity bound to this client.
// Idiomatic usage: client.PartsCard(nil).List(nil, nil) or
// client.PartsCard(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) PartsCard(data map[string]any) WenmarVinEntity {
	return NewPartsCardEntityFunc(sdk, data)
}


// PayrollDeduction returns a PayrollDeduction entity bound to this client.
// Idiomatic usage: client.PayrollDeduction(nil).List(nil, nil) or
// client.PayrollDeduction(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) PayrollDeduction(data map[string]any) WenmarVinEntity {
	return NewPayrollDeductionEntityFunc(sdk, data)
}


// Recall returns a Recall entity bound to this client.
// Idiomatic usage: client.Recall(nil).List(nil, nil) or
// client.Recall(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Recall(data map[string]any) WenmarVinEntity {
	return NewRecallEntityFunc(sdk, data)
}


// RecallInvestigation returns a RecallInvestigation entity bound to this client.
// Idiomatic usage: client.RecallInvestigation(nil).List(nil, nil) or
// client.RecallInvestigation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) RecallInvestigation(data map[string]any) WenmarVinEntity {
	return NewRecallInvestigationEntityFunc(sdk, data)
}


// Recent returns a Recent entity bound to this client.
// Idiomatic usage: client.Recent(nil).List(nil, nil) or
// client.Recent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Recent(data map[string]any) WenmarVinEntity {
	return NewRecentEntityFunc(sdk, data)
}


// Submodel returns a Submodel entity bound to this client.
// Idiomatic usage: client.Submodel(nil).List(nil, nil) or
// client.Submodel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Submodel(data map[string]any) WenmarVinEntity {
	return NewSubmodelEntityFunc(sdk, data)
}


// Vehicle returns a Vehicle entity bound to this client.
// Idiomatic usage: client.Vehicle(nil).List(nil, nil) or
// client.Vehicle(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Vehicle(data map[string]any) WenmarVinEntity {
	return NewVehicleEntityFunc(sdk, data)
}


// VehicleBulletin returns a VehicleBulletin entity bound to this client.
// Idiomatic usage: client.VehicleBulletin(nil).List(nil, nil) or
// client.VehicleBulletin(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleBulletin(data map[string]any) WenmarVinEntity {
	return NewVehicleBulletinEntityFunc(sdk, data)
}


// VehicleCode returns a VehicleCode entity bound to this client.
// Idiomatic usage: client.VehicleCode(nil).List(nil, nil) or
// client.VehicleCode(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleCode(data map[string]any) WenmarVinEntity {
	return NewVehicleCodeEntityFunc(sdk, data)
}


// VehicleComplaint returns a VehicleComplaint entity bound to this client.
// Idiomatic usage: client.VehicleComplaint(nil).List(nil, nil) or
// client.VehicleComplaint(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleComplaint(data map[string]any) WenmarVinEntity {
	return NewVehicleComplaintEntityFunc(sdk, data)
}


// VehicleFluid returns a VehicleFluid entity bound to this client.
// Idiomatic usage: client.VehicleFluid(nil).List(nil, nil) or
// client.VehicleFluid(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleFluid(data map[string]any) WenmarVinEntity {
	return NewVehicleFluidEntityFunc(sdk, data)
}


// VehicleFuel returns a VehicleFuel entity bound to this client.
// Idiomatic usage: client.VehicleFuel(nil).List(nil, nil) or
// client.VehicleFuel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleFuel(data map[string]any) WenmarVinEntity {
	return NewVehicleFuelEntityFunc(sdk, data)
}


// VehicleInvestigation returns a VehicleInvestigation entity bound to this client.
// Idiomatic usage: client.VehicleInvestigation(nil).List(nil, nil) or
// client.VehicleInvestigation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleInvestigation(data map[string]any) WenmarVinEntity {
	return NewVehicleInvestigationEntityFunc(sdk, data)
}


// VehicleLabor returns a VehicleLabor entity bound to this client.
// Idiomatic usage: client.VehicleLabor(nil).List(nil, nil) or
// client.VehicleLabor(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleLabor(data map[string]any) WenmarVinEntity {
	return NewVehicleLaborEntityFunc(sdk, data)
}


// VehicleRecall returns a VehicleRecall entity bound to this client.
// Idiomatic usage: client.VehicleRecall(nil).List(nil, nil) or
// client.VehicleRecall(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleRecall(data map[string]any) WenmarVinEntity {
	return NewVehicleRecallEntityFunc(sdk, data)
}


// VehicleSafety returns a VehicleSafety entity bound to this client.
// Idiomatic usage: client.VehicleSafety(nil).List(nil, nil) or
// client.VehicleSafety(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleSafety(data map[string]any) WenmarVinEntity {
	return NewVehicleSafetyEntityFunc(sdk, data)
}


// VehicleSpec returns a VehicleSpec entity bound to this client.
// Idiomatic usage: client.VehicleSpec(nil).List(nil, nil) or
// client.VehicleSpec(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleSpec(data map[string]any) WenmarVinEntity {
	return NewVehicleSpecEntityFunc(sdk, data)
}


// VehicleTire returns a VehicleTire entity bound to this client.
// Idiomatic usage: client.VehicleTire(nil).List(nil, nil) or
// client.VehicleTire(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VehicleTire(data map[string]any) WenmarVinEntity {
	return NewVehicleTireEntityFunc(sdk, data)
}


// Vin returns a Vin entity bound to this client.
// Idiomatic usage: client.Vin(nil).List(nil, nil) or
// client.Vin(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) Vin(data map[string]any) WenmarVinEntity {
	return NewVinEntityFunc(sdk, data)
}


// VinBulletin returns a VinBulletin entity bound to this client.
// Idiomatic usage: client.VinBulletin(nil).List(nil, nil) or
// client.VinBulletin(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VinBulletin(data map[string]any) WenmarVinEntity {
	return NewVinBulletinEntityFunc(sdk, data)
}


// VinFluid returns a VinFluid entity bound to this client.
// Idiomatic usage: client.VinFluid(nil).List(nil, nil) or
// client.VinFluid(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VinFluid(data map[string]any) WenmarVinEntity {
	return NewVinFluidEntityFunc(sdk, data)
}


// VinFuel returns a VinFuel entity bound to this client.
// Idiomatic usage: client.VinFuel(nil).List(nil, nil) or
// client.VinFuel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VinFuel(data map[string]any) WenmarVinEntity {
	return NewVinFuelEntityFunc(sdk, data)
}


// VinLabor returns a VinLabor entity bound to this client.
// Idiomatic usage: client.VinLabor(nil).List(nil, nil) or
// client.VinLabor(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VinLabor(data map[string]any) WenmarVinEntity {
	return NewVinLaborEntityFunc(sdk, data)
}


// VinRecall returns a VinRecall entity bound to this client.
// Idiomatic usage: client.VinRecall(nil).List(nil, nil) or
// client.VinRecall(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VinRecall(data map[string]any) WenmarVinEntity {
	return NewVinRecallEntityFunc(sdk, data)
}


// VinSpec returns a VinSpec entity bound to this client.
// Idiomatic usage: client.VinSpec(nil).List(nil, nil) or
// client.VinSpec(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VinSpec(data map[string]any) WenmarVinEntity {
	return NewVinSpecEntityFunc(sdk, data)
}


// VinTire returns a VinTire entity bound to this client.
// Idiomatic usage: client.VinTire(nil).List(nil, nil) or
// client.VinTire(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WenmarVinSDK) VinTire(data map[string]any) WenmarVinEntity {
	return NewVinTireEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *WenmarVinSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewWenmarVinSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
