import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleSpec, VehicleSpecListMatch } from '../WenmarVinTypes';
declare class VehicleSpecEntity extends WenmarVinEntityBase<VehicleSpec> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleSpecEntity): VehicleSpecEntity;
    list(this: any, reqmatch?: VehicleSpecListMatch, ctrl?: Control): Promise<VehicleSpecEntity[]>;
}
export { VehicleSpecEntity };
