import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginData } from '../model/interface/Login';
import { environment } from '../../../environments/environment';
import { API_Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);

  getLogin(loginUser: LoginData) {
    return this.http.post(environment.API_URL + API_Constant.USER.LOGIN, loginUser);
  }
}
