import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIconViewContainer]'
})
export class AppIconViewContainerDirective {

  constructor(
    public viewContainer: ViewContainerRef,
  ) { }

}
