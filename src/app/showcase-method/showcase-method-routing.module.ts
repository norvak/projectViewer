import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowcaseMethodComponent} from './showcase-method.component';

const routes: Routes = [
  {
    path: ':methodology',
    component: ShowcaseMethodComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowcaseMethodRoutingModule {
}
