import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleLabor, VehicleLaborLoadMatch, VehicleLaborListMatch } from '../WenmarVinTypes';
declare class VehicleLaborEntity extends WenmarVinEntityBase<VehicleLabor> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleLaborEntity): VehicleLaborEntity;
    load(this: any, reqmatch?: VehicleLaborLoadMatch, ctrl?: Control): Promise<VehicleLaborEntity>;
    list(this: any, reqmatch?: VehicleLaborListMatch, ctrl?: Control): Promise<VehicleLaborEntity[]>;
}
export { VehicleLaborEntity };
