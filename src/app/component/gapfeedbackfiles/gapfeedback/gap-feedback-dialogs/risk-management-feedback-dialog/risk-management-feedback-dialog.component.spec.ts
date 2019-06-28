import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskManagementFeedbackDialogComponent } from './risk-management-feedback-dialog.component';

describe('RiskManagementFeedbackDialogComponent', () => {
  let component: RiskManagementFeedbackDialogComponent;
  let fixture: ComponentFixture<RiskManagementFeedbackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskManagementFeedbackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskManagementFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
