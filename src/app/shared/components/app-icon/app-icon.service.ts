import { Injectable, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AppIconService {
  constructor() { }

  private component?: Type<any>

  initialize(component: Type<any>) {
    this.component = component;
  }

  getComponent() {
    return this.component;
  }
}
