import { Injectable, Type } from '@angular/core';
import { DesktopComponent } from '../components/desktop/desktop.component';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DesktopService {
  private desktops: { [k: string]: DesktopComponent } = {}

  constructor() { }

  getDesktop(id: string): DesktopComponent | undefined {
    return this.desktops[id];
  }

  registerDesktop(component: DesktopComponent) {
    const id = uuid.v4();
    this.desktops[id] = component;
    return id;
  }

  unregisterDesktop(id: string) {
    if(this.desktops[id]) {
      delete this.desktops[id];
    }
  }

  createApp<T>(id: string, componentType: Type<T>) {
    
  }

  terminateApp(windowID: string, desktopID: string) {
    if(this.desktops[desktopID]) {
      this.desktops[desktopID].closeWindow(windowID);
    }
  }
}
