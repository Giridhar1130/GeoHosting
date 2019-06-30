import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  GapFeedBack, ActionItems } from '../../types/gapfeedback.type';
import { GapFeedbackService } from 'src/app/app.gapfeedback.service';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';
import { CountryGeoClearanceService } from '../../../../country-geo-clearance/country-geo-clearance.service';
@Component({
    selector: 'geo-tax-feedback-dialog',
    templateUrl: './tax-feedback-dialog.component.html',
    styleUrls: ['./tax-feedback-dialog.component.css']
  })

export class TaxFeedbackDialogComponent implements OnInit {

    public showSave: boolean = this.element.Submitted ? false : true;
    public title = 'Tax Feedback';
    public titleCountry: string = this.element.MyFields.CommonFields.Country;
    public Owner: number = this.element.MyFields.CommonFields.GeoHostingOwner;
    public Scope: string = this.element.MyFields.CommonFields.Scope;
    public Assigned: string = this.element.MyFields.CommonFields.AssignedTo;
    public Priority: string = this.element.MyFields.CommonFields.Priority;
    public country: string = this.element.MyFields.CommonFields.Country;
    public RiskLevel: string = this.element.RiskLevel;
    public FeedbackSummary: string = this.element.FeedbackSummary;
    public ActionItems: ActionItems[] = [];
    public legalEntity: string = this.element.MyFields.Tax.LegalEntity;
    public restrictionsOnLocations: string = this.element.MyFields.Tax.RestrictionsOnLocations;
    public localTaxContactName: string = this.element.MyFields.Tax.LocalTaxContact === undefined ? '' :
    this.element.MyFields.Tax.LocalTaxContact.DisplayName;
    public restrictionOrTaxConsideration = this.element.MyFields.Tax.RestrictionOrTaxConsideration;

    public labelPosition = 'after';
    public stateDepartmentTravelAdvisoryLevelCheckBox = 'Yes';
    public summaryCountryRiskLevel = 'Country Risk Level';
    public feedbackSummaryLabel = 'Feedback Summary';
    public specificActionTooltip = 'Details, including specific triggers or conditions in which the action item applies';
    public generalRiskConsiderationsLabel = 'General Risk Considerations';
    public actionItemLabel = 'Action Item';
    public detailsSpecificLabel = 'Details';
    public exchangeTransferRiskLabel =  'Exchange Transfer Risk';
    public supplyChainRiskLabel = 'Supply Chain Risk';
    public sovereignNonPaymentRiskLabel = 'Sovereign Non-Payment Risk';
    public legalAndRegulatoryRiskLabel = 'Legal and Regulatory Risk';
    public politicalInterferenceRiskLabel = 'Political Interference Risk';
    public politicalViolenceRiskLabel = 'Political Violence Risk';
    public regionalTaxcontactLabel = 'Regional Tax contact';
    public otherRestriction = 'Are there any other restrictions or tax considerations in this country/region?';
    public legalEntityLabel = 'What Legal Entity should be used for a Network Site, an Off-network Site or other Backbone infrastructure?';
    public restrictionsonlocations = 'Restrictions on locations these sites can serve, services that may be hosted, other?';
    public RiskLevels: ITextArray[];



    public specificActionSites: {actionItem: string, details: string, contacts: string}[] = [
        {actionItem: '', details: '', contacts: ''}
    ];

    public tempRiskModel: any = {
        prop1: true,
        tempString: 'tempstr'
    }

    constructor(private dialogRef: MatDialogRef<TaxFeedbackDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public element: GapFeedBack,
                private gapFeedbackService: GapFeedbackService,
                private countryGeoClearanceService: CountryGeoClearanceService
                ) { }

    ngOnInit() {
    // Risk
    this.countryGeoClearanceService.getCommonSourceList(0)
      .subscribe((data) => {
        this.RiskLevels = data[0].sourceItems;
      });
    }

    public onRiskLevel(risk: string) {
        this.RiskLevel = risk;
    }

    public onFeedbackSummary(feedback: string) {
        this.FeedbackSummary = feedback;
    }
    public onlegalEntityLabel(legalEntityLabel: string) {
        this.legalEntityLabel = legalEntityLabel;
    }
    public onrestrictionsonlocations(restrictionsonlocations: string) {
        this.restrictionsonlocations = restrictionsonlocations;
    }
    public onregionalTaxcontactLabel(regionalTaxcontactLabel: string) {
        this.localTaxContactName = regionalTaxcontactLabel;
    }
    public onotherRestriction(otherRestriction: string) {
        this.restrictionOrTaxConsideration = otherRestriction;
    }
 

    public onAddSite() {

        this.specificActionSites.push({actionItem: '', details: '', contacts: ''});
    }

    public onSaveandCloseDialog() {

    }
    public onSave() {
        const TaxForm: GapFeedBack = Object.assign(this.element, { });
        TaxForm.RiskLevel = this.RiskLevel;
        TaxForm.FeedbackSummary = this.FeedbackSummary;
        TaxForm.MyFields.Summary.ActionItems = this.ActionItems;
        TaxForm.MyFields.Tax.LegalEntity = this.legalEntity;
        TaxForm.MyFields.Tax.RestrictionsOnLocations = this.restrictionsOnLocations;
        TaxForm.MyFields.Tax.LocalTaxContact = {DisplayName: this.localTaxContactName, AccountId: '', AccountType: ''};
        TaxForm.MyFields.Tax.RestrictionOrTaxConsideration = this.restrictionOrTaxConsideration;

        this.gapFeedbackService.postintakeForm(TaxForm).subscribe((data: GapFeedBack) => {
            if (data) {
                this.element = data;
            }
        });
    }
    public onCloseDialog() {
        this.dialogRef.close();
    }
}
// 
// .

// public RiskLevel: string = this.element.RiskLevel;
// public FeedbackSummary: string = this.element.FeedbackSummary;
// public ActionItems: ActionItems[] = [];
// public Details: string = this.element.MyFields.RiskManagement.RiskManagementDetails.GeneralRsikConsiderations;
// public legalEntity: string = this.element.MyFields.Tax.LegalEntity;
// public restrictionsOnLocations: string = this.element.MyFields.Tax.RestrictionsOnLocations;
// public localTaxContactName: string = this.element.MyFields.Tax.LocalTaxContact === undefined ? '' :
// this.element.MyFields.Tax.LocalTaxContact.DisplayName;
// public restrictionOrTaxConsideration = this.element.MyFields.Tax.RestrictionOrTaxConsideration;