import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectComponent} from './project.component';
import {RegisterProjectComponent} from './register/register-project.component';
import {DetailProjectComponent} from './detail/detail-project.component';

const routes: Routes = [{
  path: '', component: ProjectComponent},
  { path: 'add', component: RegisterProjectComponent  },
  { path: 'detail', component: DetailProjectComponent  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
