import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Md5 } from 'md5-typescript';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { UserRegister, UserLogin } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // behavior subject complete thì Observabel sẽ nhận được giá trị signal
  private currentUserSubject = new BehaviorSubject<any>({} as any);
  // using đảm bảo giá trị hiện tại khác với giá trị được emit
  // đảm bảo dữ liệu khác nhâu mới thực thi hành động
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  private setAuth(user: any): void {
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  private saveToLocalStorage(user: any): void {
    this.jwtService.saveToken(user.result.accessToken);
    this.jwtService.saveExpirationDate(user.result.expireInSeconds);
  }

  purgeAuth(): void {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as any);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    // Remove ExpirationDate
    this.jwtService.destroyExpirationDate();
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate(): void {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get(`User/GetProfile`).subscribe(
        (data) => {
          this.setAuth(data.result);
        },
        (err) => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  login(user: UserLogin): Observable<UserLogin> {
    return this.apiService.post('User/login', user).pipe(
      map((data) => {
        this.saveToLocalStorage(data);
        this.currentUserSubject.next(data.result);
        return data.result;
      })
    );
  }

  createOtp(phoneNumber: string): Observable<any> {
    const data = {
      phoneNumber: phoneNumber,
      secureHash: Md5.init(`123qwe${phoneNumber}`),
      deviceId: '',
      sendTime: '1635933129748',
      type: 1
    };
    return this.apiService.post('User/SendSms?culture=vi-VN', data).pipe(
      map((data) => {
        return data.result.code;
      })
    );
  }

  register(user: UserRegister): Observable<UserRegister> {
    return this.apiService.post('User/register', user).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getUserProfile(): Observable<any> {
    return this.apiService.get(`User/GetProfile`).pipe(
      map((data) => {
        this.setAuth(data.result);
        return data.result;
      })
    );
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
