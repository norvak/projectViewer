import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      },
      {
        path: 'dashboard',
         loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: '**',
        redirectTo: '**'
      },
    ]
  },
  {
    path: 'admin/authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
  },
  {
    path: '',
    loadChildren: './showcase-cli/showcase-cli.module#ShowcaseCliModule',
  },
  {
    path: '',
    loadChildren: './showcase-method/showcase-method.module#ShowcaseMethodModule',
  },
  {
    path: '**',
    component: P404Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
