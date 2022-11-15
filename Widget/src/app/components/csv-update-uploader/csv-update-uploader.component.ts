import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-csv-update-uploader',
  templateUrl: './csv-update-uploader.component.html',
  styleUrls: ['./csv-update-uploader.component.scss']
})
export class CsvUpdateUploaderComponent {

  constructor(
    public dialogRef: MatDialogRef<CsvUpdateUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  public events: string[] = [];


  public onNoClick(): void {
    this.dialogRef.close();
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
