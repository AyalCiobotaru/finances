import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { Account } from 'src/app/rest';
import { TransactionDTO } from 'src/app/rest/model/transactionDTO';
import { Observable, startWith, map } from 'rxjs';
import { FilterUtilService } from 'src/app/services/filter-util.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  public transactionForm!: FormGroup;

  public accounts: Account[] = [];

  public creditFilteredAccounts?: Observable<Account[]>;
  public debitFilteredAccounts?: Observable<Account[]>;

  public selectedCreditAccount: Account | undefined;
  public selectedDebitAccount: Account | undefined;

  constructor(private fb: FormBuilder, public filterService: FilterUtilService, private dataService: DataManagerService, private messagingService: MessagingService, @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.initializeTransactionForm();
    this.accounts = this.dataService.getAccounts();

    if (this.data) {
      if (this.data.creditAccountId) {
        this.selectedCreditAccount = this.accounts.find(account => account.name?.toLowerCase() === this.data.creditAccountName.toLowerCase())
        this.transactionForm.get('creditAccount')?.setValue(this.selectedCreditAccount);
      }
      if (this.data.debitAccountId) {
        this.selectedDebitAccount = this.accounts.find(account => account.name?.toLowerCase() === this.data.debitAccountName.toLowerCase())
        this.transactionForm.get('debitAccount')?.setValue(this.selectedDebitAccount);
      }
    }
   }

  ngOnInit(): void {
    this.creditFilteredAccounts = this.filterService.filterForm(this.transactionForm, this.accounts, 'creditAccount');

    this.debitFilteredAccounts = this.filterService.filterForm(this.transactionForm, this.accounts, 'debitAccount');
  }

  onSubmit(): void {
    if (this.isValid()) {
      let transaction : TransactionDTO = this.transactionForm.value;
  
      // Parse the date string manually to avoid the UTC offset bug
      const inputDate: string = this.transactionForm.value.date; // "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm"
      const [datePart, timePart = '00:00'] = inputDate.split('T')
      const [year, month, day] = datePart.split('-').map(Number)
      const [hours, minutes] = timePart.split(':').map(Number)
  
      // Create local date object
      const localDate = new Date(year, month - 1, day, hours, minutes)
      transaction.date = localDate.toISOString()
  
      // Create the id column for the dto
      transaction.creditAccountId = this.transactionForm.value.creditAccount.id
      transaction.debitAccountId = this.transactionForm.value.debitAccount.id
  
      let array : TransactionDTO[] = []
      array.push(transaction)
      this.dataService.addTransactions(array).then(() => {
        this.messagingService.transactionsChanged();
      }, (error: any) => {
        console.log("Failed in updating or creating a transaction")
        console.log(error)
      })
    }
  }

  /**
   * Create the Transaction form.
   */
   private initializeTransactionForm() {
    const today = new Date();

    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    this.transactionForm = this.fb.group({
      description: new FormControl(this.data ? this.data.description : ""),
      creditAccount: new FormControl<string | Account>("", [
        Validators.required
      ]),
      debitAccount: new FormControl<string | Account>("", [
        Validators.required
      ]),
      amount: new FormControl(this. data ? this.data.amount : 0.0, [
        Validators.required
      ]),
      date: new FormControl(this.data ? this.data.date.substring(0, 10) : tomorrow.toISOString().substring(0, 16), [
        Validators.required
      ]),
    })
  }

  public isValid(): Boolean {
    if (this.transactionForm.invalid) {
      this.markFormGroupTouched(this.transactionForm);
      return false;
    } else {
      return true;
    }
  }

  /**
   * Marks a form group as touched recursively to prompt the user that error exist.
   * @param control the form control to touch.
   */
   public markFormGroupTouched(control: FormGroup) {
    (<any>Object).values(control.controls).forEach((con: any) => {
      con.markAsTouched();
      if (con.controls) {
        this.markFormGroupTouched(con);
      }
    });
  }
}
