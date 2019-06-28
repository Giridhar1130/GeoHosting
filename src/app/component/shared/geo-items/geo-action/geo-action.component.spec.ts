import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoActionComponent } from './geo-action.component';

describe('GeoActionComponent', () => {
  let component: GeoActionComponent;
  let fixture: ComponentFixture<GeoActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
