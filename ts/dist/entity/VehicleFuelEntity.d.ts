import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleFuel, VehicleFuelListMatch } from '../WenmarVinTypes';
declare class VehicleFuelEntity extends WenmarVinEntityBase<VehicleFuel> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleFuelEntity): VehicleFuelEntity;
    list(this: any, reqmatch?: VehicleFuelListMatch, ctrl?: Control): Promise<VehicleFuelEntity[]>;
}
export { VehicleFuelEntity };
