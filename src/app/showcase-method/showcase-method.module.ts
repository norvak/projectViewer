
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData, CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowcaseMethodComponent } from './showcase-method.component';
import { ShowcaseMethodRoutingModule } from './showcase-method-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModule } from '../share/share.module';

import { ModalModule } from 'ngx-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ComponentsModule } from '../components/components.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';



@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ShowcaseMethodRoutingModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    ComponentsModule,
    ModalModule.forRoot(),
    ClipboardModule,
    BsDatepickerModule.forRoot(), // ToastrModule added
  ],
  declarations: [
    ShowcaseMethodComponent],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: []
})
export class ShowcaseMethodModule { }
