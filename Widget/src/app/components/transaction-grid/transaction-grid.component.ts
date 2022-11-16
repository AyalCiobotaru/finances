import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Account, Transaction,  } from 'src/app/rest';
import { CsvUpdateUploaderComponent } from '../csv-update-uploader/csv-update-uploader.component';
import { CsvUtilService } from '../../services/csv-util.service';
import { ColDef, FirstDataRenderedEvent, GridOptions,  } from 'ag-grid-community';
import { DataManagerService } from '../../services/data-manager.service';
import { TransactionFormComponent } from '../transaction-form-component/transaction-form.component';
import { Observable } from 'rxjs';
import { FilterUtilService } from 'src/app/services/filter-util.service';
import { FormControl } from '@angular/forms';

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

  public filteredAccounts?: Observable<Account[]>;

  public filterFormControl = new FormControl<String | Account | null>("");

  private filterAccount?: Account;

  constructor(public dialog: MatDialog, private csvUtilService: CsvUtilService, private dataService: DataManagerService, public filterService: FilterUtilService) { 
    this.dataService.getTransactionChanges().subscribe(this.handleTransactionChanges.bind(this));
  }

  ngOnInit(): void {
    this.dataService.instantiateAccountData().then(() => {
      this.filterFormControl.valueChanges.subscribe(response => {
        if (typeof response === 'object') {
          this.filterAccount = (response as Account);
          this.gridApi.onFilterChanged();
        } else {
          // If there is an account to filter on but the response is not an object, then the filter needs to be removed
          if (this.filterAccount !== undefined) {
            this.filterAccount = undefined;
            this.gridApi.onFilterChanged();
          }
        }
      })

      this.filteredAccounts = this.filterService.filterForm(this.filterFormControl, this.dataService.getAccounts(), "")
      this.setupGrid();
    })
  }

  gridOptions: GridOptions = {
    isExternalFilterPresent: this.isExternalFilterPresent.bind(this),
    doesExternalFilterPass: this.doesExternalFilterPass.bind(this),
    // onCellEditingStopped: this.CellEdittingStopped.bind(this) 
  }

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: 'agSetColumnFilter',
    minWidth: 150
  }

  private setupGrid() {

    let colDefs: ColDef[] = [
      {
        headerName: 'Debit',
        field: 'debitAccount',
        valueFormatter: this.getAccountNameById,
        valueGetter: (params) => {
          return params.data.debitAccount.id;
        },
        valueParser: (params) => {
          return this.getAccountNameById(params);
        },
        filterParams: {
          accounts: this.dataService.getAccounts(),
          valueFormatter: this.getAccountNameById
        }
      },
      {
        headerName: 'Date',
        field: 'date',
        valueFormatter: (params) => {
          return new Date(params.value).toLocaleDateString();
        },
        sort: 'desc'
      },
      {
        headerName: 'Description',
        field: 'description',
      },
      {
        headerName: 'Credit',
        field: 'creditAccount',
        valueFormatter: this.getAccountNameById,
        valueGetter: (params) => {
          return params.data.creditAccount.id;
        },
        valueParser: (params) => {
          return this.getAccountNameById(params);
        },
        filterParams: {
          accounts: this.dataService.getAccounts(),
          valueFormatter: this.getAccountNameById
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

  private getAccountNameById(params: any) {
    return params.colDef.filterParams.accounts.find((account: Account) => account.id === params.value).name;
  }

  public isExternalFilterPresent() : boolean {
    return this.filterAccount !== undefined;
  }

  public doesExternalFilterPass(node: any): boolean {
    if (this.filterAccount) {
      return this.filterAccount.id == node.data.creditAccount.id || this.filterAccount.id == node.data.debitAccount.id
    } else {
      return false
    }
  }


  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  public renderRowsToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady(params : any) {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();
    this.gridApi.hideOverlay();
    this.dataSource.data = this.dataService.getTransactions();
  }

  public exportCSV() {
    this.gridApi.exportDataAsCsv();
  }

  public importCSV() {
    const dialogRef = this.dialog.open(CsvUpdateUploaderComponent, {
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
      const promise = this.csvUtilService.processWorkbook(result.wb, result.form.value);
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
