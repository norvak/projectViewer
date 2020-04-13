import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap';
import { ShowcaseRoutingModule } from './showcase-routing.module';
import { ShowcaseComponent } from './showcase.component';
import { RegisterShowcaseComponent } from './register/register-showcase.component';
import { ShareModule } from '../../share/share.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxCoolDialogsModule } from 'ngx-cool-dialogs';
import { DetailShowcaseComponent } from './detail/detail-showcase.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ClipboardModule } from 'ngx-clipboard';
import { ComponentsModule } from '../../components/components.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DescriptionProjectComponent } from './description-project/description-project.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ComponentsModule,
    ClipboardModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(), // ToastrModule added
    CommonModule,
    ShowcaseRoutingModule,
    FormsModule,
    PdfViewerModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    ShareModule,
    ModalModule.forRoot(),
    NgxCoolDialogsModule.forRoot({
      theme: 'material', // available themes: 'default' | 'material' | 'dark'
      okButtonText: 'Si',
      cancelButtonText: 'No',
      color: '#1AB394',
      titles: {
          confirm: 'Confirmar',
        }
    })
  ],

  declarations: [ShowcaseComponent,
     RegisterShowcaseComponent,
      DetailShowcaseComponent,
      DescriptionProjectComponent,
      ResultComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      entryComponents: []
})
export class ShowcaseModule { }
