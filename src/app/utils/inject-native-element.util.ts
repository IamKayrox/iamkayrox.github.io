import { ElementRef, inject } from "@angular/core";

export function injectNativeElement<T extends HTMLElement = HTMLElement>(): T {
  return inject(ElementRef).nativeElement;
}