import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IntakeFormComponent } from '../intake-form/intake-form.component';
import { IntakeService } from '../../app.intake.service';
import {CountryIntake} from '../types/countryintake.type';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { GapFeedBack } from '../gapfeedbackfiles/gapfeedback/types/gapfeedback.type';
import { GapFeedbackService } from 'src/app/app.gapfeedback.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.css']
})

export class IntakeComponent implements OnInit {
  constructor( private intakeService: IntakeService, private countryIntakeDialog: MatDialog,
               private gapFeedbackService: GapFeedbackService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public allIntakeData: any[];
  public displayedColumns: string[] = ['Radio', 'ID', 'MyFields.FormName', 'AssessmentStatus',
                                     'MyFields.Section1details.Priority',
                                     'MyFields.Section1details.Scope', 'Country', 'MyFields.Territory'];
  public dataSource = new MatTableDataSource(this.allIntakeData);
  public objectkeys = Object.keys;
  public objectvalues = Object.values;
  public tmpAssessmentStatus: string[] = [];
  public leftItemOrginal: object[] = [];
  public currentRightItem: CountryIntake[];
  public sortedData: CountryIntake[];
  public kickShow = false;
  public getintakeInfo(): void {
    this.intakeService.getintake()
      .subscribe(async (callbackfromgetAPI: any[]) => {

        this.allIntakeData = await callbackfromgetAPI;

      });
  }
  public allRowSelected(ev: CountryIntake): void {
    console.log(ev);
    this.kickShow = true;
    const kickOffAssignedDict = {
      CELA: 'areyes@microsoft.com',
      'Physical Security': 'wiheng@microsoft.com;comaccar@microsoft.com;rcahoon@microsoft.com;dsmall@microsoft.com',
      'Risk Management': 'Mahin.Karim@microsoft.com;heidim@microsoft.com;Rebekah.Lay@microsoft.com',
      Tax: 'jlundber@microsoft.com;scsiler@microsoft.com;danshaw@microsoft.com;ashwisa@microsoft.com;Ryan.Cooper@microsoft.com;kaaikawa@microsoft.com'
    };

    Object.keys(kickOffAssignedDict).forEach((item) => {
      const gapFeedBackItem: GapFeedBack = {
        Id: null,
        IsActive: true,
        GeoHostingOwner: ev.Owner.LookupValue,
        AssessmentID: ev.MyFields.AssessmentID,
        AssessmentStatus: ev.AssessmentStatus,
        AssignedTo: kickOffAssignedDict[item],
        Author: ev.Owner,
        CompletedDate: null,
        CountryName: ev.MyFields.Section1details.Country,
        DataCenterRiskLevel: '',
        AverageRating : '',
        Country: ev.MyFields.Section1details.Country,
        CountryID: null,
        Editor: {Email: '', LookupValue: ''},
        FeedbackSummary: '',
        FormId: ev.MyFields.GapAdminGroupDetails.FormID,
        Modified: null,
        MyFields: {
          CommonFields: {
            AssignedTo: kickOffAssignedDict[item],
            Country: ev.MyFields.Section1details.Country,
            CountryID: null,
            GeoHostingOwner: ev.Owner.LookupValue,
            Priority: ev.MyFields.Section1details.Priority,
            Scope: ev.MyFields.Section1details.Scope,
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
            InformationSecurityComplainceDetails: {
              ComplainceIssues:  '',
              NationalInformationSecurity:  '',
            }
          },
          LCA: {
            lcaDetails: {
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
            logicalSecuritydetails: {
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
              Risks: {
                ExchangeTransferRisk:  '',
                LegalandRegulartoryRisk: '',
                PoliticalViolenceRisk:  '',
                LegalandRegulatoryRisk:  '',
                PoliticalInteferenceRisk:  '',
                SovereignNonPaymentRisk:  '',
                SupplyChainRisk:  '',
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
        TaskName: '',
        TeamName: item,
        WorkflowVersion: 0
      };

      this.gapFeedbackService.postintakeForm(gapFeedBackItem).subscribe((callbackfromgetAPI: GapFeedBack) => {
       if (callbackfromgetAPI) {
          console.log('Sucess!');
       }
      });
    });
  }

  public rightChildrenSelected(target): void {
    this.currentRightItem = this.allIntakeData.filter((items: CountryIntake) => items.Owner.
      LookupValue === target.Owner.LookupValue && items.AssessmentStatus === target.AssessmentStatus
    );
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.kickShow = false;
    this.dataSource.sort = this.sort;
  }

  public afterLeftRootCollapse(ev: any): void {
    this.currentRightItem = this.currentRightItem.filter((items: CountryIntake) => !(items.AssessmentStatus === ev[0]));
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.kickShow = false;
    this.dataSource.sort = this.sort;
  }

  public afterLeftRootExpend(ev): void {
    this.currentRightItem = this.currentRightItem.concat(
                                this.allIntakeData.filter((items: CountryIntake) => items.AssessmentStatus === ev[0]));
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.kickShow = false;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.kickShow = false;
    this.dataSource.sort = this.sort;
  }

  public showALl(): void {
    this.dataSource = new MatTableDataSource(this.allIntakeData);
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.kickShow = false;
  }

  public getdata(data): void {
    data.map((items: CountryIntake) => {
      if (!this.tmpAssessmentStatus.includes(items.AssessmentStatus)) {
        this.tmpAssessmentStatus.push(items.AssessmentStatus);
        const tmpobject: {} = {};
        tmpobject[items.AssessmentStatus] = [items];
        this.leftItemOrginal.push(tmpobject);
      } else {
        this.leftItemOrginal.map(item => {
          if (Object.keys(item)[0] === items.AssessmentStatus) {
            if (Object.values(item)[0].filter(target =>
              target.Owner.LookupValue === items.Owner.LookupValue).length < 1) {
              Object.values(item)[0].push(items);
            }
          }
        });
      }
    });
  }

  public openIntakeForm(countryIntake: CountryIntake): void {
    if (!countryIntake) {
      const countryIntakeEmptyItem: CountryIntake = {
        Id: null,
        IsActive: true,
        AssessmentStatus: '',
        Scope: '',
        Owner: null,
        Priority: '',
        Country: null,
        AdminComments: '',
        MyFields: {
          AssessmentID: '',
          FormName: '',
          GAPIntakeName: '',
          GapAdminGroupDetails: {
            FormID: this.allIntakeData[this.allIntakeData.length - 1].MyFields.GapAdminGroupDetails.FormID + 1,
            GAPStatus: '',
            NewFormStatus: '',
            AdminComments: '',
            Admin: '',
          },
          NewForm: '',
          Section1details: {
            Priority: '',
            Country: '',
            Justification: '',
            Scope: '',
            DateSubmitted: null,
            GeoLocationOwner: '',
          },
          Section2details: {
            PortfolioComments: '',
            ProposedSites: '',
            group16: {
              CurrentPortfolio: [
                {
                  CurrentITCapacity: 0,
                  CurrentPortEstimatedSize: 0,
                  CurrentPortFacilitytype: '',
                  CurrentPortOperationalTax: '',
                  CurrentPortfolioDCcode: '',
                }
              ]
            }
          },
          Section3details: {
            group9: {
              InProgressSitesGroup: [
                {
                  InProgSitesDCcode: '',
                  InProgOperationalTax: '',
                  InProgFacilityType: '',
                  InProgInitialSize: '',
                  InProgEstimatedSize: '',
                  InProgEstimatedInvestment: '',
                  InProgEstimatedGoLive: '',
                }
              ]
            },
            CurrentOnlineSvr: '',
            CurrentOtherSvr: '',
            CustomerComments: '',
            DataRequirements: '',
            PlannedOnlineSvr: '',
            PlannedOtherSvr: '',
            ProposedOnlineSvr: '',
            ProposedOtherSvr: '',
            ServiceTargets: '',
            Latency: '',
            CrossBorderDataFlows: '',
          },
        },
        KickoffDate: null,
        DueDate: null,
        AverageRating: '',
        CompletedDate: null,
        FormId: this.allIntakeData[this.allIntakeData.length - 1].FormID + 1,
        Modified: null
      };

      countryIntake = countryIntakeEmptyItem;
    }

    const passdata = {
      data: countryIntake,
      width: '80%',
      height: '75%',
      panelClass: 'intakeFomrbody',
      disableClose: true
    };

    const dialogRef = this.countryIntakeDialog.open(IntakeFormComponent, passdata);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentRightItem.push(result);
        this.allIntakeData.push(result);
        console.log(result);
      }
    });
    this.countryIntakeDialog.open(IntakeFormComponent, passdata);
  }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  ngOnInit() {

    this.intakeService.getintake()
      .subscribe(async (callbackfromgetAPI: CountryIntake[]) => {
        this.allIntakeData = callbackfromgetAPI;
        this.getdata(this.allIntakeData);
        this.currentRightItem = this.allIntakeData;
        this.leftItemOrginal.sort((val1, val2) => {
          return Object.keys(val1)[0] > Object.keys(val2)[0] ? 1 : Object.keys(val1)[0] < Object.keys(val2)[0] ? -1 : 0; });
        this.showALl();
      });

    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
  }
}
