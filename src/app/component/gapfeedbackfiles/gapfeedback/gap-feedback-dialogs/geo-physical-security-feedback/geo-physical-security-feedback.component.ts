import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';
import { IDialogConfig, GapFeedBack, Person, ActionItems } from '../../types/gapfeedback.type';
import { GapFeedbackService } from 'src/app/app.gapfeedback.service';

@Component({
    templateUrl: './geo-physical-security-feedback.component.html',
    styleUrls: ['./geo-physical-security-feedback.component.css']
})
export class GeoPhysicalSecurityFeedbackComponent implements OnInit {

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


    public riskLevels: ITextArray[] = [
        { key: 'noFly', text: 'No Fly' },
        { key: 'highRisk', text: 'High Risk' },
        { key: 'mediumRisk', text: 'Medium Risk' },
        { key: 'lowRisk', text: 'Low Risk' }
    ];

    public specificActionSites: { actionItem: string, details: string, contacts: string }[] = [
        { actionItem: '1111', details: 'details', contacts: 'contact' },
        { actionItem: '2222', details: 'details', contacts: 'contact' },
        { actionItem: '3333', details: 'details', contacts: 'contact' }
    ];


    constructor(public dialogRef: MatDialogRef<GeoPhysicalSecurityFeedbackComponent>,
                @Inject(MAT_DIALOG_DATA) private element: GapFeedBack,
                private gapfeedbackService: GapFeedbackService) { }
    public Owner: number = this.element.MyFields.CommonFields.GeoHostingOwner;
    public Scope: string = this.element.MyFields.CommonFields.Scope;
    public Assigned: string = this.element.MyFields.CommonFields.AssignedTo;
    public Priority: string = this.element.MyFields.CommonFields.Priority;
    public country: string = this.element.MyFields.CommonFields.Country;
    public RiskLevel: string = this.element.RiskLevel;
    public FeedbackSummary: string = this.element.FeedbackSummary;
    public SecurityIssues: string = this.element.MyFields.PhysicalSecurity.SecurityIssues;
    public TravelWarningSection: string = this.element.MyFields.PhysicalSecurity.TravelWarningSection;
    public ActionItems: ActionItems[] = [];
    public DepartTravelWarning: string = this.element.MyFields.PhysicalSecurity.PhysicalSecurityDetails.DepartTravelWarning;
    public optionPhysical: string = this.element.MyFields.PhysicalSecurity.PhysicalSecurityDetails.optionPhysical;
    public BaselineSecurityRequirements: string = this.element.MyFields.
                                                  PhysicalSecurity.PhysicalSecurityDetails.BaselineSecurityRequirements;
    public MicrosoftHeadCount: string = this.element.MyFields.
                                        PhysicalSecurity.PhysicalSecurityDetails.MicrosoftHeadCount;
    public PhysicalSecurityPointofContactName: string = this.element.MyFields.PhysicalSecurity.PhysicalSecurityDetails.
                                                        PhysicalSecurityPointofContact === undefined ? '' : this.element.MyFields.
                                                        PhysicalSecurity.PhysicalSecurityDetails.PhysicalSecurityPointofContact.DisplayName;
    ngOnInit() {
    }

    public ononRiskLevel(risk: string) {
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
        this.specificActionSites.push({ actionItem: '1234', details: 'qwer', contacts: 'qwer1234' });
    }

    public onCloseDialog() {
        const PhysicalSecurityForm = Object.assign(this.element, {});
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
        console.log('submit', PhysicalSecurityForm);
        this.gapfeedbackService.postintakeForm(PhysicalSecurityForm).subscribe((callbackfromgetAPI: any[]) => {
            console.log('callbackfromgetAPI', callbackfromgetAPI);
        });
        this.dialogRef.close();
    }
}
