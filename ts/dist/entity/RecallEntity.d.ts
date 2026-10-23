import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Recall, RecallLoadMatch, RecallListMatch } from '../WenmarVinTypes';
declare class RecallEntity extends WenmarVinEntityBase<Recall> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: RecallEntity): RecallEntity;
    load(this: any, reqmatch?: RecallLoadMatch, ctrl?: Control): Promise<RecallEntity>;
    list(this: any, reqmatch?: RecallListMatch, ctrl?: Control): Promise<RecallEntity[]>;
}
export { RecallEntity };
