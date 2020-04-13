import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpEvent, HttpParams,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor( private http: HttpClient) {
  }

  all(): Observable<any> {
    return this.http.get(`${environment.apiUrl}projects`);
  }

  save(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}projects`, value);
  }

  update(project): Observable<any> {
    return this.http.patch(`${environment.apiUrl}projects/${project.id}`, project);
  }

  delete(data): Observable<any> {
    return this.http.delete(`${environment.apiUrl}projects/${data.id}`);
  }

  show(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}projects/${id}`);
  }

  allAuthors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}authors`);
  }

  allTypeAuthors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}types`);
  }

  allPlatforms(): Observable<any> {
    return this.http.get(`${environment.apiUrl}platforms`);
  }

  allModules(): Observable<any> {
    return this.http.get(`${environment.apiUrl}modules`);
  }

  showPlatforms(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}platforms/${id}`);
  }

  allClient(): Observable<any> {
    return this.http.get(`${environment.apiUrl}companies`);
  }

  postFile(multimedia: File): Observable <any> {
    console.log(multimedia);
    let formData;
    let headers;
    formData = new FormData();
    formData.append('multimedia', multimedia, multimedia.name);
    formData.append('type', 'video');
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

  postFileImagens(fileToUploadImagenes: File[]): Observable <any> {
    let multimedia = new Array<File>();
    let formData;
    let headers;
    multimedia = fileToUploadImagenes;
    formData = new FormData();
    // tslint:disable-next-line:no-shadowed-variable
    multimedia.forEach(( multimedia ) => formData.append('multimedia[]', multimedia, multimedia.name));
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${environment.apiUrl}multimedias/imagenes`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }


  postFileProjectCharter(documents: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('documents', documents, documents.name );
    formData.append('type', 'ProjectCharter');
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');
     return this.http.post(`${environment.apiUrl}documents`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  postFileMethodology(documents: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('documents', documents, documents.name);
    formData.append('type', 'methodology');
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${environment.apiUrl}documents`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  postFileSlideshow(documents: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('documents', documents, documents.name);
    formData.append('type', 'Slideshow');
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${environment.apiUrl}documents`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  postFileCodeSource(codeSource: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('codeSource', codeSource, codeSource.name);
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${environment.apiUrl}codesources`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  postFileFunctional(documents: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('documents', documents, documents.name);
    formData.append('type', 'Functional');
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${environment.apiUrl}documents`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  postFileManual(documents: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('documents', documents, documents.name);
    formData.append('type', 'Manual');
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${environment.apiUrl}documents`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  postFileTechnical(documents: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('documents', documents, documents.name);
    formData.append('type', 'Technica');
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${environment.apiUrl}documents`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  projectDetail(uuidp): Observable<any> {
    return this.http.get(`${environment.apiUrl}project/${uuidp}`);
  }

  videoDemo(multimedia: File): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('multimedia', multimedia, multimedia.name);
    formData.append('type', 'demo');
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

  postFileImag(multimedia: File, id, etiqueta): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('multimedia', multimedia, multimedia.name);
    formData.append('label_id', etiqueta);
    formData.append('videoId', id);
    formData.append('status', 0);
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${environment.apiUrl}multimedias/portafolio`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }


  videoPortafolio(multimedia: File, etiqueta): Observable <any> {
    let formData;
    let headers;
    formData = new FormData();
    formData.append('multimedia', multimedia, multimedia.name);
    formData.append('type', '');
    formData.append('label_id', etiqueta);
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${environment.apiUrl}multimedias`, formData,
     {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

  /**
   * * All video of portafolio not select
   */
  // allVideoPortafolio(id): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}multimedias`);
  // }

  /**
   * * All video of portafolio by labels asociative
   */
  allVideoByLabel(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}multimedias/labels/${id}`);
  }

  showVideo(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}multimedias/${id}`);
  }

  allLabel(): Observable<any> {
    return this.http.get(`${environment.apiUrl}labels`);
  }

  saveLabel(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}labels`, value);
  }

  updateLabel(label): Observable<any> {
    return this.http.patch(`${environment.apiUrl}labels/${label.id}`, label);
  }

  showLabel(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}labels/${id}`);
  }

  exitsLabel(name): Observable<any> {
    return this.http.post(`${environment.apiUrl}labels/name`, {name});
  }
}
