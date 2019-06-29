import { Component, OnInit, Inject } from '@angular/core';
import { GapFeedBack } from '../../types/gapfeedback.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';

@Component({
    selector: 'geo-feedback-form-dialog',
    templateUrl: './feedback-form-dialog.component.html',
    styleUrls: ['./feedback-form-dialog.component.css']
})
export class FeedbackFormDialogComponent implements OnInit {


    public actionButtonText = 'Save';


    // labels for form
    // public taskNameLabel = 'Task Name:';
    // public raskSatusLabel = 'Task Status:';

    public RiskLevels: ITextArray[] = [
        { key: 'feedbackpeding', text: 'Feedback Peding' },
        { key: 'geohostingreview', text: 'GeoHosting Review' },
        { key: 'completed', text: 'Completed' },
        { key: 'nofeedbackprovided', text: 'No Feedback Provided' },
        { key: 'notkickedoff', text: 'Not Kicked Off' }
    ];

    // temp data
    public RiskSelected: string;
    public title = 'Feedback Tasks'
    constructor(private countryIntakeDialog: MatDialogRef<FeedbackFormDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public element: GapFeedBack) {

    }
    ngOnInit() {
    }

    public onSubmit(ev) {

        this.element.MyFields.TaskName=ev.path[0][0].value;
        this.element.TaskStatus=this.RiskSelected;

        console.log('submit', ev,this.element,ev.path[0][4].value,typeof ev.path[0][4].value)
    }
    public onPhysicalSecurityRiskLevelHandler(risk: string): void{
        console.log(risk)

    }
    public onCompletedDate(risk: string): void{
        console.log(risk)

    }

    public onBirthdayofDate(data){
        console.log(data,typeof data)
    }
    public onCloseDialog(){
        console.log('close')
    }


    close(event: MouseEvent): void {
    setTimeout(() => this.countryIntakeDialog.close(), 100);
      }
    }
