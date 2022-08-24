import { NgModule } from "@angular/core";
import { ErrorTestComponent } from "./components/error-test/error-test.component";
import { UniqueTestComponent } from "./components/unique-test/unique-test.component";
import { WipNoticeComponent } from "./components/wip-notice/wip-notice.component";
import { Vector2D } from "./shared/models/vector2d.model";
import { AppRegistryModule } from "./shared/modules/app-registry/app-registry.module";
import { Apps } from "./shared/modules/app-registry/models/apps";

const apps: Apps = [
  {
    handle: 'wip-notice',
    name: 'Demo WIP Notice',
    component: WipNoticeComponent,
    minimumSize: new Vector2D(640, 480),
    icon: '/assets/test.svg',
    unique: true,
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
    },
    allowResize: false,
    actionsButtons: {
      close: false,
      minize: false,
    }
  },
  {
    handle: 'iconless-app',
    name: 'No Icon Test',
    component: WipNoticeComponent,
  },
  {
    handle: 'unique-app',
    name: 'Unique App Test',
    component: UniqueTestComponent,
    unique: true,
  }
]

@NgModule({
    imports: [
        AppRegistryModule.forRoot(apps)
    ],
    exports: [AppRegistryModule]
})
export class RegistryModule {}