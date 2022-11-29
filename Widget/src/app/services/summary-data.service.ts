import { Injectable } from '@angular/core';
import { ValueCache } from 'ag-grid-community';
import * as BigNumber from 'bignumber.js';
import { SummaryRow } from '../models/summaryRow';
import { Account } from '../rest';
import { DataManagerService } from './data-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryDataService {

  /**
  * Stores the data while aggregating for quick access account id -> summaryRow
  */
  private rowData : Map<string, SummaryRow> = new Map<string, SummaryRow>();

  constructor(private dataService: DataManagerService) { }

  /**
   * Helper function to do the initial aggregation of all the months totals for each account.
   * @returns List of summary rows that holds the totals of each month for each account
   */
  public aggregateSummaryData(): Promise<SummaryRow[]> {
    return new Promise<SummaryRow[]>((resolve) => { this.dataService.instantiateTransactionData().then(() => {
      let accounts: Account[] = this.dataService.getAccounts();
      for (let account of accounts) {
        if (account.parentCategory?.name !== "Catch-All")
        {
          if (account.id) {
            let summaryRow: SummaryRow = {
              id: account.id,
              account: account,
              monthlyAmounts: new Array<BigNumber.BigNumber>(12),
              // Checkbox in header defaults to true, add the rollover amount initially
              total: account.rollover ? BigNumber.BigNumber(account.rollover) : BigNumber.BigNumber(0),
              rollOver: account.rollover ? BigNumber.BigNumber(account.rollover) : BigNumber.BigNumber(0)
            }
  
            // initialize bigNumber array
            for (let index = 0; index < 12; index++) {
              summaryRow.monthlyAmounts[index] = new BigNumber.BigNumber(0);
            }
            this.rowData.set(account.id, summaryRow);
  
          } else {
            console.log("Missing account name when attempting to create summaryRow");
            console.log(account);
          }
        }
      }

      let summaryList = this.dataService.getSummaryList();
      // for every map (Jan - Dec), add the amount to the current account amount
      for (let index = 0; index < summaryList.length; index++) {

        const summaryMap = summaryList[index];
        for (let summary of summaryMap) {
          // Gets the summaryRow based off the account name
          let summaryRow = this.rowData.get(this.dataService.getAccountMap().get(summary[0])?.id!);
          if (summaryRow) {

            // Make sure the summary row isn't undefined or null
            if (!summaryRow.monthlyAmounts[index]) {
              summaryRow.monthlyAmounts[index] = new BigNumber.BigNumber(0);
            }
            summaryRow.monthlyAmounts[index] = summary[1];
            if (!summaryRow.total) {
              summaryRow.total = new BigNumber.BigNumber(0);
            }
            summaryRow.total = summaryRow.total.plus(summary[1]);
          }
        }
      }
      let data = Array.from(this.rowData.values());
      resolve(Array.from(data));
      })
    })
  }

  /**
   * helper function that will only go through the actual accounts to add or remove the rollover
   * @param addRollover boolean to add or remove the rollover amount
   */
  public adjustTotals(addRollover: Boolean) {
    this.rowData.forEach((value, key) => {
      if (value.account?.type === "Actual") {
        if (addRollover) {
          value.total = value.total.plus(value.rollOver);
        } else {
          value.total = value.total.minus(value.rollOver);
        }
      }
    })
  }

  public getRowData() : SummaryRow[] {
    return Array.from(this.rowData.values());
  }

  public getRowMap(): Map<string, SummaryRow> {
    return this.rowData;
  }

  public adjustMonthlyAmounts(amount: BigNumber.BigNumber, month: number, accountId: string) {
    let row = this.rowData.get(accountId);
    
    if (row) {
      row.total = row.total.plus(amount);
      row.monthlyAmounts[month] = row?.monthlyAmounts[month].plus(amount);
      this.rowData.set(accountId, row);
    }
  }
}
    
