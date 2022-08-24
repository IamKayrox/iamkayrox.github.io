import { Component, Inject, OnInit, Optional } from '@angular/core';
import { __WINDOW__HANDLE__ } from 'src/app/shared/models/symbols';
import { DesktopService } from 'src/app/shared/services/desktop.service';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-error-test',
  templateUrl: './error-test.component.html',
  styleUrls: ['./error-test.component.scss'],
  imports: [
    MatButtonModule,
  ],
  standalone: true,
})
export class ErrorTestComponent implements OnInit {

  constructor(
    private desktop: DesktopService,
    @Inject(__WINDOW__HANDLE__) private handle: symbol,
  ) { }

  ngOnInit() {
  }

  closeThis() {
    this.desktop.closeWindow(this.handle);
  }

}
