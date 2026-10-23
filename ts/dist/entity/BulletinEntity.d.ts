import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Bulletin, BulletinLoadMatch, BulletinListMatch } from '../WenmarVinTypes';
declare class BulletinEntity extends WenmarVinEntityBase<Bulletin> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: BulletinEntity): BulletinEntity;
    load(this: any, reqmatch?: BulletinLoadMatch, ctrl?: Control): Promise<BulletinEntity>;
    list(this: any, reqmatch?: BulletinListMatch, ctrl?: Control): Promise<BulletinEntity[]>;
}
export { BulletinEntity };
