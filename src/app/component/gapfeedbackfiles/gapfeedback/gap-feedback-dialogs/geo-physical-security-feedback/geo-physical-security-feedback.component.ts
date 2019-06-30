import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';
import { IDialogConfig, GapFeedBack, Person, ActionItems } from '../../types/gapfeedback.type';
import { GapFeedbackService } from 'src/app/app.gapfeedback.service';
import { CountryGeoClearanceService } from 'src/app/component/country-geo-clearance/country-geo-clearance.service';

@Component({
    templateUrl: './geo-physical-security-feedback.component.html',
    styleUrls: ['./geo-physical-security-feedback.component.css']
})

export class GeoPhysicalSecurityFeedbackComponent implements OnInit {
    public showSave: boolean = this.gapFeedbackDataItem.Submitted ? false : true;
    public dialogConfig: IDialogConfig;
    public labelPosition = 'after';
    public summaryRiskLevel = 'Physical Security Risk Level:';
    public feedbackSummaryLabel = 'Feedback Summary - Summarize feedback in 300 characters or less.';
    public securityDetailsAndInquiriesLabel = 'Security Details and Inquiries';
    public physicalSecurityRiskLevelDefinitionLabel = 'Physical Security Risk Level Definition';
    public specificActionLabel = 'Are there any country-specific Action Items or Next Steps?';
    public actionItemScpecificSummaryInputLabel = 'Action Item';
    public detailsSpecificSummaryTextareaSummaryLabel = 'Details';
    public matSpecificSummaryTextAreaTooltip = 'Details, including specific triggers or conditions in which the action item applies';
    public contactsSpecificSummaryLabel = 'Contact(s)';
    public physicalSecurityRiskLevelLabel = 'Physical Security Risk Level Definition';
    public applicableBaselineSecurityRequirementsLabel = 'Applicable Baseline Security Requirements';
    public physicalSecurityPointofContactLabel = 'Physical Security Point of Contact';


    public riskLevels: ITextArray[];

    public specificActionSites: ActionItems[] = this.gapFeedbackDataItem.MyFields.Summary.ActionItems;


    constructor(public dialogRef: MatDialogRef<GeoPhysicalSecurityFeedbackComponent>,
                @Inject(MAT_DIALOG_DATA) private gapFeedbackDataItem: GapFeedBack,
                private gapfeedbackService: GapFeedbackService,
                private countryGeoClearanceService: CountryGeoClearanceService) { }
    public titleCountry: string = this.gapFeedbackDataItem.MyFields.CommonFields.Country;
    public Owner: string = this.gapFeedbackDataItem.MyFields.CommonFields.GeoHostingOwner;
    public Scope: string = this.gapFeedbackDataItem.MyFields.CommonFields.Scope;
    public Assigned: string = this.gapFeedbackDataItem.MyFields.CommonFields.AssignedTo;
    public Priority: string = this.gapFeedbackDataItem.MyFields.CommonFields.Priority;
    public country: string = this.gapFeedbackDataItem.MyFields.CommonFields.Country;
    public RiskLevel: string = this.gapFeedbackDataItem.RiskLevel;
    public FeedbackSummary: string = this.gapFeedbackDataItem.FeedbackSummary;
    public SecurityIssues: string = this.gapFeedbackDataItem.MyFields.PhysicalSecurity.SecurityIssues;
    public TravelWarningSection: string = this.gapFeedbackDataItem.MyFields.PhysicalSecurity.TravelWarningSection;
    public ActionItems: ActionItems[] = this.specificActionSites;
    public DepartTravelWarning: string = this.gapFeedbackDataItem.MyFields.PhysicalSecurity.PhysicalSecurityDetails.DepartTravelWarning;
    public optionPhysical: string = this.gapFeedbackDataItem.MyFields.PhysicalSecurity.PhysicalSecurityDetails.optionPhysical;
    public BaselineSecurityRequirements: string = this.gapFeedbackDataItem.MyFields.
                                                  PhysicalSecurity.PhysicalSecurityDetails.BaselineSecurityRequirements;
    public MicrosoftHeadCount: string = this.gapFeedbackDataItem.MyFields.
                                        PhysicalSecurity.PhysicalSecurityDetails.MicrosoftHeadCount;
    public PhysicalSecurityPointofContactName: string = this.gapFeedbackDataItem.MyFields.PhysicalSecurity.PhysicalSecurityDetails.
                                            PhysicalSecurityPointofContact === undefined ? '' : this.gapFeedbackDataItem.MyFields.
                                            PhysicalSecurity.PhysicalSecurityDetails.PhysicalSecurityPointofContact.DisplayName;
    ngOnInit() {
            // Risk
    this.countryGeoClearanceService.getCommonSourceList(0)
    .subscribe((data) => {
      this.riskLevels = data[0].sourceItems;
    });
    if (this.specificActionSites.length < 1) {
        this.specificActionSites.push({ ActionName: '', Details: '', Contact: '' });
    }
    }

    public onRiskLevel(risk: string) {
        this.RiskLevel = risk;
    }

    public onFeedbackSummary(feedback: string) {
        this.FeedbackSummary = feedback;
    }
    public onSecurityIssues(Issues: string) {
        this.SecurityIssues = Issues;
    }
    public onTravelWarningSection(WarningSection: string) {
        this.TravelWarningSection = WarningSection;
    }
    public onDepartTravelWarning(TravelWarning: string) {
        this.DepartTravelWarning = TravelWarning;
    }
    public onBaselineSecurityRequirements(ev: string) {
        this.BaselineSecurityRequirements = ev;
    }
    public onphysicalSecurityPointofContactLabel(TravelWarning: string) {
        this.PhysicalSecurityPointofContactName = TravelWarning;
    }

    public addonCurrentportfoliosite() {
        this.specificActionSites.push({ ActionName: '', Details: '', Contact: '' });
    }

    public onSave() {
        const PhysicalSecurityForm = Object.assign(this.gapFeedbackDataItem, {});
        PhysicalSecurityForm.RiskLevel = this.RiskLevel;
        PhysicalSecurityForm.FeedbackSummary = this.FeedbackSummary;
        PhysicalSecurityForm.MyFields.PhysicalSecurity.SecurityIssues = this.SecurityIssues;
        PhysicalSecurityForm.MyFields.PhysicalSecurity.TravelWarningSection = this.TravelWarningSection;
        PhysicalSecurityForm.MyFields.Summary.ActionItems = this.ActionItems;
        PhysicalSecurityForm.MyFields.PhysicalSecurity.PhysicalSecurityDetails.DepartTravelWarning = this.DepartTravelWarning;
        PhysicalSecurityForm.MyFields.PhysicalSecurity.PhysicalSecurityDetails.optionPhysical = this.optionPhysical;
        PhysicalSecurityForm.MyFields.PhysicalSecurity.PhysicalSecurityDetails.BaselineSecurityRequirements =
            this.BaselineSecurityRequirements;
        PhysicalSecurityForm.MyFields.
            PhysicalSecurity.PhysicalSecurityDetails.MicrosoftHeadCount = this.MicrosoftHeadCount;
        PhysicalSecurityForm.MyFields.PhysicalSecurity.PhysicalSecurityDetails.
            PhysicalSecurityPointofContact = { DisplayName: this.PhysicalSecurityPointofContactName, AccountType: '', AccountId: '' };
        this.gapfeedbackService.postintakeForm(PhysicalSecurityForm).subscribe((data: GapFeedBack) => {
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
