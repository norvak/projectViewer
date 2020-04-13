import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'table-zaga',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss'],
})
export class TableComponent implements OnInit {

    @Input() body: any [] = [];
    @Input() header: any [] = [];

    @Output() emitChange: EventEmitter<any> = new EventEmitter<any>(); 

    constructor() {}

    ngOnInit() {
        console.log(this.body, this.header);
    }
}