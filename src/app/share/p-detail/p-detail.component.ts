import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-p-detail',
  templateUrl: './p-detail.component.html',
  styleUrls: ['./p-detail.component.scss']
})
export class PDetailComponent implements OnInit {

  @Input() key;
  @Input() value;

  constructor() { }

  ngOnInit() {
  }

}
