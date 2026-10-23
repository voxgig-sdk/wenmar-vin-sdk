// Typed models for the WenmarVin SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/wenmar-vin-sdk/go/core"
)

// Batch is the typed data model for the batch entity.
type Batch struct {
}

// BatchCreateData is the typed request payload for Batch.CreateTyped.
type BatchCreateData struct {
	Include *string `json:"include,omitempty"`
	Vins []any `json:"vins"`
}

// Bulletin is the typed data model for the bulletin entity.
type Bulletin struct {
}

// BulletinLoadMatch is the typed request payload for Bulletin.LoadTyped.
type BulletinLoadMatch struct {
	Id string `json:"id"`
}

// BulletinListMatch is the typed request payload for Bulletin.ListTyped.
type BulletinListMatch struct {
	Code *string `json:"code,omitempty"`
	Component *string `json:"component,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Make *string `json:"make,omitempty"`
	Model *string `json:"model,omitempty"`
	Q *string `json:"q,omitempty"`
	Topic *string `json:"topic,omitempty"`
	Type *string `json:"type,omitempty"`
	Year *int `json:"year,omitempty"`
}

// Code is the typed data model for the code entity.
type Code struct {
}

// CodeLoadMatch is the typed request payload for Code.LoadTyped.
type CodeLoadMatch struct {
	Id string `json:"id"`
}

// CodeListMatch is the typed request payload for Code.ListTyped.
type CodeListMatch struct {
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
	System *string `json:"system,omitempty"`
}

// Data is the typed data model for the data entity.
type Data struct {
}

// DataLoadMatch is the typed request payload for Data.LoadTyped.
type DataLoadMatch struct {
	BuiltAt *string `json:"built_at,omitempty"`
	DataVersion *string `json:"data_version,omitempty"`
	Datasets *map[string]any `json:"datasets,omitempty"`
	ServerVersion *string `json:"server_version,omitempty"`
	VpicRelease *string `json:"vpic_release,omitempty"`
}

// Engine is the typed data model for the engine entity.
type Engine struct {
}

// EngineListMatch is the typed request payload for Engine.ListTyped.
type EngineListMatch struct {
	Make string `json:"make"`
	Model string `json:"model"`
	Submodel *string `json:"submodel,omitempty"`
	Term *string `json:"term,omitempty"`
	Year int `json:"year"`
}

// Entry is the typed data model for the entry entity.
type Entry struct {
}

// EntryLoadMatch is the typed request payload for Entry.LoadTyped.
type EntryLoadMatch struct {
	Id string `json:"id"`
}

// EntryListMatch is the typed request payload for Entry.ListTyped.
type EntryListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Q string `json:"q"`
	Scope *string `json:"scope,omitempty"`
}

// Job is the typed data model for the job entity.
type Job struct {
}

// JobLoadMatch is the typed request payload for Job.LoadTyped.
type JobLoadMatch struct {
	Id string `json:"id"`
}

// JobListMatch is the typed request payload for Job.ListTyped.
type JobListMatch struct {
	Attribution *[]any `json:"attribution,omitempty"`
	Components *[]any `json:"components,omitempty"`
	Estimates *any `json:"estimates,omitempty"`
	Excludes *[]any `json:"excludes,omitempty"`
	Id *string `json:"id,omitempty"`
	Includes *[]any `json:"includes,omitempty"`
	Name *string `json:"name,omitempty"`
	Note *string `json:"note,omitempty"`
	Related *[]any `json:"related,omitempty"`
	System *string `json:"system,omitempty"`
	SystemName *string `json:"system_name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Make is the typed data model for the make entity.
type Make struct {
}

// MakeLoadMatch is the typed request payload for Make.LoadTyped.
type MakeLoadMatch struct {
	Id string `json:"id"`
}

// MakeListMatch is the typed request payload for Make.ListTyped.
type MakeListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Scope *string `json:"scope,omitempty"`
	Term *string `json:"term,omitempty"`
	Year *int `json:"year,omitempty"`
}

// Model is the typed data model for the model entity.
type Model struct {
}

// ModelLoadMatch is the typed request payload for Model.LoadTyped.
type ModelLoadMatch struct {
	Make string `json:"make"`
	Model string `json:"model"`
}

// ModelListMatch is the typed request payload for Model.ListTyped.
type ModelListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Make string `json:"make"`
	Scope *string `json:"scope,omitempty"`
	Term *string `json:"term,omitempty"`
	Year *int `json:"year,omitempty"`
}

// Overview is the typed data model for the overview entity.
type Overview struct {
}

// OverviewListMatch is the typed request payload for Overview.ListTyped.
type OverviewListMatch struct {
	VehicleId string `json:"vehicle_id"`
}

