import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomChanges } from '../../models/customChanges.model';
import { Rect } from '../../models/rect.model';
import { Sides } from '../../models/sides.enum';
import { Vector2D } from '../../models/vector2d.model';
import { PointerService } from '../../services/pointer.service';
import { WindowData } from './window.data';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy, OnChanges, WindowData {
  @Input('title') title?: string;
  @Input() noButtons = false;
  @Input() allowResize = true;
  @Input() initialAsMinimun = false;
  @Input() minimumWidth?: number;
  @Input() minimumHeight?: number;
  @Input() canClose = true;
  @Input() canMinimize = true;

  @Output() close = new EventEmitter<void>();
  @Output() minimize = new EventEmitter<void>();
  @Output() minimumWidthChange = new EventEmitter<number | undefined>();
  @Output() minumumHeightChange = new EventEmitter<number | undefined>();
  
  @HostBinding('style.left.px') get left() { return this.window_rect.x }
  @HostBinding('style.top.px') get top() { return this.window_rect.y }
  @HostBinding('style.width.px') get width() { return this.window_rect.w }
  @HostBinding('style.height.px') get height() { return this.window_rect.h }
  @HostBinding('style.cursor') get cursor() {
    if(this.mouse_inside && this.allowResize) {
      const pointer = this.pointerService.snapshot;
      const rPointer = pointer.position.relativeTo(this.window_rect.topLeftCorner);
      if(rPointer.x <= 12) {
        if(rPointer.y <= 12) {
          this.resizable = Sides.top + Sides.left;
          return 'nwse-resize';
        }
        else if(rPointer.y >= this.window_rect.h - 12) {
          this.resizable = Sides.bottom + Sides.left;
          return 'nesw-resize';
        }
        else if(rPointer.x <= 4) {
          this.resizable = Sides.left;
          return 'ew-resize';
        }
      }
      else if(rPointer.x >= this.window_rect.w - 12) {
        if(rPointer.y <= 12) {
          this.resizable = Sides.top + Sides.right;
          return 'nesw-resize';
        }
        else if(rPointer.y >= this.window_rect.h - 12) {
          this.resizable = Sides.bottom + Sides.right;
          return 'nwse-resize';
        }
        else if(rPointer.x >= this.window_rect.w - 4) {
          this.resizable = Sides.right;
          return 'ew-resize';
        }
      }
      else if(rPointer.y <= 4) {
        this.resizable = Sides.top;
        return 'ns-resize';
      }
      else if( rPointer.y >= this.window_rect.h - 4) {
        this.resizable = Sides.bottom;
        return 'ns-resize';
      }
    }
    this.resizable = 0;
    return 'inherit';
  }

  moving?: boolean;

  private window_rect = new Rect(100, 100, 640, 480);
  private mouse_inside = false;
  private resizable = 0; //top = 1 | left = 2 | bottom = 4 | right = 8
  private resizing = 0;

  private minimunSize?: Vector2D;

  private mouse_delta_move_subs?: Subscription;
  private mouse_button0_move_subs?: Subscription;
  private mouse_delta_resize_subs?: Subscription;
  private mouse_button0_resize_subs?: Subscription;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private pointerService: PointerService,
  ) { }

  ngOnInit() {
    if(this.elRef.nativeElement) {
      const cStyle = window.getComputedStyle(this.elRef.nativeElement);
      this.window_rect.x = Number.parseInt(cStyle.left);
      this.window_rect.y = Number.parseInt(cStyle.top);
      this.window_rect.w = Number.parseInt(cStyle.width);
      this.window_rect.h = Number.parseInt(cStyle.height);
      if(this.initialAsMinimun) {
        this.minimunSize = new Vector2D(this.window_rect.w, this.window_rect.h);
      }
    }
    if(this.minimumWidth || this.minimumHeight) {
      this.minimunSize = new Vector2D(this.minimumWidth || 0, this.minimumHeight || 0);
      this.window_rect.w = Math.max(this.window_rect.w, this.minimunSize.w);
      this.window_rect.h = Math.max(this.window_rect.h, this.minimunSize.h);
    }
  }

  ngOnChanges(changes: CustomChanges<WindowData>): void {
    if(changes.minimumWidth) {
      if(changes.minimumWidth.currentValue > 0) {
        if(!this.minimunSize)
          this.minimunSize = new Vector2D(changes.minimumWidth.currentValue);
        else
          this.minimunSize.w = changes.minimumWidth.currentValue;
        this.window_rect.w = Math.max(this.minimunSize.w, this.window_rect.w);
      }
      else if(this.minimunSize) {
        if(!this.minimunSize.h)
          delete this.minimunSize;
        else
          this.minimunSize.w = 0;
          
      }
    }
    if(changes.minimumHeight) {
      if(changes.minimumHeight.currentValue > 0) {
        if(!this.minimunSize)
          this.minimunSize = new Vector2D(0, changes.minimumHeight.currentValue);
        else
          this.minimunSize.h = changes.minimumHeight.currentValue;
        this.window_rect.h = Math.max(this.minimunSize.h, this.window_rect.h);
      }
      else if(this.minimunSize) {
        if(!this.minimunSize.w)
          delete this.minimunSize;
        else
          this.minimunSize.h = 0;
      }
    }
  }

  ngOnDestroy(): void {
    console.log('Performed a clean destruction');
    this.terminateMoveSubscriptions();
    this.terminateResizeSubscriptions();
  }

  onMouseDown($event: MouseEvent) {
    $event.stopPropagation()
    if(!this.mouse_delta_move_subs && !this.mouse_button0_move_subs && !this.resizing) {
      this.moving = true;
      this.mouse_delta_move_subs = this.pointerService.delta.subscribe(delta => this.doMove(delta))
      this.mouse_button0_move_subs = this.pointerService.button0.subscribe(state => {
        if(!state)
          this.terminateMoveSubscriptions();
      })
    }
  }

  private terminateMoveSubscriptions() {
    this.mouse_delta_move_subs?.unsubscribe();
    delete this.mouse_delta_move_subs;
    this.mouse_button0_move_subs?.unsubscribe();
    delete this.mouse_button0_move_subs;
    this.moving = false;
  }

  private terminateResizeSubscriptions() {
    this.mouse_delta_resize_subs?.unsubscribe();
    delete this.mouse_delta_resize_subs;
    this.mouse_button0_resize_subs?.unsubscribe();
    delete this.mouse_button0_resize_subs;
    this.resizing = 0;
  }

  @HostListener('mouseenter')
  private onMouseEnter() {
    this.mouse_inside = true;
  }

  @HostListener('mouseleave')
  private onMouseLeave() {
    this.mouse_inside = false;
  }

  @HostListener('mousedown', ['$event'])
  private onWindowClick($event: MouseEvent) {
    $event.stopPropagation()
    if(this.resizable && !this.moving) {
      this.resizing = this.resizable;
      this.mouse_delta_resize_subs = this.pointerService.delta.subscribe(delta => this.doResize(delta));
      this.mouse_button0_resize_subs = this.pointerService.button0.subscribe(state => {
        if(!state)
          this.terminateResizeSubscriptions();
      })
    }
  }

  private doMove(delta: Vector2D) {
    this.window_rect.x += delta.x;
    this.window_rect.y += delta.y;
  }

  private doResize(movement: Vector2D) {
    if(this.resizing & Sides.top) {
      this.window_rect.y += movement.y;
      this.window_rect.h -= movement.y;
      if(this.minimunSize && this.window_rect.h < this.minimunSize.h) {
        this.window_rect.y -= this.minimunSize.h - this.window_rect.h;
        this.window_rect.h = this.minimunSize.h;
        this.terminateResizeSubscriptions();
      }
    }
    else if(this.resizing & Sides.bottom) {
      this.window_rect.h += movement.y;
      if(this.minimunSize && this.window_rect.h < this.minimunSize.h) {
        this.window_rect.h = this.minimunSize.h;
        this.terminateResizeSubscriptions();
      }
    }
    if(this.resizing & Sides.left) {
      this.window_rect.x += movement.x;
      this.window_rect.w -= movement.x;
      if(this.minimunSize && this.window_rect.w < this.minimunSize.w) {
        this.window_rect.x -= this.minimunSize.w - this.window_rect.w;
        this.window_rect.w = this.minimunSize.w;
        this.terminateResizeSubscriptions();
      }
    }
    else if(this.resizing & Sides.right) {
      this.window_rect.w += movement.x;
      if(this.minimunSize && this.window_rect.w < this.minimunSize.w) {
        this.window_rect.w = this.minimunSize.w;
        this.terminateResizeSubscriptions();
      }
    }
  }
}
