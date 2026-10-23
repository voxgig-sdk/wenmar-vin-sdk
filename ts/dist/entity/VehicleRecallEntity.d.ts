import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleRecall, VehicleRecallListMatch } from '../WenmarVinTypes';
declare class VehicleRecallEntity extends WenmarVinEntityBase<VehicleRecall> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleRecallEntity): VehicleRecallEntity;
    list(this: any, reqmatch?: VehicleRecallListMatch, ctrl?: Control): Promise<VehicleRecallEntity[]>;
}
export { VehicleRecallEntity };
