import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from './user.service';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsProvider } from '../../share';
import { LoaderService } from '../../share/services/loader/loader.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ LoaderService, GlobalsProvider]
})
export class UserComponent implements OnInit {

  public elements = [];
  list = false;
  public numPage: number;
  public pages = 1;
  public searchText = '';

  constructor(

    private service: UserService,
    public router: Router,
    public loaderService: LoaderService,
    private globals: GlobalsProvider,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.numPage = this.globals.numPage;
    this.all();
  }

  all() {
    this.loaderService.show();
    this.service.all().subscribe((resp: any) => {

      this.elements = [];
      this.elements = resp.data;
      if (this.elements.length !== 0) {
        this.list = true;
      }
      this.loaderService.hide();
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

  changePermiso(datos) {
    this.loaderService.show();
    this.service.update(datos).subscribe((resp: any) => {
      this.all();
    });
    this.loaderService.hide();
  }

  register() {
    this.router.navigate(['admin/user/add']);
  }

  btnDetalles(data) {
    this.router.navigate(['admin/user/add'], {queryParams: { user: JSON.stringify(data.id)}});
  }

  admin() {
    this.router.navigate(['admin/user/add'], {queryParams: { user: JSON.stringify(JSON.parse(localStorage.getItem('user')).id) }});
  }
}
