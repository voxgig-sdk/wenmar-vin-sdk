import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VinLabor, VinLaborLoadMatch, VinLaborListMatch } from '../WenmarVinTypes';
declare class VinLaborEntity extends WenmarVinEntityBase<VinLabor> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VinLaborEntity): VinLaborEntity;
    load(this: any, reqmatch?: VinLaborLoadMatch, ctrl?: Control): Promise<VinLaborEntity>;
    list(this: any, reqmatch?: VinLaborListMatch, ctrl?: Control): Promise<VinLaborEntity[]>;
}
export { VinLaborEntity };
