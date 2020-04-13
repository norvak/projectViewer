import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageChangedEvent} from "ngx-bootstrap";
import * as _ from 'lodash';
import * as moment from 'moment';
import {CurrencyPipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  items: any[];
  total: number;
  page: number;
  @Input()
  header: any;
  @Output() onOption: EventEmitter<any> = new EventEmitter<any>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  _elements: any[];

  @Input()
  set elements(elements: any[]) {
    this._elements = elements || [];
    this.items = elements.slice(0, 10) 
    this.total = this._elements.length;
    this.page = 1;
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: [''],
      type: ['']
    });
    this.searchForm.setValue({
      search: '',
      type: this.header[1]
    });
    this.searchForm.valueChanges.subscribe( d => {
      this.search(d);
    });
  }

  search(data){
    const search = data.search;
    const type   = data.type;
    if ( _.isEmpty(search.trim())){
      this.items = this._elements;
    } else {
      this.items = this._elements.filter( d => {
        return this.getValue(d, type).startsWith(search); 
      })
    }
  }

  onEvent() {

  }

  getValue(item, head): any {
    const value = _.get(item, head.name);
    if (head.type === 'date') {
      return moment(value).format(head.format);
    } else if( head.type === 'money'){
      return new CurrencyPipe('es-BO').transform(value,'BS');
    }
    return value;
  }

  tableEvent(item, action): void {
    this.onOption.emit({
      data: item,
      action: action
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.items = this._elements.slice(startItem, endItem);
  }

}
