import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerConstants } from '../utils/serverConstants';
import { loginUserType, regiterUserType } from '../types/userTypes';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userLoggedIn = new EventEmitter<boolean>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  /**
   * @purpose to check and emit the value if cookie named 'token' is present
   * @param none
   * @returns boolean
   *
   */
  isThereCookie() {
    if (this.cookieService.get('token')) {
      this.userLoggedIn.emit(true);
      return true;
    } else {
      this.userLoggedIn.emit(false);
      return false;
    }
  }

  /**
   * @purpose to register user with data through HttpClient's POST requrest to API server
   * @param userData (type of regiterUserType)
   * @returns HTTP response object
   *
   */
  registerUser(userData: regiterUserType) {
    return this.http.post(
      `${ServerConstants.SERVER_URL}/users/register`,
      userData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  /**
   * @purpose to login user with data through HttpClient's POST requrest to API server
   * @param loginData (type of loginUserType)
   * @returns HTTP response object
   *
   */
  loginUser(loginData: loginUserType) {
    return this.http.post(
      `${ServerConstants.SERVER_URL}/users/login`,
      loginData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  /**
   * @purpose to get user data through HttpClient's GET requrest to API server
   * @params none
   * @returns HTTP response object
   *
   */
  getUserData() {
    return this.http.get(`${ServerConstants.SERVER_URL}/users/me`, {
      withCredentials: true,
    });
  }

  /**
   * @purpose to logout user through HttpClient's GET requrest to API server
   * @params none
   * @returns HTTP response object
   */
  logoutUser() {
    return this.http.get(`${ServerConstants.SERVER_URL}/users/logout`, {
      withCredentials: true,
    });
  }
}
