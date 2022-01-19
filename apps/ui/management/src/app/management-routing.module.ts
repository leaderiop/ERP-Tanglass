import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { EmployeesComponent } from '@TanglassUi/management/pages/employees/employees.component';
import { CompaniesComponent } from '@TanglassUi/management/pages/companies/companies.component';
import { SalePointsComponent } from '@TanglassUi/management/pages/sale-points/sale-points.component';
import { SalePointCardComponent } from '@TanglassUi/management/pages/sale-points/sale-point-card/sale-point-card.component';
import { EmployeeCardComponent } from '@TanglassUi/management/pages/employees/employee-card/employee-card.component';
import { CompanyCardComponent } from '@TanglassUi/management/pages/companies/company-card/company-card.component';
import { ROLES } from '@tanglass-erp/store/app';
import { Auth0Guard } from '../../../../tanglass-main/src/app/shared/services/auth0-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: 'companies',
        children: [
          { path: '', component: CompaniesComponent },
          { path: ':id', component: CompanyCardComponent, data: {breadcrumb: "Détails"} },
        ],
        data: {title: 'Sociétés', breadcrumb: "Sociétés"},
      },
      {
        path: 'salePoints',
        children: [
          { path: '', component: SalePointsComponent },
          { path: ':id', component: SalePointCardComponent, data: {breadcrumb: "Détails"} },
        ],
        data: {title: 'Points de vente', breadcrumb: "Points de vente"},
      },
      {
        path: 'users',
        canActivate: [Auth0Guard],
        children: [
          { path: '', component: EmployeesComponent },
          { path: ':id', component: EmployeeCardComponent, data: {breadcrumb: "Détails"} },
        ],
        data: {title: 'Employées', breadcrumb: "Employées", roles: [ROLES.admin]},
      },
    ],
  },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }
