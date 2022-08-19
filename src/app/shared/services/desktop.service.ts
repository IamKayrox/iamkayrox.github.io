import { ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { WindowComponent } from '../components/window/window.component';
import { __WINDOW__HANDLE__ } from '../models/symbols';

@Injectable()
export class DesktopService {
  private apps: { [k: symbol]: Injector } = {};
  private instances: { [k: symbol]: ComponentRef<WindowComponent> } = { }

  private desktopView?: ViewContainerRef;

  constructor() { }

  initializeService(desktopView: ViewContainerRef) {
    this.desktopView = desktopView;
  }

  registerApp(injector: Injector) {
    const appHandle = Symbol();
    this.apps[appHandle] = injector;
    return appHandle;
  }

  getAppService(appHandle: symbol) {
    return this.apps[appHandle];
  }

  openWindow(appHandle: symbol) {
    if(this.desktopView && this.apps[appHandle]) {
      const windowHandle = Symbol();
      const instance = this.desktopView.createComponent(WindowComponent, {
        injector: Injector.create({
          providers: [
            {
              provide: __WINDOW__HANDLE__,
              useValue: windowHandle,
            }
          ],
          parent: this.apps[appHandle],
        })
      })
      this.instances[windowHandle] = instance;
    }
  }

  closeWindow(handle: symbol) {
    if(this.instances[handle]) {
      this.instances[handle].destroy();
      delete this.instances[handle]
    }
  }
}
