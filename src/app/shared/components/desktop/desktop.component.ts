import { Component, ComponentRef, ElementRef, OnDestroy, OnInit, Output, Type, ViewChild } from '@angular/core';
import { DesktopService } from '../../services/desktop.service';
import { WindowComponent } from '../window/window.component';
import { ContainerViewDirective } from '../../directives/container-view.directive';
import * as uuid from 'uuid';
import { AppDefinition } from '../../models/app-definition.model';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
})
export class DesktopComponent implements OnInit, OnDestroy {

  @Output('desktop-id') readonly id: string;

  @ViewChild(ContainerViewDirective, { static: true }) desktopView!: ContainerViewDirective;

  private attachedWindows: { [k: string]: ComponentRef<WindowComponent> } = {};

  constructor(
    private desktopService: DesktopService,
    private elRef: ElementRef<HTMLElement>,
  ) {
    this.id = desktopService.registerDesktop(this);
  }

  ngOnInit() {
    this.elRef.nativeElement.setAttribute('desktop-id', this.id);
  }

  ngOnDestroy(): void {
    this.desktopService.unregisterDesktop(this.id);
  }

  createApp<T>(appDefinition: AppDefinition<T>) {
    if(appDefinition.singleInstance) {
      const windows = Object.values(this.attachedWindows);
      for(let win of windows) {
        const winID = win.instance.name || win.instance.title;
        if(winID == appDefinition.name) {
          win.instance.flash = true;
          return;
        }
      }
    }
    const winRef = this.desktopView.viewContainerRef.createComponent(WindowComponent);
    winRef.instance.initializeApp(appDefinition, this.id);
    const id = uuid.v4();
    winRef.instance.id = id;
    this.attachedWindows[id] = winRef;
  }

  closeWindow(appID: string) {
    if(this.attachedWindows[appID]) {
      this.attachedWindows[appID].destroy();
      delete this.attachedWindows[appID];
    }
  }

}
