import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxFeedbackDialogComponent } from './tax-feedback-dialog.component';

describe('TaxFeedbackDialogComponent', () => {
  let component: TaxFeedbackDialogComponent;
  let fixture: ComponentFixture<TaxFeedbackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxFeedbackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
