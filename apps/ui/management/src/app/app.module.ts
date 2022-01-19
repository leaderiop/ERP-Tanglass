import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ManagementModule } from './management.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@tanglass-erp/store/app';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ManagementModule,
    RouterModule.forRoot([
      {
        path: 'management',
        loadChildren: () =>
          import('@TanglassUi/management/management.module').then(
            (m) => m.ManagementModule,
          ),
      },
    ]),
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