// PartsCard is the typed data model for the parts_card entity.
type PartsCard struct {
}

// PartsCardListMatch is the typed request payload for PartsCard.ListTyped.
type PartsCardListMatch struct {
	VinId string `json:"vin_id"`
	Year *int `json:"year,omitempty"`
}

// PayrollDeduction is the typed data model for the payroll_deduction entity.
type PayrollDeduction struct {
}

// PayrollDeductionListMatch is the typed request payload for PayrollDeduction.ListTyped.
type PayrollDeductionListMatch struct {
	FederalClaim *string `json:"federal_claim,omitempty"`
	Frequency *string `json:"frequency,omitempty"`
	Gross *string `json:"gross,omitempty"`
	PayDate *string `json:"pay_date,omitempty"`
	Province *string `json:"province,omitempty"`
	ProvincialClaim *string `json:"provincial_claim,omitempty"`
	YtdCpp *string `json:"ytd_cpp,omitempty"`
	YtdCpp2 *string `json:"ytd_cpp2,omitempty"`
	YtdEi *string `json:"ytd_ei,omitempty"`
	YtdPensionable *string `json:"ytd_pensionable,omitempty"`
}

// Recall is the typed data model for the recall entity.
type Recall struct {
}

// RecallLoadMatch is the typed request payload for Recall.LoadTyped.
type RecallLoadMatch struct {
	Campaign string `json:"campaign"`
	Source string `json:"source"`
}

// RecallListMatch is the typed request payload for Recall.ListTyped.
type RecallListMatch struct {
	Component *string `json:"component,omitempty"`
	Country *string `json:"country,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Make *string `json:"make,omitempty"`
	Model *string `json:"model,omitempty"`
	Q *string `json:"q,omitempty"`
	Year *int `json:"year,omitempty"`
}

// RecallInvestigation is the typed data model for the recall_investigation entity.
type RecallInvestigation struct {
}

// RecallInvestigationListMatch is the typed request payload for RecallInvestigation.ListTyped.
type RecallInvestigationListMatch struct {
	Campaign string `json:"campaign"`
	RecallId string `json:"recall_id"`
}

// Recent is the typed data model for the recent entity.
type Recent struct {
}

// RecentListMatch is the typed request payload for Recent.ListTyped.
type RecentListMatch struct {
	Country *string `json:"country,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Make *string `json:"make,omitempty"`
	Since *string `json:"since,omitempty"`
}

// Submodel is the typed data model for the submodel entity.
type Submodel struct {
}

// SubmodelListMatch is the typed request payload for Submodel.ListTyped.
type SubmodelListMatch struct {
	Make string `json:"make"`
	Model string `json:"model"`
	Term *string `json:"term,omitempty"`
	Year int `json:"year"`
}

// Vehicle is the typed data model for the vehicle entity.
type Vehicle struct {
}

// VehicleListMatch is the typed request payload for Vehicle.ListTyped.
type VehicleListMatch struct {
	Scope *string `json:"scope,omitempty"`
	Term *string `json:"term,omitempty"`
}

// VehicleBulletin is the typed data model for the vehicle_bulletin entity.
type VehicleBulletin struct {
}

