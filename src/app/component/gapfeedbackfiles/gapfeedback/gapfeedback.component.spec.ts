import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GapFeedbackComponent } from './gapfeedback.component';

describe('GapFeedbackComponent', () => {
  let component: GapFeedbackComponent;
  let fixture: ComponentFixture<GapFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GapFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GapFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
