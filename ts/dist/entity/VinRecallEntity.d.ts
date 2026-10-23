import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VinRecall, VinRecallListMatch } from '../WenmarVinTypes';
declare class VinRecallEntity extends WenmarVinEntityBase<VinRecall> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VinRecallEntity): VinRecallEntity;
    list(this: any, reqmatch?: VinRecallListMatch, ctrl?: Control): Promise<VinRecallEntity[]>;
}
export { VinRecallEntity };
