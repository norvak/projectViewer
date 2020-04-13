import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap';
import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryComponent } from './repository.component';
import { ShareModule } from '../../share/share.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ComponentsModule } from '../../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    ComponentsModule,
    NgxPaginationModule,
    TooltipModule.forRoot(),
    CommonModule,
    ClipboardModule,
    RepositoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    ShareModule,
    ModalModule.forRoot()
  ],
  declarations: [RepositoryComponent],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class RepositoryModule { }
