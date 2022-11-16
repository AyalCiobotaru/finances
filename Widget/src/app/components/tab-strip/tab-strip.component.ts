import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MessagingService } from 'src/app/services/messaging.service';
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

  constructor(private messagingService: MessagingService) { 
    this.messagingService.getTabChangeAsObservable().subscribe(this.handleTabChange.bind(this));
  }

  ngOnInit(): void {  }

  public onTabChanged(matTabChange: MatTabChangeEvent) {
    if (matTabChange.index == 0) {
      this.summaryComponent.first.renderRowsToFit();
    }
    if (matTabChange.index == 1) {
      this.transactionComponent.first.renderRowsToFit();
    }
    this.selected = matTabChange.index;
  }

  private handleTabChange(selectedIndex: number) {
    this.selected = selectedIndex;
  }
}
