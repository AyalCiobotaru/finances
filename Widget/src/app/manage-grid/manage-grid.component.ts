import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Account, AccountsService, Transaction, TransactionsService } from 'src/generated/ts';
import { CsvUpdateUploaderComponent } from '../csv-update-uploader/csv-update-uploader.component';
import { CsvUtilService } from '../services/csv-util.service';
import { ColDef, FirstDataRenderedEvent, ValueFormatterParams } from 'ag-grid-community';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-manage-grid',
  templateUrl: './manage-grid.component.html',
  styleUrls: ['./manage-grid.component.scss']
})
export class ManageGridComponent implements OnInit {

   /**
   * The grids datasource containing the data to display.
   */
  dataSource = new MatTableDataSource<Transaction>();
  
  /** The grid Api */
  public gridApi: any

  public columnDefs: ColDef[] = [];

  constructor(public dialog: MatDialog, private csvUtilService: CsvUtilService, private dataService: DataManagerService) { 
  }

  ngOnInit(): void {
    this.dataService.instantiateAccountData().then(() => {
      this.setupGrid();
    })
  }

  gridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      // editable: this.getIsAdmin.bind(this),
      resizable: true
    },
    context: {parentComponent: this},
    // onCellEditingStopped: this.CellEdittingStopped.bind(this) 
  }

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    minWidth: 150
  }

  private setupGrid() {

    let colDefs: ColDef[] = [
      {
        headerName: 'Credit',
        field: 'credit-account-id',
      
        cellRenderer: this.getAccountName,
        cellRendererParams: {
          accounts: this.dataService.getAccounts()
        }
      },
      {
        headerName: 'Date',
        field: 'date'
      },
      {
        headerName: 'Description',
        field: 'description'
      },
      {
        headerName: 'Debit',
        field: 'debit-account-id',
        cellRenderer: this.getAccountName,
        cellRendererParams: {
          accounts: this.dataService.getAccounts()
        }
      },
      {
        headerName: 'Amount',
        field: 'amount',
        valueFormatter: params => "$  " + params.value.toFixed(2)
      }
    ];

    this.columnDefs = colDefs;
  }

  private getAccountName(params: any) {
    return params.accounts.find((account: Account) => account.id === params.value).name
  }

  // public CellEdittingStopped(params: any) {
  //   if (this.isAdmin) {
  //     let cg1vUserList : Cg1vUser[] = [];
  //     cg1vUserList.push(params.data);
  //     this.userService.updateCg1vUser(cg1vUserList).subscribe();
  //   }
  // }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params : any) {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();
    this.dataService.instantiateTransactionData().then(() => {
      this.gridApi.hideOverlay();
      this.dataSource.data = this.dataService.getTransactions();
    });

  }

  public exportCSV() {
    this.gridApi.exportDataAsCsv();
  }

  public importCSV() {
    const dialogRef = this.dialog.open(CsvUpdateUploaderComponent, {
      height: '396px',
      width: '325px',
      data: {
        dataSource: MatTableDataSource 
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      // After the dialog closes

      // If there was no import,
      if (!result || !result.wb || !result.wb.Sheets) {
          // Return with no changes
          return;
      }

      // Else, start the loading and continue
      const promise = this.csvUtilService.populateGrid(result.wb);
      this.gridApi.showLoadingOverlay();

      // finally, reload the data
      promise.then((transactions)=> {
        this.dataService.updateTransactions(transactions).then(() => {
          this.dataSource.data = this.dataService.getTransactions();
          this.gridApi.refreshCells();
          this.gridApi.hideOverlay();
        })
      });
    });
  }

  
  private padLeft(text:string, padChar:string, size:number): string {
      return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
  }
}
