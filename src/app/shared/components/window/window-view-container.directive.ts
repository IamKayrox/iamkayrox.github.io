import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appWindowViewContainer]'
})
export class WindowViewContainerDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
  ) { }

}
