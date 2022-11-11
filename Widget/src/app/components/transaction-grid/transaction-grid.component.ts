import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Transaction,  } from 'src/generated/ts';
import { CsvUpdateUploaderComponent } from '../csv-update-uploader/csv-update-uploader.component';
import { CsvUtilService } from '../../services/csv-util.service';
import { ColDef, FirstDataRenderedEvent,  } from 'ag-grid-community';
import { DataManagerService } from '../../services/data-manager.service';
import { TransactionFormComponent } from '../transaction-form-component/transaction-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.scss']
})
export class TransactionGridComponent implements OnInit {

   /**
   * The grids datasource containing the data to display.
   */
  dataSource = new MatTableDataSource<Transaction>();
  
  /** The grid Api */
  public gridApi: any

  /**
   * Column Definitions
   */
  public columnDefs: ColDef[] = [];

  private transactionChangesSubscription: Subscription;

  constructor(public dialog: MatDialog, private csvUtilService: CsvUtilService, private dataService: DataManagerService) { 
    this.transactionChangesSubscription = this.dataService.getTransactionChanges().subscribe(this.handleTransactionChanges.bind(this));
  }

  ngOnInit(): void {
    this.dataService.instantiateAccountData().then(() => {
      this.setupGrid();
    })
  }

  gridOptions = {
    // defaultColDef: {
    //   filter: true,
    //   sortable: true,
    //   // editable: this.getIsAdmin.bind(this),
    //   resizable: true
    // },
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
        field: 'creditAccount',
        filter: 'set',
        cellRenderer: this.getAccountName,
        
      },
      {
        headerName: 'Date',
        field: 'date',
        filter: 'date'
      },
      {
        headerName: 'Description',
        field: 'description',
        filter: true
      },
      {
        headerName: 'Debit',
        field: 'debitAccount',
        filter: 'set',
        cellRenderer: this.getAccountName,
        
      },
      {
        headerName: 'Amount',
        field: 'amount',
        filter: 'number',
        valueFormatter: params => "$  " + params.value.toFixed(2)
      }
    ];

    this.columnDefs = colDefs;
  }

  private getAccountName(params: any) {
    return params.value.name;
  }

  // public CellEdittingStopped(params: any) {
  //   if (this.isAdmin) {
  //     let cg1vUserList : Cg1vUser[] = [];
  //     cg1vUserList.push(params.data);
  //     this.userService.updateCg1vUser(cg1vUserList).subscribe();
  //   }
  // }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // params.api.sizeColumnsToFit();
  }

  public renderRowsToFit() {
    this.gridApi.sizeColumnsToFit();
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
      // If there was no import,
      if (!result || !result.wb || !result.wb.Sheets) {
          return;
      }

      // Else, start the loading and continue
      const promise = this.csvUtilService.processWorkbook(result.wb);
      this.gridApi.showLoadingOverlay();

      // finally, reload the data
      promise.then((transactions)=> {
        console.log("Making call to backend")
        this.dataService.updateTransactions(transactions).then(() => {
          this.dataSource.data = this.dataService.getTransactions();
          this.gridApi.refreshCells();
          this.gridApi.hideOverlay();
        })
      });
    });
  }

  public addTransaction() {
    const formDialog = this.dialog.open(TransactionFormComponent);
    
  }

  private handleTransactionChanges() {
    this.dataSource.data = this.dataService.getTransactions();
  }
}
