import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenLocalStorageRepository {
  // private tokenKey = `${envConfig.appVersion}-${envConfig.TOKEN_KEY}`;
  private tokenKey = `${environment.tokenKey}`;

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  //
  // setToken(token: string): void {
  //   localStorage.setItem(this.tokenKey, token);
  // }
  //
  // removeToken(): void {
  //   localStorage.removeItem(this.tokenKey);
  // }

  // parseJwt():any {
  //   try {
  //     const token = this.getToken();
  //     if (token) {
  //       return JSON.parse(atob(token.split('.')[1]));
  //     }
  //     return null;
  //   } catch (e) {
  //     return null;
  //   }
  // }
  //
  //   getDecodedToken(): any {
  //     const token = this.getToken();
  //     if (token) {
  //       return jwtDecode(token);
  //     }
  //     return null;
  //   }
  //
  //   getUserRoleId(): number {
  //     const decodedToken = this.parseJwt();
  //     if (!decodedToken?.userRoleId) {
  //       throw new Error('Not found userRoleId');
  //     }
  //     return decodedToken.userRoleId;
  //   }
  //
  //   isTokenExpired(): boolean {
  //     const token = this.getToken();
  //     if (!token) return true;
  //
  //     const decodedToken = jwtDecode<any>(token);
  //     const expiration = Number(decodedToken.exp);
  //     const now = Math.floor(Date.now() / 1000);
  //
  //     return expiration < now;
  //   }
  //
  //   setUserData(userData: any) {
  // //    localStorage.setItem(this.userDataKey, JSON.stringify(userData));
  //   }
  //
  //   getUserData(): any | null {
  //  //   return this.getDataFromLocalStorage<any>(this.userDataKey);
  //   }
  //
  //   setDataEstab<T>(dataEstab: T) {
  //    // localStorage.setItem(this.estabKey, JSON.stringify(dataEstab));
  //   }
  //
  //   getDataEstab() {
  //     //return this.getDataFromLocalStorage<any>(this.estabKey);
  //   }

  // private getDataFromLocalStorage<T>(key: string): T | null {
  //   const data = localStorage.getItem(key);
  //   try {
  //     return typeof data === 'string' ? JSON.parse(data) : null;
  //   } catch (e) {
  //     return null;
  //   }
  // }

  // removeAllStorage() {
  //   Object.keys(localStorage).forEach(function (key) {
  //     if (key !== 'theme') {
  //       localStorage.removeItem(key);
  //     }
  //   });
  // }
}
