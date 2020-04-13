import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyComponent} from './company.component';
import {RegisterCompanyComponent} from './register/register-company.component';

const routes: Routes = [{
  path: '', component: CompanyComponent},
  { path: 'add', component: RegisterCompanyComponent  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
