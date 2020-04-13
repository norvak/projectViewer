import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RepositoryService } from './repository.service';
import { Subscriber, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { MoveElementComponent } from '../../share/move-element/move-element.component';
import { NgxToggleModule } from 'ngx-toggle';
 import { GlobalsProvider } from '../../share';
 import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { LoaderService } from '../../share/services/loader/loader.service';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import * as _ from 'lodash';

@Component({
  selector: 'app-repository',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class RepositoryComponent implements OnInit {

  public myFormGroup: FormGroup;
  public listFases: any[] = [];
  public listBody: any[] = [];
  public row: any[] = [];
  public progressEntregable: number;
  public upload = false;
  public fileToUpload: File = null;
  public url: any;
  public entregable = false;
  public contUpload = 0;
  public indexGlobal: number;
  public indexInterno: number;
  public deliverable: any[] = [];
  public methodologyId: any;
  public indexOf: number;

  fases: any [] = [];

  constructor( private formBuilder: FormBuilder,
               private service: RepositoryService,
               public router: Router,
               private coolDialogs: NgxCoolDialogsService,
               public loaderService: LoaderService,
               private globals: GlobalsProvider,
               private element: ElementRef,
               private cdr: ChangeDetectorRef,
               private clicpboardService: ClipboardService
               ) { }

  ngOnInit() {
    this.loaderService.show();
    this.myFormGroup = this.formBuilder.group({
      url: '',
      headers: this.formBuilder.array([])
    });
    this.allFases();
    this.getMethodology();
    this.loaderService.hide();

  }

  saveRow(control, index, fase_id) {
    const data: any = {
      id: control.at(index).value.id,
      fase_id: fase_id,
      body: _.map(control.at(index).value.row,(x, index) => {
         let name_url: any = {name: x.name}
         if(this.indexOf === index) {
            name_url.url = x.url;
          } else {
            x.name.replace(/(?:\r\n|\r|\n)/g, '<br>');
          }
        return name_url;
      })
    }
    this.loaderService.show();
    this.service.save(data)
      .subscribe(
        (resp: any) => {
          this.loaderService.hide();
          this.globals.alertSuccess('Se registro correctamente', 'Operación exitosa');
          control.at(index).get('id').setValue(resp.id);
          control.at(index).get('id').patchValue(resp.id);
        }, (error) => {
          this.loaderService.hide();
          console.error(error);
          this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
        });
       
  }  

  deleteRow(control, index, fase_id) {  
    if (control.at(index).value.id) {       
      const data: any = {
        id: control.at(index).value.id,
        fase_id: fase_id,
        body: _.map(control.at(index).value.row,(x) => {
          return x.name;
        })
      }
      this.loaderService.show();
      this.service.delete(data)
        .subscribe(
          (resp: any) => {
            this.loaderService.hide();
            control.removeAt(index)
            this.globals.alertSuccess('Se eliminó correctamente', 'Operación exitosa');         
          
          }, (error) => {
            this.loaderService.hide();
            console.error(error);
            this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
          });
    } else {
       control.removeAt(index);
    }
  }


  async allFases() {
    const sub = this.service.allFases().subscribe(async (resp: any) => {
      this.listFases = [];
      this.listFases = resp.data; 
      if (this.listFases.length !== 0) {       
        this.listFases[0].header.forEach((element, index) => {  
            if(element.name === 'Entregables') {
              this.indexOf = index;
            }                   
        })
       await  this.listFases.forEach(x => {
        this.listBody.push(x.header);
        });
        this.initHeader(this.listFases);
      }
    }, err => {
      console.error(err);
    });

  }

  initHeader(fases) {
    const control = this.myFormGroup.controls.headers as FormArray;
    fases.forEach(y => {
      control.push(this.formBuilder.group({
        fase_id: [y.id],
        name: [y.name],
        body: this.formBuilder.array([this.setRow(y.body, y.header)])
        }));
    });  
  }

  setRow(body, header = []) {
    const arr = new FormArray([]);
    body.forEach((y, index) => {   
     const  row = (this.formBuilder.group({
        id: [y.id],
        row: this.formBuilder.array(
          _.assign(_.range(header.length).map(x => {
                let name_url: any = {name: ['']}
                header.forEach((element, index) => {  
                  if(element.name === 'Entregables' || element.name === 'Entregable') {
                    name_url.url = [''];
                  }                   
                })               
                return this.formBuilder.group(name_url);
            }), y.data.map((i, a) => {              
              let name_url: any = {};
                if (i.name!==null) {
                  name_url.name = [i.name]
                } else {
                   name_url.name = ['']
                } 
                if(i.url) {
                    name_url.url = [i.url]
                  } else {
                  header.forEach((element, index) => {  
                    if((element.name === 'Entregables' || element.name === 'Entregable')
                         && index===a) {
                      name_url.url = [''];
                    }                   
                  }) 
                }
                 return this.formBuilder.group(name_url)      
                })
          )
        ) 
      }));
    arr.push(row);
    });    
   return arr;
  }

  addNewRow(event, index, control) {
    const element = event.srcElement;
    if (this.listFases[index].isActive) {
      const panel = element.parentElement;
      panel.style.maxHeight = panel.scrollHeight + 'rem';
      control.at(0).push(this.formBuilder.group({
         id: [null],
         row: this.formBuilder.array(_.assign(_.range(this.listFases[index].header.length).map((x, index) => { 
           let name_url: any = {name: ['']}
                if(index === this.indexOf) {
                  name_url.url = ['']
                }
            return this.formBuilder.group(name_url);
          })))
       }));
      } 
  }

  addDataOfRow(index, indexx) {
    this.indexGlobal = index;
    this.indexInterno = indexx;
  }

  changeValue(event, control, row, indexx) {
    control.value[indexx]=event;
    row.get('row').patchValue(control.value);
  }

  /**
   * * Este metodo registra los archivos por extension devolviendo la url
   * ? Usa el servicio postFileDocuments, postFileVideos,
   *  postFileImagens  para los registro
   * @param files el paramentro es de tipo FileList
   * !Impresion de errores console.log(error)
  */
  onFileChange (files: FileList) 
  {  
    for (let i = 0; i < files.length; i++) 
    {
        const type = files.item(i).type.split('/').pop();
        const header = this.myFormGroup.controls.headers as FormArray;    
        const body = header.at(this.indexGlobal).get('body') as FormArray;   
        const row =  body.at(0) as FormArray;
        const data = row.at(this.indexInterno).get('row') as FormArray;
        let  sub;
        switch (true) 
        {
           case type === 'pdf' :           
              sub = this.service.postFileDocuments(files.item(i)).subscribe((resp: any) => {
                if (resp.type === HttpEventType.UploadProgress) {
                this.contUpload += 1;
                }
                if (resp.type === 4) {
                  if (data.at(this.indexOf).get('name').value === '' || data.at(this.indexOf).get('name').value === null) {
                    data.at(this.indexOf).get('url').setValue(`${resp.body.url}`);
                    data.at(this.indexOf).get('name').setValue(`${resp.body.name}`);
                    data.at(this.indexOf).get('url').patchValue(data.at(this.indexOf).get('url').value);
                    data.at(this.indexOf).get('name').patchValue(data.at(this.indexOf).get('name').value);
                  } else {
                    data.at(this.indexOf).get('url').setValue(`${data.at(this.indexOf).get('url').value}\n${resp.body.url}`);
                    data.at(this.indexOf).get('name').setValue(`${data.at(this.indexOf).get('name').value}\n${resp.body.name}`);
                    data.at(this.indexOf).get('url').patchValue(data.at(this.indexOf).get('url').value);
                    data.at(this.indexOf).get('name').patchValue(data.at(this.indexOf).get('name').value);
                  }                  
                  this.contUpload = 0;
                  this.globals.alertSuccess('El documento se registro correctamente', 'Operación Exitosa');
                  sub.unsubscribe();
                }                 
              }, error => {
                console.error(error);
                this.globals.alertError('EL documento no se registro correctamente', 'Operación fallida');
                this.contUpload = 0;
                sub.unsubscribe();
              });
            break;

            case type === 'mp4' :
                sub = this.service.postFileVideos(files.item(i)).subscribe((resp: any) => {
                  if (resp.type === HttpEventType.UploadProgress) {
                  this.contUpload += 1;
                  }
                  if (resp.type === 4) {
                    if (data.at(this.indexOf).get('name').value === '' || data.at(this.indexOf).get('name').value === null) {
                      data.at(this.indexOf).get('url').setValue(`${resp.body.url}`);
                      data.at(this.indexOf).get('name').setValue(`${resp.body.name}`);
                      data.at(this.indexOf).get('url').patchValue(data.at(this.indexOf).get('url').value);
                      data.at(this.indexOf).get('name').patchValue(data.at(this.indexOf).get('name').value);
                    } else {
                      data.at(this.indexOf).get('url').setValue(`${data.at(this.indexOf).get('url').value}\n${resp.body.url}`);
                      data.at(this.indexOf).get('name').setValue(`${data.at(this.indexOf).get('name').value}\n${resp.body.name}`);
                      data.at(this.indexOf).get('url').patchValue(data.at(this.indexOf).get('url').value);
                      data.at(this.indexOf).get('name').patchValue(data.at(this.indexOf).get('name').value);
                    }
                    this.contUpload = 0;
                    this.globals.alertSuccess('El video se registro correctamente', 'Operación Exitosa');
                    sub.unsubscribe();
                  }                  
                }, error => {
                  console.error(error);
                  this.globals.alertError('El video no se registro correctamente', 'Operación fallida');
                  sub.unsubscribe();
                });
            break;

            case type === 'jpeg' ||  type === 'jpg' ||  type === 'png' :
                sub = this.service.postFileImagens(files.item(i)).subscribe((resp: any) => {
                  if (resp.type === HttpEventType.UploadProgress) {
                    this.contUpload += 1;
                  }
                  if (resp.type === 4) {
                    if (data.at(this.indexOf).get('name').value === '' || data.at(this.indexOf).get('name').value === null) {
                      data.at(this.indexOf).get('url').setValue(`${resp.body.url}`);
                      data.at(this.indexOf).get('name').setValue(`${resp.body.name}`);
                      data.at(this.indexOf).get('url').patchValue(data.at(this.indexOf).get('url').value);
                      data.at(this.indexOf).get('name').patchValue(data.at(this.indexOf).get('name').value);
                    } else {
                      data.at(this.indexOf).get('url').setValue(`${data.at(this.indexOf).get('url').value}\n${resp.body.url}`);
                      data.at(this.indexOf).get('name').setValue(`${data.at(this.indexOf).get('name').value}\n${resp.body.name}`);
                      data.at(this.indexOf).get('url').patchValue(data.at(this.indexOf).get('url').value);
                      data.at(this.indexOf).get('name').patchValue(data.at(this.indexOf).get('name').value);
                    }
                    this.contUpload = 0;
                    this.globals.alertSuccess('La imangen se registro correctamente', 'Operación Exitosa');
                    sub.unsubscribe();
                  }                               
                }, error => {
                  console.error(error);
                  this.globals.alertError('La imangen no se registro correctamente', 'Operación fallida');
                  sub.unsubscribe();                
                });
            break;

            default:
              this.globals.alertError('El archivo no tiene la extensión necesaria', 'Alerta');
            break;
        }
    }
  }

  toggleAccordian(event, index) {
    const element = event.target;
    element.classList.toggle('active');
    if (this.listFases[index].isActive) {
      this.listFases[index].isActive = false;
    } else {
      this.listFases[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  getMethodology() {
    this.service.getMethodology().subscribe((resp:any)=>{      
      if(resp.data.length !== 0) {
        this.methodologyId = resp.data[0].id;
        this.url = resp.data[0].public_url;
        this.myFormGroup.patchValue({
        url: resp.data[0].public_url
      });
      }else {
        this.methodologyId = null;
      }    
    }, (error) => {
      if (error.error.error === 'Unauthenticated.') {
        this.globals.alertError('El usuario no esta autentificado', 'Alerta');
        this.router.navigateByUrl('admin/authentication/login').then(() => {
          localStorage.clear();
          this.loaderService.hide();
        });
      }
    });
  }

  generateUrl() {   
    const data: any = {
      id: (!this.methodologyId) ? null : this.methodologyId,
      url: 'methodology-showcases',
      fases: _.map(this.listFases,(x) => {
        return x.id;
      })
    }
    this.loaderService.show();
    this.service.saveMethodology(data)
      .subscribe(
        (resp: any) => {
          this.getMethodology();
          this.loaderService.hide();
          this.globals.alertSuccess('Se registro correctamente', 'Operación exitosa');
        }, (error) => {
          this.loaderService.hide();
          console.error(error);
          this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
        });
  }

   copiarEnlace() {
    this.clicpboardService.copyFromContent(this.url);
    this.globals.alertSuccess('Se ha copiado el enlace!', 'Información');
  }
}