// VehicleBulletinListMatch is the typed request payload for VehicleBulletin.ListTyped.
type VehicleBulletinListMatch struct {
	Id string `json:"id"`
	Code *string `json:"code,omitempty"`
	Component *string `json:"component,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
	Topic *string `json:"topic,omitempty"`
	Type *string `json:"type,omitempty"`
}

// VehicleCode is the typed data model for the vehicle_code entity.
type VehicleCode struct {
}

// VehicleCodeLoadMatch is the typed request payload for VehicleCode.LoadTyped.
type VehicleCodeLoadMatch struct {
	Id string `json:"id"`
	VehicleId string `json:"vehicle_id"`
}

// VehicleComplaint is the typed data model for the vehicle_complaint entity.
type VehicleComplaint struct {
}

// VehicleComplaintListMatch is the typed request payload for VehicleComplaint.ListTyped.
type VehicleComplaintListMatch struct {
	Id string `json:"id"`
}

// VehicleFluid is the typed data model for the vehicle_fluid entity.
type VehicleFluid struct {
}

// VehicleFluidListMatch is the typed request payload for VehicleFluid.ListTyped.
type VehicleFluidListMatch struct {
	Id string `json:"id"`
}

// VehicleFuel is the typed data model for the vehicle_fuel entity.
type VehicleFuel struct {
}

// VehicleFuelListMatch is the typed request payload for VehicleFuel.ListTyped.
type VehicleFuelListMatch struct {
	Id string `json:"id"`
	Country *string `json:"country,omitempty"`
}

// VehicleInvestigation is the typed data model for the vehicle_investigation entity.
type VehicleInvestigation struct {
}

// VehicleInvestigationListMatch is the typed request payload for VehicleInvestigation.ListTyped.
type VehicleInvestigationListMatch struct {
	Id string `json:"id"`
	Status *string `json:"status,omitempty"`
}

// VehicleLabor is the typed data model for the vehicle_labor entity.
type VehicleLabor struct {
}

// VehicleLaborLoadMatch is the typed request payload for VehicleLabor.LoadTyped.
type VehicleLaborLoadMatch struct {
	Id string `json:"id"`
	VehicleId string `json:"vehicle_id"`
}

// VehicleLaborListMatch is the typed request payload for VehicleLabor.ListTyped.
type VehicleLaborListMatch struct {
	Id string `json:"id"`
}

// VehicleRecall is the typed data model for the vehicle_recall entity.
type VehicleRecall struct {
}

// VehicleRecallListMatch is the typed request payload for VehicleRecall.ListTyped.
type VehicleRecallListMatch struct {
	Id string `json:"id"`
	Country *string `json:"country,omitempty"`
}

// VehicleSafety is the typed data model for the vehicle_safety entity.
type VehicleSafety struct {
}

// VehicleSafetyListMatch is the typed request payload for VehicleSafety.ListTyped.
type VehicleSafetyListMatch struct {
	Id string `json:"id"`
}

// VehicleSpec is the typed data model for the vehicle_spec entity.
type VehicleSpec struct {
}

// VehicleSpecListMatch is the typed request payload for VehicleSpec.ListTyped.
type VehicleSpecListMatch struct {
	Id string `json:"id"`
}

// VehicleTire is the typed data model for the vehicle_tire entity.
type VehicleTire struct {
}

// VehicleTireListMatch is the typed request payload for VehicleTire.ListTyped.
type VehicleTireListMatch struct {
	Id string `json:"id"`
}

// Vin is the typed data model for the vin entity.
type Vin struct {
}

// VinLoadMatch is the typed request payload for Vin.LoadTyped.
type VinLoadMatch struct {
	Id string `json:"id"`
	Year *int `json:"year,omitempty"`
}

// VinBulletin is the typed data model for the vin_bulletin entity.
type VinBulletin struct {
}

// VinBulletinListMatch is the typed request payload for VinBulletin.ListTyped.
type VinBulletinListMatch struct {
	Id string `json:"id"`
	Code *string `json:"code,omitempty"`
	Component *string `json:"component,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Q *string `json:"q,omitempty"`
	Topic *string `json:"topic,omitempty"`
	Type *string `json:"type,omitempty"`
	Year *int `json:"year,omitempty"`
}

// VinFluid is the typed data model for the vin_fluid entity.
type VinFluid struct {
}

// VinFluidListMatch is the typed request payload for VinFluid.ListTyped.
type VinFluidListMatch struct {
	Id string `json:"id"`
	Year *int `json:"year,omitempty"`
}

// VinFuel is the typed data model for the vin_fuel entity.
type VinFuel struct {
}

// VinFuelListMatch is the typed request payload for VinFuel.ListTyped.
type VinFuelListMatch struct {
	Id string `json:"id"`
	Country *string `json:"country,omitempty"`
	Year *int `json:"year,omitempty"`
}

// VinLabor is the typed data model for the vin_labor entity.
type VinLabor struct {
}

// VinLaborLoadMatch is the typed request payload for VinLabor.LoadTyped.
type VinLaborLoadMatch struct {
	Id string `json:"id"`
	VinId string `json:"vin_id"`
	Year *int `json:"year,omitempty"`
}

// VinLaborListMatch is the typed request payload for VinLabor.ListTyped.
type VinLaborListMatch struct {
	Id string `json:"id"`
	Year *int `json:"year,omitempty"`
}

// VinRecall is the typed data model for the vin_recall entity.
type VinRecall struct {
}

// VinRecallListMatch is the typed request payload for VinRecall.ListTyped.
type VinRecallListMatch struct {
	Id string `json:"id"`
	Country *string `json:"country,omitempty"`
	Year *int `json:"year,omitempty"`
}

// VinSpec is the typed data model for the vin_spec entity.
type VinSpec struct {
}

// VinSpecListMatch is the typed request payload for VinSpec.ListTyped.
type VinSpecListMatch struct {
	Id string `json:"id"`
	Year *int `json:"year,omitempty"`
}

// VinTire is the typed data model for the vin_tire entity.
type VinTire struct {
}

// VinTireListMatch is the typed request payload for VinTire.ListTyped.
type VinTireListMatch struct {
	Id string `json:"id"`
	Year *int `json:"year,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
