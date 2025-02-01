import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal } from '@angular/core';
import { ActionType } from '../../models/actions.model';
import { ReadonlyRect2D, Rect2D } from '../../models/rect-2d.model';
import { WindowAction } from '../../constants/action.constants';
import { ReadonlyVector2D } from '../../models/vector-2d.model';
import { BlockEventsDirective } from '../../directives/block-events.directive';

@Component({
  selector: 'app-window',
  imports: [
    BlockEventsDirective,
    NgComponentOutlet,
    NgClass,
  ],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowComponent {
  protected readonly ActionType = ActionType;
  public readonly action = inject(WindowAction);

  protected readonly grabbed = signal(false);

  private readonly windowRect = signal(new ReadonlyRect2D(new ReadonlyVector2D(), this.action.defaultWindowSize), { equal: Rect2D.equal });
  private readonly nativeElement: HTMLElement = inject(ElementRef).nativeElement;

  public constructor() {
    effect(() => {
      const windowRect = this.windowRect();
      console.log(`Window rect changed`, windowRect.toString());
      this.nativeElement.style.left = `${windowRect.x}px`;
      this.nativeElement.style.top = `${windowRect.y}px`;
      this.nativeElement.style.width = `${windowRect.width}px`;
      this.nativeElement.style.height = `${windowRect.height}px`;
    });
  }

  protected onMouseMove($event: MouseEvent) {
    const grabbed = this.grabbed();
    if (grabbed) {
      const _windowRect = new Rect2D(this.windowRect());
      _windowRect.x = _windowRect.x + $event.movementX;
      _windowRect.y = _windowRect.y + $event.movementY;
      console.log("Updated window rect:", _windowRect.toString())
      this.windowRect.set(_windowRect);
    }
  }
}
