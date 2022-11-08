import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvUpdateUploaderComponent } from './csv-update-uploader.component';

describe('CsvUpdateUploaderComponent', () => {
  let component: CsvUpdateUploaderComponent;
  let fixture: ComponentFixture<CsvUpdateUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvUpdateUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvUpdateUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
