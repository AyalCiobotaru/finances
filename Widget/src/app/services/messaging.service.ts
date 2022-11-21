import { Injectable } from '@angular/core';
import { CellDoubleClickedEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  /**
   * Subject to send messages regarding changes to transactions
   */
  private transactionChanges : Subject<void>;

  /**
   * Subject to send messages regarding which cell in the summary has been double clicked
   */
  private cellDoubleClickedSubject : Subject<CellDoubleClickedEvent>;

  /**
   * Subject to send messages regarding a necessary tab change
   */
  private tabChangeSubject: Subject<number>;

  /**
   * Subject to send messages regarding adding the rollover to the total in the summary tab
   */
  private addRolloverSubject: Subject<Boolean>;

  constructor() {
    this.transactionChanges = new Subject<void>();
    this.cellDoubleClickedSubject = new Subject<CellDoubleClickedEvent>();
    this.tabChangeSubject = new Subject<number>();
    this.addRolloverSubject = new Subject<Boolean>();
   }

  public cellDoubleClicked(event: CellDoubleClickedEvent) {
    this.tabChangeSubject.next(1);
    this.cellDoubleClickedSubject.next(event);
  }
  
  public transactionsChanged() {
    this.transactionChanges.next();
  }

  public addRollover(event: Boolean) {
    this.addRolloverSubject.next(event);
  }

  public getCellDoubleClickedAsObservable() : Observable<CellDoubleClickedEvent> {
    return this.cellDoubleClickedSubject.asObservable();
  }

  public getTabChangeAsObservable() : Observable<number> {
    return this.tabChangeSubject.asObservable();
  }

  public getTransactionChangesAsObservable() : Observable<void> {
    return this.transactionChanges.asObservable();
  }

  public getAddRolloverAsObservable(): Observable<Boolean> {
    return this.addRolloverSubject.asObservable();
  }
}
