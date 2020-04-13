import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowcaseCliComponent} from './showcase-cli.component';
import { DetailShowcaseCliComponent} from './detail-showcase-cli/detail-showcase-cli.component';

const routes: Routes = [
  {
    path: ':client/:uuid',
    component: ShowcaseCliComponent
  },
  {
    path: ':client/:uuid/:uuidp',
    component: DetailShowcaseCliComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowcaseCliRoutingModule {
}
