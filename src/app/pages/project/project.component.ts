import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProjectService } from './project.service';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { MoveElementComponent } from '../../share/move-element/move-element.component';
import { NgxToggleModule } from 'ngx-toggle';
import { GlobalsProvider } from '../../share';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoaderService } from '../../share/services/loader/loader.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class ProjectComponent implements OnInit {
  @ViewChild('parentModal') parentModal: ModalDirective;
  modalRef: BsModalRef;
  public numPage: number;
  public pages = 1;
  public searchText = '';
  public elements = [];
  public listProyecto = [];
  list = false;
  public images = [];
  public listClient = [];
  public listNameProjet = [];
  activeSlideIndex = 0;
  public presentation: any = {};
  public project: any = {};
  public listPlatform = [];
  public listAuthor = [];
  public author = false;
  public platfList = false;
  public nombList = true;
  public strfilter = 'name';

  constructor(
    private service: ProjectService,
    public router: Router,
    public loaderService: LoaderService,
    private globals: GlobalsProvider,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService) {

  }

  ngOnInit() {
    this.numPage = this.globals.numPage;
    this.listarProyectos();
  }

  DetailProject(list): void {
    this.router.navigate(['admin/project/detail/'], { queryParams: { uuidp: list.uuidp}});
  }

  register() {
    this.router.navigate(['admin/project/add']);
  }

  editarProject(list): void {
    this.router.navigate(['admin/project/add/'], { queryParams: { uuidp: list.uuidp}});

  }

  listarClientes() {
    this.loaderService.show();
    this.service.allClient().subscribe(resp => {
      this.listClient = [];
      this.listClient = resp.data;
      this.loaderService.hide();
    });
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

    // for (const list of this.listProyecto) {
    //   this.listNameProjet.push(list.name);
    // }
      this.listProyecto.forEach(element =>  {
        this.listNameProjet.push(element.name);
      });

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
    this.service.allPlatforms().subscribe((resp: any) => {
      this.listPlatform = [];
      this.listPlatform = resp.data;
    });
  }

  authorList() {
    this.service.allAuthors().subscribe((resp: any) => {
      this.listAuthor = [];
      this.listAuthor = resp.data;
    });
  }
}
