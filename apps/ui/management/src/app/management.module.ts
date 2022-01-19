import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { EmployeesComponent } from '@TanglassUi/management/pages/employees/employees.component';
import { DialogEmployeeComponent } from '@TanglassUi/management/pages/employees/dialog-employee/dialog-employee.component';
import { CompaniesComponent } from '@TanglassUi/management/pages/companies/companies.component';
import { PopCompaniesComponent } from '@TanglassUi/management/pages/companies/pop-companies/pop-companies.component';
import { SalePointsComponent } from '@TanglassUi/management/pages/sale-points/sale-points.component';
import { PopSalePointsComponent } from '@TanglassUi/management/pages/sale-points/pop-sale-points/pop-sale-points.component';
import { ManagementStateModule } from '@TanglassStore/management/lib/management-state.module';
import { MainAgGridModule } from '@tanglass-erp/ag-grid';
import { SalePointCardComponent } from '@TanglassUi/management/pages/sale-points/sale-point-card/sale-point-card.component';
import { EmployeeCardComponent } from '@TanglassUi/management/pages/employees/employee-card/employee-card.component';
import { CompanyCardComponent } from '@TanglassUi/management/pages/companies/company-card/company-card.component';

@NgModule({
  declarations: [
    ManagementComponent,
    SalePointsComponent,
    CompaniesComponent,
    PopSalePointsComponent,
    PopCompaniesComponent,
    DialogEmployeeComponent,
    EmployeesComponent,
    SalePointCardComponent,
    EmployeeCardComponent,
    CompanyCardComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ManagementStateModule,
    MainAgGridModule,
  ],
  exports: [
    ManagementComponent,
    SalePointsComponent,
    CompaniesComponent,
    PopSalePointsComponent,
    PopCompaniesComponent,
    ManagementRoutingModule,
  ],
})
export class ManagementModule {
}
