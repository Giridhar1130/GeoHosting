import { Component, OnInit, Inject } from '@angular/core';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDialogConfig } from '../../types/gapfeedback.type';
import { constructor } from 'q';
import { CountryGeoClearanceService } from 'src/app/component/country-geo-clearance/country-geo-clearance.service';

export interface ICommonsourceType {
    SourceId: string;
    Value: string;
}

@Component({
    selector: 'geo-tax-feedback-dialog',
    templateUrl: './tax-feedback-dialog.component.html',
    styleUrls: ['./tax-feedback-dialog.component.css']
  })

export class TaxFeedbackDialogComponent implements OnInit {

    public dialogConfig: IDialogConfig;
    public labelPosition: string = 'after';
    public stateDepartmentTravelAdvisoryLevelCheckBox: string = "Yes";
    public summaryCountryRiskLevel: string = 'Country Risk Level:';
    public feedbackSummaryLabel: string = 'Feedback Summary';
    public specificActionTooltip: string = 'Details, including specific triggers or conditions in which the action item applies';
    public generalRiskConsiderationsLabel: string = "General Risk Considerations";
    public actionItemLabel: string = 'Action Item';
    public detailsSpecificLabel: string = 'Details';
    public exchangeTransferRiskLabel: string =  'Exchange Transfer Risk:';
    public supplyChainRiskLabel: string = 'Supply Chain Risk:';
    public sovereignNonPaymentRiskLabel: string = 'Sovereign Non-Payment Risk:';
    public legalAndRegulatoryRiskLabel: string = 'Legal and Regulatory Risk:';
    public politicalInterferenceRiskLabel: string = 'Political Interference Risk:';
    public politicalViolenceRiskLabel: string = 'Political Violence Risk:';
    public RiskLevels: ICommonsourceType[] = [];

    public specificActionSites: {actionItem: string, details: string, contacts: string}[] = [
        {actionItem: '1111', details: 'details', contacts: 'contact'},
        {actionItem: '2222', details: 'details', contacts: 'contact'},
        {actionItem: '3333', details: 'details', contacts: 'contact'}
    ];

    public tempRiskModel: any = {
        prop1: true,
        tempString: "tempstr"
    }

    constructor(public dialogRef: MatDialogRef<TaxFeedbackDialogComponent>,
                private countryGeoClearanceService: CountryGeoClearanceService,
                 @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialogConfig = this.data;
    }

    ngOnInit() {
        this.countryGeoClearanceService.getCommonSourceList(1)
        .subscribe((data) => {
            this.RiskLevels = data[0].sourceItems;
        });
    }

    public onPhysicalSecurityRiskLevelHandler(risk: string) {

    }

    public onFeedbackSummaryHandler(feedback: string) {

    }

    public onAddSite() {
        this.specificActionSites.push({actionItem: '1234', details: 'qwer', contacts: 'qwer1234'});
    }

    public onSaveandCloseDialog() {

    }

    public onCloseDialog() {
        this.dialogRef.close();
    }
}
