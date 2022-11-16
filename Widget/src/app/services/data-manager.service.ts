import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account, AccountsService, ParentCategory, ParentCategoryService, Transaction, TransactionsService } from 'src/app/rest';
import * as BigNumber from 'bignumber.js';
import { NodeWithI18n } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private accountMap: Map<string, Account>;

  private transactionMap: Map<string, Transaction>;

  private transactionChanges : Subject<void>;

  /**
   * List of months Map with account -> amount for given month
   */
  private summaryList : Map<string, BigNumber.BigNumber>[];

  constructor(private transactionService: TransactionsService, private accountService: AccountsService, private parentCategoryService: ParentCategoryService) {
    this.accountMap = new Map<string, Account>();
    this.transactionMap = new Map<string, Transaction>();
    this.transactionChanges = new Subject<void>();
    this.summaryList = [];
    for (let index = 0; index < 12; index++) {
      this.summaryList.push(new Map<string, BigNumber.BigNumber>());
    }
  }

  public getTransactionChanges() : Observable<void> {
    return this.transactionChanges.asObservable();
  }

  public instantiateAccountData() {
    return new Promise<void>((resolve, reject) => {
      this.accountService.getAllAccounts().subscribe((accounts: Account[]) => {
        accounts.forEach((account: Account) => {
          if (account.id) {
            this.accountMap.set(account.id, account);
          } else {
            console.log("Error, account without id", account);
            reject();
          }
        })
        resolve();
      })
    })
  }

  public instantiateTransactionData() {
    return new Promise<void>((resolve, reject) => {
      this.transactionService.getAllTransactions().subscribe((transactions: Transaction[]) => {
        transactions.forEach((transaction: Transaction) => {
          if (transaction.id) {
            this.transactionMap.set(transaction.id, transaction);

            // Aggregate the monthly summaries for each account
            if (transaction.date){
              let month = new Date(transaction.date).getMonth();
              let map = this.summaryList.at(month);
              
              if (map && transaction.creditAccount && transaction.debitAccount) {
                map.set(transaction.creditAccount.name!, (map.get(transaction.creditAccount.name!) ? map.get(transaction.creditAccount.name!) : new BigNumber.BigNumber(0))!.plus(transaction.amount!));
                map.set(transaction.debitAccount.name!,  (map.get(transaction.debitAccount.name!)  ? map.get(transaction.debitAccount.name!) : new BigNumber.BigNumber(0))!.minus(transaction.amount!));
              } else {
                console.log("An Account in transaction is null or it doesn't have a name")
                console.log(transaction);
              }
            } else {
              console.log("Missing Date for transaction");
              console.log(transaction);
            }
          } else {
            console.log("Error, transaction without id", transaction);
            reject()
          }
        })
        this.transactionChanges.next();
        resolve();
      })
    })
  } 

  public updateTransactions(transactions: Transaction[]) {
    return new Promise<void>((resolve) => {
      this.transactionService.updateTransactions(transactions).subscribe((updatedTransactions: Transaction[]) => {
        updatedTransactions.forEach((transaction: Transaction) => {
          if (transaction.id) {
            this.transactionMap.set(transaction.id, transaction);
          } else {
            console.log("Invalid transaction, no id", transaction);
          }
        })
        this.transactionChanges.next();
        resolve()
      }, (error: any) => {
        console.log("Failed to update transaction")
        console.log(error);
      })
    })
  }

  /**
     * Gets all the accounts as a list.
     * @returns The accounts in the map.
     */
   public getAccounts(): Account[] {
    return Array.from(this.accountMap.values());
  }

  /**
     * Gets all the accounts as a map.
     * @returns The account map.
     */
  public getAccountMap(): Map<string, Account> {
    return this.accountMap;
  }

  /**
     * Gets all the transactions.
     * @returns The transaction in the map.
     */
   public getTransactions(): Transaction[] {
    return Array.from(this.transactionMap.values());
  }

  /**
     * Gets the summary list.
     * @returns The summary list.
     */
   public getSummaryList(): Map<string, BigNumber.BigNumber>[] {
    return this.summaryList;
  }
   
}
