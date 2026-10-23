package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBatchEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewBulletinEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewCodeEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewDataEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewEngineEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewEntryEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewJobEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewMakeEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewModelEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewOverviewEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewPartsCardEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewPayrollDeductionEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewRecallEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewRecallInvestigationEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewRecentEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewSubmodelEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleBulletinEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleCodeEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleComplaintEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleFluidEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleFuelEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleInvestigationEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleLaborEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleRecallEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleSafetyEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleSpecEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVehicleTireEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVinEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVinBulletinEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVinFluidEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVinFuelEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVinLaborEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVinRecallEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVinSpecEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

var NewVinTireEntityFunc func(client *WenmarVinSDK, entopts map[string]any) WenmarVinEntity

