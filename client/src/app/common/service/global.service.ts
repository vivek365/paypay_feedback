import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SystemConstants } from '../constant/system.constants';
import { LocalStorageService } from './local-storage.service';
import { Constants } from '../constant/constants';
import { Router } from '@angular/router';
import { AppRoutes } from '../constant/app.routes.constants';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
  ) {
  }

  getBaseAPIURL() {
    return SystemConstants.SERVER;
  }

  successNotification(body?: string, title?: string, config?: any) {
    body = body ? body : 'Successfully saved';
    this.toastr.success(body, title, config);
  }
  errorNotification(body: string, title?: string, config?: any) {
    this.toastr.error(body, title, config);
  }
  warningNotification(body: string, title?: string, config?: any) {
    this.toastr.warning(body, title, config);
  }
  infoNotification(body: string, title?: string, config?: any) {
    this.toastr.info(body, title, config);
  }
  clearNotification() {
    this.toastr.clear();
  }
  setAccessToken(accessToken) {
    this.localStorageService.setValue(Constants.ACCESS_TOKEN, accessToken);
  }
  getAccessToken() {
    return this.localStorageService.getValue(Constants.ACCESS_TOKEN);
  }
  setUser(user?) {
    this.localStorageService.setValue(Constants.USER, user);
  }
  getUser() {
    return this.localStorageService.getValue(Constants.USER);
  }
  navigateToState(state) {
    this.router.navigate([state]);
    return false;
  }
  logout() {
    this.localStorageService.removeAll();
    this.navigateToState(AppRoutes.LOGIN);
  }
}
