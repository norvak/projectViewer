import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user.component';
import {RegisterUserComponent} from './register/register-user.component';

const routes: Routes = [{
  path: '', component: UserComponent},
  { path: 'add', component: RegisterUserComponent  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
