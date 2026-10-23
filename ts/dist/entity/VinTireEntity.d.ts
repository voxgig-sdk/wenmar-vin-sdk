import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VinTire, VinTireListMatch } from '../WenmarVinTypes';
declare class VinTireEntity extends WenmarVinEntityBase<VinTire> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VinTireEntity): VinTireEntity;
    list(this: any, reqmatch?: VinTireListMatch, ctrl?: Control): Promise<VinTireEntity[]>;
}
export { VinTireEntity };
