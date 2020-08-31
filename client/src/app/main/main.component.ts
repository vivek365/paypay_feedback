import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../common/service/global.service';
import { AppRoutes } from '../common/constant/app.routes.constants';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class MainComponent implements OnInit {
  user;
  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.user = this.globalService.getUser();
    if (this.user.isAdmin) {
      this.globalService.navigateToState(AppRoutes.ADMIN);
    } else {
      this.globalService.navigateToState(AppRoutes.EMPLOYEE);
    }
  }

  logout() {
    this.globalService.logout();
  }

}
