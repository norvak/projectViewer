import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../views/error/404.component';

const routes: Routes = [

  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
  },
  {
    path: 'company',
    loadChildren: './company/company.module#CompanyModule',
  },
  {
    path: 'project',
    loadChildren: './project/project.module#ProjectModule',
  },
  {
    path: 'showcase',
    loadChildren: './showcase/showcase.module#ShowcaseModule',
  },
  {
    path: 'repository',
    loadChildren: './repository/repository.module#RepositoryModule',
  },
  {
    path: 'configuration',
    loadChildren: './configuration/configuration.module#ConfigurationModule',
  },
  {
    path: 'reports/report-link',
    loadChildren: './reports/reports.module#ReportsModule',
  },
  {
    path: 'reports/report-sale',
    loadChildren: './reports/reports.module#ReportsModule',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
