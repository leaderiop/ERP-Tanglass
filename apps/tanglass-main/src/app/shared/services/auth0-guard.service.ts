import { Injectable } from '@angular/core';
import { AuthGuard, AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth0Guard extends AuthGuard {
  userLoaded = false;
  constructor(
    auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authFacadeService: AuthFacadeService
  ) {
    super(auth);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return super.canActivate(route, state)
      .pipe(
      switchMap((e) => {
        if (e) {
          if (!this.userLoaded) this.authFacadeService.loadUser();
          return this.authFacadeService.currentUser$.pipe(
            filter((val) => !!val),
            map((user) => {
              this.authFacadeService.currentUser = user;
              if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
                this.router.navigate(['/404']);
                return false;
              }
              return true;
            })
          );
        }
        return of(e);
      })
    );
  }
}
