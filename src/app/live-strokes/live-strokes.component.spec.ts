import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStrokesComponent } from './live-strokes.component';

describe('LiveStrokesComponent', () => {
  let component: LiveStrokesComponent;
  let fixture: ComponentFixture<LiveStrokesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveStrokesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveStrokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
