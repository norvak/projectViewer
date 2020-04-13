import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProjectRoutingModule } from './project-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProjectComponent } from './project.component';
import { DetailProjectComponent } from './detail/detail-project.component';
import { RegisterProjectComponent } from './register/register-project.component';
import { ShareModule } from '../../share/share.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ComponentsModule } from '../../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    CommonModule,
    ComponentsModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    ShareModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    HttpClientModule
  ],
  declarations: [ProjectComponent, RegisterProjectComponent, DetailProjectComponent ],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
entryComponents: []
})
export class ProjectModule { }
