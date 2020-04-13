import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AuthorProjectComponent } from './author-project/author-project.component';
import { RepositoryComponent } from './repository/repository.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
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
    ConfigurationRoutingModule,
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
  declarations: [ AuthorProjectComponent, RepositoryComponent],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
entryComponents: []
})
export class ConfigurationModule { }
