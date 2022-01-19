import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[optionItem]'
})
export class OptionItemDirective implements OnInit {
  @Input() options: Array<any>;
  @Input() item: any;
  @Input() delimiter = ' | ';

  constructor(public elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const arrToJoin = [];
    this.options.forEach(option => arrToJoin.push(option.split('.')
      .reduce((accum, current) => accum[current], this.item)));
    this.elementRef.nativeElement.innerHTML = arrToJoin.join(this.delimiter);
  }
}
