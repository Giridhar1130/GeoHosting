import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GapFeedbackService } from '../../../app.gapfeedback.service';
import { GapFeedBack } from '../gapfeedback/types/gapfeedback.type';
import { CelaFeedbackComponent } from '../../cela/cela-feedback-dialog/cela-feedback-dialog.component';
import { MatDialog } from '@angular/material';
import { GeoPhysicalSecurityFeedbackComponent
} from './gap-feedback-dialogs/geo-physical-security-feedback/geo-physical-security-feedback.component';
import { FeedbackFormDialogComponent } from './gap-feedback-dialogs/feedback-form-dialog/feedback-form-dialog.component';


@Component({
  selector: 'app-gapfeedback',
  templateUrl: './gapfeedback.component.html',
  styleUrls: ['./gapfeedback.component.css']
})
export class GapFeedbackComponent implements OnInit {


  public allGapFeedbackData: GapFeedBack[];
  public displayedColumns: string[] = ['Name', 'AssignedTo', 'Submitted', 'TaskStatus', 'Country', 'GAPFeedbackForm', 'GeoHostingOwner',
                                      'CountryIntakeForm', 'Priority', 'Scope', 'TeamName', 'NewCountryAssessmentID', 'RiskLevel', 
                                      'DataCenterRiskLevel', 'NetworkRiskLevel','Modified', 'AssessmentID', 'WorkflowVersion', 'ModifiedBy',
                                      'CountryID', 'AssessmentStatus'];
  public dataSource = new MatTableDataSource(this.allGapFeedbackData);
  public objectkeys = Object.keys;
  public objectvalues = Object.values;
  public tmpAssessmentStatus: string[] = [];
  public leftItemOrginal: object[] = [];
  public currentRightItem: GapFeedBack[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private bottomSheet: MatBottomSheet, private gapfeedbackService: GapFeedbackService, private dialog: MatDialog) {}

  public getgapfeedbackInfo(): void {
    this.gapfeedbackService.getgapfeedback()
      .subscribe(async (data: GapFeedBack[]) => {
        if (data) {
          this.allGapFeedbackData = data;
        }
      });
  }

  public rightChildrenSelected(target): void {
    this.currentRightItem = this.allGapFeedbackData.filter((items: GapFeedBack) =>
      items.GeoHostingOwner === target.GeoHostingOwner && items.AssessmentStatus === target.AssessmentStatus
    );
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sort = this.sort;
  }

  public afterLeftRootCollapse(ev: any): void {
    console.log(ev[0], this.currentRightItem);
    this.currentRightItem = this.currentRightItem.filter((items: GapFeedBack) => !(items.AssessmentStatus === ev[0]));
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sort = this.sort;
  }

  public afterLeftRootExpend(ev): void {
    this.currentRightItem = this.currentRightItem.concat(
      this.allGapFeedbackData.filter((items: GapFeedBack) => items.AssessmentStatus === ev[0]));
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sort = this.sort;
  }

  public showALl(): void {
    this.dataSource = new MatTableDataSource(this.allGapFeedbackData);
    this.dataSource.sort = this.sort;
  }

  //   Left Navigation
  public getdata(data): void {
    data.map((items: GapFeedBack) => {

      if (!this.tmpAssessmentStatus.includes(items.AssessmentStatus)) {
        if (items.AssessmentStatus !== null) {
          this.tmpAssessmentStatus.push(items.AssessmentStatus);
          const tmpobject: {} = {};
          tmpobject[items.AssessmentStatus] = [items];
          this.leftItemOrginal.push(tmpobject);
        }
      } else {
        this.leftItemOrginal.map(item => {
          if (Object.keys(item)[0] === items.AssessmentStatus) {
            if (Object.values(item)[0].filter(target =>
              target.GeoHostingOwner === items.MyFields.CommonFields.GeoHostingOwner).length < 1) {
              Object.values(item)[0].push(items);
            }
          }
        });
      }

    });

  }

