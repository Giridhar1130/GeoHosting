import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ITextArray, ICelaFeedbackModel } from 'src/app/component/types/cela-feedbackType';
import { GapFeedBack, ActionItems} from '../../gapfeedbackfiles/gapfeedback/types/gapfeedback.type';
import { GapFeedbackService } from 'src/app/app.gapfeedback.service';
import { CountryGeoClearanceService } from '../../country-geo-clearance/country-geo-clearance.service';



@Component({
  selector: 'app-geo-cela-feedback-dialog',
  templateUrl: './cela-feedback-dialog.component.html',
  styleUrls: ['./cela-feedback-dialog.component.css']
})

export class CelaFeedbackComponent implements OnInit {
    public showSave: boolean = this.gapFeedbackDataItem.Submitted ? false : true;
    public inputTitle = 'CELA DataCenter GeoClearance Risk Level:';
    public labelTextAreaSummary = 'Feedback Summary - Summarize feedback in 300 characters or less.';
    public CELAFeedBack: ICelaFeedbackModel = {};
    public CPIRaitingTitle = 'CPI Rating:';
    public risk = 'Risk';
    public summary = 'summary';
    public FreedomRaitingTitle = 'Freedom Rating:';
    public checkBox = false;
    public summaryTableDisplayedColumns: string[] = ['ActionName', 'Details', 'Contact'];
    public dialogConfig: GapFeedBack;

    public riskLevels: ITextArray[];

    public cpiRaiting: ITextArray[] ;

    public freedomRaiting: ITextArray[];
    constructor(
        public dialogRef: MatDialogRef<CelaFeedbackComponent>,
        @Inject(MAT_DIALOG_DATA) public gapFeedbackDataItem: GapFeedBack,
        private gapfeedbackService: GapFeedbackService,
        private countryGeoClearanceService: CountryGeoClearanceService) { }
        public Owner: string = this.gapFeedbackDataItem.MyFields.CommonFields.GeoHostingOwner;
        public Scope: string = this.gapFeedbackDataItem.MyFields.CommonFields.Scope;
        public Assigned: string = this.gapFeedbackDataItem.MyFields.CommonFields.AssignedTo;
        public Priority: string = this.gapFeedbackDataItem.MyFields.CommonFields.Priority;
        public country: string = this.gapFeedbackDataItem.MyFields.CommonFields.Country;
        public RiskLevel: string = this.gapFeedbackDataItem.RiskLevel;
        public FeedbackSummary: string = this.gapFeedbackDataItem.FeedbackSummary;
        public CPIRating: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.CPIRating;
        public TerrestrialRisk: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.LicenseRequirements === undefined ?
        '' : this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.LicenseRequirements.TerrestrialRisk;
        public TerrestrialSummary: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.LicenseRequirements === undefined ?
        '' : this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.LicenseRequirements.TerrestrialSummary;
        public SubmarineRisk: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.LicenseRequirements === undefined ?
        '' : this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.LicenseRequirements.SubmarineRisk;
        public SubmarineSummary: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.LicenseRequirements === undefined ?
        '' : this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.LicenseRequirements.SubmarineSummary;
        public GNIRating: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.gni.GNIRating;
        public GNISummary: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.gni.GNISummary;
        public LECRisk: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECRisk;
        public LECSummary: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECSummary;
        public PrivacyRisk: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.privacy.PrivacyRisk;
        public PrivacySummary: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.privacy.PrivacySummary;
        public DataSecurityRisk: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.dataSecurity.DataSecurityRisk;
        public DataSecuritySummary: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.dataSecurity.DataSecuritySummary;
        public MediaContentLiabilityRisk: string =
        this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilityRisk;
        public MediaContentLiabilitySummary: string =
         this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilitySummary;
        public TelecommunicationsRisk: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsRisk;
        public TelecommunicationsSummary: string =
         this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsSummary;
        public PendingRisk: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.other.PendingRisk;
        public PendingSummary: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.other.PendingLawRegulations;
        public DataResiReguSummary: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.other.DataResiReguSummary;
        public DataResiReguRisk: string = this.gapFeedbackDataItem.MyFields.LCA.lcaDetails.other.DataResidencyRegulation;
        public ActionItems: ActionItems[] = [];
        public specificActionSites: ActionItems[] = this.gapFeedbackDataItem.MyFields.Summary.ActionItems;
        public summaryTableDataSource = new MatTableDataSource(this.specificActionSites);

