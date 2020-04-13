import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-move-element',
  templateUrl: './move-element.component.html',
  styleUrls: ['./move-element.component.scss']
})
export class MoveElementComponent implements OnInit {

  move: boolean;
  @Input() elements: any[];
  element: any;
  elementsCopy: any[];

  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMove: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  	this.move = false;
  }

  order(): void {
    this.move = true;
    this.elementsCopy = this.elements.slice();
    this.onMove.emit(true);
  }

  save(): void {
    this.move = false;
    this.element = null;
    // this.elements = this.elementsCopy;
    this.onSave.emit(this.elements);
	}

  cancel(): void {
    this.move = false;
    this.element = null;
    this.elements = this.elementsCopy;
    this.onCancel.emit(this.elementsCopy);
  }

  moveTo( event: any) : void {
    if ( this.element ){
      const indexA  = this.elements.findIndex( e => e.id === event.id );
      const indexB  = this.elements.findIndex( e => e.id === this.element.id );
      this.elements[indexA] = this.element;
      this.elements[indexB] = event;
    }
    this.element = null;
  }
  
  select( event: any) : void {
    this.element = event;
  }

}
