import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Submodel, SubmodelListMatch } from '../WenmarVinTypes';
declare class SubmodelEntity extends WenmarVinEntityBase<Submodel> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: SubmodelEntity): SubmodelEntity;
    list(this: any, reqmatch?: SubmodelListMatch, ctrl?: Control): Promise<SubmodelEntity[]>;
}
export { SubmodelEntity };
