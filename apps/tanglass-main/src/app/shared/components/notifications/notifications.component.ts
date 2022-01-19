import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
//import { NotificationFacadeService } from '@tanglass-erp/store/app';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;

  notifications$ 
  // = this.notifService.notifications$;

  constructor(private router: Router,
    //  public notifService: NotificationFacadeService
    ) {}

  ngOnInit() {
    this.router.events.subscribe((routeChange) => {
      if (routeChange instanceof NavigationEnd) {
        this.notificPanel.close();
      }
    });
  }
  clearAll(e) {
    // this.notifService.clearNotifications();
    e.preventDefault();
  }
}
