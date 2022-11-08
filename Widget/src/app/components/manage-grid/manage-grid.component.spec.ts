import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGridComponent } from './manage-grid.component';

describe('ManageGridComponent', () => {
  let component: ManageGridComponent;
  let fixture: ComponentFixture<ManageGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
