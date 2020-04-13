import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {

  @Input() thead: any[];
  @Input() elements: any[];
  constructor() { }

  ngOnInit() {

  }

}
