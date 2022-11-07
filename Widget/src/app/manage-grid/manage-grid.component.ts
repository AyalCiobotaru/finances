import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Transaction, TransactionsService } from 'src/generated/ts';

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

  constructor(public dialog: MatDialog, protected httpClient: HttpClient, private transactionService: TransactionsService) { 
  }

  ngOnInit(): void {
    // this.getTransactions();
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

  columnDefs = [
    {
      headerName: 'Credit',
      field: 'credit-account-id',
    },
    {headerName: 'Date', field: 'date'},
    {headerName: 'Description', field: 'description'},
    {headerName: 'Debit', field: 'debit-account-id'},
    {headerName: 'Amount', field: 'amount'}
  ];

  public getTransactions() {
    this.transactionService.getAllTransactions().subscribe((response: Transaction[]) => {
      this.dataSource.data = response;
    });
  }
  // public getUsers() {
  //   this.userService.getAllUsers().subscribe((cg1vUsers: Cg1vUserPage) => {
  //     this.userData.data = cg1vUsers.data;
  //     this.unitService.getAllUnits().subscribe((units: UnitPage) => {
  //       let unitMap = new Map<String, Unit>();
  //       let data = [];
        
  //       // Go through unit data once to speed things up
  //       for (const unit of units.data) {
  //         unitMap.set(unit.departmentId!, unit);
  //       }
  //       // create the data to be displayed
  //       for (let user of this.userData.data) {
  //         let userUnit : Cg1vUserUnit = {};
  //         let unit = unitMap.get(user.departmentId!);
  //         Object.assign(userUnit, user);

  //         userUnit.departmentName = unit?.departmentName;
  //         userUnit.departmentType = unit?.departmentType;
  //         userUnit.district = unit?.district;
  //         userUnit.area = unit?.area;
  //         userUnit.atuId = unit?.atu;

  //         data.push(userUnit);
  //       }

  //       this.dataSource.data = data;
  //       this.gridApi.hideOverlay();
  //     })
  //   })
  // }


  // public CellEdittingStopped(params: any) {
  //   if (this.isAdmin) {
  //     let cg1vUserList : Cg1vUser[] = [];
  //     cg1vUserList.push(params.data);
  //     this.userService.updateCg1vUser(cg1vUserList).subscribe();
  //   }
  // }

  onGridReady(params : any) {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();
    this.getTransactions();

  }

  public exportCSV() {
    this.gridApi.exportDataAsCsv();
  }

  public importCSV() {
    // const dialogRef = this.dialog.open(CsvUpdateUploaderComponent, {
    //   height: '396px',
    //   width: '325px',
    //   data: {
    //     dataSource: MatTableDataSource 
    //   },
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // After the dialog closes

    //   // If there was no import,
    //   if (!result.wb || !result.wb.Sheets) {
    //       // Return with no changes
    //       return;
    //   }

    //   // Else, start the loading and continue
    //   this.populateGrid(result.wb);
    // });
  }

  private populateGrid(workbook : any) {
    // // our data is in the first sheet
    // var firstSheetName = workbook.SheetNames[0];
    // var worksheet = workbook.Sheets[firstSheetName];

    // // we expect the following columns to be present
    // var columns: any = {
    //     'A': 'rate',
    //     'B': 'username',
    //     'C': 'email',
    //     'D': 'positionTitle',
    //     'E': 'firstName',
    //     'F': 'lastName',
    //     'G': 'departmentName',
    //     'H': 'departmentType',
    //     'I': 'district',
    //     'J': 'area',
    //     'K': 'atu',
    //     'L': 'atuName',
    //     'M': 'opfac',
    //     'N': 'departmentId',
    //     'O': 'id'
    // };    

    // // start at the 2nd row - the first row are the headers
    // var rowIndex = 2;
    // var cg1vUsersRowData : Cg1vUser[] = [];

    // // iterate over the worksheet pulling out the columns we're expecting
    // // Wrap this in a promise so we can refresh the data once all the users have been updated or added
    // const promise = new Promise((resolve: any) => {
    //   while (worksheet['A' + rowIndex]) {
    //     let row : any = {};
    //     Object.keys(columns).forEach(function(column: any) {
    //         let cell = worksheet[column + rowIndex];
    //         // cell.v is the 'rawValue' of the cell
    //         // cell.w is the 'formattedText' of the cell which is only availble for some cells
    //         if (cell) {
    //           row[columns[column]] = cell.w ? cell.w : cell.v;
    //         }
    //     });
    //     if (row.departmentId.length != 6) {
    //       row.departmentId = this.padLeft(row.departmentId, '0', 6);
    //     }
        
    //     let cg1vUser : Cg1vUser = {};
    //     Object.assign(cg1vUser, row);

    //     cg1vUsersRowData.push(cg1vUser);

    //     rowIndex++;
    //   }
    //   this.gridApi.showLoadingOverlay();
    //   this.userService.updateCg1vUser(cg1vUsersRowData).subscribe( () =>{
    //     resolve();
    //   });
    // });

    // // finally, reload the data
    // promise.then(()=> {
    //   this.getUsers();
    //   this.gridApi.refreshCells();
    //   this.gridApi.hideOverlay();
    // });
  
  }
  private padLeft(text:string, padChar:string, size:number): string {
      return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
  }
}
