import { Directive, effect, ElementRef, inject, input, OnDestroy } from '@angular/core';
import { HTMLEvent } from '../models/common.model';

@Directive({
  selector: '[appBlockEvents]',
})
export class BlockEventsDirective implements OnDestroy {
  public events = input.required<HTMLEvent | HTMLEvent[]>({ alias: 'appBlockEvents' });
  public enabled = input(true);

  private _oldEvents: HTMLEvent[] = [];
  private _nativeElement: HTMLElement = inject(ElementRef).nativeElement;

  public constructor() {
    effect(() => {
      const events = this.events();
      this._removeEvents(this._oldEvents);
      if (typeof events === 'string') {
        this._oldEvents = [ events ];
        this._addEvents([ events ]);
      } else {
        this._oldEvents = [ ...events ];
        this._addEvents(events);
      }
    })
  }

  public ngOnDestroy(): void {
    this._removeEvents(this._oldEvents);
  }

  private _addEvents(events: HTMLEvent[]) {
    for(const event of events) {
      this._nativeElement.addEventListener(event, this._eventListenerRef);
    }
  }

  private _removeEvents(events: HTMLEvent[]) {
    for(const event of events) {
      this._nativeElement.removeEventListener(event, this._eventListenerRef);
    }
  }

  private _eventListener($event: Event) {
    if ($event.cancelable && this.enabled()) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  private readonly _eventListenerRef = this._eventListener.bind(this);
}
