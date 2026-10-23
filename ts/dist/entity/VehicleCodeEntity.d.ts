import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleCode, VehicleCodeLoadMatch } from '../WenmarVinTypes';
declare class VehicleCodeEntity extends WenmarVinEntityBase<VehicleCode> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleCodeEntity): VehicleCodeEntity;
    load(this: any, reqmatch?: VehicleCodeLoadMatch, ctrl?: Control): Promise<VehicleCodeEntity>;
}
export { VehicleCodeEntity };
