import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMatInputComponent } from './geo-mat-input.component';

describe('GeoMatInputComponent', () => {
  let component: GeoMatInputComponent;
  let fixture: ComponentFixture<GeoMatInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoMatInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoMatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
