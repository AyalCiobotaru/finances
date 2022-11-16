import { Injectable } from '@angular/core';
import { CellDoubleClickedEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private transactionChanges : Subject<void>;

  private cellDoubleClickedSubject : Subject<CellDoubleClickedEvent>;

  private tabChangeSubject: Subject<number>;

  constructor() {
    this.transactionChanges = new Subject<void>();
    this.cellDoubleClickedSubject = new Subject<CellDoubleClickedEvent>();
    this.tabChangeSubject = new Subject<number>
   }

  public cellDoubleClicked(event: CellDoubleClickedEvent) {
    this.tabChangeSubject.next(1);
    this.cellDoubleClickedSubject.next(event);
  }
  
  public transactionsChanged() {
    this.transactionChanges.next();
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
}
