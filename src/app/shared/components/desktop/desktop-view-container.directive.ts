import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDesktopViewContainer]'
})
export class DesktopViewContainerDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
  ) { }

}
