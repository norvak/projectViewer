import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';
// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import localEs from '@angular/common/locales/es';
registerLocaleData(localEs);
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgxCoolDialogsModule } from 'ngx-cool-dialogs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppFooterModule,
  AppHeaderModule,
  AppSidebarModule,
} from '@coreui/angular';
// Import routing module
import { AppRoutingModule } from './app.routing';
// Import 3rd party components
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ShareModule } from './share/share.module';
import { Interceptor } from './authentication/interceptor';
import { NgxToggleModule } from 'ngx-toggle';
import { HttpModule } from '@angular/http';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InfiniteListModule } from 'angular-infinite-list';

@NgModule({
  imports: [
    NgxCoolDialogsModule.forRoot({
      theme: 'material', // available themes: 'default' | 'material' | 'dark'
      okButtonText: 'Si',
      cancelButtonText: 'No',
      color: '#1AB394',
      titles: {
          confirm: 'Confirmar',
        }
    }),
    InfiniteListModule,
    BsDropdownModule.forRoot(),
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    TabsModule.forRoot(),
    ChartsModule,
    ShareModule,
    NgxToggleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot() // ToastrModule added
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
  ],
  providers: [
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  },
  {
    provide: LOCALE_ID, useValue: 'es-BO'
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
