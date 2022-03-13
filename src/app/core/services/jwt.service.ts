import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  getExpirationDate(): number {
    return window.localStorage['expiration'];
  }

  saveToken(token: String): void {
    window.localStorage['jwtToken'] = token;
  }

  saveExpirationDate(date: Date): void {
    window.localStorage['expiration'] = date;
  }

  destroyExpirationDate(): void {
    window.localStorage.removeItem('expiration');
  }

  destroyToken(): void {
    window.localStorage.removeItem('jwtToken');
  }
}
