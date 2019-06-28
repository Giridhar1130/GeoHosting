import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelaFeedbackDialogComponent } from './cela-feedback-dialog.component';

describe('CelaFeedbackComponent', () => {
  let component: CelaFeedbackDialogComponent;
  let fixture: ComponentFixture<CelaFeedbackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelaFeedbackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelaFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
