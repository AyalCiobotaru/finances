import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityHeaderComponent } from './visibility-header.component';

describe('VisibilityHeaderComponent', () => {
  let component: VisibilityHeaderComponent;
  let fixture: ComponentFixture<VisibilityHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilityHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisibilityHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
