import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { ButtonComponent } from './button.component';
import { SelectComponent } from './select.component';
import { DateComponent } from './date.component';
import { RadiobuttonComponent } from './radiobutton.component';
import { CheckboxComponent } from './checkbox.component';
import { InputComponent } from './input.component';
import { InputSelectComponent } from './input-select.component';
import { TagInputComponent } from './tag-input.component';
import { TextareaComponent } from './textarea.component';
import { HeaderComponent } from './header.component';
import { SelectSearchComponent } from './select-search.component';

const componentMapper = {
  input: InputComponent,
  inputSelect: InputSelectComponent,
  inputTag: TagInputComponent,
  textarea: TextareaComponent,
  button: ButtonComponent,
  select: SelectComponent,
  selectSearch: SelectSearchComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  header: HeaderComponent
};

@Directive({
  selector: "[dynamicField]",
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Input() style = '';

  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.location.nativeElement.style = this.field.style ?? this.style;
    this.renderer.addClass(this.componentRef.location.nativeElement, 'input-form');
    this.componentRef.location.nativeElement.class = 'input-form';
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;

  }
}
