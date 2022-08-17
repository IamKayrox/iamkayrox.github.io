import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDesktopView], [appWindowView]'
})
export class ContainerViewDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
  ) { }

}
