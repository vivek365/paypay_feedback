import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AppRoutes } from '../constant/app.routes.constants';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class IsAlreadyLoggedinService implements CanActivate {

  constructor(
    private globalService: GlobalService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.globalService.getAccessToken()) {
      // already logged in so redirect to home page with the return url
      this.globalService.navigateToState(AppRoutes.APP);
      return false;
    }

    return true;
  }
}
