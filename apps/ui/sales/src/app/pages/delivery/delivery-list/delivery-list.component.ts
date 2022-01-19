import { Component } from '@angular/core';
import { ErpPermissions, GridView, GroupButton, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { deliveryHeaders } from '@TanglassUi/sales/utils/grid-headers';
import { Router } from '@angular/router';
import { DeliveryFacade } from '@tanglass-erp/store/sales';
import startOfMonth from 'date-fns/fp/startOfMonth';
import { fr } from 'date-fns/locale';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { DeliveryPermissions } from '@TanglassUi/sales/utils/permissions';
import { rolesDirection } from '@tanglass-erp/core/management';

@Component({
  selector: 'ngx-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements GridView {
  agGrid: AgGridAngular;
  columnDefs;
  columnId = 'id';
  data$ = this.deliveryFacade.allDelivery$;
  permissions: ErpPermissions
  mainGrid: MainGridComponent;
  extraActions: GroupButton[] = [
    {
      event: 'INVOICE',
      icon: 'receipt',
      tooltip: 'Générer la facture',
      selectToShow: true,
    },
  ];
  dateText: string;

  constructor(
    private router: Router,
    private authFacadeService: AuthFacadeService,
    private deliveryFacade: DeliveryFacade
  ) {
    this.setColumnDefs();
  }

  ngOnInit(): void {
    this.authFacadeService.currentUser$.subscribe(
      (user) =>
        (this.permissions = DeliveryPermissions.get(user?.role as rolesDirection))
    );
    const date = new Date();
    this.dateText =
      date.getFullYear() +
      ' ' +
      fr.localize.month(date.getMonth(), { width: 'abbreviated' });
    this.deliveryFacade.loadDeliveries({
      dateStart: startOfMonth(date), dateEnd: new Date()
    });

  }

  ngAfterViewInit(): void {}

  eventTriggering(event: any) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.add:
        this.router.navigate(['sales/delivery/add']);
        break;
      case Operations.update:
        this.router.navigate(['sales/delivery/update', { id: event.data?.id }]);
        break;
      case Operations.delete:
        this.deliveryFacade.removeDelivery(event.data.map((e) => e.id));
        break;
      case 'INVOICE':
        this.deliveryFacade.deliveryToInvoice(event.data);
        break;
      case Operations.dateChange:
        this.deliveryFacade.loadDeliveries(event.data);
        break;
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...deliveryHeaders,
      {
        field: 'id',
        headerName: 'Action',
        type: 'editColumn',
        // cellRendererParams: () => ({
        //   extra: [
        //     {
        //       event: 'INVOICE',
        //       icon: 'receipt',
        //       tooltip: 'facture',
        //     },
        //   ] as GroupButton[],
        // }),
      },
    ];
  }
}
