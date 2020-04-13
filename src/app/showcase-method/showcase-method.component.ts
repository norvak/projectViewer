import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ShowcaseMethodService } from './showcase-method.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GlobalsProvider } from '../share';
import { LoaderService } from '../share/services/loader/loader.service';
import { NumberValidator } from '../validate/number-validator';
import { ClipboardService } from 'ngx-clipboard';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-showcase-method',
  templateUrl: './showcase-method.component.html',
  styleUrls: ['./showcase-method.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class ShowcaseMethodComponent implements OnInit, OnDestroy {
  @ViewChild('childModal') childModal: ModalDirective;
  registerForm: FormGroup;
  submitted = false;

  public numPage: number;
  public pages = 1;
  elements: any;
  url: any;
  uuid: any;
  user: any;
  private sub: any;
  public repository: any;
  public position = false;
  public entregable: number;

  constructor(
    private clicpboardService: ClipboardService,
    public loaderService: LoaderService,
    private globals: GlobalsProvider,
    private service: ShowcaseMethodService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {
  }
   ngOnInit() {

      this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

     this.sub = this.route.params.subscribe(params => {
     this.url = params.methodology;    
     this.showCaseMethod();
    });
   }

  showChildModal(data): void {    
    this.repository = data;
    this.childModal.show();
  }
 
  hideChildModal(): void {
    this.repository = null;
    this.childModal.hide();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showCaseMethod() {
    this.loaderService.show();
    const url = this.url;
    this.service.method(url).subscribe((resp: any) => {
      this.elements = {};
      if(resp.data.length !== 0) {   
      this.elements = resp.data[0];
      this.elements.fases[0].header.forEach((y, index) => {
        if ('Entregables' === y.name) {
          this.entregable = index;
        }  
      })     
      this.elements.fases.map(a => {
         a.body.map(b => {
              b.data.map((c, index) => { 
            
             if ( this.entregable === index ) {
               if(c.url) {
                 c.url = c.url.replace(/(?:\r\n|\r|\n)/g, ' ');
                 c.name = c.name.replace(/(?:\r\n|\r|\n)/g, ',');
                 c.url = c.url.match(/http\S+/g); 
                 c.name = c.name.split(','); 
                 } 
              } else {
                 if(b.data.name) {
                 c.name = c.name.replace(/(?:\r\n|\r|\n)/g, '<br>');
                }
              }  
            })            
          })
      });         
      }
      this.loaderService.hide();
    }, (error) => {
      this.router.navigateByUrl('not-found').then(() => {
      });
      this.loaderService.hide();
      console.log(error);
    });
  }

  toggleAccordian(event, index) {
    const element = event.target;
    element.classList.toggle('active');
    if (this.elements.fases[index].isActive) {
      this.elements.fases[index].isActive = false;
    } else {
      this.elements.fases[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

}