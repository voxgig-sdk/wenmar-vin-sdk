import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleSafety, VehicleSafetyListMatch } from '../WenmarVinTypes';
declare class VehicleSafetyEntity extends WenmarVinEntityBase<VehicleSafety> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleSafetyEntity): VehicleSafetyEntity;
    list(this: any, reqmatch?: VehicleSafetyListMatch, ctrl?: Control): Promise<VehicleSafetyEntity[]>;
}
export { VehicleSafetyEntity };
