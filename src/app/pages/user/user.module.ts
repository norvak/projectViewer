import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { RegisterUserComponent } from './register/register-user.component';
import { ShareModule } from '../../share/share.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ComponentsModule } from '../../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    ComponentsModule,
    NgxPaginationModule,
    TooltipModule.forRoot(),
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    ShareModule,
    ModalModule.forRoot()
  ],
  declarations: [UserComponent, RegisterUserComponent],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class UserModule { }
