import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { Account, AccountsService } from 'src/generated/ts';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  public transactionForm!: FormGroup;

  public accounts: Account[] = [];

  constructor(private fb: FormBuilder, private accountService: AccountsService, private dataService: DataManagerService) {
    this.initializeAccountForm();
    this.accountService.getAllAccounts().subscribe((response: Account[]) => {
      this.accounts = response;
    }, (error: any) => {
      this.accounts = [];
      console.log("Failed to get accounts");
    })
   }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.isValid()) {
      let transaction = this.transactionForm.value;
      // Create proper JavaOffset Datetime objects to use from the FormGroup.
      transaction.date = (new Date(this.transactionForm.value.date).toISOString());

      this.dataService.updateTransactions([transaction]).then(() => {
        console.log("updated transaction");
      }, (error: any) => {
        console.log("Failed in updating or creating a transaction")
        console.log(error);
      })
    }
  }

  /**
   * Create the alert form.
   */
   private initializeAccountForm() {
    const today = new Date();

    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    this.transactionForm = this.fb.group({
      description: new FormControl(""),
      creditAccount: new FormControl("", [
        Validators.required
      ]),
      debitAccount: new FormControl("", [
        Validators.required
      ]),
      amount: new FormControl(0.0, [
        Validators.required
      ]),
      date: new FormControl(tomorrow.toISOString().substring(0, 16), [
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
