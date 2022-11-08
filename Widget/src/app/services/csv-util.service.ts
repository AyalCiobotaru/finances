import { Injectable } from '@angular/core';
import { Account, AccountsService, Transaction, TransactionsService } from 'src/generated/ts';

@Injectable({
  providedIn: 'root'
})
export class CsvUtilService {

  constructor(private accountService: AccountsService, private transactionsService: TransactionsService) { }

  public processWorkbook(workbook : any): Promise<any> {

    // our data is in the first sheet
    var firstSheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[firstSheetName];

    // we expect the following columns to be present
    var columns: any = {
        'A': 'amount',
        'B': 'credit-account-id',
        'C': 'date',
        'D': 'debit-account-id',
        'E': 'description'
    };    

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;
    var transactions : Transaction[] = [];

    return new Promise((resolve: any) => {
      while (worksheet['A' + rowIndex]) {
        let row : any = {};
        Object.keys(columns).forEach(function(column: any) {
            let cell = worksheet[column + rowIndex];
            // cell.v is the 'rawValue' of the cell
            // cell.w is the 'formattedText' of the cell which is only availble for some cells
            if (cell) {
              row[columns[column]] = cell.w ? cell.w : cell.v;
            }
        });
        let d: Date = new Date(row.date);
        row.date = d.toISOString();

        let transaction : Transaction = {};
        Object.assign(transaction, row);

        transactions.push(transaction);

        rowIndex++;
      }
      resolve(transactions);
    })
  }
}