    ngOnInit() {
            // Risk
        this.countryGeoClearanceService.getCommonSourceList(0)
        .subscribe((data) => {
        this.riskLevels = data[0].sourceItems;
        });
        this.countryGeoClearanceService.getCommonSourceList(5)
        .subscribe((data) => {
        this.cpiRaiting = data[0].sourceItems;
        });
        this.countryGeoClearanceService.getCommonSourceList(6)
        .subscribe((data) => {
        this.freedomRaiting = data[0].sourceItems;
        });
        this.summaryTableDataSource = new MatTableDataSource(this.specificActionSites);

        if (this.specificActionSites.length < 1) {
            this.specificActionSites.push({ActionName: '', Details: '', Contact: ''});
            this.summaryTableDataSource = new MatTableDataSource(this.specificActionSites);
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
        const tmp: ActionItems = {
            ActionName: '', Details: '', Contact: ''};
        this.specificActionSites.push(tmp);
        this.summaryTableDataSource = new MatTableDataSource(this.specificActionSites);
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

    public onFormHandler(data: string, fieldName: string) {
        const item = `{"${fieldName}": "${data}"}`.toString();
        const parsed: ICelaFeedbackModel = JSON.parse(item);
        console.log(parsed);
        this.CELAFeedBack = parsed;
        console.log(this.CELAFeedBack);
    }

    public onSave() {
        const CELAFeedBackForm: GapFeedBack = Object.assign(this.gapFeedbackDataItem, { });
        CELAFeedBackForm.RiskLevel = this.RiskLevel;
        CELAFeedBackForm.FeedbackSummary = this.FeedbackSummary;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.CPIRating = this.CPIRating;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.LicenseRequirements = { TerrestrialRisk: this.TerrestrialRisk,
                                                                            TerrestrialSummary: this.TerrestrialSummary,
                                                                            SubmarineRisk: this.SubmarineRisk,
                                                                            SubmarineSummary: this.SubmarineSummary
                                                                        };
        CELAFeedBackForm.MyFields.LCA.lcaDetails.gni.GNIRating = this.GNIRating;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.gni.GNISummary = this.GNISummary;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECRisk = this.LECRisk;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.lawEnforcementCompliance.LECSummary = this.LECSummary;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.privacy.PrivacyRisk = this.PrivacyRisk;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.dataSecurity.DataSecurityRisk = this.DataSecurityRisk;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.dataSecurity.DataSecuritySummary = this.DataSecuritySummary;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilityRisk = this.MediaContentLiabilityRisk;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.mediaContentLiability.MediaContentLiabilitySummary = this.MediaContentLiabilitySummary;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsRisk = this.TelecommunicationsRisk;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.telecommunications.TelecommunicationsSummary = this.TelecommunicationsSummary;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.other.PendingRisk = this.PendingRisk;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.other.PendingLawRegulations = this.PendingSummary;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.other.DataResiReguSummary = this.DataResiReguSummary;
        CELAFeedBackForm.MyFields.LCA.lcaDetails.other.DataResidencyRegulation = this.DataResiReguRisk;
        CELAFeedBackForm.MyFields.Summary.ActionItems = this.ActionItems;

        this.gapfeedbackService.postintakeForm(CELAFeedBackForm).subscribe((data: GapFeedBack) => {
            if (data) {
                this.gapFeedbackDataItem = data;
            }
        });

        this.onCloseDialog();
    }

    public onCloseDialog() {
        this.dialogRef.close();
    }
}
