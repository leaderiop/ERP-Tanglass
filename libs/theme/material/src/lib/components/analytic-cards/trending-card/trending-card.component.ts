import { Component, Input, OnInit } from '@angular/core';
import { CardConfig } from '@tanglass-erp/material';


@Component({
  selector: 'ngx-trending-card',
  templateUrl: './trending-card.component.html',
  styleUrls: ['./trending-card.component.scss']
})
export class TrendingCardComponent implements OnInit {
  @Input() config: CardConfig;
  constructor() { }

  ngOnInit(): void {
  }

}
