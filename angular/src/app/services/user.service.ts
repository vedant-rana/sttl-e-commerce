import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerConstants } from '../utils/serverConstants';
import { loginUserType, regiterUserType } from '../types/userTypes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

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
