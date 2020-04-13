import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

 constructor(private http: HttpClient) {
  }

  all(): Observable<any> {
    return this.http.get(`${environment.apiUrl}users`);
  }

  save(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}users`, value);
  }

  update(user): Observable<any> {
    return this.http.patch(`${environment.apiUrl}users/${user.id}`, user);
  }

  changePassword(user: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}users/${user.id}/change-password`, user);
  }

  delete(data): Observable<any> {
    return this.http.delete(`${environment.apiUrl}users/${data.id}`);
  }

  show(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}users/${id}`);
  }

  email(email): Observable<any> {
    return this.http.post(`${environment.apiUrl}users/email`, email);
  }

  username(username): Observable<any> {
    return this.http.post(`${environment.apiUrl}users/username`, username);
  }
}
