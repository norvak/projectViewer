import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from '../configuration.service';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
 import { ConfirmDialogComponent } from '../../../share/confirm-dialog/confirm-dialog.component';
 import { MoveElementComponent } from '../../../share/move-element/move-element.component';
import { NgxToggleModule } from 'ngx-toggle';
 import { GlobalsProvider } from '../../../share';
 import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { ModalDirective } from 'ngx-bootstrap/modal';
 import { LoaderService } from '../../../share/services/loader/loader.service';

@Component({
  selector: 'app-author-project',
  templateUrl: './author-project.component.html',
  styleUrls: ['./author-project.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class AuthorProjectComponent implements OnInit {

  public elementAuthor = [];
  public elementType = [];
  listAuthor = false;
  listType = false;
  updateAuthor = false;
  updateType = false;
  public name_author: any = '';
  public id_author: any = '';
  public name: any = '';
  public id_type: any = '';
  public numPage: number;
  public pages = 1;
  public searchText = '';

    constructor(
        private service: ConfigurationService,
        public router: Router,
        private coolDialogs: NgxCoolDialogsService,
        public loaderService: LoaderService,
        private globals: GlobalsProvider,
        public activatedRoute: ActivatedRoute,
        private modalService: BsModalService) {
      }


  ngOnInit() {
    this.loaderService.show();
    this.allAuthors();
    this.allTypeAuthors();
    this.numPage = 10;
    this.loaderService.hide();
  }

  allAuthors() {
    this.service.allAuthors().subscribe((resp: any) => {

      this.elementAuthor = [];
      this.elementAuthor = resp.data;
      if (this.elementAuthor.length !== 0) {
        this.listAuthor = true;
      }
    }, (error) => {
      if (error.error.error === 'Unauthenticated.') {
        this.globals.alertError('El usuario no esta autentificado', 'Alerta');
        this.router.navigateByUrl('admin/authentication/login').then(() => {
          localStorage.clear();
        });
      }
    });
  }

  allTypeAuthors() {
    this.service.allTypeAuthors().subscribe((resp: any) => {

      this.elementType = [];
      this.elementType = resp.data;
      if (this.elementType.length !== 0) {
        this.listType = true;
      }
    }, (error) => {
      if (error.error.error === 'Unauthenticated.') {
        this.globals.alertError('El usuario no esta autentificado', 'Alerta');
        this.router.navigateByUrl('admin/authentication/login').then(() => {
          localStorage.clear();
        });
      }
    });
  }

  btnEdit(list) {
 // tslint:disable-next-line:max-line-length
    this.coolDialogs.confirm( '¿Esta seguro de modificar el nombre de "'
    + list.name_author + '"?, este cambio afectará en todos los proyectos en los que esté registrado!')
    .subscribe(res => {
      if (res) {
        this.id_author = list.id;
        this.name_author = list.name_author;
        this.updateAuthor = true;
      }
    });
  }

  saveAuthor(name_author) {
    if (name_author !== '') {
      const data: any = {
        id: (!this.updateAuthor) ? null : this.id_author,
        name_author: name_author.charAt(0).toUpperCase() + name_author.slice(1)
      };

      if (!this.updateAuthor) {
        this.loaderService.show();
        this.service.saveAuthor(data)
          .subscribe(
            (resp: any) => {
              this.loaderService.hide();
              this.globals.alertSuccess('Se registro correctamente', 'Operación exitosa');
              this.allAuthors();
              this.name_author = '';
              this.updateAuthor = false;
            }, (error) => {
              this.loaderService.hide();
              this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
            });
      } else {
        this.loaderService.show();
        this.service.updateAuthor(data)
          .subscribe(
            (resp: any) => {
              this.loaderService.hide();
              this.globals.alertSuccess('Se actualizado correctamente', 'Operación exitosa');
              this.allAuthors();
              this.id_author = '';
              this.name_author = '';
              this.updateAuthor = false;
            }, (error) => {
              this.loaderService.hide();
              this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
            });
      }
    }
  }

  saveTypeAuthor(name) {
    if (name !== '') {
      const data: any = {
        id: (!this.updateType) ? null : this.id_type,
        name: name.charAt(0).toUpperCase() + name.slice(1)
      };

      if (!this.updateType) {
        this.loaderService.show();
        this.service.saveTypeAuthor(data)
          .subscribe(
            (resp: any) => {
              this.loaderService.hide();
              this.globals.alertSuccess('Se registro correctamente', 'Operación exitosa');
              this.allTypeAuthors();
              this.name = '';
              this.updateType = false;
            }, (error) => {
              this.loaderService.hide();
              this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
            });
      } else {
        this.loaderService.show();
        this.service.updateTypeAuthor(data)
          .subscribe(
            (resp: any) => {
              this.loaderService.hide();
              this.globals.alertSuccess('Se actualizado correctamente', 'Operación exitosa');
              this.allTypeAuthors();
              this.id_type = '';
              this.name = '';
              this.updateType = false;
            }, (error) => {
              this.loaderService.hide();
              this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
            });
      }
    }
  }

  btnEditType(list) {
    // tslint:disable-next-line:max-line-length
    this.coolDialogs.confirm( '¿Esta seguro de modificar el nombre del cargo "'
    + list.name + '"?, este cambio afectará en todos los proyectos en los que esté registrado!')
    .subscribe(res => {
      if (res) {
        this.id_type = list.id;
        this.name = list.name;
        this.updateType = true;
      }
    });
  }
}
