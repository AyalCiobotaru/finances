import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account, AccountsService, Transaction, TransactionsService } from 'src/app/rest';
import { TransactionDTO } from 'src/app/rest/model/transactionDTO';
import { TransactionFormComponent } from '../components/transaction-form-component/transaction-form.component';
import { DataManagerService } from './data-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CsvUtilService {

  constructor(private dataService: DataManagerService, private transactionsService: TransactionsService, private matDialogRef: MatDialog) { }

  public processWorkbook(workbook : any, formValues: any): Promise<any> {

    // our data is in the first sheet
    var firstSheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[firstSheetName];

    // we expect the following columns to be present
    var columns: any = {
        'A': formValues.columnA,
        'B': formValues.columnB,
        'C': formValues.columnC,
        'D': formValues.columnD,
        'E': formValues.columnE
    };    

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;
    var transactions : Transaction[] = [];

    return new Promise((resolve: any) => {
      while (worksheet['E' + rowIndex]) {
        console.log("Processing row: " + rowIndex);
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
        
        let transaction : TransactionDTO = {};
        try {
          // Create the id column for the dto
          row.creditAccountId = this.dataService.getAccounts().find(account => account.name?.toLowerCase() === row.creditAccountName.toLowerCase())?.id
          row.debitAccountId = this.dataService.getAccounts().find(account => account.name?.toLowerCase() === row.debitAccountName.toLowerCase())?.id
          
          if (row.creditAccountId === null || row.creditAccountId.length < 1 || row.debitAccountId === null || row.debitAccountId.length < 1) {
            this.matDialogRef.open(TransactionFormComponent, {
              data: row
            })
          } else {
            Object.assign(transaction, row);   
            transactions.push(transaction);
          }

        } catch (error : any) {
          console.log("Caught error on row: " + rowIndex)
          this.matDialogRef.open(TransactionFormComponent, {
            data: row
          })
        }

        rowIndex++;
      }
      console.log("Resolving out of csv-util.servise")
      resolve(transactions);
    })
  }
}
