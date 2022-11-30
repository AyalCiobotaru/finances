import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Account, Transaction, TransactionDTO,  } from 'src/app/rest';
import { CsvUpdateUploaderComponent } from '../csv-update-uploader/csv-update-uploader.component';
import { CsvUtilService } from '../../services/csv-util.service';
import { CellDoubleClickedEvent, CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridOptions, KeyCreatorParams, ValueGetterParams, ValueSetterParams,  } from 'ag-grid-community';
import { DataManagerService } from '../../services/data-manager.service';
import { TransactionFormComponent } from '../transaction-form-component/transaction-form.component';
import { Observable } from 'rxjs';
import { FilterUtilService } from 'src/app/services/filter-util.service';
import { FormControl } from '@angular/forms';
import { MessagingService } from 'src/app/services/messaging.service';
import { DateEditorComponent } from './date-editor/date-editor.component';
import * as BigNumber from 'bignumber.js';
import { updatedTransactionBody } from 'src/app/rest/model/updatedtransactionBody';
import { TransactionActionComponent } from './transaction-action/transaction-action.component';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.scss']
})
export class TransactionGridComponent implements OnInit {

   /**
   * The grids datasource containing the data to display.
   */
  public dataSource = new MatTableDataSource<Transaction>();
  
  /** The grid Api. */
  public gridApi: any

  /**
   * Column Definitions.
   */
  public columnDefs: ColDef[] = [];

  /**
   * List for accounts that pass the autocomplete filter.
   */
  public filteredAccounts?: Observable<Account[]>;

  /**
   * The form control that will display the autocomplete for filtering.
   */
  public filterFormControl = new FormControl<String | Account | null>("");

  /**
   * The account to filter using the dropdown.
   */
  private filterAccount?: Account;

  /**
   * The account and month to filter by.
   */
  private accountByDateFilter?: Account;
  private dateFilterIndex?: number;

