import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowcaseComponent} from './showcase.component';
import {RegisterShowcaseComponent} from './register/register-showcase.component';
import {DetailShowcaseComponent} from './detail/detail-showcase.component';
import { DescriptionProjectComponent } from './description-project/description-project.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [{
  path: '', component: ShowcaseComponent },
  { path: 'add', component: RegisterShowcaseComponent  },
  { path: 'detail', component: DetailShowcaseComponent  },
  { path: 'description', component: DescriptionProjectComponent  },
  { path: 'result', component: ResultComponent  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowcaseRoutingModule { }
