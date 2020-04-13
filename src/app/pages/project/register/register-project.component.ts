import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { GlobalsProvider } from '../../../share';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { LoaderService } from '../../../share/services/loader/loader.service';
import { HttpEventType } from '@angular/common/http';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(),
    {
      animate: true,
      striped: true,
      max: 100
    });
}

@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.scss'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }, LoaderService, GlobalsProvider]
})
export class RegisterProjectComponent implements OnInit {

  @ViewChild('fotoPortafolio') fileInputVariable: ElementRef;
  @ViewChild('fotoPresentacion') fileInput: ElementRef;
  @ViewChild('exampleCheck') checkAdd: ElementRef;
   private contentPlaceholder: ElementRef;

 @ViewChild('contentPlaceholder') set content(content: ElementRef) {
    this.contentPlaceholder = content;
 }
  labelSelect = '';
  filesTest: File = null;
  public deleteAuthors = false;
  public videoEdit = false;
  public photoEdit = false;
  public documentEdit = false;
  public portafolioEdit = false;
  etiquetaAdd = '';
  uuidp: any;
  value:  any = '';
  datePickerConfig: Partial<BsDatepickerConfig>;
  activeSlideIndex = 0;
  registerForm: FormGroup;
  authors: FormArray;
  platforms: FormArray;
  modules: FormArray;
  public progress: number;
  public progressDemo: number;
  public progressPotafolio: number;
  public progressImagen: number;
  public progressImag: number;
  public progressCodeSource: number;
  public progressFunctional: number;
  public progressTechnical: number;
  public progressManual: number;
  public progressProjectCharter: number;
  public progressMethodology: number;
  public progressSlideshow: number;
  public contUpload = 0;
  public contImang = 0;
  public max = 100;
  uploadfoto = false;
  uploadVideo = false;
  uploadSlideshow = false;
  uploadProjectCharter = false;
  uploadMethodology = false;
  uploadManual = false;
  uploadTechnical = false;
  uploadFunctional = false;
  uploadCodeSource = false;
  video = false;
  okVideo = false;

  uploadVideoDemo = false;
  uploadVideoPortafolio = false;
  videoDemo = false;
  okVideoDemo = false;
  uploadImages = false;
  images = false;
  okImages = false;
  uploadImag = false;
  submitted = false;
  listMultimedia = false;

  public project: any;
  public updateProject = false;
  public editProject = false;


  fileToUploadurlCodeSource: File = null;
  fileToUploadFunctional: File = null;
  fileToUploadTechnical: File = null;
  fileToUploadManual: File = null;
  fileToUploadProjectCharter: File = null;
  fileToUploadSlideshow: File = null;
  fileToUploadVideo: File = null;
  fileToUploadVideoDemo: File = null;
  fileToUploadVideoPortafolio: File = null;
  fileToUploadPhotoPortafolio: File = null;
  fileToUploadMethodology: File = null;
  urlCodeSource: any = {};
  codeSource = false;
  urlFunctional: any = {};
  functional = false;
  urlTechnical: any = {};
  technical = false;
  urlManual: any = {};
  manual = false;
  urlProjectCharter: any = {};
  projectCharter = false;
  urlMethodology: any = {};
  methodology = false;
  urlSlideshow: any = {};
  slideshow = false;
  viewVideo: any;
  etiqueta: any;

  fileToUploadImagenes = new Array<File>();
  public selectedType: string;
  public listAuthorType = [];
  public listAuthor = [];
  public listPlatform = [];
  public listModule = [];
  public listClient = [];
  public listPortaf = [];
  public listVideos = [];
  public listEtiqueta = [];
  public cantAuthor = 0;
  portadaVideo: any = {};
  urlVideo: any = {};
  urlVideoDemo: any = {};
  urlImagen: any = [];

  public customer = false;
  public listSelectLabels: any[] = [];
  subVideo: any;
  subDemo: any;
  subFoto: any;
  subFunctional: any;
  videoId: any;

  constructor(
    private coolDialogs: NgxCoolDialogsService,
    private globals: GlobalsProvider,
    public loaderService: LoaderService,
    private service: ProjectService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-orange' },
      { showWeekNumbers: false },
      { dateInputFormat: 'DD-MM-YYYY' },
      { locale: 'es' });
  }

  ngOnInit() {
    this.urlSlideshow.id = null;
    this.urlProjectCharter.id = null;
    this.urlManual.id = null;
    this.urlTechnical.id = null;
    this.urlFunctional.id = null;
    this.urlCodeSource.id = null;
    this.urlVideo.id = null;
    this.urlVideoDemo.id = null;
    this.urlImagen = null;

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['uuidp']) {
        this.updateProject = true;
        this.uuidp = params['uuidp'];
      }
    });

    if (!this.updateProject) {
      this.registerForm = this.formBuilder.group({
        name: [null, Validators.required],
        creation_date: moment(new Date()).format('DD-MM-YYYY'),
        description: [''],
        original_customer: [''],
        overall_objective: ['', Validators.required],
        goal_objective: ['', Validators.required],
        quantity_hours: ['', Validators.required],
        price: ['', Validators.required],
        currency: [''],
        authors: this.formBuilder.array([]),
        platforms: this.formBuilder.array([]),
        modules: this.formBuilder.array([])
      });

      this.selectedType = '$';
      this.loaderService.show();
      this.authorList();
      this.typeAuthor();
      this.listPlatforms();
      this.listModules();
      this.clientList();
      this. listarLabels();
      this.loaderService.hide();
      this.addAuthors();
      this.addPlatforms();
      this.addModules();

    } else {
      this.registerForm = this.formBuilder.group({
        name: [null, Validators.required],
        creation_date: [''],
        description: [''],
        original_customer: [''],
        overall_objective: ['', Validators.required],
        goal_objective: ['', Validators.required],
        quantity_hours: ['', Validators.required],
        price: ['', Validators.required],
        currency: ['', Validators.required],
        authors: this.formBuilder.array([this.formAuthors()]),
        platforms: this.formBuilder.array([this.formPlatforms()]),
        modules: this.formBuilder.array([this.formModules()])
      });
      this.projectShow();
    }
  }

  cancelar() {
    this.router.navigate(['admin/project']);
  }

  deleteAuthor(i: number) {
    this.initAuthors.removeAt(i);
  }

  get initAuthors() {
    return this.registerForm.get('authors') as FormArray;
  }

  formAuthors(values = null) {
    const authors = this.formBuilder.group({
      id: [],
      name_author: ['', Validators.required],
      type_id: [],
    });
    authors.get('name_author').valueChanges.subscribe((value) => {
      const author = this.listAuthor.find(d => d.name_author === value);
      if (author) {
        authors.get('id').setValue(author.id);
      } else {
        authors.get('id').setValue(null);
      }
    });
    if (values) {
      authors.patchValue(values);
    }
    return authors;
  }

  addAuthors(values = null) {
    this.initAuthors.push(this.formAuthors(values));
  }


  get createPlatforms() {
    return this.registerForm.get('platforms') as FormArray;
  }

  formPlatforms(values = null) {

    const platforms = this.formBuilder.group({
      id: [],
      name_platform: ['', Validators.required]
    });
    platforms.get('name_platform').valueChanges.subscribe((value) => {
      const platform = this.listPlatform.find(d => d.name_platform === value);
      if (platform) {
        platforms.get('id').setValue(platform.id);
      } else {
        platforms.get('id').setValue(null);
      }
    });
    if (values) {
      platforms.patchValue(values);
    }
    return platforms;
  }

  addPlatforms(values = null) {
    this.createPlatforms.push(this.formPlatforms(values));
  }


  get createModules() {
    return this.registerForm.get('modules') as FormArray;
  }

  formModules(values = null) {
    const modules = this.formBuilder.group({
      id: [],
      name_module: ['', Validators.required]
    });
    modules.get('name_module').valueChanges.subscribe((value) => {
      const module = this.listModule.find(d => d.name_module === value);
      if (module) {
        modules.get('id').setValue(module.id);
      } else {
        modules.get('id').setValue(null);
      }
    });
    if (values) {
      modules.patchValue(values);
    }
    return modules;
  }

  addModules(values = null) {
    this.createModules.push(this.formModules(values));
  }


  get validate() {
    return this.registerForm.controls;
  }

  async onSubmit() {
    const multimedia: any = [];
    const documents: any = [];
    this.submitted = true;
    if (this.registerForm.invalid) {
      if (this.registerForm.controls.authors.invalid) {
        this.globals.alertError('Verificar el nombre completo del participante es requerido', 'Alerta');
      }
      if (this.registerForm.controls.platforms.invalid) {
        this.globals.alertError('Verificar el nombre de la plataforma es requerido', 'Alerta');
      }
      if (this.registerForm.controls.modules.invalid) {
        this.globals.alertError('Verificar el nombre del modulo es requerido', 'Alerta');
      }
      if (this.registerForm.controls.price.invalid) {
        this.globals.alertError('Verificar el precio es requerido', 'Alerta');
      }
      return;
    } else {

      if (this.urlProjectCharter.id === null) {
        this.globals.alertError('Verificar el project Charter es requerido', 'Alerta');
      } else {

        if (this.urlVideo.id) {
          multimedia.push(this.urlVideo.id);
          multimedia.push(this.portadaVideo);
        }

        if (this.urlVideoDemo.id) {
          multimedia.push(this.urlVideoDemo.id);
        }
        if (this.urlImagen !== null) {
          for (const imagen of this.urlImagen) {
            multimedia.push(imagen.id);
          }
        }
        if (this.listSelectLabels.length > 0)  {
          for (const label of this.listSelectLabels) {
            multimedia.push(label.id);
          }
        }
        documents.push(this.urlProjectCharter.id);
        if (this.urlSlideshow.id) {
          documents.push(this.urlSlideshow.id);
        }
        if (this.urlFunctional.id) {
          documents.push(this.urlFunctional.id);
        }
        if (this.urlTechnical.id) {
          documents.push(this.urlTechnical.id);
        }
        if (this.urlManual.id) {
          documents.push(this.urlManual.id);
        }
        if (this.urlMethodology.id) {
          documents.push(this.urlMethodology.id);
        }
        const data: any = {
          id: (!this.updateProject) ? null : this.project.id,
          name: this.registerForm.value.name.charAt(0).toUpperCase() + this.registerForm.value.name.slice(1),
          uuidp: (!this.updateProject) ? null : this.project.uuidp,
          creation_date: moment(this.registerForm.value.creation_date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
          description: this.registerForm.value.description,
          overall_objective: this.registerForm.value.overall_objective,
          goal_objective: this.registerForm.value.goal_objective,
          original_customer: this.registerForm.value.original_customer,
          quantity_hours: this.registerForm.value.quantity_hours,
          price: this.registerForm.value.price,
          currency: this.registerForm.value.currency,
          documents: documents,
          authors: this.registerForm.value.authors,
          platforms: this.registerForm.value.platforms,
          modules: this.registerForm.value.modules,
          multimedia: multimedia,
          code_source_id: this.urlCodeSource.id
        };
        if (!this.updateProject) {
          this.loaderService.show();
          await this.service.save(data)
            .subscribe(
              (resp: any) => {
                this.loaderService.hide();
                this.globals.alertSuccess('El proyecto se registro correctamente', 'Operación exitosa');
                this.router.navigate(['admin/project']);
              }, (error) => {
                this.loaderService.hide();
                this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
              });
        } else {
          this.loaderService.show();
          await this.service.update(data)
            .subscribe(
              (resp: any) => {
                this.loaderService.hide();
                this.globals.alertSuccess('El proyecto se actualizado correctamente', 'Operación exitosa');
                this.router.navigate(['admin/project']);
              }, (error) => {
                this.loaderService.hide();
                this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
              });
        }
      }
    }
  }


  clientList() {
    this.service.allClient().subscribe((resp: any) => {
      this.listClient = [];
      this.listClient = resp.data;
    });
  }

  authorList() {
    this.service.allAuthors().subscribe((resp: any) => {
      this.listAuthor = [];
      this.listAuthor = resp.data;
    });
  }

  typeAuthor() {
    this.service.allTypeAuthors().subscribe((resp: any) => {
      this.listAuthorType = [];
      this.listAuthorType = resp.data;
    });
  }

  listPlatforms() {
    this.service.allPlatforms().subscribe((resp: any) => {
      this.listPlatform = [];
      this.listPlatform = resp.data;
    }, (error) => {
      if (error.error.error === 'Unauthenticated.') {
        this.globals.alertError('El usuario no esta autentificado', 'Alerta');
        this.router.navigateByUrl('admin/authentication/login').then(() => {
          localStorage.clear();
        });
        this.loaderService.hide();
      }
    });
  }

  listModules() {
    this.service.allModules().subscribe((resp: any) => {
      this.listModule = [];
      this.listModule = resp.data;
    }, (error) => {
      if (error.error.error === 'Unauthenticated.') {
        this.globals.alertError('El usuario no esta autentificado', 'Alerta');
        this.router.navigateByUrl('admin/authentication/login').then(() => {
          localStorage.clear();
        });
        this.loaderService.hide();
      }
    });
  }

  // registrar el video Demo
  onFileChangeVideoDemo(files: FileList) {
    this.okVideoDemo = false;
    if (files.item(0)) {
      this.fileToUploadVideoDemo = files.item(0);
      this.progressDemo = 0;
      let pv = 0;
      this.uploadVideoDemo = true;
      this.urlVideoDemo = {};


      this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + this.fileToUploadVideoDemo.name + '?')
        .subscribe(res => {
          if (res) {
          this.subDemo =  this.service.videoDemo(this.fileToUploadVideoDemo).subscribe((resp: any) => {

              if (resp.type === HttpEventType.UploadProgress) {
                pv = Math.round(resp.loaded / resp.total * 100);
                this.progressDemo = pv;
                this.contUpload += 1;
              }
              if (resp.type === 4) {
                this.urlVideoDemo = resp.body;
                this.globals.alertSuccess('El video demo se registro correctamente', 'Operación Exitosa');
                this.uploadVideoDemo = false;
                this.okVideoDemo = true;
                this.progressDemo = 0;
                this.contUpload = 0;
              }
            }, error => {
              if (error) {
                console.log(error);
                this.uploadVideoDemo = false;
                this.okVideoDemo = false;
                this.contUpload = 0;
                this.globals.alertError('El video demo no se registro correctamente', 'Operación fallida');
              }
            });
          } else {
            this.uploadVideoDemo = false;
            this.fileToUploadVideoDemo = null;
            return;
          }
        });
    }
  }

  destroyVideoDemo () {
    this.subDemo.unsubscribe();
    // this.uploadVideoDemo = false;
    // this.okVideoDemo = false;
    this.contUpload = 0;
  }

 /**
 * * Este metodo registra la portada del video de presentacion
 * ? Usa el servicio postFileFront para los registro
 * @param files el paramentro es de tipo FileList
 * !Impresion de errores console.log(error)
 */
  onFileChangeVideo(files: FileList) {
    if (files.item(0) && files.item(0).type.split('/').pop() === 'mp4') {
        this.fileToUploadVideo = files.item(0);

        this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
          + this.fileToUploadVideo.name + '?')
          .subscribe(res => {
            if (res) {
              this.coolDialogs.confirm('Se requiere seleccionar una portada para el video '
            + this.fileToUploadVideo.name)
            .subscribe(respt => {
              if (respt) {
                this.fileInput.nativeElement.click();
              }
            });
            } else {
              this.fileToUploadVideo = null;
              this.okVideo = false;
              this.uploadVideo = false;
            }
          });
    }
  }

