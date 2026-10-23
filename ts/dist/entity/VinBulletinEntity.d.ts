import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { VinBulletin, VinBulletinListMatch } from '../WenmarVinTypes';
declare class VinBulletinEntity extends WenmarVinEntityBase<VinBulletin> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: VinBulletinEntity): VinBulletinEntity;
    list(this: any, reqmatch?: VinBulletinListMatch, ctrl?: Control): Promise<VinBulletinEntity[]>;
}
export { VinBulletinEntity };
