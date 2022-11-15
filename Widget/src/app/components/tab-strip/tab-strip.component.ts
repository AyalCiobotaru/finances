import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SummaryGridComponent } from '../summary-grid/summary-grid.component';
import { TransactionGridComponent } from '../transaction-grid/transaction-grid.component';

@Component({
  selector: 'app-tab-strip',
  templateUrl: './tab-strip.component.html',
  styleUrls: ['./tab-strip.component.scss']
})
export class TabStripComponent implements OnInit {


  @ViewChildren('transaction') transactionComponent!: QueryList<TransactionGridComponent>;
  
  @ViewChildren('summary') summaryComponent!: QueryList<SummaryGridComponent>;
  /**
   * The currently selected tab index.
   */
  public selected = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public onTabChanged(matTabChange: MatTabChangeEvent) {
    if (matTabChange.index == 0) {
      this.summaryComponent.first.renderRowsToFit();
    }
    if (matTabChange.index == 1) {
      this.transactionComponent.first.renderRowsToFit();
    }
  }

}
