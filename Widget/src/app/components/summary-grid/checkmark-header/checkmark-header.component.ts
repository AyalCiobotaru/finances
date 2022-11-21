import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-checkmark-header',
  templateUrl: './checkmark-header.component.html',
  styleUrls: ['./checkmark-header.component.scss']
})
export class CheckmarkHeaderComponent implements IHeaderAngularComp {

  public params!: IHeaderParams;

  public checked: boolean = false;

  constructor() { }

  agInit(params: IHeaderParams<any>): void {
    this.params=params;
  }

  refresh(params: IHeaderParams<any>): boolean {
    return false;
  }
  
}
