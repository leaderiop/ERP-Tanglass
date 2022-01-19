import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RoutePartsService } from './shared/services/route-parts.service';
import { LayoutService } from './shared/services/layout.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'tanglass-erp-root',
  styleUrls: ['./app.component.scss'],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, AfterViewInit {
  appTitle = 'Tanglass';
  pageTitle = 'Tanglass';
  metadata={}
  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    // private themeService: ThemeService,
  ) //public auth: AuthService,
  {}

  ngOnInit() {

    this.changePageTitle();
    //this.layout.setAppLayout();
  }
  ngAfterViewInit() {}
  changePageTitle() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        const routeParts = this.routePartsService.generateRouteParts(
          this.activeRoute.snapshot
        );
        if (!routeParts.length) return this.title.setTitle(this.appTitle);
        // Extract title from parts;
        this.pageTitle = routeParts
          .reverse()
          .map((part) => part.title)
          .reduce((partA, partI) => `${partA} > ${partI}`);
        this.pageTitle += ` | ${this.appTitle}`;
        this.title.setTitle(this.pageTitle);
      });
  }
}
