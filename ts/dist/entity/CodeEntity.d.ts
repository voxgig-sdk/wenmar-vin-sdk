import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Code, CodeLoadMatch, CodeListMatch } from '../WenmarVinTypes';
declare class CodeEntity extends WenmarVinEntityBase<Code> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: CodeEntity): CodeEntity;
    load(this: any, reqmatch?: CodeLoadMatch, ctrl?: Control): Promise<CodeEntity>;
    list(this: any, reqmatch?: CodeListMatch, ctrl?: Control): Promise<CodeEntity[]>;
}
export { CodeEntity };