/**
 * * Este metodo registra la portada del video de presentacion
 * ? Usa el servicio postFileFront para los registro
 * @param files el paramentro es de tipo FileList
 * !Impresion de errores console.log(error)
 */
onFileFrontPortada(files: FileList) {
  if (files.item(0)) {

      if ( files.item(0).type.split('/').pop() === 'png' || files.item(0).type.split('/').pop() === 'jpeg') {
          this.fileToUploadPhotoPortafolio =  files.item(0);
          if (this.fileToUploadPhotoPortafolio) {
              let pv = 0;
              this.okVideo = false; // nombre de video
              this.progress = 0;
              this.contUpload = 0;
              this.urlVideo = {};   // data del video
              this.uploadVideo = true; // loader del video
              this.subVideo =  this.service.postFile(this.fileToUploadVideo).subscribe((resp: any) => {

                if (resp.type === HttpEventType.UploadProgress) {
                  pv = Math.round(resp.loaded / resp.total * 100);
                  this.progress = pv;
                  this.contUpload += 1;
                }
                if (resp.type === 4) {
                  this.urlVideo = resp.body;
                  this.globals.alertSuccess('El video se registro correctamente', 'Operación Exitosa');
                  this.uploadVideo = false;
                  this.okVideo = true;
                  this.progress = 0;
                  this.contUpload = 0;
                  this.etiqueta = '';

                  this.service.postFileImag(this.fileToUploadPhotoPortafolio, this.urlVideo.id, this.etiqueta).subscribe((respu: any) => {
                    if (respu.type === HttpEventType.UploadProgress) {
                      pv = Math.round(respu.loaded / respu.total * 100);
                      this.progressImag = pv;
                      this.contUpload += 1;
                    }
                    if (respu.type === 4) {
                      this.contUpload = 0;
                      this.portadaVideo = respu.body.id;
                      this.globals.alertSuccess('La portada se registro correctamente', 'Operación Exitosa');
                   }
                  }, error => {
                    console.log(error);
                    this.globals.alertError('La portada no se registro correctamente', 'Operación fallida');
                  });
                }
              }, error => {
                if (error) {
                  console.log(error);
                  // this.uploadVideo = false;
                  // this.okVideo = false;
                  // this.contUpload = 0;
                  this.globals.alertError('El video no se registro correctamente', 'Operación fallida');
                }
              });
          }
      }
  }
}


  destroyVideo () {
    this.subVideo.unsubscribe();
    this.uploadVideo = false;
    this.okVideo = false;
    this.contUpload = 0;
  }

  // registrar la(s) imagenes
  onFileChangeFotos(event) {
    // this.images = true;
    if (event.target.files) {
      this.uploadImages = false;
      let pv = 0;
      this.urlImagen = [];
      this.contImang = 0;
      let files;
      files = event.target.files;

      this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + files.length + '?')
        .subscribe(res => {
          if (res) {
            if (files.length > 5) {
              this.globals.alertWarning('Ha excedido el limite maximo de imagen(es)', 'Alerta');
              return event.target.files[0];
            } else {
              for (let i = 0; i < files.length; i++) {
                this.fileToUploadImagenes.push(files[i]);
              }
              this.progressImagen = 0;
              this.uploadImages = true;
              this.subFoto =  this.service.postFileImagens(this.fileToUploadImagenes).subscribe((resp: any) => {

                if (resp.type === HttpEventType.UploadProgress) {
                  pv = Math.round(resp.loaded / resp.total * 100);
                  this.progressImagen = pv;
                  this.contUpload += 1;
                }
                if (resp.type === 4) {
                  this.urlImagen = resp.body;
                  this.contImang = this.urlImagen.length;
                  this.okImages = true;
                  this.uploadImages = false;
                  this.progressImagen = 0;
                  this.contUpload = 0;
                  this.globals.alertSuccess('Imagen(es) se registro correctamente', 'Operación Exitosa');
                }
              }, error => {
                console.log(error);
                this.uploadImages = false;
                this.okImages = false;
                this.contUpload = 0;
                this.globals.alertError('Imagen(es) no se registro correctamente', 'Operación fallida');
                return event.target.files[0];
              });
            }
          } else {
            this.uploadImages = false;
            return event.target.files[0];
          }
        });
    }
  }

  destroyFotos () {
    this.subFoto.unsubscribe();
    this.uploadImages = false;
    this.okImages = false;
    this.contUpload = 0;
  }

  // registrar la documencion funcional
  onFileChangeFunctional(files: FileList) {
    if (files.item(0)) {
      this.fileToUploadFunctional = files.item(0);
      let pv = 0;
      this.urlFunctional = {};
      this.uploadFunctional = true;
      this.progressFunctional = 0;

      this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + this.fileToUploadFunctional.name + '?')
        .subscribe(res => {
          if (res) {
            this.subFunctional = this.service.postFileFunctional(this.fileToUploadFunctional).subscribe((resp: any) => {

              if (resp.type === HttpEventType.UploadProgress) {
                pv = Math.round(resp.loaded / resp.total * 100);
                this.progressFunctional = pv;
                this.contUpload += 1;
              }
              if (resp.type === 4) {
                this.urlFunctional = {};
                this.urlFunctional = resp.body;
                this.uploadFunctional = false;
                this.contUpload = 0;
                this.globals.alertSuccess('El documento funcional se registro correctamente', 'Operación Exitosa');
                this.functional = true;
              }
            }, error => {
              console.log(error);
              this.globals.alertError('El documento funcional no se registro correctamente', 'Operación fallida');
              this.functional = false;
              this.uploadFunctional = false;
              this.contUpload = 0;
            });
          } else {
            this.fileToUploadFunctional = null;
            this.uploadFunctional = false;
            return;
          }
        });
    }
  }

  destroyFunctional () {
    this.subFunctional.unsubscribe();
    this.functional = false;
    this.uploadFunctional = false;
    this.contUpload = 0;
  }

  // registrar el manual de usuario
  onFileChangeManual(files: FileList): void {
    if (files.item(0)) {
      this.fileToUploadManual = files.item(0);
      let pv = 0;
      this.urlManual = {};
      this.uploadManual = true;
      this.progressManual = 0;

      this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + this.fileToUploadManual.name + '?')
        .subscribe(res => {
          if (res) {
            this.service.postFileManual(this.fileToUploadManual).subscribe((resp: any) => {

              if (resp.type === HttpEventType.UploadProgress) {
                pv = Math.round(resp.loaded / resp.total * 100);
                this.progressManual = pv;
                this.contUpload += 1;
              }
              if (resp.type === 4) {
                this.urlManual = {};
                this.urlManual = resp.body;
                this.uploadManual = false;
                this.globals.alertSuccess('El manual de usuario se registro correctamente', 'Operación Exitosa');
                this.manual = true;
                this.contUpload = 0;
              }
            }, error => {
              console.log(error);
              this.globals.alertError('El manual de usuario no se registro correctamente', 'Operación fallida');
              this.uploadManual = false;
              this.manual = false;
              this.contUpload = 0;
            });
          } else {
            this.fileToUploadManual = null;
            this.uploadManual = false;
            return;
          }
        });
    }
  }

  // registrar manual tecnico
  onFileChangeTechnical(files: FileList) {
    if (files.item(0)) {
      this.fileToUploadTechnical = files.item(0);
      this.urlTechnical = {};
      this.uploadTechnical = true;
      this.progressTechnical = 0;
      let pv = 0;

      this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + this.fileToUploadTechnical.name + '?')
        .subscribe(res => {
          if (res) {
            this.service.postFileTechnical(this.fileToUploadTechnical).subscribe((resp: any) => {

              if (resp.type === HttpEventType.UploadProgress) {
                pv = Math.round(resp.loaded / resp.total * 100);
                this.progressTechnical = pv;
                this.contUpload += 1;
              }
              if (resp.type === 4) {
                this.urlTechnical = {};
                this.urlTechnical = resp.body;
                this.uploadTechnical = false;
                this.contUpload = 0;
                this.globals.alertSuccess('El manual tecnico se registro correctamente', 'Operación Exitosa');
                this.technical = true;
              }
            }, error => {
              console.log(error);
              this.globals.alertError('El manual tecnico no se registro correctamente', 'Operación fallida');
              this.technical = false;
              this.uploadTechnical = false;
              this.contUpload = 0;
            });
          } else {
            this.fileToUploadTechnical = null;
            this.uploadTechnical = false;
            return;
          }
        });
    }
  }

  // registrar project charter
  onFileChangeProjectCharter(files: FileList) {
    if (files.item(0)) {
      this.fileToUploadProjectCharter = files.item(0);
      let pv = 0;
      this.urlProjectCharter = {};
      this.uploadProjectCharter = true;
      this.progressProjectCharter = 0;

      this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + this.fileToUploadProjectCharter.name + '?')
        .subscribe(res => {
          if (res) {
            this.service.postFileProjectCharter(this.fileToUploadProjectCharter).subscribe((resp: any) => {

              if (resp.type === HttpEventType.UploadProgress) {
                pv = Math.round(resp.loaded / resp.total * 100);
                this.progressProjectCharter = pv;
                this.contUpload += 1;
              }
              if (resp.type === 4) {
                this.urlProjectCharter = {};
                this.urlProjectCharter = resp.body;
                this.uploadProjectCharter = false;
                this.contUpload = 0;
                this.globals.alertSuccess('El project charter se registro correctamente', 'Operación Exitosa');
                this.projectCharter = true;
              }
            }, error => {
              console.log(error);
              this.globals.alertError('El project charter no se registro correctamente', 'Operación fallida');
              this.projectCharter = false;
              this.uploadProjectCharter = false;
              this.contUpload = 0;
            });

          } else {
            this.fileToUploadProjectCharter = null;
            this.uploadProjectCharter = false;
            return;
          }
        });
    }
  }

  onFileChangeMethodology(files: FileList) {
    if (files.item(0)) {
      this.fileToUploadMethodology = files.item(0);
      let pv = 0;
      this.urlMethodology = {};
      this.uploadMethodology = true;
      this.progressMethodology = 0;

      this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + this.fileToUploadMethodology.name + '?')
        .subscribe(res => {
          if (res) {
            this.service.postFileMethodology(this.fileToUploadMethodology).subscribe((resp: any) => {

              if (resp.type === HttpEventType.UploadProgress) {
                pv = Math.round(resp.loaded / resp.total * 100);
                this.progressMethodology = pv;
                this.contUpload += 1;
              }
              if (resp.type === 4) {
                this.urlMethodology = {};
                this.urlMethodology = resp.body;
                this.uploadMethodology = false;
                this.contUpload = 0;
                this.globals.alertSuccess('La metodologia  se registro correctamente', 'Operación Exitosa');
                this.methodology = true;
              }
            }, error => {
              console.log(error);
              this.globals.alertError('La metodologia no se registro correctamente', 'Operación fallida');
              this.methodology = false;
              this.uploadMethodology = false;
              this.contUpload = 0;
            });

          } else {
            this.fileToUploadMethodology = null;
            this.uploadMethodology = false;
            return;
          }
        });
    }
  }

  // registrar la presentacion
  onFileChangeSlideshow(files: FileList) {
    if (files.item(0)) {
      this.fileToUploadSlideshow = files.item(0);
      let pv = 0;
      this.urlSlideshow = {};
      this.uploadSlideshow = true;
      this.progressSlideshow = 0;

      this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + this.fileToUploadSlideshow.name + '?')
        .subscribe(res => {
          if (res) {
            this.service.postFileSlideshow(this.fileToUploadSlideshow).subscribe((resp: any) => {

              if (resp.type === HttpEventType.UploadProgress) {
                pv = Math.round(resp.loaded / resp.total * 100);
                this.progressSlideshow = pv;
                this.contUpload += 1;
              }
              if (resp.type === 4) {
                this.urlSlideshow = {};
                this.urlSlideshow = resp.body;
                this.uploadSlideshow = false;
                this.globals.alertSuccess('La presentación se registro correctamente', 'Operación Exitosa');
                this.slideshow = true;
                this.contUpload = 0;
              }
            }, error => {
              console.log(error);
              this.globals.alertError('La presentación no se registro correctamente', 'Operación fallida');
              this.slideshow = false;
              this.uploadSlideshow = false;
              this.contUpload = 0;
            });

          } else {
            this.fileToUploadSlideshow = null;
            this.uploadSlideshow = false;
            return;
          }
        });
    }
  }

  // registrar el codigo fuente
  onFileChangeSource(files: FileList) {
    if (files.item(0)) {
      this.fileToUploadurlCodeSource = files.item(0);
      let pv = 0;
      this.urlSlideshow = {};
      this.uploadCodeSource = true;
      this.progressCodeSource = 0;


      this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + this.fileToUploadurlCodeSource.name + '?')
        .subscribe(res => {
          if (res) {
            this.service.postFileCodeSource(this.fileToUploadurlCodeSource).subscribe((resp: any) => {

              if (resp.type === HttpEventType.UploadProgress) {
                pv = Math.round(resp.loaded / resp.total * 100);
                this.progressCodeSource = pv;
                this.contUpload += 1;
              }
              if (resp.type === 4) {
                this.urlCodeSource = {};
                this.uploadCodeSource = false;
                this.urlCodeSource = resp.body;
                this.contUpload = 0;
                this.globals.alertSuccess('El codigo fuente se registro correctamente', 'Operación Exitosa');
                this.codeSource = true;
              }
            }, error => {
              console.log(error);
              this.globals.alertError('El codigo fuente no se registro correctamente', 'Operación fallida');
              this.codeSource = false;
              this.uploadCodeSource = false;
              this.contUpload = 0;
            });
          } else {
            this.fileToUploadurlCodeSource = null;
            this.uploadCodeSource = false;
            return;
          }
        });
    }
  }

