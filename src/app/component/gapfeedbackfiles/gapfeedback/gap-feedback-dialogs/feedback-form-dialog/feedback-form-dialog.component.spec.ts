import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFormDialogComponent } from './feedback-form-dialog.component';

describe('FeedbackFormDialogComponent', () => {
  let component: FeedbackFormDialogComponent;
  let fixture: ComponentFixture<FeedbackFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
