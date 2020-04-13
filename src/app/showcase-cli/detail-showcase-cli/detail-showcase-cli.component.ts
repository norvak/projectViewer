import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { ShowcaseCliService } from '../showcase-cli.service';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { MoveElementComponent } from '../../share/move-element/move-element.component';
import { GlobalsProvider } from '../../share';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoaderService } from '../../share/services/loader/loader.service';
import { NumberValidator } from '../../validate/number-validator';
import * as $ from 'jquery';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-detail-showcase-cli',
  templateUrl: './detail-showcase-cli.component.html',
  styleUrls: ['./detail-showcase-cli.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class DetailShowcaseCliComponent implements OnInit {
  @ViewChild('parentModal') parentModal: ModalDirective;
  modalRef: BsModalRef;

  registerForm: FormGroup;
  public numPage: number;
  public pages = 1;
  public searchText = '';
  public elements: any = {};
  list = false;
   myInterval = 0;
  videoView = false;
  public images = [];
  public portafolio = [];
  activeSlideIndex = 0;
  public presentation: any = {};
  public project: any = {};
  public projectCharter: any = {};
  public slideshow: any = {};
  public video: any = {};
  public objetivoEsp: any;
  public objetivoGene: any;
  public methodology: any = {};
  public methView = false;
  public FotoView = false;
  public VideoView = false;
  public charView = false;
  public slidView = false;
  public view = false;
  public viewPorta = false;
  submitted = false;
  url: any;
  uuid: any;
  uuidp: any;
  private sub: any;
  public photo: any;

  constructor(
    public router: Router,
    private modalService: BsModalService,
    private service: ShowcaseCliService,
    public loaderService: LoaderService,
    private globals: GlobalsProvider,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]]
    });

    this.sub = this.route.params.subscribe(params => {
      this.url = params.client;
      this.uuid = params.uuid;
      this.uuidp = params.uuidp;
      this.showCaseClient();
      this.projectShow();
    });

    this.scrollAction();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy () {
    this.sub.unsubscribe();
  }

  atras() {
    const url = this.url + '/' + this.uuid;

    this.router.navigate([url]).then((e) => {
      // if (e) {
      //   console.log("Navigation is successful!");
      // } else {
      //   console.log("Navigation has failed!");
      // }
    });
  }

  showVideoSelect(id) {
    this.service.showVideo(id).subscribe(resp => {
      this.video = {};
      this.video = resp.data;
    });
  }

  projectShow() {
    this.loaderService.show();
    const url = this.url + '/' + this.uuid + '/' + this.uuidp;
    this.service.project(url).subscribe((resp: any) => {
      this.project = {};
      this.project = resp.data;
      this.presentation = '';
      this.activeSlideIndex = 0;
      console.log(this.project);
      this.project.overall_objective = this.project.overall_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.project.goal_objective = this.project.goal_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');

      if (this.project.multimedias.length > 0) {
        for (let i = 0; i < this.project.multimedias.length; i++) {
          if (this.project.multimedias[i].extension !== 'mp4' && this.project.multimedias[i].status !== 0) {
            this.images.push(this.project.multimedias[i]);
          }
          if (this.project.multimedias[i].type === 'video' && this.project.multimedias[i].status !== 0) {
            this.videoView = true;
            this.video = this.project.multimedias[i];

          }
          if (this.project.multimedias[i].status === 0  && this.project.multimedias[i].videoId !== '' ) {
             this.portafolio.push(this.project.multimedias[i]);
          }

          if (this.portafolio.length > 1) {
            this.viewPorta = true;
          }
        }
        if (this.images.length > 0) {
          this.FotoView = true;
        }

      }

      if (this.project.documents.length > 0) {
        for (let i = 0; i < this.project.documents.length; i++) {
          if (this.project.documents[i].type === 'Slideshow') {
            this.slideshow = this.project.documents[i];
            this.slidView = true;
          }
          if (this.project.documents[i].type === 'ProjectCharter') {
            this.projectCharter = this.project.documents[i];
            this.charView = true;
          }
            if (this.project.documents[i].type === 'methodology') {
            this.methodology = this.project.documents[i];
            this.methView = true;
          }
        }
      }
      this.loaderService.hide();
      this.view = true;
    }, (error) => {
      this.loaderService.hide();
    });
  }

  showCaseClient() {
    this.loaderService.show();
    const url = this.url + '/' + this.uuid;
    this.service.showCase(url).subscribe((resp: any) => {
      this.elements = {};
      this.elements = resp.data;
      this.photo = this.elements.companies.photo;
      this.loaderService.hide();
    }, (error) => {
      this.router.navigateByUrl('not-found').then(() => {
        this.loaderService.hide();
      });
    });
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

  scrollAction() {
      $(document).ready(() => {
        setTimeout(() => {
          $('.arrow-left').click(() => {
            $('.outer').animate({
              scrollLeft: '-=210'
            }, 300);
          });
          $('.arrow-right').click(() => {
            $('.outer').animate({
              scrollLeft: '+=210'
            }, 300);
          });
        }, 1500);
    });
  }

}
