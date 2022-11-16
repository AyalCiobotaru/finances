import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from '../rest';
import { startWith, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterUtilService {

  constructor() { }

  public displayFn(account: Account): string {
    return account && account.name ? account.name : '';
  }

  private _filter(name: string, accountList: Account[]): Account[] {
    const filterValue = name.toLowerCase();

    return accountList.filter(option => option.name?.toLowerCase().includes(filterValue));
  }

  public filterForm(transactionForm: FormGroup | FormControl, accounts: Account[], account: string) {
    if ((transactionForm as FormGroup).controls) {
      return (transactionForm as FormGroup).controls[account].valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string, accounts) : accounts.slice();
        }),
      );  
    } else {
      return (transactionForm as FormControl).valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string, accounts) : accounts.slice();
        }),
      )
    }
  }
}
