import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() toggle = false;
  @Output() toggledEvent = new EventEmitter<any>();
  toggled: boolean = false;

  @HostBinding('style.cursor') cursor = "pointer";
  @Input() @HostBinding('class.highlight-color') active: boolean;
  // [class.light-purple-50]="active"
  @HostListener("mouseenter") mouseEnter() {
    this.active = true;
  }

  @HostListener("mouseleave") mouseLeave() {
    this.active = this.toggle?this.toggled:false;
  }

  @HostListener("click") click() {
    if (this.toggle) {
      this.toggled = !this.toggled;
      this.toggledEvent.emit(this);
    }
  }
  constructor(private elementRef: ElementRef<any>) {}

}
