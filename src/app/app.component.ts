import { Component, inject, Injector, signal } from '@angular/core';
import { TEST_ACTION } from './components/test/test.action';
import { WindowComponent } from './components/window/window.component';
import { WindowAction } from './constants/action.constants';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    NgComponentOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _injector = inject(Injector);
  protected readonly TEST_ACTION = TEST_ACTION;
  protected readonly WindowsComponent = WindowComponent;
  protected readonly windows = signal<Injector[]>([
    Injector.create({
      providers: [
        {
          provide: WindowAction,
          useValue: TEST_ACTION,
        }
      ],
      parent: this._injector,
    })
  ]);

}
