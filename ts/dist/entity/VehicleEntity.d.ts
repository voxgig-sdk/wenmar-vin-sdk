import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Vehicle, VehicleListMatch } from '../WenmarVinTypes';
declare class VehicleEntity extends WenmarVinEntityBase<Vehicle> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleEntity): VehicleEntity;
    list(this: any, reqmatch?: VehicleListMatch, ctrl?: Control): Promise<VehicleEntity[]>;
}
export { VehicleEntity };
