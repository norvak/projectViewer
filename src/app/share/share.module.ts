import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ElementsComponent} from './elements/elements.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MoveElementComponent} from './move-element/move-element.component';
import {EmptyListComponent} from './empty-list/empty-list.component';
import {FilterByNamePipe} from './filter-by-name.pipe';
import {TbodyComponent} from './tbody/tbody.component';
import {TdetailComponent} from './tdetail/tdetail.component';
import {TableComponent} from './table/table.component';
import {PaginationModule} from "ngx-bootstrap";
import {PDetailComponent } from './p-detail/p-detail.component';
import { orderByPipe } from './pipes/orderBy/orderBy.pipe';
import { SearchPipe } from './search/search';
@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    ElementsComponent,
    ConfirmDialogComponent,
    SearchPipe,
    MoveElementComponent,
    EmptyListComponent,
    FilterByNamePipe,
    TbodyComponent,
    TdetailComponent,
    TableComponent,
    PDetailComponent,
    orderByPipe
  ],
  exports: [
    SearchPipe,
    ElementsComponent,
    ConfirmDialogComponent,
    MoveElementComponent,
    EmptyListComponent,
    FilterByNamePipe,
    TbodyComponent,
    TdetailComponent,
    TableComponent,
    PDetailComponent,
    orderByPipe
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class ShareModule {
}
