import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscriber, empty } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { GlobalsProvider } from '../../../share';
import { ShowcaseService } from '../showcase.service';
import { LoaderService } from '../../../share/services/loader/loader.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import * as moment from 'moment';


import { ConfirmDialogComponent } from '../../../share/confirm-dialog/confirm-dialog.component';
import { MoveElementComponent } from '../../../share/move-element/move-element.component';
import { NgxToggleModule } from 'ngx-toggle';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { formatMoment } from 'ngx-bootstrap/chronos/format';




@Component({
  selector: 'app-register-showcase',
  templateUrl: './register-showcase.component.html',
  styleUrls: ['./register-showcase.component.scss'],
  providers: [LoaderService, GlobalsProvider]
})
export class RegisterShowcaseComponent implements OnInit {
  @ViewChild('parentModal') parentModal: ModalDirective;
  modalRef: BsModalRef;

  public id: any;
  public project: any = {};
  public showcase: any = {};
  public updateShowcase = false;
  public editShowcase = false;
  public resul: string;
  public bloqueado = false;
  registerForm: FormGroup;
  authors: FormArray;
  submitted = false;
  public listProyecto = [];
  public listClient = [];
  public numPage: number;
  public pages = 1;
  public nameClient: any;
  public searchText = '';
  list = false;
  public client: any;
  public listSelect: any[] = [];

  public elements = [];
  public images = [];
  activeSlideIndex = 0;
  public presentation: any = {};

