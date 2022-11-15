import * as BigNumber from 'bignumber.js';
import { Account } from '../rest';

export interface SummaryRow {
    account?: Account,
    monthlyAmounts: BigNumber.BigNumber[]
    total: BigNumber.BigNumber,
}