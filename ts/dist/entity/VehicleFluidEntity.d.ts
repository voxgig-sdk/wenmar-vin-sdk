import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleFluid, VehicleFluidListMatch } from '../WenmarVinTypes';
declare class VehicleFluidEntity extends WenmarVinEntityBase<VehicleFluid> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleFluidEntity): VehicleFluidEntity;
    list(this: any, reqmatch?: VehicleFluidListMatch, ctrl?: Control): Promise<VehicleFluidEntity[]>;
}
export { VehicleFluidEntity };
