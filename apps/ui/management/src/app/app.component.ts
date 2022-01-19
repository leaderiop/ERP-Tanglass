import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor() {} //private seoService: SeoService //private analytics: AnalyticsService,

  ngOnInit(): void {
    //this.analytics.trackPageViews();
    //this.seoService.trackCanonicalChanges();
  }
}
