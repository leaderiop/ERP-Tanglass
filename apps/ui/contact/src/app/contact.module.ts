import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainContactComponent } from './main-contact.component';
import { MainAgGridModule } from '@tanglass-erp/ag-grid';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerCardComponent } from './pages/customer/customer-card/customer-card.component';
import { PopCustomerComponent } from './pages/customer/pop-customer/pop-customer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactCardComponent } from './pages/contact/contact-card/contact-card.component';
import { PopContactComponent } from './pages/contact/pop-contact/pop-contact.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { ProviderCardComponent } from './pages/provider/provider-card/provider-card.component';
import { PopProviderComponent } from './pages/provider/pop-provider/pop-provider.component';
import { PopAddressComponent } from './pages/components/pop-address/pop-address.component';
import { StoreContactModule } from '@TanglassStore/contact/index';
import { PopShortContactComponent } from './pages/contact/pop-short-contact/pop-short-contact.component';


const routes: Routes = [
  { path: '',
    component: MainContactComponent,
    children: [
      {
        path: 'customer',
        children: [
          { path: '', component: CustomerComponent},
          {
            path: ':id',
            component: CustomerCardComponent, data: {breadcrumb: "Détails"},
          },
        ],
        data: {title: 'Clients', breadcrumb: "Clients"}
      },
      {
        path: 'contact',
        children : [
          { path: '', component: ContactComponent },
          { path: ':id', component: ContactCardComponent, data: {breadcrumb: "Détails"} },
        ],
        data: {title: 'Contacts', breadcrumb: "Contacts"}
      },
      {
        path: 'provider',
        children : [
          { path: '', component: ProviderComponent },
          { path: ':id', component: ProviderCardComponent, data: {breadcrumb: "Détails"} }
        ],
        data: {title: 'Fournisseurs', breadcrumb: "Fournisseurs"}
      },
    ]
  }
];

@NgModule({
  declarations: [
    MainContactComponent,
    CustomerComponent,
    CustomerCardComponent,
    PopCustomerComponent,
    ContactComponent,
    ContactCardComponent,
    PopContactComponent,
    PopShortContactComponent,
    ProviderComponent,
    ProviderCardComponent,
    PopProviderComponent,
    PopAddressComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainAgGridModule,
    StoreContactModule
  ]
})
export class ContactModule { }
