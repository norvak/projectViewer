import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap';
import { ShareModule } from '../share/share.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    ShareModule,
    CommonModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    AuthenticationRoutingModule,
    ComponentsModule
  ],
  declarations: [LoginComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthenticationModule { }
