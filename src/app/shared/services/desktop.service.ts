import { ComponentRef, Injectable, Injector, Optional, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { WindowComponent } from '../components/window/window.component';
import { __APP_HANDLE__, __WINDOW__HANDLE__ } from '../models/symbols';
import { AppRegistryService } from '../modules/app-registry/app-registry.service';
import { boolOrDefault } from '../utils/bool-or-default';

@Injectable()
export class DesktopService {
  private appInstances: { [k: string]: symbol[] } = {};
  private instances: { [k: symbol]: ComponentRef<WindowComponent> } = { }

  private desktopView?: ViewContainerRef;
  private el?: HTMLElement;
  private injector?: Injector;

  private _clearIconFocus = new Subject<void>();

  constructor(
    @Optional() private appRegistry?: AppRegistryService,
  ) { }

  initializeService(desktopView: ViewContainerRef, el: HTMLElement, injector: Injector) {
    this.desktopView = desktopView;
    this.el = el;
    this.injector = injector;
  }

  openWindow(appHandle: string) {
    if(this.desktopView) {
      const descriptor = this.appRegistry?.getDescriptor(appHandle);
      if(boolOrDefault(descriptor?.unique, false) && this.appInstances[appHandle]?.length > 0) {
        for(let handle of this.appInstances[appHandle]) {
          this.instances[handle].instance.flash = true;
        }
        return
      }
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
          ],
          parent: this.injector,
        })
      })
      if(this.appInstances[appHandle])
        this.appInstances[appHandle].push(windowHandle);
      else
        this.appInstances[appHandle] = [windowHandle];
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
      const appHandle = this.instances[handle].instance.getAppHandle();
      if(this.appInstances[appHandle]) {
        const index = this.appInstances[appHandle].indexOf(handle);
        if(index >= 0)
          this.appInstances[appHandle].splice(index, 1);
        if(this.appInstances[appHandle].length === 0)
          delete this.appInstances[appHandle];
      }
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
