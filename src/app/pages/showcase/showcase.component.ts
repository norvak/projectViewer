import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ShowcaseService } from './showcase.service';
import { Subscriber } from 'rxjs';
import { GlobalsProvider } from '../../share';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../share/services/loader/loader.service';
import * as moment from 'moment';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class ShowcaseComponent implements OnInit {

  public numPage: number;
  public pages = 1;
  public searchText = '';
  public elements = [];
  list = false;

  constructor(
    public router: Router,
    private clicpboardService: ClipboardService,
    private service: ShowcaseService,
    private globals: GlobalsProvider,
    public loaderService: LoaderService,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.numPage = this.globals.numPage;
    this.all();
  }

  all() {
    this.loaderService.show();
    this.service.allShowcases().subscribe((resp: any) => {
      this.elements = [];
      this.elements = resp.data;
      this.elements.map((element) => {
          element.creation_date = moment(element.creation_date).format('DD-MM-YYYY');
      });

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

  register() {
    this.router.navigate(['admin/showcase/add']);
  }

  btnDetalles(data) {
    this.router.navigate(['admin/showcase/detail'], {queryParams: { showcase: JSON.stringify(data.id)}});
  }

  delete(showcase) {
    this.loaderService.show();
    this.service.deleteShowcase(showcase).subscribe((resp: any) => {
      this.all();
      this.loaderService.hide();
    }, (error) => {
     console.log(error);
          this.loaderService.hide();
    });
  }

  btnEdit(list) {
    this.router.navigate(['admin/showcase/add'], { queryParams: { showcase: list.id }});
  }

  copiarEnlaceVitrina(url) {
    this.clicpboardService.copyFromContent(url);
    this.globals.alertSuccess('Se ha copiado el enlace!', 'Información');
  }

}
