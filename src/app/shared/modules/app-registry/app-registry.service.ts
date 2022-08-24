import { Inject, Injectable } from '@angular/core';
import { AppDescriptor } from './models/app-descriptor.model';
import { APP_REGISTY } from './symbols';

@Injectable()
export class AppRegistryService {

  constructor(
    @Inject(APP_REGISTY) private apps: AppDescriptor<any>[],
  ) { }
  
  getDescriptor(handle: string) {
    return this.apps.find(app => app.handle == handle);
  }

  get appList() {
    return [...this.apps];
  }
}
