import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule, TimepickerModule } from 'ngx-bootstrap';
import { PagesRoutingModule } from './pages-routing.module';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxToggleModule} from 'ngx-toggle';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    NgSelectModule,
    NgxToggleModule
  ],
  declarations: [],
  providers: [
  ]
})

export class PagesModule { }
