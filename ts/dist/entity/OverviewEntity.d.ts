import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Overview, OverviewListMatch } from '../WenmarVinTypes';
declare class OverviewEntity extends WenmarVinEntityBase<Overview> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: OverviewEntity): OverviewEntity;
    list(this: any, reqmatch?: OverviewListMatch, ctrl?: Control): Promise<OverviewEntity[]>;
}
export { OverviewEntity };
