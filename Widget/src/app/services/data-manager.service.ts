import { Injectable } from '@angular/core';
import { Account, AccountsService, ParentCategory, ParentCategoryService, Transaction, TransactionsService } from 'src/app/rest';
import * as BigNumber from 'bignumber.js';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private accountMap: Map<string, Account>;

  private transactionMap: Map<string, Transaction>;

  /**
   * List of months Map with account -> amount for given month
   */
  private summaryList : Map<string, BigNumber.BigNumber>[];

  constructor(private transactionService: TransactionsService, private accountService: AccountsService, private messagingService: MessagingService) {
    this.accountMap = new Map<string, Account>();
    this.transactionMap = new Map<string, Transaction>();
    this.summaryList = [];
    for (let index = 0; index < 12; index++) {
      this.summaryList.push(new Map<string, BigNumber.BigNumber>());
    }
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
                if (transaction.debitAccount.type === "Income") {
                  map.set(transaction.debitAccount.name!,  (map.get(transaction.debitAccount.name!)  ? map.get(transaction.debitAccount.name!) : new BigNumber.BigNumber(0))!.plus(transaction.amount!));
                } else {
                  map.set(transaction.debitAccount.name!,  (map.get(transaction.debitAccount.name!)  ? map.get(transaction.debitAccount.name!) : new BigNumber.BigNumber(0))!.minus(transaction.amount!));
                }
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
        this.messagingService.transactionsChanged();
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
        this.messagingService.transactionsChanged();
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
    return Array.from(this.accountMap.values()).sort((a: Account, b: Account) => {
      if(a && a.name && b && b.name) {
        return a.name.localeCompare(b.name);
      } else {
        return 0;
      }
    });
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
  /**
   * Utility function to add commas to numbers
   * @param number number to add commas
   * @returns the number with commas every 3 digits
   */
  public numberWithCommas(number: BigNumber.BigNumber | Number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
   
}
