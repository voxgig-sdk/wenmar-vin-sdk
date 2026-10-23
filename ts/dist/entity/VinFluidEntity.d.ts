import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VinFluid, VinFluidListMatch } from '../WenmarVinTypes';
declare class VinFluidEntity extends WenmarVinEntityBase<VinFluid> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VinFluidEntity): VinFluidEntity;
    list(this: any, reqmatch?: VinFluidListMatch, ctrl?: Control): Promise<VinFluidEntity[]>;
}
export { VinFluidEntity };
