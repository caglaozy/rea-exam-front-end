import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { LoginRequest } from '../../models/request/login-request.model';
import { ResponseStatus } from '../../models/response/base-response.model';
import { TokenResponse } from '../../models/response/token-response.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: Observable<User | null>;
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private readonly apiService: ApiService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(<string>sessionStorage.getItem('current_user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

     //prettier-ignore
     public async login(request: LoginRequest): Promise<ResponseStatus> {
      const loginResponse = await this.apiService.login(request).toPromise();

      let status = loginResponse!.status;

      if (status == ResponseStatus.Ok) {
        this.setToken(loginResponse!.data);

        const profileResponse = await this.apiService
          .getProfileInfo()
          .toPromise();

        status = profileResponse!.status;

        if (status == ResponseStatus.Ok) {
          sessionStorage.setItem('current_user', JSON.stringify(profileResponse!.data));

          this.currentUserSubject.next(profileResponse!.data);
        } else {
          await this.logOut();
        }
      }
      return status;
    }








  public async refreshToken(): Promise<boolean> {
    const refreshTokenResponse = await this.apiService.refreshToken(<string>sessionStorage.getItem('refresh_token')).toPromise();

    if (refreshTokenResponse!.status == ResponseStatus.Ok) {
      this.setToken(refreshTokenResponse!.data);
      return true;
    }

    return false;
  }

  private setToken(token: TokenResponse | null) {
    if (token != null) {
      sessionStorage.setItem('access_token', JSON.stringify(token.accessToken));
      sessionStorage.setItem('token_expiration', JSON.stringify(token.expiration));
      sessionStorage.setItem('refresh_token', JSON.stringify(token.refreshToken));
    }
  }

  async logOut() {
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }


  // AuthService içerisine eklenecek
public isLoggedIn(): boolean {
  return this.currentUserSubject.value !== null;
}
}
