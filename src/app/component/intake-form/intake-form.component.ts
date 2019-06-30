import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { CountryIntake, CurrentPortfolio, InProgressSitesGroup } from '../types/countryintake.type';
import { CountryGeoClearanceService } from '../country-geo-clearance/country-geo-clearance.service';
import { IntakeService } from 'src/app/app.intake.service';

interface ITargetTable {
  position: number;
  Current: string;
  Planned: string;
  Proposed: string;
}

let currentPortfolio: CurrentPortfolio[] = [];
const targetFirst: ITargetTable[] = [{ position: 1, Current: '', Planned: '', Proposed: '' }];
const targetSecond = [{ ActionItem: '', Details: '', Contact: '' }];
let currentInprogresssites: InProgressSitesGroup[] = [];

export interface ICountryListType {
  AssessmentSchedule: string;
    AssessmentScope: string;
    AverageRating: string;
    CountryID: string;
    Created: string;
    DatacenterGeoClearance: string;
    EdgeGeoClearance: string;
    ISOLong: string;
    ISOShort: string;
    IsActive: string;
    LastGAPDate: string;
    ModerationComments: string;
    Modified: string;
    Region: string;
    Restrictions: string;
    Territory: string;
    Title: string;
    id: string;
}
interface ICommonsourceType{
  SourceId: number;
  Value: string;
}
export interface IOperationalTaxonomy {
  ID: number;
  viewValue: string;
}

@Component({
  selector: 'app-intakeform',
  templateUrl: './intake-form.component.html',
  styleUrls: ['./intake-form.component.css'],
})

export class IntakeFormComponent implements OnInit {
  constructor(private countryIntakeDialog: MatDialogRef<IntakeFormComponent>,
              private countryGeoClearanceService: CountryGeoClearanceService,
              private intakeService: IntakeService,
              @Inject(MAT_DIALOG_DATA) public countryIntake: CountryIntake) {

    // Country
    this.countryGeoClearanceService.getCountryList()
      .subscribe((data: ICountryListType[]) => {
        this.countryList = data;
      });

    // Priority
    this.countryGeoClearanceService.getCommonSourceList(1)
      .subscribe((data) => {
        this.prorityList = data[0].sourceItems;
        this.prorityList.forEach((items: ICommonsourceType) => {
          items.Value = items.SourceId + '-' + items.Value;
        });
      });

    // FacilityType
    this.countryGeoClearanceService.getCommonSourceList(2)
      .subscribe((data) => {
        this.FacilityType = data[0].sourceItems;
      });
    
    // OperationalTaxonomy
    this.countryGeoClearanceService.getCommonSourceList(3)
      .subscribe((data) => {
        this.OperationalTaxonomy = data[0].sourceItems;
      });
     
    // Scope
    this.countryGeoClearanceService.getCommonSourceList(4)
      .subscribe((data) => {
        console.log(data[0].sourceItems)
        this.ScopeList = data[0].sourceItems;
      });
  }
  getKeys(item) {
    return Object.keys(item);
  }
  dataList=currentPortfolio;

  public FacilityType: ICommonsourceType[] = [];
  public OperationalTaxonomy: IOperationalTaxonomy[] = [];
  public countryList: ICountryListType[] = [];
  public prorityList: ICommonsourceType[] = [];
  public ScopeList: ICommonsourceType[] = [];
  public CurrentportfoliodisplayedColumns: string[] =
    ['DcCode', 'FacilityType', 'OperationalTaxonomy', 'CurrentITCapacity', 'EstimatedITCapacityin5years'];
  public InprogresssitesdisplayedColumns: string[] =
    ['DcCode', 'FacilityType', 'OperationalTaxonomy', 'CurrentITCapacity', 'EstimatedITCapacityin5years',
      'EstimatedInvestment', 'Estimatedgolivedate'];
  public TargetFirstdisplayColumns: string[] = [
    'Current', 'Planned', 'Proposed'];
  public TargetSeconddisplayColumns: string[] = [
    'Current', 'Planned', 'Proposed'];
  public prorityChoice: string = this.countryIntake.MyFields.Section1details.Priority;
  public TargetFirstTableDatasource = new MatTableDataSource(targetFirst);
  public TargetSecondTableDatasource = new MatTableDataSource(targetSecond);
  public selectedCountry: string = this.countryIntake.MyFields.Section1details.Country;
  public adminComments: string = this.countryIntake.MyFields.GapAdminGroupDetails.AdminComments;
  public selectedScope: string = this.countryIntake.MyFields.Section1details.Scope;
  public Justification: string = this.countryIntake.MyFields.Section1details.Justification;
  public ProposedSites: string = this.countryIntake.MyFields.Section2details.ProposedSites;
  public PortfolioComments: string = this.countryIntake.MyFields.Section2details.PortfolioComments;
  public CurrentOnlineSvr: string = this.countryIntake.MyFields.Section3details.CurrentOnlineSvr;
  public CurrentOtherSvr: string = this.countryIntake.MyFields.Section3details.CurrentOnlineSvr;
  public CustomerComments: string = this.countryIntake.MyFields.Section3details.CustomerComments;
  public DataRequirements: string = this.countryIntake.MyFields.Section3details.DataRequirements;
  public PlannedOnlineSvr: string = this.countryIntake.MyFields.Section3details.PlannedOnlineSvr;
  public PlannedOtherSvr: string = this.countryIntake.MyFields.Section3details.PlannedOtherSvr;
  public ProposedOnlineSvr: string = this.countryIntake.MyFields.Section3details.ProposedOnlineSvr;
  public ProposedOtherSvr: string = this.countryIntake.MyFields.Section3details.ProposedOtherSvr;
  public ServiceTargets: string = this.countryIntake.MyFields.Section3details.ServiceTargets;
  public CrossBorderDataFlows: string = this.countryIntake.MyFields.Section3details.CrossBorderDataFlows;
  public Latency: string = this.countryIntake.MyFields.Section3details.Latency;
  public currentPortfoliodataSource: MatTableDataSource<CurrentPortfolio> = new MatTableDataSource(currentPortfolio);
  public currentInprogresssitesdataSource: MatTableDataSource<InProgressSitesGroup> = new MatTableDataSource(currentInprogresssites);
  public Submitted: boolean;
  public SaveSuccessful: boolean;
  public tabletest: any;

