import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContainerViewDirective } from "./directives/container-view.directive";
import { DesktopComponent } from "./components/desktop/desktop.component";
import { WindowComponent } from "./components/window/window.component";
import { PointerService } from "./services/pointer.service";
import { IconContainerComponent } from "./components/icon-container/icon-container.component";
import { AppIconComponent } from "./components/app-icon/app-icon.component";
import { AppIconViewContainerDirective } from "./components/app-icon/app-icon-view-container.directive";
import { AppNotDefinedComponent } from "./components/app-not-defined/app-not-defined.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        WindowComponent,
        DesktopComponent,
        ContainerViewDirective,
        IconContainerComponent,
        AppIconComponent,
        AppIconViewContainerDirective,
        AppNotDefinedComponent,
    ],
    exports: [
        DesktopComponent,
        IconContainerComponent,
        AppIconComponent,
    ],
    providers: [
        PointerService,
    ]
})
export class SharedModule {}