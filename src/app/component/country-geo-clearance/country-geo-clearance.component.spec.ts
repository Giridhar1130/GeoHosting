import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryGeoClearanceComponent } from './country-geo-clearance.component';

describe('CountryGeoClearanceComponent', () => {
  let component: CountryGeoClearanceComponent;
  let fixture: ComponentFixture<CountryGeoClearanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryGeoClearanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryGeoClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
