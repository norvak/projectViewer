import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

 constructor(private http: HttpClient) {
  }

  all(): Observable<any> {
    return this.http.get(`${environment.apiUrl}companies`);
  }

  save(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}companies`, value);
  }

  update(company): Observable<any> {
    return this.http.patch(`${environment.apiUrl}companies/${company.id}`, company);
  }

  delete(data): Observable<any> {
    return this.http.delete(`${environment.apiUrl}companies/${data.id}`);
  }

  show(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}companies/${id}`);
  }
}
