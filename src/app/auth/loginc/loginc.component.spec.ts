import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincComponent } from './loginc.component';

describe('LogincComponent', () => {
  let component: LogincComponent;
  let fixture: ComponentFixture<LogincComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogincComponent]
    });
    fixture = TestBed.createComponent(LogincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
