import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelaFeedbackComponent } from './cela-feedback-dialog.component';

describe('CelaFeedbackComponent', () => {
  let component: CelaFeedbackComponent;
  let fixture: ComponentFixture<CelaFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelaFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelaFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
