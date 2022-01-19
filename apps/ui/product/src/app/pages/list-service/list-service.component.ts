import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Operations } from '@tanglass-erp/ag-grid';
import { PopServiceConfigComponent } from './pop-service-config/pop-service-config.component';
import { ServiceConfig } from '@tanglass-erp/core/product';
import { ConfirmDialogComponent } from '@tanglass-erp/material';
import { PopServiceConfigUpdateComponent } from '@TanglassUi/product/pages/list-service/pop-service-config-update/pop-service-config-update.component';
import { ServiceFacadeService } from '@TanglassStore/product/lib/+state/service.facade.service';

@Component({
  selector: 'ngx-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.scss'],
})
export class ListServiceComponent implements OnInit {
  data$ = this.facadeService.services$;
  viewActions: boolean = false;

  constructor(private dialog: MatDialog, private facadeService: ServiceFacadeService) {}

  ngOnInit(): void {
    this.facadeService.loadAll();
  }

  openDialog(action, data? ) {
    const component = {
      [Operations.add]: PopServiceConfigComponent,
      [Operations.update]: PopServiceConfigUpdateComponent,
      [Operations.delete]: ConfirmDialogComponent,
    }[action];
    const dialogRef = this.dialog.open(component, {
      width: action === Operations.delete?'250px':'1000px',
      panelClass: action === Operations.delete?'':'panel-dialog',
      data: data??{},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Store action dispatching
        switch (action) {
          case Operations.add:
            this.facadeService.add(result);
            break;
          case Operations.update:
            this.facadeService.update({
              ...data,
              ...result.service
            });
            break;
          case Operations.delete:
            this.facadeService.delete(data)
        }

      }
    });
  }

  deleteEvent(id: string) {
    this.openDialog(Operations.delete, id);
  }

  updateEvent(data: ServiceConfig) {
    this.openDialog(Operations.update, data);
  }
}
