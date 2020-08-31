import { Injectable } from '@angular/core';
import { APIHelperService } from '../common/service/api-helper.service';

@Injectable()
export class LoginService {

  constructor(
    private apiHelperService: APIHelperService
  ) { }

  login(body) {
    return this.apiHelperService.post('user/login', body);
  }
}
