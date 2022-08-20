import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRegistryModule } from './shared/modules/app-registry/app-registry.module';
import { WipNoticeComponent } from './components/wip-notice/wip-notice.component';
import { RegistryModule } from './registry.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    RegistryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
