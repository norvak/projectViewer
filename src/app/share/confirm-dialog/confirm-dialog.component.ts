import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  @Input()  message = '';
  @Output() onYes: EventEmitter<any> = new EventEmitter<any>();
  @Output() onNo: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  no(): void {
    this.onNo.emit({yes: true});
  }

  yes(): void {
    this.onYes.emit({no: true});
  }

}
