import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Make, MakeLoadMatch, MakeListMatch } from '../WenmarVinTypes';
declare class MakeEntity extends WenmarVinEntityBase<Make> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: MakeEntity): MakeEntity;
    load(this: any, reqmatch?: MakeLoadMatch, ctrl?: Control): Promise<MakeEntity>;
    list(this: any, reqmatch?: MakeListMatch, ctrl?: Control): Promise<MakeEntity[]>;
}
export { MakeEntity };
