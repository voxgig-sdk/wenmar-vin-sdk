package voxgigwenmarvinsdk

import (
	"github.com/voxgig-sdk/wenmar-vin-sdk/go/core"
	"github.com/voxgig-sdk/wenmar-vin-sdk/go/entity"
	"github.com/voxgig-sdk/wenmar-vin-sdk/go/feature"
	_ "github.com/voxgig-sdk/wenmar-vin-sdk/go/utility"
)

// Type aliases preserve external API.
type WenmarVinSDK = core.WenmarVinSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WenmarVinEntity = core.WenmarVinEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WenmarVinError = core.WenmarVinError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewBatchEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewBatchEntity(client, entopts)
	}
	core.NewBulletinEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewBulletinEntity(client, entopts)
	}
	core.NewCodeEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewCodeEntity(client, entopts)
	}
	core.NewDataEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewDataEntity(client, entopts)
	}
	core.NewEngineEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewEngineEntity(client, entopts)
	}
	core.NewEntryEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewEntryEntity(client, entopts)
	}
	core.NewJobEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewJobEntity(client, entopts)
	}
	core.NewMakeEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewMakeEntity(client, entopts)
	}
	core.NewModelEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewModelEntity(client, entopts)
	}
	core.NewOverviewEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewOverviewEntity(client, entopts)
	}
	core.NewPartsCardEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewPartsCardEntity(client, entopts)
	}
	core.NewPayrollDeductionEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewPayrollDeductionEntity(client, entopts)
	}
	core.NewRecallEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewRecallEntity(client, entopts)
	}
	core.NewRecallInvestigationEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewRecallInvestigationEntity(client, entopts)
	}
	core.NewRecentEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewRecentEntity(client, entopts)
	}
	core.NewSubmodelEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewSubmodelEntity(client, entopts)
	}
	core.NewVehicleEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleEntity(client, entopts)
	}
	core.NewVehicleBulletinEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleBulletinEntity(client, entopts)
	}
	core.NewVehicleCodeEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleCodeEntity(client, entopts)
	}
	core.NewVehicleComplaintEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleComplaintEntity(client, entopts)
	}
	core.NewVehicleFluidEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleFluidEntity(client, entopts)
	}
	core.NewVehicleFuelEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleFuelEntity(client, entopts)
	}
	core.NewVehicleInvestigationEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleInvestigationEntity(client, entopts)
	}
	core.NewVehicleLaborEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleLaborEntity(client, entopts)
	}
	core.NewVehicleRecallEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleRecallEntity(client, entopts)
	}
	core.NewVehicleSafetyEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleSafetyEntity(client, entopts)
	}
	core.NewVehicleSpecEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleSpecEntity(client, entopts)
	}
	core.NewVehicleTireEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVehicleTireEntity(client, entopts)
	}
	core.NewVinEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVinEntity(client, entopts)
	}
	core.NewVinBulletinEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVinBulletinEntity(client, entopts)
	}
	core.NewVinFluidEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVinFluidEntity(client, entopts)
	}
	core.NewVinFuelEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVinFuelEntity(client, entopts)
	}
	core.NewVinLaborEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVinLaborEntity(client, entopts)
	}
	core.NewVinRecallEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVinRecallEntity(client, entopts)
	}
	core.NewVinSpecEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVinSpecEntity(client, entopts)
	}
	core.NewVinTireEntityFunc = func(client *core.WenmarVinSDK, entopts map[string]any) core.WenmarVinEntity {
		return entity.NewVinTireEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWenmarVinSDK = core.NewWenmarVinSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewWenmarVinSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *WenmarVinSDK  { return NewWenmarVinSDK(nil) }
func Test() *WenmarVinSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
