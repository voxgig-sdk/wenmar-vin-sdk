import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Vin, VinLoadMatch } from '../WenmarVinTypes';
declare class VinEntity extends WenmarVinEntityBase<Vin> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VinEntity): VinEntity;
    load(this: any, reqmatch?: VinLoadMatch, ctrl?: Control): Promise<VinEntity>;
}
export { VinEntity };
