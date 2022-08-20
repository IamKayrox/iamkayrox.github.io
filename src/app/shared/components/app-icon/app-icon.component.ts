import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { AppRegistryService } from '../../modules/app-registry/app-registry.service';
import { AppDescriptor } from '../../modules/app-registry/models/app-descriptor.model';
import { DesktopService } from '../../services/desktop.service';

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
})
export class AppIconComponent<T = any> implements OnInit {
  @Input() handle!: string;

  private descriptor?: AppDescriptor<any>;
  private focused: boolean = false;

  constructor(
    private desktopService: DesktopService,
    @Optional() private appRegistry: AppRegistryService,
  ) { }

  ngOnInit(): void {
    this.descriptor = this.appRegistry.getDescriptor(this.handle);
    this.desktopService.clearIconFocus.subscribe(() => this.focused = false);
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    if($event.button == 0) {
      this.desktopService.requestIconFocus();
      this.focused = true;
    }
  }

  @HostListener('dblclick')
  onDoubleClick() {
    this.desktopService.requestIconFocus();
    this.desktopService.openWindow(this.handle);
  }

  get icon() {
    return this.descriptor?.icon || '/assets/no-icon.png';
  }

  get name() {
    return this.descriptor?.name || '???????';
  }

  @HostBinding('class.focused')
  get isFocused() {
    return this.focused;
  }
}
