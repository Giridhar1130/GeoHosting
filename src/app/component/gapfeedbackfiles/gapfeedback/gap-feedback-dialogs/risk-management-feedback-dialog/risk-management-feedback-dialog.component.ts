import { Component, OnInit, Inject } from '@angular/core';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDialogConfig } from '../../types/gapfeedback.type';
import { constructor } from 'q';

@Component({
  selector: 'geo-risk-management-feedback-dialog',
  templateUrl: './risk-management-feedback-dialog.component.html',
  styleUrls: ['./risk-management-feedback-dialog.component.css']
})
export class RiskManagementFeedbackDialogComponent implements OnInit {

    public dialogConfig: IDialogConfig;
    
    public labelPosition = 'after';
    public stateDepartmentTravelAdvisoryLevelCheckBox = "Yes";

    public summaryCountryRiskLevel = 'Country Risk Level:';
    public feedbackSummaryLabel = 'Feedback Summary';
    public specificActionTooltip = 'Details, including specific triggers or conditions in which the action item applies';
    public generalRiskConsiderationsLabel = "General Risk Considerations";
    public actionItemLabel = 'Action Item';
    public detailsSpecificLabel = 'Details';
    
    public exchangeTransferRiskLabel =  'Exchange Transfer Risk:';
    public supplyChainRiskLabel = 'Supply Chain Risk:';
    public sovereignNonPaymentRiskLabel = 'Sovereign Non-Payment Risk:';
    public legalAndRegulatoryRiskLabel = 'Legal and Regulatory Risk:';
    public politicalInterferenceRiskLabel = 'Political Interference Risk:';
    public politicalViolenceRiskLabel = 'Political Violence Risk:';

    // public Label = 
    // public Label = 
    // public Label = 
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

    public tempRiskModel: any = {
        prop1: true, 
        tempString: "tempstr"
    }

    constructor(public dialogRef: MatDialogRef<RiskManagementFeedbackDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
