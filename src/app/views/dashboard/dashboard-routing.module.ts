import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailProjectComponent } from './detail/detail-project.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'detail', component: DetailProjectComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
