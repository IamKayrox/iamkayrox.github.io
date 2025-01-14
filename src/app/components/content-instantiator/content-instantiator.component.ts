import { ChangeDetectionStrategy, Component, effect, inject, input, Type, untracked, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-content-instantiator',
  imports: [],
  template: "",
  styleUrl: './content-instantiator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentInstantiatorComponent {
  public action = input.required<Type<unknown>>();
  private _viewContainerRef = inject(ViewContainerRef);

  public constructor () {
    effect(() => {
      const action = this.action();
      untracked(() => {
        this._viewContainerRef.clear();
        this._viewContainerRef.createComponent(action);
      })
    })
  }
}
