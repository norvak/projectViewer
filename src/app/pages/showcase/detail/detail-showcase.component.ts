
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscriber, empty } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { GlobalsProvider } from '../../../share';
import { ShowcaseService } from '../showcase.service';
import { LoaderService } from '../../../share/services/loader/loader.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { ClipboardService } from 'ngx-clipboard';
import { NgxToggleModule } from 'ngx-toggle';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail-showcase',
  templateUrl: './detail-showcase.component.html',
  styleUrls: ['./detail-showcase.component.scss'],
  providers: [LoaderService, GlobalsProvider]
})
export class DetailShowcaseComponent implements OnInit {
  @ViewChild('parentModal') parentModal: ModalDirective;
  modalRef: BsModalRef;

  public project: any = {};
  public resul: string;
  public bloqueado = false;
  registerForm: FormGroup;
  authors: FormArray;
  submitted = false;
  public listProyecto = [];
  public listClient = [];
  public numPage: number;
  public pages = 1;
  public searchText = '';
  list = false;
  public client: any;
  public listSelect: any = [];
  public showcase: any;
  public elements = [];
  public images = [];
  activeSlideIndex = 0;
  public presentation: any = {};


  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private clicpboardService: ClipboardService,
    private globals: GlobalsProvider,
    public loaderService: LoaderService,
    private service: ShowcaseService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.numPage = 6;

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['showcase']) {
        const showcase = JSON.parse(params['showcase']);
        sessionStorage.setItem('id_showcase', showcase);
        this.bringShowcase(sessionStorage.getItem('id_showcase'));
      }
    });
  }

  listarClientes() {
    this.service.allClient().subscribe(resp => {
      this.listClient = [];
      this.listClient = resp.data;
    });
  }

  copiarEnlace() {
    this.clicpboardService.copyFromContent(this.showcase.public_url);
    this.globals.alertSuccess('Se ha copiado el enlace!', 'Información');
  }

  atras() {
    this.router.navigate(['admin/showcase']);
  }

  bringShowcase(data) {
    this.loaderService.show();
    this.service.show(data).subscribe((resp: any) => {
      this.showcase = {};
      this.showcase = resp.data;
      this.showcase.projects.map((element) => {
        element.description = element.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
        element.overall_objective = element.overall_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');
        element.goal_objective = element.goal_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');
        if (element.description && element.description.length > 90) {
          element.description = element.description.substring(0, 90) + '...';
        } else if (!element.description) {
          element.description = 'No existe descrición';
        }
      });
       this.loaderService.hide();
    });
  }

  description(list) {
    this.router.navigate(['admin/showcase/description'], { queryParams: { uuidp: list.uuidp}});
  }

  edit() {
    this.router.navigate(['admin/showcase/add'], { queryParams: { showcase: sessionStorage.getItem('id_showcase')}});
  }
}
