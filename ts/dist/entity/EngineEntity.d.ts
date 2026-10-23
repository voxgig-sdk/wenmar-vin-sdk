import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Engine, EngineListMatch } from '../WenmarVinTypes';
declare class EngineEntity extends WenmarVinEntityBase<Engine> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: EngineEntity): EngineEntity;
    list(this: any, reqmatch?: EngineListMatch, ctrl?: Control): Promise<EngineEntity[]>;
}
export { EngineEntity };
