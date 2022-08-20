import { Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { DesktopService } from '../../services/desktop.service';
import { PointerService } from '../../services/pointer.service';
import { DesktopViewContainerDirective } from './desktop-view-container.directive';
@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
  providers: [
    { provide: DesktopService, },
    { provide: PointerService, },
  ]
})
export class DesktopComponent implements OnInit {
  @Input() runOnStart?: string;

  @ViewChild(DesktopViewContainerDirective, { static: true }) desktopView!: DesktopViewContainerDirective;

  constructor(
    private desktopService: DesktopService,
    private pointerService: PointerService,
    private elRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit() {
    this.desktopService.initializeService(this.desktopView.viewContainerRef, this.elRef.nativeElement);
    this.pointerService.initializeService(this.elRef.nativeElement);
    if(this.runOnStart) {
      const apps = this.runOnStart.split(',');
      for(let app of apps) {
        this.desktopService.openWindow(app);
      }
    }
  }

  clearIconFocus($event: MouseEvent) {
    if($event.button == 0) {
      this.desktopService.requestIconFocus();
    }
  }

}
