import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe, NumberWithCommasPipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from '@TanglassTheme/directives/highlight.directive';
import { ToastService } from '@TanglassTheme/services/toast.service';


export const DIRECTIVES = [
  HighlightDirective,
];

export const NB_MODULES: any[] = [
  ReactiveFormsModule,
  FormsModule,
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES,],
  exports: [CommonModule, ...NB_MODULES, ...PIPES, ...DIRECTIVES],
  declarations: [...PIPES, ...DIRECTIVES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ToastService
      ],
    };
  }
}
