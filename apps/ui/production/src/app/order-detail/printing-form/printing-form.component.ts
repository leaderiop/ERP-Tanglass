import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-printing-form',
  templateUrl: './printing-form.component.html',
  styleUrls: ['./printing-form.component.scss'],
})
export class PrintingFormComponent implements OnInit {
  @Input() articles: any;
  constructor() {}

  ngOnInit(): void {}
}