  constructor(public dialog: MatDialog, private csvUtilService: CsvUtilService, private dataService: DataManagerService, public filterService: FilterUtilService, private messagingService: MessagingService) { 
    this.messagingService.getTransactionChangesAsObservable().subscribe(this.handleTransactionChanges.bind(this));
    this.messagingService.getCellDoubleClickedAsObservable().subscribe(this.handleCellDoubleClickedInSummary.bind(this));
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
    onCellValueChanged: this.cellValueChanged.bind(this),
  }

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    editable: true,
    filter: 'agSetColumnFilter',
    minWidth: 150
  }

  /**
   * Gets called once the grid is ready and gets the data.
   * @param params 
   */
     public onGridReady(params : any) {
      this.gridApi = params.api;
      this.gridApi.showLoadingOverlay();
      this.gridApi.hideOverlay();
      this.dataSource.data = this.dataService.getTransactions();
    }

  /**
   * Defines the columns and how to parse, render, and edit the data.
   */
  private setupGrid() {
    let colDefs: ColDef[] = [
      { 
        width: 35,
        minWidth: 35,
        cellRenderer: TransactionActionComponent,
        sortable: false,
        cellClass: "grid-cell-centered"
      },
      {
        colId: "0",
        headerName: 'Debit',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.debitAccount.name;
        },
        valueSetter: (params: ValueSetterParams) => {
          let newAccount = params.newValue;
          if (!params.data.debitAccount) {
            throw Error("Missing Account");
          }
          let valueChanged = params.data.debitAccount.id !== newAccount.id;
          if (valueChanged) {
            params.data.debitAccount = newAccount; 
          }
          return valueChanged;
        },
        filterParams: {
          accounts: this.dataService.getAccounts(),
          valueFormatter: this.getAccountNameById
        },
        cellEditorPopup: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
          values: this.dataService.getAccounts(),
          formatValue: (value: any) => { return (typeof value === 'string') ? value : value.name },
        },
        keyCreator: (params: KeyCreatorParams) => {
          return params.value.name;
        }
      },
      {
        colId: "1",
        headerName: 'Date',
        field: 'date',
        valueFormatter: (params) => {
          return new Date(params.value).toLocaleDateString();
        },
        cellEditor: DateEditorComponent,
        sort: 'desc'
      },
      {
        colId: "2",
        headerName: 'Description',
        field: 'description',
      },
      {
        colId: "3",
        headerName: 'Credit',
        valueGetter: (params: ValueGetterParams) => {
          return params.data.creditAccount.name;
        },
        valueSetter: (params: ValueSetterParams) => {
          let newAccount = params.newValue;
          if (!params.data.creditAccount) {
            throw Error("Missing Account");
          }
          let valueChanged = params.data.creditAccount.id !== newAccount.id;
          if (valueChanged) {
            params.data.creditAccount = newAccount; 
          }
          return valueChanged;
        },
        filterParams: {
          accounts: this.dataService.getAccounts(),
          valueFormatter: this.getAccountNameById
        },
        cellEditorPopup: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
          values: this.dataService.getAccounts().sort((a: Account, b: Account) => {
            if(a && a.name && b && b.name) {
              return a.name.localeCompare(b.name);
            } else {
              return 0;
            }
          }),
          formatValue: (value: any) => { return (typeof value === 'string') ? value : value.name },
        },
        keyCreator: (params: KeyCreatorParams) => {
          return params.value.name;
        }
      },
      {
        colId: "4",
        headerName: 'Amount',
        field: 'amount',
        valueFormatter: params => {
          return "$  " + (typeof params.value === "string" ? this.dataService.numberWithCommas(Number(params.value)) :this.dataService.numberWithCommas(params.value));
        }
      }
    ];
    this.columnDefs = colDefs;
  }

  // #region External Filter 
  /**
   * AG Grid event handler to tell the grid if it should run `doesExternalFilterPass`.
   * @returns true or false if there is an external filter.
   */
  public isExternalFilterPresent() : boolean {
    return this.filterAccount !== undefined || this.accountByDateFilter !== undefined;
  }

  /**
   * Goes through each node in the data to see if it passes the external filter.
   * @param node the node to test against.
   * @returns true if it passes and should be visible, false otherwise.
   */
  public doesExternalFilterPass(node: any): boolean {
    if (this.filterAccount) {
      return this.filterAccount.id == node.data.creditAccount.id || this.filterAccount.id == node.data.debitAccount.id
    } else if (this.accountByDateFilter) {
      let passesAccountFilter = (this.accountByDateFilter.id == node.data.creditAccount.id) || (this.accountByDateFilter.id == node.data.debitAccount.id);
      if (passesAccountFilter) {
        return new Date(node.data.date).getMonth() == this.dateFilterIndex;
      } else {
        return false;
      }
    } else {
      return false
    }
  }

  // #endregion

  /**
  * Event handler for when a value has changed in a cell.
  * @param params CellValueChangedParams
  */
  public cellValueChanged(params: CellValueChangedEvent) {
    let updatedTransactionBody: updatedTransactionBody = {
      oldTransaction: JSON.parse(JSON.stringify(params.data)),
      updatedTransaction: JSON.parse(JSON.stringify(params.data))
    };
    let descriptionChange = false;
    updatedTransactionBody.updatedTransaction.creditAccountId = params.data.creditAccount.id;
    updatedTransactionBody.updatedTransaction.debitAccountId = params.data.debitAccount.id;
    updatedTransactionBody.updatedTransaction.amount = BigNumber.BigNumber(params.data.amount);
    updatedTransactionBody.oldTransaction.creditAccountId = params.data.creditAccount.id;
    updatedTransactionBody.oldTransaction.debitAccountId = params.data.debitAccount.id;
    updatedTransactionBody.oldTransaction.amount = BigNumber.BigNumber(params.data.amount);


    switch (params.column.getColId()) {
      case "0":
        updatedTransactionBody.oldTransaction.debitAccountId = this.dataService.getAccountMap().get(params.oldValue)?.id;
        break;
      case "1":
        updatedTransactionBody.oldTransaction.date = params.oldValue;
        updatedTransactionBody.updatedTransaction.date = new Date(params.newValue).toISOString();
        break;
      case "2":
        updatedTransactionBody.oldTransaction.description = params.oldValue;
        descriptionChange = true;
        break;
      case "3":
        updatedTransactionBody.oldTransaction.creditAccountId = this.dataService.getAccountMap().get(params.oldValue)?.id;
        break;
      case "4":
        updatedTransactionBody.oldTransaction.amount = BigNumber.BigNumber(params.oldValue);
        updatedTransactionBody.updatedTransaction.amount = BigNumber.BigNumber(params.newValue);
        break;

      }

    if (!descriptionChange) {
      // Need to do the inverse transaction to fix the totals
      this.messagingService.accountMonthlyTotalChanges(updatedTransactionBody.oldTransaction, true);
    }

    this.dataService.updateTransactions(updatedTransactionBody).then((transaction: Transaction) => {
      let transactionDTO: TransactionDTO = transaction;
      transactionDTO.creditAccountId = transaction.creditAccount?.id;
      transactionDTO.debitAccountId = transaction.debitAccount?.id;
      this.messagingService.accountMonthlyTotalChanges(transactionDTO);
    });
  }

  /**
   * Will size the grid appriopriately for the screen.
   * @param params used to get the grid api
   */
  public onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  /**
   * Helper function to resize the rows used when switching tabs.
   */
  public renderRowsToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  /**
   * Helper function to get the name of an account by it's id.
   * @param params any params from an event that need to use this function.
   * @returns the account name if it is found by it's id.
   */
   private getAccountNameById(params: any) {
    let val = params.value ? params.value : params.newValue;
    return params.colDef.filterParams.accounts.find((account: Account) => account.id === val).name;
  }

  // #region Button Handler
  /**
   * Button click handler, simple export.
   */
  public exportCSV() {
    this.gridApi.exportDataAsCsv();
  }

  /**
   * Button click handler, will import a csv file.
   */
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
      promise.then(transactions => {
        this.dataService.addTransactions(transactions).then(() => {
          this.dataSource.data = this.dataService.getTransactions();
          this.gridApi.refreshCells();
          this.gridApi.hideOverlay();
        })
      });
    });
  }

  /**
   * Button click handler, pops open the form.
   */
  public addTransaction() {
    const formDialog = this.dialog.open(TransactionFormComponent);
  }

  /**
   * Butoon click handler, clears all filters.
   */
  public clearFilters() {
    this.accountByDateFilter = undefined;
    this.filterAccount = undefined;
    this.gridApi.onFilterChanged();
  }

  // #endregion

  // #region Observer Handler
  /**
   * Observer handler for transaction changes.
   */
  private handleTransactionChanges() {
    this.dataSource.data = this.dataService.getTransactions();
  }

  /**
   * 
   * @param event Observer handler for a cell in the Summary tab being double clicked.
   */
  private handleCellDoubleClickedInSummary(event: CellDoubleClickedEvent) {
    this.accountByDateFilter = event.data.account;
    this.dateFilterIndex = parseInt(event.column.getColId());
    this.gridApi.onFilterChanged()

  }
  // #endregion
}
