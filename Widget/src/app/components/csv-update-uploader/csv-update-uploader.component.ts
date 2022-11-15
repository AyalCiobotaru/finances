import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-csv-update-uploader',
  templateUrl: './csv-update-uploader.component.html',
  styleUrls: ['./csv-update-uploader.component.scss']
})
export class CsvUpdateUploaderComponent{

  public importForm!: FormGroup;

  public columns = 
  [ {
      display: 'Amount',
      value: 'amount'
    }, 
    {
      display: 'Credit Account',
      value:'creditAccountName'
    },
    {
      display: 'Date',
      value: 'date'
    },
    {
      display: 'Debit Account',
      value: 'debitAccountName'
    },
    {
      display: 'Description',
      value: 'description' 
    }];

  constructor(
    public dialogRef: MatDialogRef<CsvUpdateUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.initializeImportForm();
    this.data.form = this.importForm;

    }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Create the alert form.
   */
   private initializeImportForm() {
    const today = new Date();

    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    this.importForm = this.fb.group({
      columnA: new FormControl(this.columns[3].value),
      columnB: new FormControl(this.columns[2].value),
      columnC: new FormControl(this.columns[4].value),
      columnD: new FormControl(this.columns[1].value),
      columnE: new FormControl(this.columns[0].value)
    })
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    this.data.fileExtension = evt.target.value;
    const target: DataTransfer = <DataTransfer>(evt.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary', cellDates: true});
      this.data.wb = wb;
    };
    reader.readAsBinaryString(target.files[0]);
  }

}
