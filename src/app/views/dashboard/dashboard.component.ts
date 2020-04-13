
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnDestroy, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardService } from './dashboard.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsProvider } from '../../share';
import { Subscriber } from 'rxjs';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { MoveElementComponent } from '../../share/move-element/move-element.component';
import { NgxToggleModule } from 'ngx-toggle';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoaderService } from '../../share/services/loader/loader.service';
import { ShowcaseCliService } from '../../showcase-cli/showcase-cli.service';
import { ProjectService } from '../../pages/project/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class DashboardComponent implements OnInit {
  @ViewChild('parentModal') parentModal: ModalDirective;
  modalRef: BsModalRef;

  public project: any = {};
  activeSlideIndex = 0;
  public numPage: number;
  public pages = 1;
  public searchText = '';
  public elements = [];
  public listProyecto = [];
  public images = [];
  list = false;
  public presentation: any = {};
  url: any;
  uuid: any;
  private sub: any;
  public listClient = [];
  public listNameProjet = [];
  public listPlatform = [];
  public listAuthor = [];
  public author = false;
  public platfList = false;
  public nombList = true;
  public strfilter = 'name';

  constructor(

    private service: DashboardService,
    public router: Router,
    private servicePro: ProjectService,
    public loaderService: LoaderService,
    private globals: GlobalsProvider,
    private services: ShowcaseCliService,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService) {
  }
  ngOnInit() {
    this.numPage = this.globals.numPage;
    this.listarProyectos();
  }

  listarProyectos() {
    this.loaderService.show();
    this.service.all().subscribe(resp => {

      this.listProyecto = resp.data;

      this.listProyecto.map((element) => {
        element.description = element.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
        element.overall_objective = element.overall_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');
        element.goal_objective = element.goal_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');
        if (element.description && element.description.length > 90) {
          element.description = element.description.substring(0, 90) + '...';
        } else if (!element.description) {
          element.description = 'No existe descrición';
        }
      });
      for (const list of this.listProyecto) {
        this.listNameProjet.push(list.name);
      }
      if (this.listProyecto.length !== 0) {
        this.list = true;
      }
      this.loaderService.hide();
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

  DetailProject(list): void {
    this.router.navigate(['admin/dashboard/detail/'], { queryParams: { uuidp: list.uuidp}});
  }

  busqueda($event) {

    if ($event.target.value === 'Plataforma') {
      this.strfilter = 'platforms';
      this.listPlatforms();
      this.author = false;
      this.nombList = false;
      this.platfList = true;
    } else if ($event.target.value === 'Recurso') {
      this.strfilter = 'authors';
      this.authorList();
      this.platfList = false;
      this.nombList = false;
      this.author = true;
    } else if ($event.target.value === 'Nombre') {
       this.strfilter = 'name';
      // tslint:disable-next-line:no-unused-expression
      this.listNameProjet;
      this.author = false;
      this.platfList = false;
      this.nombList = true;
    }
  }

  listPlatforms() {
    this.servicePro.allPlatforms().subscribe((resp: any) => {
      this.listPlatform = [];
      this.listPlatform = resp.data;
    });
  }

  authorList() {
    this.servicePro.allAuthors().subscribe((resp: any) => {
      this.listAuthor = [];
      this.listAuthor = resp.data;
    });
  }

}
