import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceCellTemplateComponent } from './distance-cell-template.component';

describe('DistanceCellTemplateComponent', () => {
  let component: DistanceCellTemplateComponent;
  let fixture: ComponentFixture<DistanceCellTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceCellTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceCellTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
