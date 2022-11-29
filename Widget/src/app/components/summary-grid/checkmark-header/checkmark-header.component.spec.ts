import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmarkHeaderComponent } from './checkmark-header.component';

describe('CheckmarkHeaderComponent', () => {
  let component: CheckmarkHeaderComponent;
  let fixture: ComponentFixture<CheckmarkHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckmarkHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckmarkHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
