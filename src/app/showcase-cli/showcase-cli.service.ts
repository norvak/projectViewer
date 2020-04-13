import {Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { HttpClient, HttpEventType, HttpRequest, HttpEvent, HttpParams,  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseCliService {

 constructor(private http: HttpClient) { }


  showCase(url): Observable<any> {
    let headers;
    headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}showcase/${url}`, {
      headers: headers
    });
  }

  project(url): Observable<any> {
    let headers;
    headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}showcase/${url}`, {
      headers: headers
    });
  }

  saveRequest(value): Observable<any> {
    let headers;
    headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.apiUrl}emails`, value, { headers});
  }

  showVideo(id): Observable<any> {
    console.log(id);
     let headers;
    headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}multimedias/video/${id}`, {
      headers: headers
    });
  }

}
