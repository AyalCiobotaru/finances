import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ColDef, FirstDataRenderedEvent, GridApi, GridOptions, RowGroupingDisplayType } from 'ag-grid-community';
import * as BigNumber from 'bignumber.js';
import { SummaryRow } from 'src/app/models/summaryRow';
import { TransactionDTO } from 'src/app/rest';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { SummaryDataService } from 'src/app/services/summary-data.service';
import { VisibilityHeaderComponent } from '../visibility-header/visibility-header.component';
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
    this.messagingService.getAccountMonthlyTotalChanges().subscribe(updateMessage => this.handleAccountMonthlyTotalChanges(updateMessage))
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

  public onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }
  
  public renderRowsToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  private handleAccountMonthlyTotalChanges(updateMessage: {updateBody: TransactionDTO, inverted: boolean}) {
    if (typeof updateMessage.updateBody.amount == "number" || typeof updateMessage.updateBody.amount == "string") {
      updateMessage.updateBody.amount = BigNumber.BigNumber(updateMessage.updateBody.amount);
    }
    let debitAccount = this.summaryService.getRowMap().get(updateMessage.updateBody.debitAccountId!);

    if (updateMessage.inverted) {
      this.summaryService.adjustMonthlyAmounts(updateMessage.updateBody.amount!.negated(), new Date(updateMessage.updateBody.date!).getMonth(), updateMessage.updateBody.creditAccountId!);
      this.summaryService.adjustMonthlyAmounts(debitAccount?.account?.type === "Income" ? updateMessage.updateBody.amount!.negated() : updateMessage.updateBody.amount!, new Date(updateMessage.updateBody.date!).getMonth(), updateMessage.updateBody.debitAccountId!);
    } else {
      this.summaryService.adjustMonthlyAmounts(updateMessage.updateBody.amount!, new Date(updateMessage.updateBody.date!).getMonth(), updateMessage.updateBody.creditAccountId!);
      this.summaryService.adjustMonthlyAmounts(debitAccount?.account?.type === "Income" ? updateMessage.updateBody.amount! : updateMessage.updateBody.amount!.negated(), new Date(updateMessage.updateBody.date!).getMonth(), updateMessage.updateBody.debitAccountId!);
    }
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
          }),
          headerComponent: VisibilityHeaderComponent
        }
      )
    }
      
    

    this.columnDefs = colDefs;
  }
}
