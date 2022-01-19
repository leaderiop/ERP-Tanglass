import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-service-card-item',
  templateUrl: './service-card-item.component.html',
  styleUrls: ['./service-card-item.component.scss']
})
export class ServiceCardItemComponent implements AfterViewInit {
  @Input() data;
  @Input() showActions = false;
  @Output() updateEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<string>();
  constructor() {
  }

  ngAfterViewInit(): void {
  }
}
