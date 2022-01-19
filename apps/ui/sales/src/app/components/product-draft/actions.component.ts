import { MatDialog } from '@angular/material/dialog';
import { TableComponent } from '@tanglass-erp/material';
import { Product } from '@TanglassUi/sales/utils/models';
import { Product_draft, ProductDraftFacade } from '@tanglass-erp/store/sales';
import { PopRemovingComponent } from '@TanglassUi/sales/components/pop-remove-dependencies/pop-removing.component';
import { PopRepairComponent } from '@TanglassUi/sales/components/pop-repair-product/pop-repair.component';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { AccessorySaleComponent } from '@TanglassUi/sales/components/pop-product/accessory/accessory-sale.component';
import { GlassSaleComponent } from '@TanglassUi/sales/components/pop-product/glass/glass-sale.component';
import { ServiceSaleComponent } from '@TanglassUi/sales/components/pop-product/service/service-sale.component';
import { EditGlassComponent } from '@TanglassUi/sales/components/pop-product/glass/edit-glass/edit-glass.component';
import { ToastService } from '@TanglassTheme/services/toast.service';

export class ActionsComponent {
  articlesTable: TableComponent<Product>;
  glassTable: TableComponent<Product>;
  draft_id: number;
  constructor(
    public dialog: MatDialog,
    public facade: ProductDraftFacade,
    public sharedfacade: SharedFacade,
    public toastService: ToastService
  ) {}

  addAccessory(): void {
    const dialogRef = this.dialog.open(AccessorySaleComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: {},
    });
  }
  addService(): void {
    const SelectedGlasses = this.glassTable.selection?.selected;
    if (SelectedGlasses?.length) {
      this.facade.setSelectedGlasses(this.glassTable.selection?.selected);
      const dialogRef = this.dialog.open(ServiceSaleComponent, {
        width: '1000px',
        panelClass: 'panel-dialog',
        data: { SelectedGlasses },
      });
    } else {
      this.toastService.showToast(
        'warning',
        'Service',
        'Selectionner du Verre'
      );
    }
  }
  addGlass(): void {
    const dialogRef = this.dialog.open(GlassSaleComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: {},
    });
  }
  delete(item: Product_draft): void {
    this.facade.removeProduct(item.id, item?.glass_draft?.id);
    this.articlesTable.render();
    this.glassTable.render();
    this.facade.updateAmounts();
  }
  deleteDependencies(row: Product_draft): void {
    const dialogRef = this.dialog.open(PopRemovingComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: row,
    });
  }
  addRepair(row: Product_draft): void {
    const dialogRef = this.dialog.open(PopRepairComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: row,
    });
  }
  edit(item): void {
    const dialogRef = this.dialog.open(EditGlassComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: { item },
    });
  }
}

// companies$ = this.sharedfacade.allShortCompany$.pipe(
//   map((item) =>
//     item.map((company) => ({ key: company.id, value: company.name }))
//   )
// );
// warehouses$ = this.sharedfacade.allShortWarehouse$.pipe(
//   map((item) =>
//     item.map((warehouse) => ({
//       key: warehouse.id,
//       value: warehouse.name,
//       company_id: warehouse.companyid,
//     }))
//   )
// );

// openDialog(
//   action,
//   product_type: string,
//   rows?: Product[],
//   asAService?: boolean
// ): void {
//   this.facade.setSelectedGlasses(
//     rows ?? this.glassTable.selection?.selected ?? []
//   );
//   const dialogRef = this.dialog.open(PopProductComponent, {
//     width: '1000px',
//     panelClass: 'panel-dialog',
//     data: {
//       product_type,
//       companies: this.companies$,
//       warehouses: this.warehouses$,
//     },
//   });
//   dialogRef.afterClosed().subscribe((result) => {
//     switch (result?.type) {
//       case Sales_Product_Type_Enum.Verre: {
//         this.facade.addGlass({ ...result, draft_id: this.draft_id });
//         break;
//       }
//       // case Sales_Product_Type_Enum.ArticleClient: {
//       //   this.facade.addCustomerProduct({
//       //     ...result,
//       //     draft_id: this.draft_id,
//       //   });
//       //   break;
//       // }
//       case Sales_Product_Type_Enum.Accessoire: {
//         this.facade.addAccessory({ ...result, draft_id: this.draft_id });
//         break;
//       }
//       case Sales_Product_Type_Enum.Service: {
//         this.facade.addManyServices({ ...result, draft_id: this.draft_id });
//         break;
//       }
//       case Sales_Product_Type_Enum.Consommable: {
//         this.facade.addManyConsumables(
//           { ...result, draft_id: this.draft_id },
//           asAService
//         );
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//   });
//   this.articlesTable.render();
//   this.glassTable.render();
// }
