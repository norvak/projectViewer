import { NgModule} from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './table/table.component'


@NgModule({
    declarations: [ LoaderComponent, TableComponent ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

    ],
    exports: [ LoaderComponent,TableComponent ],
})
export class ComponentsModule {}
