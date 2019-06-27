import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ITextArray, ICelaFeedbackModel } from 'src/app/component/types/cela-feedbackType';
import { IJsondate} from '../../gapfeedbackfiles/gapfeedback/types/gapfeedback.type'

@Component({
  selector: 'app-geo-cela-feedback-dialog',
  templateUrl: './cela-feedback-dialog.component.html',
  styleUrls: ['./cela-feedback-dialog.component.css']
})
export class CelaFeedbackComponent implements OnInit {

    public inputTitle = 'CELA DataCenter GeoClearance Risk Level:';
    public labelTextAreaSummary = 'Feedback Summary - Summarize feedback in 300 characters or less.';
    public actionItemLabel = 'Action Item';
    public CELAFeedBack: ICelaFeedbackModel = {};
    public detailsSpecific = 'Details, including specific triggers or conditions in which the action item applies';
    public contactsSummary = 'Contact(s)';
    public CPIRaitingTitle = 'CP Rating:';
    public risk = 'Risk';
    public summary = 'summary';
    public FreedomRaitingTitle = 'Freedom Rating:';
    public checkBox = false;
    summaryTableDisplayedColumns: string[] = ['ActionItem', 'Details', 'Contact'];
    public dialogConfig: {
        title: string,
        country: string,
    };

    public riskLevels: ITextArray[] = [
        {key: 'noFly', text: 'No Fly'},
        {key: 'highRisk', text: 'High Risk'},
        {key: 'mediumRisk', text: 'Medium Risk'},
        {key: 'lowRisk', text: 'Low Risk'}
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

    public specificActionSites: {ActionItem: string, Details: string, Contact: string}[] = [
    ]; // need to resetting the type
        summaryTableDataSource = new MatTableDataSource( this.specificActionSites)
    constructor(
        public dialogRef: MatDialogRef<CelaFeedbackComponent>,
        @Inject(MAT_DIALOG_DATA) public element: any) { }
        Owner: string = this.element.MyFields.CommonFields.GeoHostingOwner;
        Scope: string = this.element.Scope;
        Assigned: string = this.element.MyFields.CommonFields.AssignedTo;
        Priority: string = this.element.MyFields.CommonFields.Priority;
        country: string = this.element.Country;
        RiskLevel: string = this.element.RiskLevel;
        FeedbackSummary: string = this.element.FeedbackSummary;
        // miss the table
        CPIRating: string = this.element.MyFields.LCA.lcaDetails.CPIRating;
        // License Requirements for Terrestrial Fiber
        // License Requirements for Submarine Cables
        GNIRating: string = this.element.MyFields.LCA.lcaDetails.gni.GNIRating;
        GNISummary: string = this.element.MyFields.LCA.lcaDetails.gni.GNISummary;
        LECRisk: string = this.element.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECRisk;
        LECSummary: string = this.element.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECSummary;
        PrivacyRisk: string = this.element.MyFields.LCA.lcaDetails.privacy.PrivacyRisk;
        PrivacySummary: string = this.element.MyFields.LCA.lcaDetails.privacy.PrivacyRisk;
        DataSecurityRisk: string = this.element.MyFields.LCA.lcaDetails.dataSecurity.DataSecurityRisk;
        DataSecuritySummary: string = this.element.MyFields.LCA.lcaDetails.dataSecurity.DataSecuritySummary;
        MediaContentLiabilityRisk: string = this.element.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilityRisk;
        MediaContentLiabilitySummary: string = this.element.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilitySummary;
        TelecommunicationsRisk: string = this.element.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsRisk;
        TelecommunicationsSummary: string = this.element.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsSummary;
        PendingRisk: string = this.element.MyFields.LCA.lcaDetails.other.PendingRisk;
        DataResiReguSummary: string = this.element.MyFields.LCA.lcaDetails.other.DataResiReguSummary;
        // Data Residency Regulations

    ngOnInit() {
        console.log('child', this.element);
        this.dialogConfig = this.element;
        this.CELAFeedBack.RiskLevel = this.riskLevels[0];
        if (this.specificActionSites === [] || this.specificActionSites === null || this.specificActionSites === undefined) {
            this.specificActionSites.push({ActionItem: '', Details: '', Contact: ''});
        }
    }

    public onSummary(summary: string) {
        this.CELAFeedBack.FeedBackSummary = summary;
    }

    public onRiskLevelHandler(level: ITextArray) {
        this.CELAFeedBack.RiskLevel = level;
    }

    public onActionItemHandler(actionItem: string) {
        this.CELAFeedBack.ActionItem = actionItem;
    }

    public onAddSite() {
        const tmp: any = {
            ActionItem: '', Details: '', Contact: ''};
        this.specificActionSites.push(tmp);
        console.log(this.specificActionSites)
        this.summaryTableDataSource = new MatTableDataSource(this.specificActionSites);
    }

    public onDetailsSpecificHandler(details: string) {
        this.CELAFeedBack.Details = details;
    }

    public onContactsHandler(contacts: string) {
        this.CELAFeedBack.Contacts = contacts;
    }

    public onCPIRaintingHandler(raiting: string) {
        this.CELAFeedBack.CPIRaiting = raiting;
    }

    public onLicenseRequirements(license: string) {
        this.CELAFeedBack.LicenseReqTerFib = license;
    }

    public onSummaryLicense(summary: string) {
        this.CELAFeedBack.SummaryLicense = summary;
    }

    public onFreeRiskHandler(raiting: string) {
        this.CELAFeedBack.GlobalNetworkRisk = raiting;
    }

    public onFreedom(license: string) {
        this.CELAFeedBack.FreedomRaiting = license;
    }

    public onSummaryGlobalNet(summary: string) {
        this.CELAFeedBack.GlobalNetworkSummary = summary;
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
        this.dialogRef.close();
    }
}
