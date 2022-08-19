import { Component, ComponentRef, ElementRef, Injector, OnInit, Type, ViewChild } from '@angular/core';
import { WindowComponent } from '../window/window.component';
import { ContainerViewDirective } from '../../directives/container-view.directive';
import * as uuid from 'uuid';
import { AppDefinition } from '../../models/app-definition.model';
import { DesktopService } from '../../services/desktop.service';
import { Rect } from '../../models/rect.model';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
  providers: [ {
    provide: DesktopService,
  }]
})
export class DesktopComponent implements OnInit {

  @ViewChild(ContainerViewDirective, { static: true }) desktopView!: ContainerViewDirective;

  private attachedWindows: { [k: string]: ComponentRef<WindowComponent> } = {};

  constructor(
    private desktopService: DesktopService,
    private elRef: ElementRef<HTMLElement>,
  ) {
  }

  ngOnInit() {
    this.desktopService.initializeService(this.desktopView.viewContainerRef);
  }

  closeWindow(appID: string) {
    if(this.attachedWindows[appID]) {
      this.attachedWindows[appID].destroy();
      delete this.attachedWindows[appID];
    }
  }

}
