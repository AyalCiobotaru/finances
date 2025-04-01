import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDTO } from 'src/app/rest/model/transactionDTO';
import { TransactionFormComponent } from '../components/transaction-form-component/transaction-form.component';
import { DataManagerService } from './data-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CsvUtilService {

  constructor(private dataService: DataManagerService, private matDialogRef: MatDialog) { }

  public async processWorkbook(workbook: any, formValues: any): Promise<TransactionDTO[]> {
    // our data is in the first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
  
    // we expect the following columns to be present
    const columns: any = {
      'A': formValues.columnA,
      'B': formValues.columnB,
      'C': formValues.columnC,
      'D': formValues.columnD,
      'E': formValues.columnE
    };
  
    let rowIndex = 2;
    const transactions: TransactionDTO[] = [];
  
    while (worksheet['E' + rowIndex]) {
      let row: any = {};
      Object.keys(columns).forEach((column: string) => {
        const cell = worksheet[column + rowIndex];
        if (cell) {
          // Use raw value for 'amount', formatted text for others if available
          row[columns[column]] = columns[column] === 'amount' ? cell.v : (cell.w ? cell.w : cell.v);
        }
      });
  
      // Ensure the date is properly formatted
      const d: Date = new Date(row.date);
      row.date = d.toISOString();
  
      let transactionDTO: TransactionDTO = {};
      try {
        // Assign account IDs based on account names (case-insensitive match)
        row.creditAccountId = this.dataService
          .getAccounts()
          .find(account => account.name?.toLowerCase() === row.creditAccountName.toLowerCase())?.id
        row.debitAccountId = this.dataService
          .getAccounts()
          .find(account => account.name?.toLowerCase() === row.debitAccountName.toLowerCase())?.id
  
        // If any required account id is missing, open a dialog and wait for the user to fill in the data
        if (!row.creditAccountId || !row.debitAccountId) {
          const result = await this.matDialogRef
            .open(TransactionFormComponent, { data: row })
            .afterClosed()
            .toPromise();
          if (result) {
            row = result; // update row data from the dialog result
          }
        }
        Object.assign(transactionDTO, row);
        transactions.push(transactionDTO)
      } catch (error) {
        console.log("Caught error on row: " + rowIndex)
        // In case of an error, open the dialog and wait for the result before proceeding
        const result = await this.matDialogRef
          .open(TransactionFormComponent, { data: row })
          .afterClosed()
          .toPromise();
        if (result) {
          row = result;
          Object.assign(transactionDTO, row);
          transactions.push(transactionDTO);
        }
      }
  
      rowIndex++;
    }
    return transactions
  }
}
