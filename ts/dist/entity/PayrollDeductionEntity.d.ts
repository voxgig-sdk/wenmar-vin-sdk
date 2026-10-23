import { WenmarVinEntityBase } from '../WenmarVinEntityBase';
import type { WenmarVinSDK } from '../WenmarVinSDK';
import type { Control } from '../types';
import type { PayrollDeduction, PayrollDeductionListMatch } from '../WenmarVinTypes';
declare class PayrollDeductionEntity extends WenmarVinEntityBase<PayrollDeduction> {
    constructor(client: WenmarVinSDK, entopts: any);
    make(this: PayrollDeductionEntity): PayrollDeductionEntity;
    list(this: any, reqmatch?: PayrollDeductionListMatch, ctrl?: Control): Promise<PayrollDeductionEntity[]>;
}
export { PayrollDeductionEntity };
