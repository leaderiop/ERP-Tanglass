import { Component, OnInit } from '@angular/core';
import { CashBoxFacade } from '@tanglass-erp/store/cash-register';
import { MatDialog } from '@angular/material/dialog';
import { DialogCashboxComponent } from '@TanglassUi/cash-register/components/dialog-cashbox/dialog-cashbox.component';


const WIHOUT_CASHBOX = 'Sans Caisse';

@Component({
  selector: 'ngx-salepoints',
  templateUrl: './salepoints.component.html',
  styleUrls: ['./salepoints.component.scss']
})
export class SalepointsComponent implements OnInit {
  WIHOUT_CASHBOX = WIHOUT_CASHBOX;
  salePoints$ = this.cashBoxFacade.allAllSalePoints$;
  constructor(
    private cashBoxFacade: CashBoxFacade,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cashBoxFacade.loadAllSalePoints();
  }


  openDialog(name:string, salepoint_id: string) {
    const dialogRef = this.dialog.open(DialogCashboxComponent, {
      width: '700px',
      panelClass: 'panel-dialog',
      data: {
        salepoint_id,
        name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cashBoxFacade.addCashBox(result);
      }
    });
  }
}
