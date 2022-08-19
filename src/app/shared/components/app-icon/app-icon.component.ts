import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Injector, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, Type, ViewChild } from '@angular/core';
import { CustomChanges } from '../../models/customChanges.model';
import { DesktopService } from '../../services/desktop.service';
import { AppIconService } from './app-icon.service';

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
  providers: [
    {
      provide: AppIconService,
    }
  ]
})
export class AppIconComponent<T = any> implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() title!: string;
  @Input() component!: Type<T>;

  @Output() titleChange = new EventEmitter<string>();

  @ViewChild('iconContainer', { static: true }) iconContainer!: ElementRef<HTMLDivElement>;

  mObserver: MutationObserver = new MutationObserver(() => this.onMutation())

  private handle?: symbol;

  constructor(
    private desktopService: DesktopService,
    private appIconService: AppIconService,
    private injector: Injector,
  ) {
    this.handle = this.desktopService.registerApp(this.injector);
  }

  ngOnInit(): void {
    this.appIconService.initialize(this.component);
  }

  ngOnChanges(changes: CustomChanges<AppIconComponent>): void {
    if(changes.title) {
      //DO SOMETHING
    }
  }

  ngAfterViewInit(): void {
    this.mObserver.observe(this.iconContainer.nativeElement, {
      childList: true,
    })
  }

  ngOnDestroy(): void {
    this.mObserver.disconnect();
  }

  onMutation() {
    
  }

  @HostListener('dblclick')
  onDoubleClick() {
    if(this.handle)
      this.desktopService.openWindow(this.handle);
  }
}
