import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ShowcaseCliService } from './showcase-cli.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GlobalsProvider } from '../share';
import { LoaderService } from '../share/services/loader/loader.service';
import { NumberValidator } from '../validate/number-validator';
import { ClipboardService } from 'ngx-clipboard';
import * as $ from 'jquery';

@Component({
  selector: 'app-showcase-cli',
  templateUrl: './showcase-cli.component.html',
  styleUrls: ['./showcase-cli.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class ShowcaseCliComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  public numPage: number;
  public pages = 1;
  elements: any;
  url: any;
  uuid: any;
  user: any;
  private sub: any;
  public url_project: any;

  constructor(
    private clicpboardService: ClipboardService,
    public loaderService: LoaderService,
    private globals: GlobalsProvider,
    private service: ShowcaseCliService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.numPage = 6;
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required]
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.numPage = this.globals.numPage;

    this.sub = this.route.params.subscribe(params => {
      this.url = params.client;
      this.uuid = params.uuid;
      this.showCaseClient();
    });
  }

  copiarEnlace(list) {
    const url = this.elements.url + '/' + list.uuidp;
    this.clicpboardService.copyFromContent(url);
    this.globals.alertSuccess('Se ha copiado el enlace!', 'Información');
  }

  copiarEnlaceVitrina() {
    const url = this.elements.url;
    this.clicpboardService.copyFromContent(this.elements.url);
    this.globals.alertSuccess('Se ha copiado el enlace!', 'Información');
  }

  detailProject(list) {

    const url = '#/' + this.url + '/' + this.uuid + '/' + list.uuidp;
    window.open(url, '_blank');
    // this.router.navigate([url]).then((e) => {
    //   if (e) {
    //     } else {
    //   }
    // });

    // var myurl = `${url}/${id}`;
    // this.router.navigateByUrl(myurl).then(e => {
    //   if (e) {
    //     console.log("Navigation is successful!");
    //   } else {
    //     console.log("Navigation has failed!");
    //   }
    // });
  }


  showCaseClient() {
    this.loaderService.show();
    const url = this.url + '/' + this.uuid;
    this.service.showCase(url).subscribe((resp: any) => {
      this.elements = {};
      this.elements = resp.data;
      this.elements.projects.map(element => {
        element.description = element.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
        if (element.description && element.description.length > 450) {
          element.description = element.description.substring(0, 450) + '...';
        } else if (!element.description) {
          element.description = 'No existe descrición';
        }
      });
      for (const users of this.elements.user) {
        this.user = users;

      }
      this.loaderService.hide();
    }, (error) => {
      this.router.navigateByUrl('not-found').then(() => {
      });
      this.loaderService.hide();
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      if (this.registerForm.controls.name.invalid) {
        this.globals.alertWarning('El nombre del solicitante es requerido', 'Alerta');
      }
      if (this.registerForm.controls.company.invalid) {
        this.globals.alertWarning('El nombre de la empresa es requerido', 'Alerta');
      }
      if (this.registerForm.controls.email.invalid) {
        this.globals.alertWarning('El email de la empresa es requerido', 'Alerta');
      }
      if (this.registerForm.controls.phone.invalid) {
        this.globals.alertWarning('El telefono de la empresa es requerido', 'Alerta');
      }
      if (this.registerForm.controls.description.invalid) {
        this.globals.alertWarning('La descripción es requerido', 'Alerta');
      }
      return;
    } else {
      const data = {
        name: this.registerForm.value.name,
        company: this.registerForm.value.company,
        phone: this.registerForm.value.phone,
        email: this.registerForm.value.email,
        description: this.registerForm.value.description,
        showcase_id: this.elements.id,
        type: 2
      };
      this.loaderService.show();
      this.service.saveRequest(data).subscribe((resp: any) => {
        this.globals.alertSuccess('Su solisitud se envio correctamente', 'Operación exitosa');
        this.loaderService.hide();
        this.registerForm.patchValue({
          name: '',
          company: '',
          phone: '',
          email: '',
          description: ''
        });
      }, (error) => {
        this.loaderService.hide();
        this.globals.alertWarning('Ocurrio un error al enviar su solicitud', 'Alerta');
      });
    }
  }
}
