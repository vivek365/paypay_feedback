import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { AppRoutes } from '../constant/app.routes.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private globalService: GlobalService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.globalService.getAccessToken() && this.globalService.getUser()) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.globalService.navigateToState([AppRoutes.LOGIN]);
    return false;
  }
}
