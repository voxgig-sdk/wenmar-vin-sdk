import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Recent, RecentListMatch } from '../WenmarVinTypes';
declare class RecentEntity extends WenmarVinEntityBase<Recent> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: RecentEntity): RecentEntity;
    list(this: any, reqmatch?: RecentListMatch, ctrl?: Control): Promise<RecentEntity[]>;
}
export { RecentEntity };
