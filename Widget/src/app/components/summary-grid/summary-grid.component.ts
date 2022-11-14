import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef } from 'ag-grid-community';
import { Transaction } from 'src/app/rest';
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
      dataSource = new MatTableDataSource<Transaction>();
  
      /** The grid Api */
      public gridApi: any
    
      /**
       * Column Definitions
       */
      public columnDefs: ColDef[] = [];
          
  constructor(private dataService: DataManagerService) { }

  ngOnInit(): void {
    this.dataService.instantiateAccountData().then(() => {
      this.setupGrid();
    })
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
        headerName: 'Account',
      },
      {
        headerName: 'January',
      },
      {
        headerName: 'February',
      },
      {
        headerName: 'March',
      },
      {
        headerName: 'April',
      },
      {
        headerName: 'May',
      },
      {
        headerName: 'June',
      },
      {
        headerName: 'July',
      },
      {
        headerName: 'August',
      },
      {
        headerName: 'September',
      },
      {
        headerName: 'October',
      },
      {
        headerName: 'November',
      },
      {
        headerName: 'December',
      },
      {
        headerName: 'Total',
      },
    ];

    this.columnDefs = colDefs;
  }

  onGridReady(params : any) {
    this.gridApi = params.api;
    // this.gridApi.showLoadingOverlay();
    // this.dataService.instantiateTransactionData().then(() => {
    //   this.gridApi.hideOverlay();
    //   this.dataSource.data = this.dataService.getTransactions();
    // });

  }

}
