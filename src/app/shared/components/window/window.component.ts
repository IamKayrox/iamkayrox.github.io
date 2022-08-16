import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  @Input('title') title?: string;

  constructor() { }

  ngOnInit() {
  }

  hasChildren(el: HTMLDivElement) {
    return el.children.length > 0;
  }
}
