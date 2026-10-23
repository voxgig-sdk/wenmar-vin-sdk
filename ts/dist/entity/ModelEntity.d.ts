import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Model, ModelLoadMatch, ModelListMatch } from '../WenmarVinTypes';
declare class ModelEntity extends WenmarVinEntityBase<Model> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: ModelEntity): ModelEntity;
    load(this: any, reqmatch?: ModelLoadMatch, ctrl?: Control): Promise<ModelEntity>;
    list(this: any, reqmatch?: ModelListMatch, ctrl?: Control): Promise<ModelEntity[]>;
}
export { ModelEntity };
