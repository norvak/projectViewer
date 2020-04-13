import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ConfigurationService {

 constructor(private http: HttpClient) {
  }

  allAuthors(): Observable<any> {
     return this.http.get(`${environment.apiUrl}authors`);
  }

  saveAuthor(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}authors`, value);
  }

  updateAuthor(author): Observable<any> {
    return this.http.patch(`${environment.apiUrl}authors/${author.id}`, author);
  }

  allTypeAuthors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}types`);
  }

  saveTypeAuthor(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}types`, value);
  }

  updateTypeAuthor(type): Observable<any> {
    return this.http.patch(`${environment.apiUrl}types/${type.id}`, type);
  }

  allFases(): Observable<any> {
    return this.http.get(`${environment.apiUrl}fases`);
  }

  saveFases(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}fases`, value);
  }
}
