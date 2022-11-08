import { Injectable } from '@angular/core';
import { Account, AccountsService, ParentCategory, ParentCategoryService, Transaction, TransactionsService } from 'src/generated/ts';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private accountMap: Map<string, Account>;

  private transactionMap: Map<string, Transaction>;

  constructor(private transactionService: TransactionsService, private accountService: AccountsService, private parentCategoryService: ParentCategoryService) {
    this.accountMap = new Map<string, Account>();
    this.transactionMap = new Map<string, Transaction>();
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
          } else {
            console.log("Error, transaction without id", transaction);
            reject()
          }
        })
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
        resolve()
        })
      }, (error: any) => {
        console.log("Failed to update transaction")
        console.log(error);
      })
    })
  }

  /**
     * Gets all the accounts.
     * @returns The accounts in the map.
     */
   public getAccounts(): Account[] {
    return Array.from(this.accountMap.values());
  }

  /**
     * Gets all the accounts.
     * @returns The accounts in the map.
     */
   public getTransactions(): Transaction[] {
    return Array.from(this.transactionMap.values());
  }
   
}
