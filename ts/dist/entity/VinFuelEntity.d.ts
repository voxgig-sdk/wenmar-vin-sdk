import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VinFuel, VinFuelListMatch } from '../WenmarVinTypes';
declare class VinFuelEntity extends WenmarVinEntityBase<VinFuel> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VinFuelEntity): VinFuelEntity;
    list(this: any, reqmatch?: VinFuelListMatch, ctrl?: Control): Promise<VinFuelEntity[]>;
}
export { VinFuelEntity };
