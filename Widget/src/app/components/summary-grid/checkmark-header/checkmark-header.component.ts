import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-checkmark-header',
  templateUrl: './checkmark-header.component.html',
  styleUrls: ['./checkmark-header.component.scss']
})
export class CheckmarkHeaderComponent implements IHeaderAngularComp {

  public params!: IHeaderParams;

  public checked: boolean = true;

  constructor(private messagingService: MessagingService) { }

  agInit(params: IHeaderParams<any>): void {
    this.params=params;
  }

  refresh(params: IHeaderParams<any>): boolean {
    return false;
  }

  onChange(event: Boolean) {
    this.messagingService.addRollover(event);
  }
  
}
