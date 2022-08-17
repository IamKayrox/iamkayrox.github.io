import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContainerViewDirective } from "./directives/container-view.directive";
import { DesktopComponent } from "./components/desktop/desktop.component";
import { WindowComponent } from "./components/window/window.component";
import { DesktopService } from "./services/desktop.service";
import { PointerService } from "./services/pointer.service";
import { IconContainerComponent } from "./components/icon-container/icon-container.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        WindowComponent,
        DesktopComponent,
        ContainerViewDirective,
        IconContainerComponent,
    ],
    exports: [
        DesktopComponent,
        IconContainerComponent,
    ],
    providers: [
        PointerService,
        DesktopService,
    ]
})
export class SharedModule {}