import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateEditorComponent } from './date-editor.component';

describe('DateEditorComponent', () => {
  let component: DateEditorComponent;
  let fixture: ComponentFixture<DateEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
