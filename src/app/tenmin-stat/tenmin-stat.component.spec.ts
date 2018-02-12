import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenminStatComponent } from './tenmin-stat.component';

describe('TenminStatComponent', () => {
  let component: TenminStatComponent;
  let fixture: ComponentFixture<TenminStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenminStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenminStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
