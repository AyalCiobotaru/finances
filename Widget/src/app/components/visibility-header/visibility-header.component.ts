import { Component, OnInit } from '@angular/core';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-visibility-header',
  templateUrl: './visibility-header.component.html',
  styleUrls: ['./visibility-header.component.scss']
})
export class VisibilityHeaderComponent implements OnInit {
  
  public params!: IHeaderParams;
  public isVisible = true;

  // Angular will call this without parameters
  constructor() { }

  // Called by AG Grid to initialize the header component
  agInit(params: IHeaderParams): void {
    this.params = params;
  }

  ngOnInit(): void { }
  
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    // Toggle this column's visibility using the column API
    this.params.columnApi.setColumnVisible(this.params.column.getId(), this.isVisible);
  }
}
