import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { Account, AccountsService } from 'src/app/rest';
import { TransactionDTO } from 'src/app/rest/model/transactionDTO';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  public transactionForm!: FormGroup;

  public accounts: Account[] = [];
  public debitAccounts: Account[] = [];

  public creditFilteredAccounts!: Observable<Account[]>;
  public debitFilteredAccounts!: Observable<Account[]>;

  public selectedCreditAccount: Account | undefined;
  public selectedDebitAccount: Account | undefined;

  constructor(private fb: FormBuilder, private accountService: AccountsService, private dataService: DataManagerService, @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.initializeTransactionForm();
    this.accounts = this.dataService.getAccounts();
    this.debitAccounts = JSON.parse(JSON.stringify(this.accounts));

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
    this.creditFilteredAccounts = this.transactionForm.controls['creditAccount'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.accounts) : this.accounts.slice();
      }),
    );

    this.debitFilteredAccounts = this.transactionForm.controls['debitAccount'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.debitAccounts) : this.debitAccounts.slice();
      }),
    );
  }

  onSubmit(): void {
    if (this.isValid()) {
      let transaction : TransactionDTO = this.transactionForm.value;
      
      // Create proper JavaOffset Datetime objects to use from the FormGroup.
      transaction.date = (new Date(this.transactionForm.value.date).toISOString());

      // Create the id column for the dto
      transaction.creditAccountId = this.transactionForm.value.creditAccount.id;
      transaction.debitAccountId = this.transactionForm.value.debitAccount.id
      
      this.dataService.updateTransactions([transaction]).then(() => {
        console.log("updated transaction");
      }, (error: any) => {
        console.log("Failed in updating or creating a transaction")
        console.log(error);
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

  public displayFn(account: Account): string {
    return account && account.name ? account.name : '';
  }

  private _filter(name: string, accountList: Account[]): Account[] {
    const filterValue = name.toLowerCase();

    return accountList.filter(option => option.name?.toLowerCase().includes(filterValue));
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

  public onKey(value: any) { 
    this.accounts = this.search(value);
  }

  private search(value: any) { 
    let filter = value.toLowerCase();
    return this.accounts.filter(option => option.name?.toLowerCase().includes(filter));
  }
}