/**
 * * Este metodo registra los videos del portafolio
 * ? Usa el servicio postFileFront para los registro
 * @param files el paramentro es de tipo FileList
 * !Impresion de errores console.log(error)
 */
   onFileChangeVideoPortafolio(files: FileList) {
    if (files.item(0) && files.item(0).type.split('/').pop() === 'mp4') {
        this.fileToUploadVideoPortafolio = files.item(0);
        this.coolDialogs.confirm('¿Esta seguro que desea registar este archivo: '
        + this.fileToUploadVideoPortafolio.name + '?')
        .subscribe(res => {
          if (res) {
            this.coolDialogs.confirm('Se requiere seleccionar una portada para el video '
            + this.fileToUploadVideoPortafolio.name)
            .subscribe(respt => {
              if (respt) {
                this.fileInputVariable.nativeElement.click();
              }
            });
          } else {
              this.fileToUploadVideoPortafolio = null;
              this.uploadVideoPortafolio = false;
            }
      });
    }
  }

/**
 * * Este metodo registra la portada del video del portafolio
 * ? Usa el servicio postFileFront para los registro
 * @param files el paramentro es de tipo FileList
 * !Impresion de errores console.log(error)
 */
  onFileChangeFrontPortafolio(files: FileList) {
    if (files.item(0)) {
        if ( files.item(0).type.split('/').pop() === 'png' || files.item(0).type.split('/').pop() === 'jpeg') {
            this.fileToUploadPhotoPortafolio =  files.item(0);
            if (this.fileToUploadPhotoPortafolio) {
              let pv = 0;
              this.progressPotafolio = 0;
              this.videoId = 0;
              this.uploadVideoPortafolio = true;
              this.service.videoPortafolio(this.fileToUploadVideoPortafolio, this.etiqueta).subscribe((resp: any) => {

              if (resp.type === HttpEventType.UploadProgress) {
                pv = Math.round(resp.loaded / resp.total * 100);
                this.progressPotafolio = pv;
                this.contUpload += 1;
              }
              if (resp.type === 4) {
                this.videoId = resp.body.id;
                this.contImang = 0;
                pv = 0;

                this.uploadImag = true;

                this.globals.alertSuccess('El video se registro correctamente', 'Operación Exitosa');
                this.uploadVideoPortafolio = false;
                this.progressPotafolio = 0;
                this.contUpload = 0;
                this.service.postFileImag(this.fileToUploadPhotoPortafolio, this.videoId, this.etiqueta).subscribe((respu: any) => {
                if (respu.type === HttpEventType.UploadProgress) {
                  pv = Math.round(respu.loaded / respu.total * 100);
                  this.progressImag = pv;
                  this.contUpload += 1;
                }
                if (respu.type === 4) {
                  this.uploadImag = false;
                  this.progressImag = 0;
                  this.contUpload = 0;
                  this.globals.alertSuccess('La portada se registro correctamente', 'Operación Exitosa');
                  this.allVideoByLabels();
                }
              }, error => {
                console.log(error);
                this.uploadImag = false;
                this.contUpload = 0;
                this.globals.alertError('La portada no se registro correctamente', 'Operación fallida');
              });
              }
            }, error => {
              if (error) {
                console.log(error);
                this.uploadVideoPortafolio = false;
                this.contUpload = 0;
                this.globals.alertError('El video no se registro correctamente', 'Operación fallida');
              }
            });
            }
        }
    }
  }


  allVideoByLabels() {
    this.service.allVideoByLabel(this.etiqueta).subscribe(resp => {
        this.listPortaf = [];
        this.listPortaf = resp.data;
        this.listPortaf.map((element) => {
          element.name = element.name.split('.')[0];
      });
        }, error => {
          console.log(error);
          this.globals.alertError('La etiqueta no existe', 'Operación fallida');
    });
  }

  setLabel() {
    if (this.etiquetaAdd !== '') {
      this.loaderService.show();
      this.service.exitsLabel(this.etiquetaAdd.charAt(0).toUpperCase() + this.etiquetaAdd.slice(1)).subscribe((resp: any) => {
        if (resp) {
           this.globals.alertWarning('La etiqueta ya existe', 'Aviso');
          } else {
                   const data: any = {
                   name: this.etiquetaAdd.charAt(0).toUpperCase() + this.etiquetaAdd.slice(1)
                  };
                this.service.saveLabel(data).subscribe((respt: any) => {
                this.etiqueta = respt.id;
                this.listMultimedia = true;
                this.listarLabels();
                this.globals.alertSuccess('La etiqueta se registro correctamente', 'Operación Exitosa');
              }, error => {
                console.log(error);
                this.globals.alertError('La etiqueta no se registro correctamente', 'Operación fallida');
              });
          }
        }, error => {
           console.log(error);
           this.globals.alertError('Error en la consulta', 'Operación fallida');
        });
        this.loaderService.hide();
    }
  }

  listarLabels() {
    this.service.allLabel().subscribe(resp => {
      this.listEtiqueta  = [];
      this.listEtiqueta = resp.data;
    });
  }

  getEtiqueta(list) {
    this.etiquetaAdd = list.name;
  }

  shareLabel(data) {
    this.etiquetaAdd = '';
    if (this.listEtiqueta.length > 0 && data !== '') {
     this.listEtiqueta.map((element) => {
      if (element.name === data.charAt(0).toUpperCase() + data.slice(1)) {
         this.etiquetaAdd = element.name;
         this.etiqueta = element.id;
      }
    });
      if (this.etiquetaAdd === data.charAt(0).toUpperCase() + data.slice(1)) {
        this.service.allVideoByLabel(this.etiqueta).subscribe(resp => {
        this.listPortaf = [];
        this.listPortaf = resp.data;
        this.listPortaf.map((element) => {
          element.name = element.name.split('.')[0];
      });
        this.listMultimedia = true;
        }, error => {
          console.log(error);
          this.globals.alertError('La etiqueta no existe', 'Operación fallida');
        });
      }
    }
  }

  showVideoSelect(id) {
    this.service.showVideo(id).subscribe(resp => {
      this.viewVideo = {};
      this.viewVideo = resp.data;
    });
  }

  atras() {
    if (this.updateProject) {
     this.etiqueta = '';
     this.etiquetaAdd = '';
     this.listPortaf = [];
      this.listMultimedia = false;
      this.listSelectLabels = [];
      if (this.viewVideo !== '') {
         this.viewVideo = null;
      }
    } else {
      this.listMultimedia = false;
      this.etiqueta = '';
      this.etiquetaAdd = '';
      this.listPortaf = [];
      this.labelSelect = '';
      this.listSelectLabels = [];
      if (this.viewVideo !== '') {
         this.viewVideo = null;
      }
    }
  }

 savesList() {
    if (this.updateProject) {
     this.etiqueta = '';
     this.etiquetaAdd = '';
     this.listPortaf = [];
      if (this.viewVideo !== '') {
         this.viewVideo = null;
      }
    } else {
      this.etiqueta = '';
      this.etiquetaAdd = '';
      this.listPortaf = [];
      if (this.viewVideo !== '') {
         this.viewVideo = null;
      }
    }
  }

  cerrar() {
      if (this.updateProject) {
     this.etiquetaAdd = '';
      if (this.viewVideo !== '') {
         this.viewVideo = null;
      }
    } else {
   //   this.listMultimedia = false;
   this.labelSelect = '';
   //   this.etiqueta = '';
    //  this.etiquetaAdd = '';
      if (this.viewVideo !== '') {
         this.viewVideo = null;
      }
    }
  }