  openFeedbackTask(value): void {
    const emptyGapFeedBack: GapFeedBack = {
      Id: '',
      IsActive: true,
      GeoHostingOwner: '',
      AssessmentID: '',
      AssessmentStatus: '',
      AssignedTo: '',
      Author: {
        Email: '',
        LookupId: '',
        LookupValue: '',
        TypeId: '',
      },
      CompletedDate: null,
      CountryName: '',
      DataCenterRiskLevel: '',
      AverageRating : '',
      Country: '',
      CountryID: '',
      Editor: {Email: '', LookupValue: ''},
      FeedbackSummary: '',
      FormId: '',
      Modified: null,
      MyFields: {
        CommonFields: {
          AssignedTo: '',
          Country: '',
          CountryID: '',
          GeoHostingOwner: 0,
          Priority: '',
          Scope: '',
        },
        Energy: {
          EnergyDetails: {
            Co2Emission: '',
            EnergyRate: '',
            MarketStructure: '',
            Reliability: '',
          }
        },
        InformationSecurityComplaince: {
          InformationSecurityComplainceDetails:{
            ComplainceIssues:  '',
            NationalInformationSecurity:  '',
          }
        },
        LCA: {
          lcaDetails:{
            CPIRating: '',
            dataSecurity: {
              DataSecurityRisk: '',
              DataSecuritySummary: '',
            },
            gni: {
              GNIRating: '',
              GNISummary: '',
            },
            lawEnforcementCompliance: {
              LECRisk: '',
              LECSummary: '',
            },
            mediaContentLiability: {
              MediaContentLiabilityRisk: '',
              MediaContentLiabilitySummary:  '',
            },
            other: {
              DataResiReguSummary:  '',
              DataResidencyRegulation:  '',
              PendingLawRegulations: '',
              PendingRisk:  '',
            },
            privacy: {
              PrivacyRisk: '',
              PrivacySummary:  '',
            },
            telecommunications: {
              TelecommunicationsRisk:  '',
              TelecommunicationsSummary:  '',
            },
            LicenseRequirements: {
              TerrestrialRisk: '',
              TerrestrialSummary: '',
              SubmarineRisk:  '',
              SubmarineSummary:  '',
            }
          }
        },
        LogicalSecurity: {
          logicalSecuritydetails:{
            SecurityIssues: ''
          }
        },
        PhysicalSecurity: {
          PhysicalSecurityDetails: {
            BaselineSecurityRequirements: '',
            DepartTravelWarning: '',
            MicrosoftHeadCount:  '',
            PhysicalSecurityPointofContact: {
              AccountId: '',
              AccountType: '',
              DisplayName: '',
            },
            optionPhysical:  '',
          },
          SecurityIssues: '',
          TravelWarningSection: ''
        },
        RiskManagement: {
          RiskManagementDetails: {
            GeneralRsikConsiderations: '',
            Insurability: {
              CyberRisk:  '',
              GeneralLiability: '',
              PoliticalRisk:  '',
              Property: '',
            },
            Risk: {
              ExchangeTransferRisk:  '',
              LegalandRegulartoryRisk: '',
              PoliticalViolenceRisk:  '',
              LegalandRegulatoryRisk:  '',
            },
          },
          SecurityIssues: '',
          TravelWarningSection: '',
        },
        Summary: {
          ActionItems: [],
          FeedbackSummary: '',
          RiskMgmtRiskLevel: '',
        },
        TaskName: {
          Name: '',
        },
        Tax: {
          DatacenterConsideration: {
            CorporateTaxRate: '',
            CreditableOptions: '',
            IncentivesandExemptions: '',
            PersonalPropertyTax: '',
            RealPropertyTax: '',
            RestrictionOnDatacenter: '',
            SalesTax: '',
            SalesTaxonServers: '',
            TaxRatesOptions: '',
            VATRates: '',
          },
          LegalEntity: '',
          LocalTaxContact: {
            AccountId: '',
            AccountType: '',
            DisplayName: '',
          },
          RestrictionsOnLocations: '',
          RestrictionOrTaxConsideration: '',
        },
        Treasury: {
          TreasuryDetails: {
            CountryCurrency: '',
            CurrencyRestrictionForiegnMarket: '',
            delayCountryPermission: '',
          }
        },
      },
      NetworkRiskLevel: '',
      NewCompleteAssessmentID: '',
      NewCountryAssessmentID: '',
      NewFormName: '',
      RiskLevel: '',
      SubmitStatus: '',
      Submitted: null,
      TaskStatus: '',
      TeamName: '',
      WorkflowVersion: 0
    };
    const matDialogConfig = {
      data: emptyGapFeedBack,
      width: '80%',
      height: '75%',
      panelClass: 'geo-dialog'
    };

    const dialogRef = this.dialog.open(FeedbackFormDialogComponent, matDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  public openFeedbackForm(value): void {
    const matDialogConfig = {
      data: value,
      width: '80%',
      height: '75%',
      panelClass: 'geo-dialog',
      disableClose: true
    };
    
    let dialogRef;
    if (value.TeamName === 'CELA') {
      dialogRef = this.dialog.open(CelaFeedbackComponent, matDialogConfig);
    }

    if (value.TeamName === 'Physical Security') {
      dialogRef = this.dialog.open(GeoPhysicalSecurityFeedbackComponent, matDialogConfig);
    }

    if (dialogRef) {
      dialogRef.afterClosed().subscribe (result => {
        if (result) {
          console.log(result);
        }
      });
    }
  }

  ngOnInit() {
    this.gapfeedbackService.getgapfeedback()
      .subscribe(async (callbackfromgetAPI: any[]) => {
        this.allGapFeedbackData = callbackfromgetAPI;
        this.getdata(this.allGapFeedbackData);
        this.currentRightItem = this.allGapFeedbackData;
        this.leftItemOrginal.sort((val1, val2) => {
          return Object.keys(val1)[0] > Object.keys(val2)[0] ? 1 : Object.keys(val1)[0] < Object.keys(val2)[0] ? -1 : 0;
        });
        this.showALl();

      });

    this.dataSource.sort = this.sort;
  }
}
