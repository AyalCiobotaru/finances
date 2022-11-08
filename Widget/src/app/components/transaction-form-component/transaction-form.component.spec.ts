import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormComponent } from './transaction-form.component';

describe('AccountFormComponentComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
