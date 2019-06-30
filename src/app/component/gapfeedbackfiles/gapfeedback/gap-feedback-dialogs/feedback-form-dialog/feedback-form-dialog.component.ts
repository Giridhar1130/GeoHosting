import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { GapFeedBack } from '../../types/gapfeedback.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';
import { Data } from '@angular/router';
import {GapFeedbackService} from '../../../../../app.gapfeedback.service';
import { CountryGeoClearanceService } from 'src/app/component/country-geo-clearance/country-geo-clearance.service';

@Component({
    selector: 'app-geo-feedback-form-dialog',
    templateUrl: './feedback-form-dialog.component.html',
    styleUrls: ['./feedback-form-dialog.component.css']
})
export class FeedbackFormDialogComponent implements OnInit {

    public actionButtonText = 'Save';


    public TaskStatus: ITextArray[] ;
    public TeamNames: ITextArray[] ;
    public SaveSuccessful = false;
    public RiskSelected: string;
    public TeamName: string;
    public DueDateSelected;
    public CompletedDateSelected;
    public title = 'Feedback Tasks';
    constructor(private FeedBackFormFunction: MatDialogRef<FeedbackFormDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public element: GapFeedBack,
                private gapFeedbackService: GapFeedbackService,
                private countryGeoClearanceService: CountryGeoClearanceService) {

    }
    ngOnInit() {
        this.countryGeoClearanceService.getCommonSourceList(7)
        .subscribe((data) => {
        this.TaskStatus = data[0].sourceItems;
        });
        this.countryGeoClearanceService.getCommonSourceList(8)
        .subscribe((data) => {
        this.TeamNames = data[0].sourceItems;
        });
    }

    public onSubmit(ev) {


        this.element.TaskStatus = this.RiskSelected;
        this.element.CompletedDate = this.CompletedDateSelected;
        this.element.AssignedTo = ev.path[0][0].value;
        // duedate require
        this.element.MyFields.CommonFields.Priority = ev.path[0][5].value;
        this.element.MyFields.CommonFields.Scope = ev.path[0][6].value;
        this.element.MyFields.CommonFields.GeoHostingOwner = ev.path[0][7].value;
        this.element.MyFields.CommonFields.Country = ev.path[0][8].value;
        this.element.TeamName =  this.TeamName;
        this.element.WorkflowVersion = ev.path[0][9].value;
        this.element.DataCenterRiskLevel =  ev.path[0][10].value;
        this.element.NetworkRiskLevel =  ev.path[0][11].value;

        console.log(this.element);
        this.gapFeedbackService.postintakeForm(this.element).subscribe((callbackfromgetAPI: GapFeedBack) => {
            if (callbackfromgetAPI) {
                this.element = callbackfromgetAPI;
                this.SaveSuccessful = true;
            }
          });
    }
    public onPhysicalSecurityRiskLevelHandler(risk: string): void {
        console.log(risk);

    }
    public onCompletedDate(data: Data): void {
        this.CompletedDateSelected = data;

    }
    public onTeamHandler(teamname: string): void {
        this.TeamName = teamname;
    }
    public onDueDate(data: Data) {
        this.DueDateSelected = data;
    }
    public onCloseDialog() {
        if (this.SaveSuccessful) {
            setTimeout(() => this.FeedBackFormFunction.close(this.element), 100);
        } else {
            setTimeout(() => this.FeedBackFormFunction.close(), 100);
        }
    }

}
