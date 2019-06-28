import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMatTextareaComponent } from './geo-mat-textarea.component';

describe('GeoMatTextareaComponent', () => {
  let component: GeoMatTextareaComponent;
  let fixture: ComponentFixture<GeoMatTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoMatTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoMatTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
