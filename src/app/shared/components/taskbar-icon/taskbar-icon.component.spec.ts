/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskbarIconComponent } from './taskbar-icon.component';

describe('TaskbarIconComponent', () => {
  let component: TaskbarIconComponent;
  let fixture: ComponentFixture<TaskbarIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskbarIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskbarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
