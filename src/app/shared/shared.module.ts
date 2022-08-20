import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WindowViewContainerDirective } from "./components/window/window-view-container.directive";
import { DesktopComponent } from "./components/desktop/desktop.component";
import { WindowComponent } from "./components/window/window.component";
import { PointerService } from "./services/pointer.service";
import { AppIconComponent } from "./components/app-icon/app-icon.component";
import { AppIconViewContainerDirective } from "./components/app-icon/app-icon-view-container.directive";
import { AppNotDefinedComponent } from "./components/app-not-defined/app-not-defined.component";
import { DesktopViewContainerDirective } from "./components/desktop/desktop-view-container.directive";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        WindowComponent,
        DesktopComponent,
        AppIconComponent,
        AppNotDefinedComponent,
        //Directives
        AppIconViewContainerDirective,
        DesktopViewContainerDirective,
        WindowViewContainerDirective,
    ],
    exports: [
        DesktopComponent,
        AppIconComponent,
    ],
    providers: [
        PointerService,
    ]
})
export class SharedModule {}