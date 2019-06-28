import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ITextArray, ICelaFeedbackModel } from 'src/app/component/types/cela-feedbackType';
import { GapFeedBack, ActionItems} from '../../gapfeedbackfiles/gapfeedback/types/gapfeedback.type'
import { GapFeedbackService } from 'src/app/app.gapfeedback.service';

let specificActionSites: ActionItems[] = []; 

@Component({
  selector: 'app-geo-cela-feedback-dialog',
  templateUrl: './cela-feedback-dialog.component.html',
  styleUrls: ['./cela-feedback-dialog.component.css']
})

export class CelaFeedbackComponent implements OnInit {

    public inputTitle = 'CELA DataCenter GeoClearance Risk Level:';
    public labelTextAreaSummary = 'Feedback Summary - Summarize feedback in 300 characters or less.';
    public CELAFeedBack: ICelaFeedbackModel = {};
    public CPIRaitingTitle = 'CPI Rating:';
    public risk = 'Risk';
    public summary = 'summary';
    public FreedomRaitingTitle = 'Freedom Rating:';
    public checkBox = false;
    summaryTableDisplayedColumns: string[] = ['ActionName', 'Details', 'Contact'];
 
    public dialogConfig: GapFeedBack;

    public riskLevels: ITextArray[] = [
        {key: 'noFly', text: 'No Fly'},
        {key: 'highRisk', text: 'High'},
        {key: 'mediumRisk', text: 'Medium'},
        {key: 'lowRisk', text: 'Low'}
    ];

    public cpiRaiting: ITextArray[] = [
        {key: 'highCorrRisk', text: 'High Corruption Risk - Tier 1'},
        {key: 'medCorrRisk', text: 'Medium Corruption Risk - Tier 2'},
        {key: 'lowCorrRisk', text: 'Low Corruption Risk - Tier 3'}
    ];

    public freedomRaiting: ITextArray[] = [
        {key: 'free', text: 'Free'},
        {key: 'partlyFree', text: 'Partly Free'},
        {key: 'notFree', text: 'Not Free'},
    ];

    
    constructor(
        public dialogRef: MatDialogRef<CelaFeedbackComponent>,
        @Inject(MAT_DIALOG_DATA) public element: GapFeedBack,
        private gapfeedbackService: GapFeedbackService) { }
        Owner: number = this.element.MyFields.CommonFields.GeoHostingOwner;
        Scope: string = this.element.MyFields.CommonFields.Scope;
        Assigned: string = this.element.MyFields.CommonFields.AssignedTo;
        Priority: string = this.element.MyFields.CommonFields.Priority;
        country: string = this.element.MyFields.CommonFields.Country;
        RiskLevel: string = this.element.RiskLevel;
        FeedbackSummary: string = this.element.FeedbackSummary;
        CPIRating: string = this.element.MyFields.LCA.lcaDetails.CPIRating;
        TerrestrialRisk: string=this.element.MyFields.LCA.lcaDetails.LicenseRequirements===undefined?"":this.element.MyFields.LCA.lcaDetails.LicenseRequirements.TerrestrialRisk;
        TerrestrialSummary: string = this.element.MyFields.LCA.lcaDetails.LicenseRequirements===undefined?"":this.element.MyFields.LCA.lcaDetails.LicenseRequirements.TerrestrialSummary;
        SubmarineRisk: string = this.element.MyFields.LCA.lcaDetails.LicenseRequirements===undefined?"":this.element.MyFields.LCA.lcaDetails.LicenseRequirements.SubmarineRisk;
        SubmarineSummary: string = this.element.MyFields.LCA.lcaDetails.LicenseRequirements===undefined?"":this.element.MyFields.LCA.lcaDetails.LicenseRequirements.SubmarineSummary;
        GNIRating: string = this.element.MyFields.LCA.lcaDetails.gni.GNIRating;
        GNISummary: string = this.element.MyFields.LCA.lcaDetails.gni.GNISummary;
        LECRisk: string = this.element.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECRisk;
        LECSummary: string = this.element.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECSummary;
        PrivacyRisk: string = this.element.MyFields.LCA.lcaDetails.privacy.PrivacyRisk;
        PrivacySummary: string = this.element.MyFields.LCA.lcaDetails.privacy.PrivacySummary;
        DataSecurityRisk: string = this.element.MyFields.LCA.lcaDetails.dataSecurity.DataSecurityRisk;
        DataSecuritySummary: string = this.element.MyFields.LCA.lcaDetails.dataSecurity.DataSecuritySummary;
        MediaContentLiabilityRisk: string = this.element.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilityRisk;
        MediaContentLiabilitySummary: string = this.element.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilitySummary;
        TelecommunicationsRisk: string = this.element.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsRisk;
        TelecommunicationsSummary: string = this.element.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsSummary;
        PendingRisk: string = this.element.MyFields.LCA.lcaDetails.other.PendingRisk;
        PendingSummary: string = this.element.MyFields.LCA.lcaDetails.other.PendingLawRegulations;
        DataResiReguSummary: string = this.element.MyFields.LCA.lcaDetails.other.DataResiReguSummary;
        DataResiReguRisk: string = this.element.MyFields.LCA.lcaDetails.other.DataResidencyRegulation;  
        ActionItems: ActionItems[];
        summaryTableDataSource = new MatTableDataSource(specificActionSites);

