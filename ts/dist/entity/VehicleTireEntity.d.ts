import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleTire, VehicleTireListMatch } from '../WenmarVinTypes';
declare class VehicleTireEntity extends WenmarVinEntityBase<VehicleTire> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleTireEntity): VehicleTireEntity;
    list(this: any, reqmatch?: VehicleTireListMatch, ctrl?: Control): Promise<VehicleTireEntity[]>;
}
export { VehicleTireEntity };
