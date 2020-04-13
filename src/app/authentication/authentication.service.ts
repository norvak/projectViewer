import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {isNull} from 'util';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: string;
  user: any;
   constructor(private http: HttpClient, private readonly router: Router) {
    this.token = localStorage.getItem('token');
    this.user  = JSON.parse(localStorage.getItem('user'));
  }

  get isAuthenticated() {
    return !isNull( this.user);
  }

  getToken(): string {
    return this.token ||  localStorage.getItem('token');
  }

  login(data: any) {
    const observer =  this.http.post(`${environment.apiUrl}login`, {
      username: data.username,
      password: data.password
    }).pipe(share());

    observer.subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      ( data: any) => {
          this.token = data.success.token.accessToken;
          this.user = data;
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.user.data));
      },
      (err) => {
          if (err.error.error === 'Unauthenticated.') {
            this.router.navigateByUrl('admin/authentication/login').then(() => {
              localStorage.clear();
            });
          }
      });
    return observer;
  }

  logout() {
    localStorage.clear();
    this.user = this.token = null;
  }

  getUser(): Observable<any> {
     return this.http.get(`${environment.apiUrl}user`);
  }

}
