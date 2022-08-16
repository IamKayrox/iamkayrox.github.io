import { Component, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { Vector2D } from '../../models/vector2d.model';
import { PointerService } from '../../services/pointer.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy {
  @Input('title') title?: string;
  @Input() noButtons?: boolean;
  @Output() close = new EventEmitter<void>();
  
  @HostBinding('style.left.px') get left() { return this.window_x }
  @HostBinding('style.top.px') get top() { return this.window_y }
  @HostBinding('style.width.px') get width() { return 640 }
  @HostBinding('style.height.px') get height() { return 480 }

  moving?: boolean;

  private window_x = 100;
  private window_y = 100;

  private mouse_delta_subs?: Subscription;
  private mouse_button0_subs?: Subscription;

  constructor(
    private pointerService: PointerService,
  ) { }

  ngOnInit() {
  }

  onMouseDown() {
    if(!this.mouse_delta_subs && !this.mouse_button0_subs) {
      this.moving = true;
      this.mouse_delta_subs = this.pointerService.delta.subscribe({
        next: (delta) => {
          this.window_x += delta.x;
          this.window_y += delta.y;
        },
        complete: () => {
          this.terminateSubscriptions();
        }
      })
      this.mouse_button0_subs = this.pointerService.button0.subscribe({
        next: (down) => {
          if(!down) {
            this.terminateSubscriptions();
          }
        },
        complete: () => {
          this.terminateSubscriptions();
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.terminateSubscriptions();
  }

  private terminateSubscriptions() {
    this.mouse_delta_subs?.unsubscribe();
    delete this.mouse_delta_subs;
    this.mouse_button0_subs?.unsubscribe();
    delete this.mouse_button0_subs;
    this.moving = false;
  }
}
