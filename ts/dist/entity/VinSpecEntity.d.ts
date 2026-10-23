import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VinSpec, VinSpecListMatch } from '../WenmarVinTypes';
declare class VinSpecEntity extends WenmarVinEntityBase<VinSpec> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VinSpecEntity): VinSpecEntity;
    list(this: any, reqmatch?: VinSpecListMatch, ctrl?: Control): Promise<VinSpecEntity[]>;
}
export { VinSpecEntity };
