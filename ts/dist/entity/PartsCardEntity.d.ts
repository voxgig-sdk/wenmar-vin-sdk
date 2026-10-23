import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { PartsCard, PartsCardListMatch } from '../WenmarVinTypes';
declare class PartsCardEntity extends WenmarVinEntityBase<PartsCard> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: PartsCardEntity): PartsCardEntity;
    list(this: any, reqmatch?: PartsCardListMatch, ctrl?: Control): Promise<PartsCardEntity[]>;
}
export { PartsCardEntity };
