import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);


  private accessKey = 'access';
  private refreshKey = 'refresh';


  private logged = signal<boolean>(false);


  constructor() {

    if (isPlatformBrowser(this.platformId)) {

      this.logged.set(
        !!localStorage.getItem(this.accessKey)
      );

    }

  }


  login(credentials:any){

    return this.http.post<any>(
      `${environment.apiUrl}/token/`,
      credentials
    );

  }


  saveTokens(response:any){

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }


    localStorage.setItem(
      this.accessKey,
      response.access
    );


    localStorage.setItem(
      this.refreshKey,
      response.refresh
    );


    this.logged.set(true);

  }


  logout(){

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }


    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);

    this.logged.set(false);

  }


  getToken(){

    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }


    return localStorage.getItem(this.accessKey);

  }


  isAuthenticated(){

    return this.logged();

  }

}
