import { Component, OnInit, Inject } from '@angular/core';
import { IDialogConfig } from '../../types/gapfeedback.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';

@Component({
  selector: 'geo-feedback-form-dialog',
  templateUrl: './feedback-form-dialog.component.html',
  styleUrls: ['./feedback-form-dialog.component.css']
})
export class FeedbackFormDialogComponent implements OnInit {

    public dialogConfig: IDialogConfig;
    public actionButtonText = "Save";
    public showvalue = "Test Input Value";
    
    // labels for form
    public taskNameLabel = 'Task Name:';
    public raskSatusLabel = 'Task Status:';

    public riskLevels: ITextArray[] = [
        {key: 'noFly', text: 'No Fly'},
        {key: 'highRisk', text: 'High Risk'},
        {key: 'mediumRisk', text: 'Medium Risk'},
        {key: 'lowRisk', text: 'Low Risk'}
    ];

    // temp data
    public tempDate = new Date('2222-12-17T11:11:11');

    constructor(public dialogRef: MatDialogRef<FeedbackFormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialogConfig = this.data;
    }
    ngOnInit() {
    }

    public onDateHandler(value: any) {
    }
  
}
