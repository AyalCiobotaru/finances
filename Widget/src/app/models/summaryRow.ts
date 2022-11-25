import * as BigNumber from 'bignumber.js';
import { Account } from '../rest';

export interface SummaryRow {
    id?: String,
    account?: Account,
    monthlyAmounts: BigNumber.BigNumber[]
    total: BigNumber.BigNumber,
    rollOver: BigNumber.BigNumber
}