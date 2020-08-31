import {
  HttpErrorResponse, HttpHandler, HttpHeaderResponse,
  HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { UserService } from '../../user/user.service';
import { GlobalService } from './global.service';
import { LoaderService } from './loader.service';

@Injectable()
export class ApiHelperInterceptorService implements HttpInterceptor {
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private loaderService: LoaderService,
    // private userService: UserService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(
      map(res => {
        if (res instanceof HttpResponse) {
          this.loaderService.hide();
          switch (res.status) {
            case 226:
              this.handle226Error(res);
              break;
          }
        }
        return res;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          this.loaderService.hide();
          switch (error.status) {
            case 401:
              return this.handle401Error(req, next);
            case 226:
              return this.handle226Error(error);
            default:
              return throwError(error);
          }
        } else {
          return throwError(error);
        }
      })
    );
  }
  handle226Error(error) {
    this.globalService.errorNotification('This cannot be deleted because it has attached to another module', 'Error');
    return throwError(error);
  }
  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    this.globalService.errorNotification('', 'Session Expired!');
    // this.userService.logout();
    return throwError('logout');
  }

}
