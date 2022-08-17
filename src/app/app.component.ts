import { Component } from '@angular/core';
import { WipNoticeComponent } from './components/wip-notice/wip-notice.component';
import { AppDefinition } from './shared/models/app-definition.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  wipApp: AppDefinition<WipNoticeComponent> = {
    name: 'app_wip_notice',
    title: 'Demo WIP Notice',
    component: WipNoticeComponent,
    singleInstance: true,
  }
}
