import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleInvestigation, VehicleInvestigationListMatch } from '../WenmarVinTypes';
declare class VehicleInvestigationEntity extends WenmarVinEntityBase<VehicleInvestigation> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleInvestigationEntity): VehicleInvestigationEntity;
    list(this: any, reqmatch?: VehicleInvestigationListMatch, ctrl?: Control): Promise<VehicleInvestigationEntity[]>;
}
export { VehicleInvestigationEntity };