  public close(event: MouseEvent): void {
    setTimeout(() => this.countryIntakeDialog.close(), 100);
  }

  public addonCurrentportfoliosite() {
    const tmp: CurrentPortfolio = {
      CurrentPortfolioDCcode: null
      , CurrentPortFacilitytype: '', CurrentPortOperationalTax: '', CurrentITCapacity: null, CurrentPortEstimatedSize: null
    };
  //  currentPortfolio=this.currentPortfoliodataSource.filteredData;
      console.log('add site', currentPortfolio)
    currentPortfolio.push(tmp);
    this.currentPortfoliodataSource = new MatTableDataSource(currentPortfolio);
  }

  public addonInprogresssitessite(): void {
    const tmp: InProgressSitesGroup = {
      InProgSitesDCcode: ''
      , InProgFacilityType: '', InProgOperationalTax: '', InProgInitialSize: null,
      InProgEstimatedSize: null, InProgEstimatedInvestment: null, InProgEstimatedGoLive: null
    };
    currentInprogresssites.push(tmp);
    this.currentInprogresssitesdataSource = new MatTableDataSource(currentInprogresssites);
  }

  // get all the data from the form
  public saveAllData(): CountryIntake {
    const countryIntake: CountryIntake = Object.assign({}, this.countryIntake);
    countryIntake.MyFields.Section1details.Country = this.selectedCountry;
    countryIntake.MyFields.Section1details.Priority = this.prorityChoice;
    countryIntake.MyFields.Section1details.Scope = this.selectedScope;
    countryIntake.MyFields.Section1details.Justification = this.Justification;
    countryIntake.MyFields.GapAdminGroupDetails.AdminComments = this.adminComments;
    countryIntake.MyFields.Section2details.group16.CurrentPortfolio = currentPortfolio;
    countryIntake.MyFields.Section3details.group9.InProgressSitesGroup = currentInprogresssites;
    countryIntake.MyFields.Section2details.ProposedSites = this.ProposedSites;
    countryIntake.MyFields.Section2details.PortfolioComments = this.PortfolioComments;
    countryIntake.MyFields.Section3details.CurrentOnlineSvr = this.CurrentOnlineSvr;
    countryIntake.MyFields.Section3details.PlannedOnlineSvr = this.PlannedOnlineSvr;
    countryIntake.MyFields.Section3details.ProposedOnlineSvr = this.ProposedOnlineSvr;
    countryIntake.MyFields.Section3details.CurrentOtherSvr = this.CurrentOtherSvr;
    countryIntake.MyFields.Section3details.PlannedOtherSvr = this.PlannedOtherSvr;
    countryIntake.MyFields.Section3details.ProposedOtherSvr = this.ProposedOtherSvr;
    countryIntake.MyFields.Section3details.CustomerComments = this.CustomerComments;
    countryIntake.MyFields.Section3details.DataRequirements = this.DataRequirements;
    countryIntake.MyFields.Section3details.ServiceTargets = this.ServiceTargets;
    countryIntake.MyFields.Section3details.Latency = this.Latency;
    countryIntake.MyFields.Section3details.CrossBorderDataFlows = this.CrossBorderDataFlows;
    return countryIntake;
  }

  public makeCopy(): void {
    const intakeform = this.saveAllData();
    intakeform.Modified = new Date();
    this.intakeService.patchintakeFormtocopy(intakeform).subscribe((callbackfromgetAPI: any[]) => {
    });
  }

  public onSubmit(e): void {
    const data = this.saveAllData();
    data.Modified = new Date();
    this.Submitted = true;
    console.log('sumbit', data);
    this.intakeService.pacthintakeForm(data).subscribe((callbackfromgetAPI: CountryIntake) => {
      if (callbackfromgetAPI) {
          this.countryIntake = callbackfromgetAPI;
          this.SaveSuccessful = true;
      }
    });
  }

  ngOnInit() {
    this.Submitted = false;
    this.SaveSuccessful = false;
    currentPortfolio = currentPortfolio.concat(this.countryIntake.MyFields.Section2details.group16.CurrentPortfolio);
    currentInprogresssites = currentInprogresssites
                                  .concat(this.countryIntake.MyFields.Section3details.group9.InProgressSitesGroup);
    this.currentInprogresssitesdataSource = new MatTableDataSource(currentInprogresssites);
    this.currentPortfoliodataSource = new MatTableDataSource(currentPortfolio);
    console.log(currentPortfolio);
  }
}
