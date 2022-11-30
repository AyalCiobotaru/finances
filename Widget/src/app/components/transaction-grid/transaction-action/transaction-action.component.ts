import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-enterprise';
import { DataManagerService } from 'src/app/services/data-manager.service';

@Component({
  selector: 'app-transaction-action',
  templateUrl: './transaction-action.component.html',
  styleUrls: ['./transaction-action.component.scss']
})
export class TransactionActionComponent implements AgRendererComponent {

  private params!: ICellRendererParams;

  constructor(public dataService: DataManagerService) { 
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  deleteAlert() {
    this.dataService.deleteTransaction(this.params.node.data.id).then(() => {
        console.log(`Deleted alert with id: ${this.params.node.data.id}`);
    }, (err) => {
      throw new Error("Failed to delete alert\n" + err.message);
    })
  }

}
