import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleComplaint, VehicleComplaintListMatch } from '../WenmarVinTypes';
declare class VehicleComplaintEntity extends WenmarVinEntityBase<VehicleComplaint> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleComplaintEntity): VehicleComplaintEntity;
    list(this: any, reqmatch?: VehicleComplaintListMatch, ctrl?: Control): Promise<VehicleComplaintEntity[]>;
}
export { VehicleComplaintEntity };
