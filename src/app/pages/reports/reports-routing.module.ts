import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportSaleComponent } from './report-sale/report-sale.component';
import { ReportLinkComponent } from './report-link/report-link.component';


const routes: Routes = [
  { path: 'report-sale', component: ReportSaleComponent },
  { path: 'report-link', component: ReportLinkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
