import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoPhysicalSecurityFeedbackComponent } from './geo-physical-security-feedback.component';

describe('GeoPhysicalSecurityFeedbackComponent', () => {
  let component: GeoPhysicalSecurityFeedbackComponent;
  let fixture: ComponentFixture<GeoPhysicalSecurityFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoPhysicalSecurityFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoPhysicalSecurityFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
