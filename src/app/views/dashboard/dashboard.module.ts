import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { ShareModule } from '../../share/share.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ComponentsModule } from '../../components/components.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DetailProjectComponent } from './detail/detail-project.component';
@NgModule({
  imports: [
    ComponentsModule,
    ShareModule,
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(), // ToastrModule added
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ DashboardComponent, DetailProjectComponent ]
})
export class DashboardModule { }
