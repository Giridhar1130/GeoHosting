import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMatDropdownComponent } from './geo-mat-dropdown.component';

describe('GeoMatDropdownComponent', () => {
  let component: GeoMatDropdownComponent;
  let fixture: ComponentFixture<GeoMatDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoMatDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoMatDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
