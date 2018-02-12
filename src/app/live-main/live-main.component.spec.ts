import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMainComponent } from './live-main.component';

describe('LiveMainComponent', () => {
  let component: LiveMainComponent;
  let fixture: ComponentFixture<LiveMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
