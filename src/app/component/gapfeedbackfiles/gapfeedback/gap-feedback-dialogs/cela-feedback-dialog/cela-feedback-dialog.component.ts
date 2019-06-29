import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITextArray, ICelaFeedbackModel } from 'src/app/component/types/cela-feedbackType';


@Component({
  selector: 'geo-cela-feedback-dialog',
  templateUrl: './cela-feedback-dialog.component.html',
  styleUrls: ['./cela-feedback-dialog.component.css']
})
export class CelaFeedbackDialogComponent implements OnInit {

    public inputTitle = 'CELA DataCenter GeoClearance Risk Level:';
    public labelTextAreaSummary = 'Feedback Summary - Summarize feedback in 300 characters or less.';
    public actionItemLabel = 'Action Item';
    public CELAFeedBack: ICelaFeedbackModel = {};
    public detailsSpecific = 'Details, including specific triggers or conditions in which the action item applies';
    public contactsSummary = 'Contact(s)';
    public CPIRaitingTitle = 'CPI Rating:';
    public risk = 'Risk';
    public summary = 'summary';
    public FreedomRaitingTitle = 'Freedom Rating:';
    public checkBox = false;

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

    public specificActionSites: {actionItem: string, details: string, contacts: string}[] = [
        {actionItem: '1111', details: 'details', contacts: 'contact'},
        {actionItem: '2222', details: 'details', contacts: 'contact'},
        {actionItem: '3333', details: 'details', contacts: 'contact'}
    ];

    constructor(
        public dialogRef: MatDialogRef<CelaFeedbackDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.dialogConfig = this.data;
        this.CELAFeedBack.RiskLevel = this.riskLevels[0];
        if (this.specificActionSites === [] || this.specificActionSites === null || this.specificActionSites === undefined) {
            this.specificActionSites.push({actionItem: '', details: '', contacts: ''});
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
        this.specificActionSites.push({actionItem: '1234', details: 'qwer', contacts: 'qwer1234'});
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
