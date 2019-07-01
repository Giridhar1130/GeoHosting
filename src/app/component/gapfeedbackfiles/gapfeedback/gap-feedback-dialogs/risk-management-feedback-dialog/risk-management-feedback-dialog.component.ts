import { Component, OnInit, Inject } from '@angular/core';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDialogConfig, GapFeedBack, ActionItems } from '../../types/gapfeedback.type';
import { constructor } from 'q';
import { CountryGeoClearanceService } from 'src/app/component/country-geo-clearance/country-geo-clearance.service';
import { GapFeedbackService } from 'src/app/app.gapfeedback.service';

export interface ICommonsourceType {
    SourceId: string;
    Value: string;
}

@Component({
  selector: 'app-geo-risk-management-feedback-dialog',
  templateUrl: './risk-management-feedback-dialog.component.html',
  styleUrls: ['./risk-management-feedback-dialog.component.css']
})

export class RiskManagementFeedbackDialogComponent implements OnInit {
    public showSave: boolean = this.element.Submitted ? false : true;
    public title = 'Country Risk Feedback';
    public titleCountry: string = this.element.MyFields.CommonFields.Country;
    public Owner: string = this.element.MyFields.CommonFields.GeoHostingOwner;
    public Scope: string = this.element.MyFields.CommonFields.Scope;
    public Assigned: string = this.element.MyFields.CommonFields.AssignedTo;
    public Priority: string = this.element.MyFields.CommonFields.Priority;
    public country: string = this.element.MyFields.CommonFields.Country;
    public RiskLevel: string = this.element.RiskLevel;
    public FeedbackSummary: string = this.element.FeedbackSummary;
    public ActionItems: ActionItems[] = this.element.MyFields.Summary.ActionItems;
    public Details: string = this.element.MyFields.RiskManagement.RiskManagementDetails.GeneralRsikConsiderations;
    public generalRsikConsiderations: string = this.element.MyFields.RiskManagement.RiskManagementDetails.GeneralRsikConsiderations;
    public ExchangeTransferRisk: string = this.element.MyFields.RiskManagement.RiskManagementDetails.Risks === undefined ?
                                             '' : this.element.MyFields.RiskManagement.RiskManagementDetails.Risks.ExchangeTransferRisk;
    public sovereignNonPaymentRisk: string =  this.element.MyFields.RiskManagement.RiskManagementDetails.Risks === undefined ?
                                            '' : this.element.MyFields.RiskManagement.RiskManagementDetails.Risks.SovereignNonPaymentRisk;
    public SupplyChainRisk: string =  this.element.MyFields.RiskManagement.RiskManagementDetails.Risks === undefined ?
                                            '' : this.element.MyFields.RiskManagement.RiskManagementDetails.Risks.SupplyChainRisk;
    public PoliticalRisk: string = this.element.MyFields.RiskManagement.RiskManagementDetails.Insurability.PoliticalRisk;
    public LegalandRegulartoryRisk: string =  this.element.MyFields.RiskManagement.RiskManagementDetails.Risks === undefined ?
                                            '' : this.element.MyFields.RiskManagement.RiskManagementDetails.Risks.LegalandRegulartoryRisk;
    public PoliticalViolenceRisk: string = this.element.MyFields.RiskManagement.RiskManagementDetails.Risks === undefined ?
                                            '' : this.element.MyFields.RiskManagement.RiskManagementDetails.Risks.PoliticalViolenceRisk;


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
    public contactsLabel = 'Contact(s)';

    public RiskLevels: ITextArray[];

    public specificActionSites: ActionItems[] = [
        {ActionName: '', Details: '', Contact: ''}
    ];


    constructor(public dialogRef: MatDialogRef<RiskManagementFeedbackDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public element: GapFeedBack,
                private gapFeedbackService: GapFeedbackService,
                private countryGeoClearanceService: CountryGeoClearanceService) { }

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
    public onSummary(Summary: string) {
        this.Details = Summary;
    }

    public onAddSite() {
        this.specificActionSites.push({ActionName: '', Details: '', Contact: ''});
    }
       public onExchangeTransferRisk(feeTransferRiskdback: string) {
        this.ExchangeTransferRisk = feeTransferRiskdback;
    }
    public onsupplyChainRis(SupplyChainRisk: string) {
        this.SupplyChainRisk = SupplyChainRisk;
    }
    public onsovereignNonPaymentRisk(sovereignNonPaymentRisk: string) {
        this.sovereignNonPaymentRisk = sovereignNonPaymentRisk;
    }
    public onLegalandRegulartoryRisk(LegalandRegulartoryRisk: string) {
        this.LegalandRegulartoryRisk = LegalandRegulartoryRisk;
    }
    public onPoliticalRisk(PoliticalRisk: string) {
        this.PoliticalRisk = PoliticalRisk;
    }
    public onPoliticalViolenceRisk(PoliticalViolenceRisk: string) {
        this.PoliticalViolenceRisk = PoliticalViolenceRisk;
    }
    public onSave() {
        const RiskManagentForm: GapFeedBack = Object.assign(this.element, { });
        RiskManagentForm.RiskLevel = this.RiskLevel;
        RiskManagentForm.FeedbackSummary = this.FeedbackSummary;
        RiskManagentForm.MyFields.Summary.ActionItems = this.ActionItems;
        RiskManagentForm.MyFields.RiskManagement.RiskManagementDetails.GeneralRsikConsiderations = this.Details;
        RiskManagentForm.MyFields.RiskManagement.RiskManagementDetails.GeneralRsikConsiderations = this.generalRsikConsiderations;
        RiskManagentForm.MyFields.RiskManagement.RiskManagementDetails.Risks.ExchangeTransferRisk = this.ExchangeTransferRisk;
        RiskManagentForm.MyFields.RiskManagement.RiskManagementDetails.Risks.SovereignNonPaymentRisk = this.sovereignNonPaymentRisk;
        RiskManagentForm.MyFields.RiskManagement.RiskManagementDetails.Risks.SupplyChainRisk = this.SupplyChainRisk;
        RiskManagentForm.MyFields.RiskManagement.RiskManagementDetails.Insurability.PoliticalRisk = this.PoliticalRisk;
        RiskManagentForm.MyFields.RiskManagement.RiskManagementDetails.Risks.LegalandRegulartoryRisk = this.LegalandRegulartoryRisk;
        RiskManagentForm.MyFields.RiskManagement.RiskManagementDetails.Risks.PoliticalViolenceRisk = this.PoliticalViolenceRisk;

        this.gapFeedbackService.postintakeForm(RiskManagentForm).subscribe((data: GapFeedBack) => {
            if (data) {
                this.element = data;
            }
        });
    }
    public onCloseDialog() {
        this.dialogRef.close();
    }

    public onSaveandCloseDialog() {

    }
}
