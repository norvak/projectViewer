import {Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

 constructor(private http: HttpClient) {
  }

  allFases(): Observable<any> {
    return this.http.get(`${environment.apiUrl}fases`);
  }

  allItems(): Observable<any> {
    return this.http.get(`${environment.apiUrl}items`);
  }

  save(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}items`, value);
  }

  delete(item): Observable<any> {
    return this.http.delete(`${environment.apiUrl}items/${item.id}`, item);
  }

  postFileVideos(multimedia: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('multimedia', multimedia, multimedia.name);
    formData.append('type', 'repository');
     formData.append('label_id', '');
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${environment.apiUrl}multimedias`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  postFileImagens(multimedia: File): Observable <any> {
    let formData;
    let headers;   
    formData = new FormData();
    formData.append('multimedia', multimedia, multimedia.name );
    formData.append('type', 'repository');
     formData.append('label_id', '');
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${environment.apiUrl}multimedias/storeImagesRepository`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  postFileDocuments(documents: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('documents', documents, documents.name );
    formData.append('type', 'repository');
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');
     return this.http.post(`${environment.apiUrl}documents`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  getMethodology(): Observable<any> {
    return this.http.get(`${environment.apiUrl}methodologies`);
  }

  saveMethodology(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}methodologies`, value);
  }
}
