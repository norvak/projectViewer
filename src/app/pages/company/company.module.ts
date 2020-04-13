import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CompanyRoutingModule } from './company-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { CompanyComponent } from './company.component';
import { RegisterCompanyComponent } from './register/register-company.component';
import { ShareModule } from '../../share/share.module';

@NgModule({
  imports: [
    ComponentsModule,
    TooltipModule.forRoot(),
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    ShareModule,
    ModalModule.forRoot()
  ],
  declarations: [CompanyComponent, RegisterCompanyComponent],
entryComponents: [],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CompanyModule { }
