import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { CompanyService } from './company.service';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsProvider } from '../../share';
import { LoaderService } from '../../share/services/loader/loader.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class CompanyComponent implements OnInit {

  public numPage: number;
  public pages = 1;
  public searchText = '';
  public elements = [];
  list = false;

  constructor(
    private service: CompanyService,
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

  register() {
    this.router.navigate(['admin/company/add']);
  }

  btnDetalles(data) {
    this.router.navigate(['admin/company/add'], { queryParams: { company: data.id } });
  }
}
