import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '@auth0/auth0-angular';
//import { NotificationFacadeService } from '@tanglass-erp/store/app';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html',
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  notifications$: Observable<number> 
  // = this.notifFacade.notifications$.pipe(
  //   map((val) => val.filter(e => !e?.read).length || null)
  // );
  public availableLangs = [
    {
      name: 'EN',
      code: 'en',
      flag: 'flag-icon-us',
    },
    {
      name: 'ES',
      code: 'es',
      flag: 'flag-icon-es',
    },
  ];
  currentLang = this.availableLangs[0];

  public matxThemes;
  public layoutConf: any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2,
    public auth: AuthService,
    //private notifFacade: NotificationFacadeService
  ) {}
  ngOnInit() {
    //this.notifFacade.loadNotifications();
    this.matxThemes = this.themeService.matxThemes;
    this.layoutConf = this.layout.layoutConf;
  }
  setLang(lng) {}
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
   // this.notifFacade.changeNotificationState(false);
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed',
    });
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange(
        {
          sidebarStyle: 'full',
          sidebarCompactToggle: false,
        },
        { transitionClass: true }
      );
    }

    // * --> compact
    this.layout.publishLayoutChange(
      {
        sidebarStyle: 'compact',
        sidebarCompactToggle: true,
      },
      { transitionClass: true }
    );
  }

  onSearch(e) {
  }

  logout() {
    this.auth.logout({returnTo: window.location.origin});
  }
}
