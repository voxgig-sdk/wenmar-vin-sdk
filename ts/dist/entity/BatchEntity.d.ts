import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Batch, BatchCreateData } from '../WenmarVinTypes';
declare class BatchEntity extends WenmarVinEntityBase<Batch> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: BatchEntity): BatchEntity;
    create(this: any, reqdata?: BatchCreateData, ctrl?: Control): Promise<BatchEntity>;
}
export { BatchEntity };
