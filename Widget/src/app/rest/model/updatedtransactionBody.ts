/**
 * Cheabs Finances
 * Service to finances
 *
 * The version of the OpenAPI document: 1.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import * as BigNumber from 'bignumber.js'
import { TransactionDTO } from './transactionDTO'

export interface updatedTransactionBody {
    oldTransaction: TransactionDTO;
    updatedTransaction: TransactionDTO;
}

