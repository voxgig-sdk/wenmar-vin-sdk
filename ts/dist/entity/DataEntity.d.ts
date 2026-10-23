import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Data, DataLoadMatch } from '../WenmarVinTypes';
declare class DataEntity extends WenmarVinEntityBase<Data> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: DataEntity): DataEntity;
    load(this: any, reqmatch?: DataLoadMatch, ctrl?: Control): Promise<DataEntity>;
}
export { DataEntity };
