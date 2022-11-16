import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ColDef, GridOptions, RowGroupingDisplayType } from 'ag-grid-community';
import * as BigNumber from 'bignumber.js';
import { SummaryRow } from 'src/app/models/summaryRow';
import { Account } from 'src/app/rest';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { MessagingService } from 'src/app/services/messaging.service';

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
  public gridApi: any

  /**
  * Column Definitions
  */
  public columnDefs: ColDef[] = [];

  /**
  * Stores the data while aggregating before inserting it into the grid
  */
  private rowData : Map<string, SummaryRow> = new Map<string, SummaryRow>();

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
  
  constructor(private dataService: DataManagerService, private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.dataService.instantiateAccountData().then(() => {
      this.setupDataSource();
      this.setupGrid();
    })
  }

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: 'agSetColumnFilter',
    width: 75
  }

  gridOptions: GridOptions = {
    onCellDoubleClicked: (params) => this.messagingService.cellDoubleClicked(params)
  }

  /**
   * Grab the transactions and create the Summary Row Data
   */
  private setupDataSource() {
    this.dataService.instantiateTransactionData().then(() => {
      let accounts: Account[] = this.dataService.getAccounts();
      for (var account of accounts) {
        if (account.parentCategory?.name !== "Catch-All")
        {
          if (account.name) {
            let summaryRow: SummaryRow = {
              account: account,
              monthlyAmounts: new Array<BigNumber.BigNumber>(12),
              total: new BigNumber.BigNumber(0)
            }
  
            // initialize bigNumber array
            for (let index = 0; index < 12; index++) {
              summaryRow.monthlyAmounts[index] = new BigNumber.BigNumber(0);
            }
            this.rowData.set(account.name, summaryRow);
  
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
        for (var summary of summaryMap) {
          // Gets the summaryRow based off the account name
          let summaryRow = this.rowData.get(summary[0]);
          if (summaryRow) {

            // Make sure the summary row isn't undefined or null
            if (!summaryRow.monthlyAmounts[index]) {
              summaryRow.monthlyAmounts[index] = new BigNumber.BigNumber(0);
            }
            summaryRow.monthlyAmounts[index] = summary[1];
          }
        }
      }
      let data = Array.from(this.rowData.values());
      this.dataSource.data = Array.from(data);
    })

  }

  public onFirstDataRendered(params: any) {
    params.gridApi.sizeColumnsToFit();
  }
  
  public renderRowsToFit() {
    this.gridApi.sizeColumnsToFit();
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
                return '$  (' + this.numberWithCommas((params.data.monthlyAmounts[month] as BigNumber.BigNumber).abs()) + ')'
              } else {
                return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[month]);
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
        field: 'total'
      }
    );

    this.columnDefs = colDefs;
  }

  onGridReady(params : any) {
    this.gridApi = params.api;
    this.renderRowsToFit();
  }

  /**
   * Utility function to add commas to numbers
   * @param number number to add commas
   * @returns the number with commas every 3 digits
   */
  private numberWithCommas(number: BigNumber.BigNumber) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
