import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Job, JobLoadMatch, JobListMatch } from '../WenmarVinTypes';
declare class JobEntity extends WenmarVinEntityBase<Job> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: JobEntity): JobEntity;
    load(this: any, reqmatch?: JobLoadMatch, ctrl?: Control): Promise<JobEntity>;
    list(this: any, reqmatch?: JobListMatch, ctrl?: Control): Promise<JobEntity[]>;
}
export { JobEntity };
