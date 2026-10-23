import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { RecallInvestigation, RecallInvestigationListMatch } from '../WenmarVinTypes';
declare class RecallInvestigationEntity extends WenmarVinEntityBase<RecallInvestigation> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: RecallInvestigationEntity): RecallInvestigationEntity;
    list(this: any, reqmatch?: RecallInvestigationListMatch, ctrl?: Control): Promise<RecallInvestigationEntity[]>;
}
export { RecallInvestigationEntity };
