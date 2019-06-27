import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoTextareaComponent } from './geo-textarea.component';

describe('GeoTextareaComponent', () => {
  let component: GeoTextareaComponent;
  let fixture: ComponentFixture<GeoTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
