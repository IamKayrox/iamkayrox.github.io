import { ComponentRef, Injectable, Injector, Optional, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { WindowComponent } from '../components/window/window.component';
import { __APP_HANDLE__, __WINDOW__HANDLE__ } from '../models/symbols';
import { AppRegistryService } from '../modules/app-registry/app-registry.service';

@Injectable()
export class DesktopService {
  private apps: { [k: symbol]: Injector } = {};
  private instances: { [k: symbol]: ComponentRef<WindowComponent> } = { }

  private desktopView?: ViewContainerRef;
  private el?: HTMLElement;

  private _clearIconFocus = new Subject<void>();

  constructor(
    @Optional() private appRegistry?: AppRegistryService,
  ) { }

  initializeService(desktopView: ViewContainerRef, el: HTMLElement) {
    this.desktopView = desktopView;
    this.el = el;
  }

  registerApp(injector: Injector) {
    const appHandle = Symbol();
    this.apps[appHandle] = injector;
    return appHandle;
  }

  getAppService(appHandle: symbol) {
    return this.apps[appHandle];
  }

  openWindow(appHandle: string) {
    if(this.desktopView) {
      const descriptor = this.appRegistry?.getDescriptor(appHandle);
      const windowHandle = Symbol();
      const instance = this.desktopView.createComponent(WindowComponent, {
        injector: Injector.create({
          providers: [
            {
              provide: __WINDOW__HANDLE__,
              useValue: windowHandle,
            },
            {
              provide: __APP_HANDLE__,
              useValue: descriptor?.handle,
            },
            {
              provide: DesktopService,
              useValue: this,
            },
          ],
        })
      })
      this.instances[windowHandle] = instance;
    }
  }

  requestIconFocus() {
    this._clearIconFocus.next();
  }

  get clearIconFocus() {
    return this._clearIconFocus.asObservable();
  }

  closeWindow(handle: symbol) {
    if(this.instances[handle]) {
      this.instances[handle].destroy();
      delete this.instances[handle]
    }
  }

  get width() {
    return this.el?.clientWidth || 0;
  }

  get height() {
    return this.el?.clientHeight || 0;
  }
}