loadingSelectLabels(list, event) {
    if (event.target.checked) {
      this.agregar(list, event);
    } else {
      this.quitar(list.id);
    }
  }

  agregar(data: any, event) {
      this.listSelectLabels.push(data);
  }

  videoSelect(elem): boolean {
    return this.listSelectLabels.findIndex( item => item.id === elem.id) >= 0;
  }

  quitar(data) {
    this.listSelectLabels = this.listSelectLabels.filter(s => s.id !== data);
  }

allSelectionVideo(listPortaf, event) {
  console.log(listPortaf);
  console.log(event.target.checked);
/*  for (var i = 0; i < listPortaf.length; i++) {
    this.loadingSelectLabels(listPortaf[i], this.contentPlaceholder.nativeElement.checked);
  }*/
}

deleteVideo(list)  {
  console.log(list);
}
 /**
 * * Este metodo obtiene un proyecto por medio de su uuidp
 * ? Usa el servicio projectDetail para la consulta
 * !Impresion de errores console.log(error)
 */
  projectShow() {
    this.loaderService.show();
    this.authorList();
    this.typeAuthor();
    this.listModules();
    this.listPlatforms();
    this.clientList();
    this.listarLabels();
    this.service.projectDetail(this.uuidp).subscribe((resp: any) => {
      this.loaderService.hide();
      this.project = {};
      this.project = resp.data;
      this.registerForm.patchValue({
        name: this.project.name,
        creation_date: moment(this.project.creation_date).format('YYYY-MM-DD'),
        description: this.project.description,
        original_customer: this.project.original_customer,
        overall_objective: this.project.overall_objective,
        goal_objective: this.project.goal_objective,
        quantity_hours: this.project.quantity_hours,
        price: this.project.price,
        currency: this.project.currency,
      });

      const data = this.registerForm.get('authors') as FormArray;
      while (data.length) {
        data.removeAt(0);
      }
      for (const author of this.project.authors) {
        this.initAuthors.push(this.formAuthors({
          id: author.author_id,
          name_author: author.author.name_author,
          type_id: author.type_id,
        }));
      }
      const plat = this.registerForm.get('platforms') as FormArray;
      while (plat.length) {
        plat.removeAt(0);
      }
      for (const platform of this.project.platforms) {
        this.createPlatforms.push(this.formPlatforms({
          id: platform.id,
          name_platform: platform.name_platform
        }));
      }
        const module = this.registerForm.get('modules') as FormArray;
        while (module.length) {
          module.removeAt(0);
        }

      for (const modul of this.project.modules) {
        this.createModules.push(this.formModules({
          id: modul.id,
          name_module: modul.name_module
        }));
      }

      for (const mult of this.project.multimedias) {
         if (mult.status !== 1 && mult.videoId !== null && mult.label_id !== null && mult.extension !== 'mp4') {
           this.listSelectLabels.push(mult);
           this.etiqueta = mult.label_id;
         }
         if (mult.status !== 1 && mult.label_id === null && mult.extension !== 'mp4') {
          this.portadaVideo = mult.id;
        }
      }

      this.service.allVideoByLabel(this.etiqueta).subscribe((respt: any) => {
          this.listPortaf = [];
          this.listPortaf = respt.data;
          this.listPortaf.map((element) => {
            element.name = element.name.split('.')[0];
          });
          if ( this.listPortaf.length > 0) {
            this.loadingSelectLabels(this.listSelectLabels, event);
            this.listMultimedia = true;
          }
        });

      this.registerForm.controls['name'].disable();
      this.registerForm.controls['creation_date'].disable();
      this.registerForm.controls['description'].disable();
      this.registerForm.controls['original_customer'].disable();
      this.registerForm.controls['overall_objective'].disable();
      this.registerForm.controls['goal_objective'].disable();
      this.registerForm.controls['quantity_hours'].disable();
      this.registerForm.controls['price'].disable();
      this.registerForm.controls['currency'].disable();
      this.registerForm.controls['authors'].disable();
      this.registerForm.controls['platforms'].disable();
      this.registerForm.controls['modules'].disable();

      this.deleteAuthors = true;
      this.videoEdit = true;
      this.photoEdit = true;
      this.documentEdit = true;
      this.portafolioEdit = true;
      this.urlImagen = [];
      for (const gallery of this.project.multimedias) {

        if (gallery.type === 'video') {
          this.urlVideo = gallery;
        }
        if (gallery.type === 'demo') {
          this.urlVideoDemo = gallery;
        }
        if (gallery.extension !== 'mp4' && gallery.status === 1) {
          this.urlImagen.push(gallery);
        }
      }
      if (this.urlVideo !== '') {
        this.okVideo = true;
      }
      if (this.urlVideoDemo !== '') {
        this.okVideoDemo = true;
      }

      if (this.urlImagen.length > 0) {
        this.okImages = true;
        this.contImang = this.urlImagen.length;
      }
      for (const document of this.project.documents) {
        if (document.type === 'Functional') {
          this.urlFunctional = document;
        }
        if (document.type === 'Technica') {
          this.urlTechnical = document;
        }
        if (document.type === 'Manual') {
          this.urlManual = document;
        }
        if (document.type === 'ProjectCharter') {
          this.urlProjectCharter = document;
        }
        if (document.type === 'Slideshow') {
          this.urlSlideshow = document;
        }
        if (document.type === 'codeSource') {
          this.urlCodeSource = document;
        }
      }
      if (this.urlCodeSource !== '') {
        this.codeSource = true;
      }
      if (this.urlFunctional !== '') {
        this.functional = true;
      }
      if (this.urlTechnical !== '') {
        this.technical = true;
      }
      if (this.urlManual !== '') {
        this.manual = true;
      }
      if (this.urlProjectCharter !== '') {
        this.projectCharter = true;
      }
      if (this.urlMethodology !== '') {
        this.methodology = true;
      }
      if (this.urlSlideshow !== '') {
        this.slideshow = true;
      }
      this.loaderService.hide();
    }, (error) => {
      console.log(error);
      this.loaderService.hide();
    });
  }

  edit() {
    this.editProject = true;
    this.registerForm.controls['name'].enable();
    this.registerForm.controls['creation_date'].enable();
    this.registerForm.controls['description'].enable();
    this.registerForm.controls['overall_objective'].enable();
    this.registerForm.controls['goal_objective'].enable();
    this.registerForm.controls['quantity_hours'].enable();
    this.registerForm.controls['price'].enable();
    this.registerForm.controls['currency'].enable();
    this.registerForm.controls['authors'].enable();
    this.registerForm.controls['platforms'].enable();
    this.registerForm.controls['modules'].enable();
    this.registerForm.controls['original_customer'].enable();
    this.deleteAuthors = false;
    this.videoEdit = false;
    this.photoEdit = false;
    this.documentEdit = false;
    this.portafolioEdit = false;
    // if (this.project.original_customer !== null) {
    //   this.registerForm.controls['original_customer'].disable();
    // } else {
    //   this.customer = true;
    // }
  }

  editarCustomer() {
    this.coolDialogs.confirm('¿Esta seguro que desea editar el cliente original de este proyecto?')
      .subscribe(res => {
        if (res) {
          this.customer = false;
          this.registerForm.controls['original_customer'].enable();
        } else {
          return;
        }
      });
  }
}
