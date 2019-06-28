import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMatDatepickerComponent } from './geo-mat-datepicker.component';

describe('GeoMatDatepickerComponent', () => {
  let component: GeoMatDatepickerComponent;
  let fixture: ComponentFixture<GeoMatDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoMatDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoMatDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