    ngOnInit() {
        console.log('child', this.element,specificActionSites === [], specificActionSites);
        this.dialogConfig = this.element;
        this.CELAFeedBack.RiskLevel = this.riskLevels[0];
        // specificActionSites = specificActionSites
        // .concat(this.element.MyFields.Section3details.group9.InProgressSitesGroup);
        this.summaryTableDataSource = new MatTableDataSource(specificActionSites);

        if (specificActionSites.length<1) {
            specificActionSites.push({ActionName: '', Details: '', Contact: ''});
            console.log('test',specificActionSites)
            this.summaryTableDataSource = new MatTableDataSource(specificActionSites);
        }
    }

    public onSummary(summary: string) {
        this.FeedbackSummary = summary;
    }

    public onRiskLevelHandler(level: string) {
        this.RiskLevel = level;
    }

    public onActionItemHandler(actionItem: string) {
        this.CELAFeedBack.ActionItem = actionItem;
    }

    public addonCurrentportfoliosite(ev) {
        ev.preventDefault();  
        // specificActionSites = this.summaryTableDataSource.filteredData;
        const tmp: ActionItems = {
            ActionName: '', Details: '', Contact: ''}; 
            debugger; 
            specificActionSites.push(tmp);  
            debugger;
        this.summaryTableDataSource = new MatTableDataSource(specificActionSites);
        console.log(this.summaryTableDataSource)  
    }

    public onDetailsSpecificHandler(details: string) {
        this.CELAFeedBack.Details = details;
    }

    public onContactsHandler(contacts: string) {
        this.CELAFeedBack.Contacts = contacts;
    }

    public onCPIRaintingHandler(raiting: string) {
        this.CPIRating = raiting;
    }
    public onTerrestrialRisk(raiting: string) {
        this.TerrestrialRisk = raiting;
    }
    public onTerrestrialSummary(summary: string) {
        this.TerrestrialSummary = summary;
    }
    public onSubmarineRisk(raiting: string) {
        this.SubmarineRisk = raiting;
    }

    public onSubmarineSummary(summary: string) {
        this.SubmarineSummary = summary;
    }
    public onGNIRisk(raiting: string) {
        this.GNIRating = raiting;
    }

    public onGNISummary(summary: string) {
        this.GNISummary = summary;
    }
    public onLECRisk(raiting: string) {
        this.LECRisk = raiting;
    }

    public onLECSummary(summary: string) {
        this.LECSummary = summary;
    }
    public onPrivacyRisk(raiting: string) {
        this.PrivacyRisk = raiting;
    }

