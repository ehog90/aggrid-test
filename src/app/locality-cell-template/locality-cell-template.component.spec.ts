import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityCellTemplateComponent } from './locality-cell-template.component';

describe('LocalityCellTemplateComponent', () => {
  let component: LocalityCellTemplateComponent;
  let fixture: ComponentFixture<LocalityCellTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalityCellTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalityCellTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