  test: any = true;

  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private globals: GlobalsProvider,
    private service: ShowcaseService,
    public router: Router,
    public loaderService: LoaderService,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private coolDialogs: NgxCoolDialogsService,
    private formBuilder: FormBuilder) {
    this.datePickerConfig = Object.assign({},
      { containerClass: 'theme-orange' },
      { showWeekNumbers: false },
      { dateInputFormat: 'DD-MM-YYYY' },
      { locale: 'es' });
    this.resul = '';
  }

  ngOnInit() {
    this.numPage = this.globals.numPage;

    this.activatedRoute.queryParams.subscribe(params => {

      if (params['showcase']) {
        const showcase = JSON.parse(params['showcase']);
        this.updateShowcase = true;
        this.id = showcase;
      }
    });
    if (!this.updateShowcase) {
      this.listarProyectos();
      this.listarClientes();
      this.registerForm = this.formBuilder.group({
        creation_date: moment(new Date()).format('DD-MM-YYYY'),
        // tslint:disable-next-line:max-line-length
        explanatory_text: 'La presente vitrina representa un  repositorio de proyectos SAP y No SAP en la nube bajo el nombre Showcase con una estrategia ' +
                           // tslint:disable-next-line:max-line-length
                           'enfocada a desarrollos con casos de éxito; la intensión es consolidar soluciones IT previamente desarrolladas y que hayan tenido ' +
                             // tslint:disable-next-line:max-line-length
                           'un gran impacto organizacional luego de su implementación donde encontrará proyectos con un gran nivel de adaptabilidad y ' +
                           'optimización para sus procesos de negocios. ' +
                           'De interesarle alguna de nuestras soluciones estaríamos a la orden para realizar demostraciones en vivo.',
        company_id: ['', Validators.required],
        nameClient:  [''],
        view_prices: ['']
      });
    } else {
      this.registerForm = this.formBuilder.group({
        creation_date: [''],
        explanatory_text: [''],
        company_id: [''],
        nameClient: [''],
        view_prices: ['']
      });
      this.registerForm.controls['nameClient'].disable();
      this.showcaseShow();
    }
  }

  openModal(template: TemplateRef<any>, list) {
    this.project = list;
    this.modalRef = this.modalService.show(template);
  }

  listarProyectos() {
    this.loaderService.show();
    this.service.allProjects().subscribe(resp => {
      this.listProyecto = [];
      this.listProyecto = resp.data;
      if(this.listProyecto.length > 0) {
        this.listProyecto.map((element) => {
        element.description = element.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
        element.overall_objective = element.overall_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');
        element.goal_objective = element.goal_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');
        if (element.description && element.description.length > 90) {
          element.description = element.description.substring(0, 90) + '...';
        }
      });
      this.list = true;
      }
      
      this.loaderService.hide();
    });
  }

  listarClientes() {
    this.loaderService.show();
    this.service.allClient().subscribe(resp => {
      this.listClient = [];
      this.listClient = resp.data;
      this.loaderService.hide();
    });
  }

  changeClient(name) {
    this.resul = (name !== '') ? name : '';
    this.bloqueado = false;
    this.listSelect = [];

    for (const client of this.listClient) {
      if (client.name === name) {
        this.client = client.name;
        this.bloqueado = true;
        this.registerForm.controls['company_id'].setValue(client.id);
        break;
      } else {
        this.bloqueado = false;
      }
    }

    if (!this.bloqueado && name !== '') {
      this.globals.alertWarning('El nombre del cliente ingresado no existe', 'Alerta');
    }
  }

  loadingProject(list, event) {
    if (event.target.checked) {
      this.agregar(list, event);
    } else {
      this.quitar(list.id);
    }
  }

  agregar(data: any, event) {

   if ( data.original_customer !== this.client ) {
      this.listSelect.push(data.id);
    }
    if ( data.original_customer === this.client ) {
      // tslint:disable-next-line:max-line-length
      this.coolDialogs.confirm( '¿Esta seguro que desea agregar este proyecto al showcase? El cliente original, coincide con el nombre del cliente showcase '
       + this.client + '?')
      .subscribe(res => {
        if (res) {
          this.listSelect.push(data.id);
        } else {
          event.target.checked = false;
        }
    });
    }
  }

  projectSelect(elem): boolean {
    return this.listSelect.findIndex( item => item === elem.id) >= 0;
  }

  quitar(data) {
    this.listSelect = this.listSelect.filter(s => s !== data);
  }

  cancelar() {
    this.router.navigate(['admin/showcase']);
  }

  get validate() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      if ( this.listSelect.length === 0 ) {
        this.globals.alertError('Debe seleccionar al menos un proyecto', 'Error');
      } else {
        const data = {
          id: (!this.updateShowcase) ? null : this.id,
          creation_date: moment(this.registerForm.value.creation_date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
          explanatory_text: this.registerForm.value.explanatory_text,
          company_id: this.registerForm.value.company_id,
          projects: this.listSelect,
          user_id: JSON.parse(localStorage.getItem('user')).id,
          view_prices:  this.registerForm.value.view_prices
        };
        this.loaderService.show();
        if (!this.updateShowcase) {
          this.service.save(data).subscribe((resp: any) => {
            this.globals.alertSuccess('La vitrina se registro correctamente', 'Operación exitosa');
            this.router.navigate(['admin/showcase/detail'], {queryParams: { showcase: JSON.stringify(resp.id)}});
            this.loaderService.hide();
          }, (error) => {
            console.log(error);
            if (error.error.error === 'Unauthenticated.') {
              this.globals.alertError('El usuario no esta autentificado', 'Alerta');
              this.router.navigateByUrl('admin/authentication/login').then(() => {
                localStorage.clear();
              });
            } else {
              this.loaderService.hide();
              this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
            }
          });
        } else {
          this.service.update(data).subscribe((resp: any) => {
            this.globals.alertSuccess('La vitrina se actualizo correctamente', 'Operación exitosa');
            this.router.navigate(['admin/showcase/detail'], {queryParams: { showcase: JSON.stringify(resp.id)}});
            this.loaderService.hide();
          }, (error) => {
            console.log(error);
            if (error.error.error === 'Unauthenticated.') {
              this.globals.alertError('El usuario no esta autentificado', 'Alerta');
              this.router.navigateByUrl('admin/authentication/login').then(() => {
                localStorage.clear();
              });
            } else {
              this.loaderService.hide();
              this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
            }
          });
        }
      }
    }
  }

  DetailProject(list) {
    this.router.navigate(['admin/showcase/result'], { queryParams: { uuidp: list.uuidp}});
  }

  showcaseShow() {

    this.listarProyectos();
    this.loaderService.show();

    this.service.show(this.id).subscribe((resp: any) => {
      this.showcase = {};
      this.showcase = resp.data;

      this.service.allClient().subscribe(res => {
        this.listClient = [];
        this.listClient = res.data;
        for (const client of res.data) {
          if (client.id === this.showcase.company_id) {
            this.bloqueado = true;
            this.resul = (client.name !== '') ? client.name : '';
            this.registerForm.controls['company_id'].setValue(client.id);
            this.registerForm.patchValue({
              creation_date:  moment(this.showcase.creation_date, 'YYYY-MM-DD').format('DD-MM-YYYY'),
              explanatory_text: this.showcase.explanatory_text,
              nameClient: client.name,
              view_prices: this.showcase.view_prices
            });
            break;
          }
        }
      }, (error) => {
        console.log(error);
      });

      for (const project of this.showcase.projects) {
        this.listSelect.push(project.id);
      }

      this.loadingProject(this.listSelect,  event);

      this.loaderService.hide();
    }, (error) => {
      console.log(error);
      this.loaderService.hide();
    });
  }
}
