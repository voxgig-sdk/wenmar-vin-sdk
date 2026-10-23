import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { Entry, EntryLoadMatch, EntryListMatch } from '../WenmarVinTypes';
declare class EntryEntity extends WenmarVinEntityBase<Entry> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: EntryEntity): EntryEntity;
    load(this: any, reqmatch?: EntryLoadMatch, ctrl?: Control): Promise<EntryEntity>;
    list(this: any, reqmatch?: EntryListMatch, ctrl?: Control): Promise<EntryEntity[]>;
}
export { EntryEntity };
