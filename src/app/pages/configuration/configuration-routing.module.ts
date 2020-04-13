import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorProjectComponent } from './author-project/author-project.component';
import { RepositoryComponent } from './repository/repository.component';

const routes: Routes = [
{
  path: '',
  data: {
    title: 'configuration'
  },
  children: [
    {
      path: '',
      redirectTo: 'author-project'
    },
    {
      path: 'author-project',
      component: AuthorProjectComponent,
      data: {
        title: 'Author-project'
      }
    },
    {
      path: 'repository',
      component: RepositoryComponent,
      data: {
        title: 'Repository'
      }
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
