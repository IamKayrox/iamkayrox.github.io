import { ModuleWithProviders, NgModule } from "@angular/core";
import { AppRegistryService } from "./app-registry.service";
import { AppDescriptor } from "./models/app-descriptor.model";
import { Apps } from "./models/apps";
import { APP_REGISTY } from "./symbols";

@NgModule({
    providers: [
        AppRegistryService,
    ],
})
export class AppRegistryModule {
    static forRoot(apps: Apps): ModuleWithProviders<AppRegistryModule> {
        return {
            ngModule: AppRegistryModule,
            providers: [
                {
                    provide: APP_REGISTY,
                    useValue: apps,
                }
            ]
        }
    }
}