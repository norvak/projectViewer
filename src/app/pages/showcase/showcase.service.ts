import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ShowcaseService {

 constructor(private http: HttpClient) {
  }

  allClient(): Observable<any> {
    return this.http.get(`${environment.apiUrl}companies`);
  }

  allShowcases(): Observable<any> {
    return this.http.get(`${environment.apiUrl}showcases`);
  }

  allProjects(): Observable<any> {
    return this.http.get(`${environment.apiUrl}projects`);
  }

  save(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}showcases`, value);
  }

  update(showcase): Observable<any> {
    return this.http.patch(`${environment.apiUrl}showcases/${showcase.id}`, showcase);
  }

  show(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}showcases/${id}`);
  }

  deleteShowcase(showcase): Observable<any> {
    return this.http.delete(`${environment.apiUrl}showcases/${showcase.id}`, showcase);
  }
}
