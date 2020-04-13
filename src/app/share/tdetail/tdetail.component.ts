import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tdetail',
  templateUrl: './tdetail.component.html',
  styleUrls: ['./tdetail.component.scss']
})
export class TdetailComponent implements OnInit {

  @Input() name;
  @Input() text;

  constructor() { }

  ngOnInit() {
  }

}
