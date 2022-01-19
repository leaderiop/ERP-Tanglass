import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfrastructureGraphqlModule } from '@tanglass-erp/infrastructure/graphql';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: '', loadChildren: () =>
      import('./purchase.module').then(m => m.PurchaseModule) }], { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    InfrastructureGraphqlModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
