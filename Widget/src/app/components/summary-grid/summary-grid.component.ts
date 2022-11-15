import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef, _ } from 'ag-grid-community';
import * as BigNumber from 'bignumber.js';
import { SummaryRow } from 'src/app/models/summaryRow';
import { Account, Transaction } from 'src/app/rest';
import { DataManagerService } from 'src/app/services/data-manager.service';

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

      private months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          
  constructor(private dataService: DataManagerService) { }

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

  public onFirstDataRendered() {
    this.renderRowsToFit();
  }
  
  public renderRowsToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  private setupGrid() {

    let colDefs: ColDef[] = [
      {
        headerName: 'Parent Category',
        field: 'parentCategory',
        hide: true,
        rowGroup: true,
        width: 100,
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
      }];

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
    // ]
        
    //   },
    //   {
    //     headerName: 'January',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[0])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'February',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[1])
    //       } else {
    //         return ""
    //       }
    //     }

    //   },
    //   {
    //     headerName: 'March',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[2])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'April',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[3])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'May',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[4])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'June',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[5])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'July',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[6])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'August',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[7])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'September',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[8])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'October',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[9])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'November',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[10])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    //   {
    //     headerName: 'December',
    //     valueGetter: (params) => {
    //       if (params.data) {
    //         return '$  ' + this.numberWithCommas(params.data.monthlyAmounts[11])
    //       } else {
    //         return ""
    //       }
    //     }
    //   },
    colDefs.push(
      {
        headerName: 'Total',
        field: 'total'
      }
    );
    // ];

    this.columnDefs = colDefs;
  }

  onGridReady(params : any) {
    this.gridApi = params.api;
    this.renderRowsToFit();
    // this.gridApi.showLoadingOverlay();
    // this.dataService.instantiateTransactionData().then(() => {
    //   this.gridApi.hideOverlay();
    //   this.dataSource.data = this.dataService.getTransactions();
    // });

  }

  private numberWithCommas(number: BigNumber.BigNumber) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

}
