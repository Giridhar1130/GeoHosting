import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';
import { IDialogConfig } from '../../types/gapfeedback.type';

@Component({
  templateUrl: './geo-physical-security-feedback.component.html',
  styleUrls: ['./geo-physical-security-feedback.component.css']
})
export class GeoPhysicalSecurityFeedbackComponent implements OnInit {

    public dialogConfig: IDialogConfig;
    public labelPosition = 'after';
    public stateDepartmentTravelAdvisoryLevelCheckBox = "Yes";

    public summaryRiskLevel = 'Physical Security Risk Level:';
    public feedbackSummaryLabel = "Feedback Summary - Summarize feedback in 300 characters or less."
    public securityDetailsAndInquiriesLabel = "Security Details and Inquiries"
    public physicalSecurityRiskLevelDefinitionLabel = "Physical Security Risk Level Definition";
    public specificActionLabel = 'Are there any country-specific Action Items or Next Steps?';
    public actionItemScpecificSummaryInputLabel = 'Action Item';
    public detailsSpecificSummaryTextareaSummaryLabel = 'Details';
    public matSpecificSummaryTextAreaTooltip = 'Details, including specific triggers or conditions in which the action item applies';
    public contactsSpecificSummaryLabel = 'Contact(s)';
    public physicalSecurityRiskLevelLabel = "Physical Security Risk Level Definition";
    public applicableBaselineSecurityRequirementsLabel = "Applicable Baseline Security Requirements";
    public physicalSecurityPointofContactLabel = "Physical Security Point of Contact";
    // public Label = 
    // public Label = 
    // public Label = 
    // public Label = 
    // public Label = 

    public riskLevels: ITextArray[] = [
        {key: 'noFly', text: 'No Fly'},
        {key: 'highRisk', text: 'High Risk'},
        {key: 'mediumRisk', text: 'Medium Risk'},
        {key: 'lowRisk', text: 'Low Risk'}
    ];

    public specificActionSites: {actionItem: string, details: string, contacts: string}[] = [
        {actionItem: '1111', details: 'details', contacts: 'contact'},
        {actionItem: '2222', details: 'details', contacts: 'contact'},
        {actionItem: '3333', details: 'details', contacts: 'contact'}
    ];


 constructor(public dialogRef: MatDialogRef<GeoPhysicalSecurityFeedbackComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialogConfig = this.data;
    }

    ngOnInit() {
    }

    public onPhysicalSecurityRiskLevelHandler(risk: string){

    }

    public onFeedbackSummaryHandler(feedback: string){
        
    }

    public onAddSite(){
        this.specificActionSites.push({actionItem: '1234', details: 'qwer',contacts: 'qwer1234'});
    }

    public onCloseDialog() {
        this.dialogRef.close();
    }  
}
