import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@tanglass-erp/store/app';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ProductModule } from './product.module';
import { InfrastructureGraphqlModule } from '@tanglass-erp/infrastructure/graphql';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    InfrastructureGraphqlModule,

    RouterModule.forRoot([{ path: '',
      loadChildren: () => import('./product.module').then(m => m.ProductModule) }], { initialNavigation: 'enabled' }),
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(),
    ProductModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
