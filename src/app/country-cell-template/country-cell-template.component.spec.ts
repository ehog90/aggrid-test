import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCellTemplateComponent } from './country-cell-template.component';

describe('CountryCellTemplateComponent', () => {
  let component: CountryCellTemplateComponent;
  let fixture: ComponentFixture<CountryCellTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCellTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCellTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
