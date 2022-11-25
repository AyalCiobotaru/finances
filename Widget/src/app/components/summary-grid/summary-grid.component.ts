import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ColDef, GridApi, GridOptions, RowGroupingDisplayType } from 'ag-grid-community';
import * as BigNumber from 'bignumber.js';
import { SummaryRow } from 'src/app/models/summaryRow';
import { Transaction } from 'src/app/rest';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { SummaryDataService } from 'src/app/services/summary-data.service';
import { CheckmarkHeaderComponent } from './checkmark-header/checkmark-header.component';

@Component({
  selector: 'app-summary-grid',
  templateUrl: './summary-grid.component.html',
  styleUrls: ['./summary-grid.component.scss']
})
export class SummaryGridComponent implements OnInit {

  /**
  * The grids datasource containing the data to display.
  */
  dataSource = new MatTableDataSource<SummaryRow>();

  /** The grid Api */
  public gridApi!: GridApi

  /**
  * Column Definitions
  */
  public columnDefs: ColDef[] = [];

  /**
   * List of months to use for summary
   */
  private months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          
  /**
   * Don't create a column for the grouping of the rows
   */
  public groupDisplayType: RowGroupingDisplayType  = 'groupRows';
  
  /**
   * Default to expanding one of the groups
   */
  public groupDefaultExpanded = 1;
  
  constructor(private dataService: DataManagerService, private messagingService: MessagingService, private summaryService: SummaryDataService) { }

  ngOnInit(): void {
    this.dataService.instantiateAccountData().then(() => {
      this.setupDataSource();
      this.setupGrid();
    })
    this.messagingService.getAddRolloverAsObservable().subscribe(event => this.handleAddRollOver(event))
    this.messagingService.getAccountMonthlyTotalChanges().subscribe(transactions => this.handleAccountMonthlyTotalChanges(transactions))
  }

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: 'agSetColumnFilter',
    width: 75
  }

  gridOptions: GridOptions = {
    onCellDoubleClicked: (params) => this.messagingService.cellDoubleClicked(params),
    onFirstDataRendered: (params) => this.onFirstDataRendered(params),
    getRowId: params => params.data.id

  }

  public onGridReady(params : any) {
    this.gridApi = params.api;
    this.renderRowsToFit();
  }

  public onFirstDataRendered(params: any) {
    params.gridApi.sizeColumnsToFit();
  }
  
  public renderRowsToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  private handleAccountMonthlyTotalChanges(transactions: Transaction[]) {
    transactions.forEach(transaction => {
      if (typeof transaction.amount == "number") {
        transaction.amount = BigNumber.BigNumber(transaction.amount);
      }
      this.summaryService.adjustMonthlyAmounts(transaction.amount!, new Date(transaction.date!).getMonth(), transaction.creditAccount?.name!);
      this.summaryService.adjustMonthlyAmounts(transaction.amount!.negated(), new Date(transaction.date!).getMonth(), transaction.debitAccount?.name!);
    })
    this.dataSource.data = this.summaryService.getRowData();
    this.gridApi.refreshCells();
  }

  private handleAddRollOver(bool: Boolean) {
    this.summaryService.adjustTotals(bool);
    this.dataSource.data = this.summaryService.getRowData();
    this.gridApi.refreshCells();
  }
  
  /**
   * Grab the transactions and create the Summary Row Data
   */
  private setupDataSource() {
    this.summaryService.aggregateSummaryData().then((response: SummaryRow[]) => {
      this.dataSource.data = response;
    })
  }

  /**
   * Set up the columns for the grid
   */
  private setupGrid() {
    let colDefs: ColDef[] = [
      {
        headerName: 'Type',
        field: 'type',
        hide: true,
        rowGroup: true,
        valueGetter: (params) => {
          if (params.data && params.data.account.type) {
            return params.data.account.type
          }
        }
      },
      {
        headerName: 'Parent Category',
        field: 'parentCategory',
        hide: true,
        rowGroup: true,
        valueGetter: (params) => {
          if (params.data && params.data.account.parentCategory) {
            return params.data.account.parentCategory.name
          }
        }
      },
      {
        headerName: 'Account',
        field: 'account',
        width: 125,
        valueGetter: (params) => {
          if (params.data){
            return params.data.account.name
          }
        }
      }
    ];
  
    // Create a column for each month
    for (let month = 0; month < this.months.length; month++) {
      colDefs.push(
        {
          headerName: this.months[month],
          valueGetter: (params => {
            if (params.data) {
              if (params.data.monthlyAmounts[month] < 0)
              {
                return '$  (' + this.dataService.numberWithCommas((params.data.monthlyAmounts[month] as BigNumber.BigNumber).abs()) + ')'
              } else {
                return '$  ' + this.dataService.numberWithCommas(params.data.monthlyAmounts[month]);
              }
            } else {
              return "";
            }
          })
        }
      )
    }
      
    colDefs.push(
      {
        headerName: 'Total',
        headerComponent: CheckmarkHeaderComponent,
        field: 'total',
        valueFormatter: (params) => {
          if (params.value < 0) {
            return `$  (` + this.dataService.numberWithCommas(params.value) + ')'
          } else {
            return '$  ' + this.dataService.numberWithCommas(params.value)
          }
        }
      }
    );

    this.columnDefs = colDefs;
  }
}