    public onPrivacySummary(summary: string) {
        this.PrivacySummary = summary;
    }
    public onDataSecurityRisk(raiting: string) {
        this.DataSecurityRisk = raiting;
    }

    public onDataSecuritySummary(summary: string) {
        this.DataSecuritySummary = summary;
    }
    public onMediaContentLiabilityRisk(raiting: string) {
        this.MediaContentLiabilityRisk = raiting;
    }

    public onMediaContentLiabilitySummary(summary: string) {
        this.MediaContentLiabilitySummary = summary;
    }
    public onTelecommunicationsRisk(raiting: string) {
        this.TelecommunicationsRisk = raiting;
    }

    public onTelecommunicationsSummary(summary: string) {
        this.TelecommunicationsSummary = summary;
    }
    public onPendingRisk(raiting: string) {
        this.PendingRisk = raiting;
    }

    public onPendingSummary(summary: string) {
        this.PendingSummary = summary;
    }
    public onDataResiReguRisk(raiting: string) {
        this.DataResiReguRisk = raiting;
    }

    public onDataResiReguSummary(summary: string) {
        this.DataResiReguSummary = summary;
    }


    // to do, simplify handling
    public onFormHandler(data: string, fieldName: string) {
        const item = `{"${fieldName}": "${data}"}`.toString();
        const parsed: ICelaFeedbackModel = JSON.parse(item);
        console.log(parsed);
        this.CELAFeedBack = parsed;
        console.log(this.CELAFeedBack);
    }

    public onCloseDialog() {
        const CELAFeedBackForm: GapFeedBack = Object.assign(this.element,{})
        CELAFeedBackForm.MyFields.LCA.lcaDetails.CPIRating=this.CPIRating
        CELAFeedBackForm.MyFields.LCA.lcaDetails.LicenseRequirements = {TerrestrialRisk:this.TerrestrialRisk,TerrestrialSummary:this.TerrestrialSummary,SubmarineRisk:this.SubmarineRisk,SubmarineSummary:this.SubmarineSummary}
        CELAFeedBackForm.MyFields.LCA.lcaDetails.gni.GNIRating= this.GNIRating
        CELAFeedBackForm.MyFields.LCA.lcaDetails.gni.GNISummary= this.GNISummary
        CELAFeedBackForm.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECRisk= this.LECRisk
        CELAFeedBackForm.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECSummary= this.LECSummary
        CELAFeedBackForm.MyFields.LCA.lcaDetails.privacy.PrivacyRisk= this.PrivacyRisk
        CELAFeedBackForm.MyFields.LCA.lcaDetails.dataSecurity.DataSecurityRisk= this.DataSecurityRisk
        CELAFeedBackForm.MyFields.LCA.lcaDetails.dataSecurity.DataSecuritySummary= this.DataSecuritySummary
        CELAFeedBackForm.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilityRisk= this.MediaContentLiabilityRisk
        CELAFeedBackForm.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilitySummary= this.MediaContentLiabilitySummary
        CELAFeedBackForm.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsRisk= this.TelecommunicationsRisk
        CELAFeedBackForm.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsSummary= this.TelecommunicationsSummary
        CELAFeedBackForm.MyFields.LCA.lcaDetails.other.PendingRisk= this.PendingRisk
        CELAFeedBackForm.MyFields.LCA.lcaDetails.other.PendingLawRegulations= this.PendingSummary
        CELAFeedBackForm.MyFields.LCA.lcaDetails.other.DataResiReguSummary= this.DataResiReguSummary
        CELAFeedBackForm.MyFields.LCA.lcaDetails.other.DataResidencyRegulation= this.DataResiReguRisk
        CELAFeedBackForm.MyFields.Summary.ActionItems=this.ActionItems;
        console.log(CELAFeedBackForm);
        this.gapfeedbackService.postintakeForm(CELAFeedBackForm).subscribe((callbackfromgetAPI: any[]) => {
        console.log('callbackfromgetAPI', callbackfromgetAPI);
        });
        this.dialogRef.close();
    }
}
