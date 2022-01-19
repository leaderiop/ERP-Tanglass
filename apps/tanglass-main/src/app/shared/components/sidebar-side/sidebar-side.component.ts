import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { ILayoutConf, LayoutService } from '../../services/layout.service';
import { AuthFacadeService } from '@tanglass-erp/store/app';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html',
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;

  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private authService: AuthFacadeService
  ) {}

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$
      .subscribe((menuItem) => {
        this.menuItems = menuItem.filter(
          item => !item?.roles || item.roles.indexOf(this.authService?.currentUser?.role) !== -1
        );
        //Checks item list has any icon type.
        this.hasIconTypeMenuItem = !!this.menuItems.filter(
          (item) => item.type === 'icon'
        ).length;
      });
    this.layoutConf = this.layout.layoutConf;
  }
  ngAfterViewInit() {}
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    this.layout.publishLayoutChange({
      sidebarCompactToggle: !this.layoutConf.sidebarCompactToggle,
    });
  }
}
