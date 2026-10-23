import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VehicleBulletin, VehicleBulletinListMatch } from '../WenmarVinTypes';
declare class VehicleBulletinEntity extends WenmarVinEntityBase<VehicleBulletin> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VehicleBulletinEntity): VehicleBulletinEntity;
    list(this: any, reqmatch?: VehicleBulletinListMatch, ctrl?: Control): Promise<VehicleBulletinEntity[]>;
}
export { VehicleBulletinEntity };
