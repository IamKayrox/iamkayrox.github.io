import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AppDefinition } from '../../models/app-definition.model';
import { DesktopService } from '../../services/desktop.service';

@Component({
  selector: 'app-icon-container',
  templateUrl: './icon-container.component.html',
  styleUrls: ['./icon-container.component.scss']
})
export class IconContainerComponent implements OnInit {
  @Input() appDefinition?: AppDefinition<any>;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private desktopService: DesktopService,
  ) { }

  ngOnInit(): void {
    
  }

  @HostListener('click', ['$event'])
  onDoubleClick($event: MouseEvent) {
    if(this.appDefinition) {
    }
  }

}
