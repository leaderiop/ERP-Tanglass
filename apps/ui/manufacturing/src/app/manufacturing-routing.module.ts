import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobOrdersComponent } from '@TanglassUi/manufacturing/pages/job-order/job-orders.component';
import { JobCardComponent } from '@TanglassUi/manufacturing/pages/job-order/job-card/job-card.component';
import { ManufacturingComponent } from '@TanglassUi/manufacturing/manufacturing.component';

const routes: Routes = [
  {
    path: '',
    component: ManufacturingComponent,
    children: [
      {
        path: 'jobOrders',
        children: [
          { path: '', component: JobOrdersComponent },
          {
            path: ':id',
            component: JobCardComponent,
            data: { breadcrumb: 'Fiche J.O' },
          },
        ],
        data: { title: 'jobOrders', breadcrumb: 'Ordre de Fabrication' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManufacturingRoutingModule {}
