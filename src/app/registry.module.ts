import { NgModule } from "@angular/core";
import { ErrorTestComponent } from "./components/error-test/error-test.component";
import { WipNoticeComponent } from "./components/wip-notice/wip-notice.component";
import { AppRegistryModule } from "./shared/modules/app-registry/app-registry.module";
import { Apps } from "./shared/modules/app-registry/models/apps";

const apps: Apps = [
  {
    handle: 'wip-notice',
    name: 'Demo WIP Notice',
    component: WipNoticeComponent,
    icon: '/assets/test.svg'
  },
  {
    handle: 'error-test',
    name: 'Error Test',
    component: ErrorTestComponent,
    icon: '/assets/error.png',
    defaultRect: {
      x: '$desktopWidth / 2 - 240',
      y: '$desktopHeight / 2 - 125',
      width: 480,
      height: 250
    }
  },
  {
    handle: 'iconless-app',
    name: 'No Icon Test',
    component: WipNoticeComponent,
  }
]

@NgModule({
    imports: [
        AppRegistryModule.forRoot(apps)
    ],
    exports: [AppRegistryModule]
})
export class RegistryModule {}