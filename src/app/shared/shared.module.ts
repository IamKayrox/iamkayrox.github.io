import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WindowComponent } from "./components/window/window.component";
import { PointerService } from "./services/pointer.service";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        WindowComponent,
    ],
    exports: [
        WindowComponent,
    ],
    providers: [
        PointerService,
    ]
})
export class SharedModule {}