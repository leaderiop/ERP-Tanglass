import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfrastructureGraphqlModule } from '@tanglass-erp/infrastructure/graphql';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@tanglass-erp/store/app';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ContactModule } from './contact.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContactModule,
    InfrastructureGraphqlModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(),
    RouterModule.forRoot([{ path: '', loadChildren: () =>
        import('./contact.module').then(m => m.ContactModule) }], { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
