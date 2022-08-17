import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AppDefinition } from '../../models/app-definition.model';
import { DesktopService } from '../../services/desktop.service';
import { DesktopComponent } from '../desktop/desktop.component';

@Component({
  selector: 'app-icon-container',
  templateUrl: './icon-container.component.html',
  styleUrls: ['./icon-container.component.scss']
})
export class IconContainerComponent implements OnInit {
  @Input() appDefinition?: AppDefinition<any>;

  private desktop?: DesktopComponent;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private desktopService: DesktopService,
  ) { }

  ngOnInit() {
    this.lookForDesktop(this.elRef.nativeElement);
  }

  private lookForDesktop(el: HTMLElement) {
    if(el.parentElement) {
      const desktopID = el.parentElement.getAttribute('desktop-id');
      if(desktopID)
        this.desktop = this.desktopService.getDesktop(desktopID);
      else
        this.lookForDesktop(el.parentElement);
    }
    else
      console.warn('FOUND APP ICON WITHOUT A DESKTOP', `APP NAME: ${this.appDefinition?.name || this.appDefinition?.title || 'UNDEFINED APP'}`);
  }

  @HostListener('click', ['$event'])
  onDoubleClick($event: MouseEvent) {
    if(this.appDefinition) {
      this.desktop?.createApp(this.appDefinition);
    }
  }

}
