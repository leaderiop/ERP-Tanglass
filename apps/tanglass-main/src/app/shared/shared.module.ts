import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// SERVICES
import { ThemeService } from './services/theme.service';
import { NavigationService } from './services/navigation.service';
import { RoutePartsService } from './services/route-parts.service';
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppLoaderService } from './services/app-loader/app-loader.service';

import { SharedComponentsModule } from './components/shared-components.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { MaterialModule } from '@tanglass-erp/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { Auth0Guard } from './services/auth0-guard.service';

@NgModule({
  imports: [
  CommonModule,
    SharedComponentsModule,
    SharedPipesModule,
    MaterialModule,
    SharedDirectivesModule,
    PerfectScrollbarModule,

  ],
  providers: [
    ThemeService,
    NavigationService,
    RoutePartsService,
    AppConfirmService,
    AppLoaderService,
    MaterialModule,
    Auth0Guard
  ],
  exports: [
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule
  ]
})
export class SharedModule { }
