import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutes } from '../common/constant/app.routes.constants';
import { GlobalService } from '../common/service/global.service';
import { Util } from '../common/utility/util';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginError = '';

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private loginService: LoginService
  ) { }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    this.loginError = '';
    this.loginService.login(this.form.value).subscribe((user: any) => {
      if (user && Util.isNotEmpty(user.token)) {
        this.globalService.setAccessToken(user.token);
        this.globalService.setUser(user);

        this.globalService.navigateToState(AppRoutes.APP);
      } else {
        this.loginError = 'Email or Password is Invalid.';
      }
    }, error => {
      if (error && error.error && error.error.error.message) {
        this.loginError = error.error.error.message;
      }
    });
  }

}
