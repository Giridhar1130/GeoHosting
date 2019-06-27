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

export interface IFacilityType {
  SourceId: string;
  Value: string;
}
interface Ipority {
  Value: string;
  SourceId: string;
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
  constructor(@Inject(MAT_DIALOG_DATA) public element: CountryIntake,
              private bottomSheetRef: MatDialogRef<IntakeFormComponent>,
              private countryGeoClearanceService: CountryGeoClearanceService, private intakeService: IntakeService) {

    this.countryGeoClearanceService.getCountryList(0)
      .subscribe((data) => {
        this.countryList = data[0].sourceItems;
      });
    this.countryGeoClearanceService.getCountryList(2)
      .subscribe((data) => {
        this.prorityList = data[0].sourceItems;
        this.prorityList.forEach((items: Ipority) => {
          items.Value = items.SourceId + '-' + items.Value;
        });
      });
    this.countryGeoClearanceService.getCountryList(3)
      .subscribe((data) => {
        this.FacilityType = data[0].sourceItems;
        console.log(this.FacilityType);
      });
    this.countryGeoClearanceService.getCountryList(4)
      .subscribe((data) => {
        this.OperationalTaxonomy = data[0].sourceItems;
        console.log(this.OperationalTaxonomy);
      });
  }
  FacilityType: IFacilityType[] = [];
  OperationalTaxonomy: IOperationalTaxonomy[] = [];
  countryList = [];
  prorityList: [] = [];
  CurrentportfoliodisplayedColumns: string[] =
    ['DcCode', 'FacilityType', 'OperationalTaxonomy', 'CurrentITCapacity', 'EstimatedITCapacityin5years'];
  InprogresssitesdisplayedColumns: string[] =
    ['DcCode', 'FacilityType', 'OperationalTaxonomy', 'CurrentITCapacity', 'EstimatedITCapacityin5years',
      'EstimatedInvestment', 'Estimatedgolivedate'];
  TargetFirstdisplayColumns: string[] = [
    'Current', 'Planned', 'Proposed'];
  TargetSeconddisplayColumns: string[] = [
    'Current', 'Planned', 'Proposed'];
  // scopeList: object[] = [
  //   { ID: 123, Value: 'Full' },
  //   { ID: 345, Value: 'Edge' },
  //   { ID: 567, Value: 'Full Refresh' }];
  prorityChoice: string = this.element.MyFields.Section1details.Priority;
  TargetFirstTableDatasource = new MatTableDataSource(targetFirst);
  TargetSecondTableDatasource = new MatTableDataSource(targetSecond);
  selectedCountry: string = this.element.MyFields.Section1details.Country;
  adminComments: string = this.element.MyFields.GapAdminGroupDetails.AdminComments;
  selectedScope: string = this.element.MyFields.Section1details.Scope;
  Justification: string = this.element.MyFields.Section1details.Justification;
  ProposedSites: string = this.element.MyFields.Section2details.ProposedSites;
  PortfolioComments: string = this.element.MyFields.Section2details.PortfolioComments;
  CurrentOnlineSvr: string = this.element.MyFields.Section3details.CurrentOnlineSvr;
  CurrentOtherSvr: string = this.element.MyFields.Section3details.CurrentOnlineSvr;
  CustomerComments: string = this.element.MyFields.Section3details.CustomerComments;
  DataRequirements: string = this.element.MyFields.Section3details.DataRequirements;
  PlannedOnlineSvr: string = this.element.MyFields.Section3details.PlannedOnlineSvr;
  PlannedOtherSvr: string = this.element.MyFields.Section3details.PlannedOtherSvr;
  ProposedOnlineSvr: string = this.element.MyFields.Section3details.ProposedOnlineSvr;
  ProposedOtherSvr: string = this.element.MyFields.Section3details.ProposedOtherSvr;
  ServiceTargets: string = this.element.MyFields.Section3details.ServiceTargets;
  CrossBorderDataFlows: string = this.element.MyFields.Section3details.CrossBorderDataFlows;
  Latency: string = this.element.MyFields.Section3details.Latency;
  currentPortfoliodataSource = new MatTableDataSource(currentPortfolio);
  currentInprogresssitesdataSource = new MatTableDataSource(currentInprogresssites);
  submitted = false;
  tabletest: any;
  openLink(event: MouseEvent): void {
    setTimeout(() => this.bottomSheetRef.close(), 100);
  }
  private addonCurrentportfoliosite() {
    const tmp: CurrentPortfolio = {
      CurrentPortfolioDCcode: null
      , CurrentPortFacilitytype: '', CurrentPortOperationalTax: '', CurrentITCapacity: null, CurrentPortEstimatedSize: null
    };
    currentPortfolio.push(tmp);
    console.log('data');
    this.currentPortfoliodataSource = new MatTableDataSource(currentPortfolio);
  }
  private addonInprogresssitessite() {
    const tmp: InProgressSitesGroup = {
      InProgSitesDCcode: ''
      , InProgFacilityType: '', InProgOperationalTax: '', InProgInitialSize: null,
      InProgEstimatedSize: null, InProgEstimatedInvestment: null, InProgEstimatedGoLive: null
    };
    currentInprogresssites.push(tmp);
    console.log('data');
    this.currentInprogresssitesdataSource = new MatTableDataSource(currentInprogresssites);
  }
  // get all the data from the form
  saveAllData() {
    const countryIntake: CountryIntake = Object.assign({}, this.element);
    // countryIntake.MyFields.Section1details.Country = this.selectedCountry;
    console.log('this.prorityChoice', this.prorityChoice)
    // countryIntake.MyFields.Section1details.Priority = this.prorityChoice;
    // countryIntake.MyFields.Section1details.Scope = this.selectedScope;
    // countryIntake.MyFields.Section1details.Justification = this.Justification;
    // countryIntake.MyFields.GapAdminGroupDetails.AdminComments = this.adminComments;
    // countryIntake.MyFields.Section2details.group16.CurrentPortfolio = currentPortfolio;
    // countryIntake.MyFields.Section3details.group9.InProgressSitesGroup = currentInprogresssites;
    // countryIntake.MyFields.Section2details.ProposedSites = this.ProposedSites;
    // countryIntake.MyFields.Section2details.PortfolioComments = this.PortfolioComments;
    // countryIntake.MyFields.Section3details.CurrentOnlineSvr = this.CurrentOnlineSvr;
    // countryIntake.MyFields.Section3details.PlannedOnlineSvr = this.PlannedOnlineSvr;
    // countryIntake.MyFields.Section3details.ProposedOnlineSvr = this.ProposedOnlineSvr;
    // countryIntake.MyFields.Section3details.CurrentOtherSvr = this.CurrentOtherSvr;
    // countryIntake.MyFields.Section3details.PlannedOtherSvr = this.PlannedOtherSvr;
    // countryIntake.MyFields.Section3details.ProposedOtherSvr = this.ProposedOtherSvr;
    // countryIntake.MyFields.Section3details.CustomerComments = this.CustomerComments;
    // countryIntake.MyFields.Section3details.DataRequirements = this.DataRequirements;
    // countryIntake.MyFields.Section3details.ServiceTargets = this.ServiceTargets;
    // countryIntake.MyFields.Section3details.Latency = this.Latency;
    // countryIntake.MyFields.Section3details.CrossBorderDataFlows = this.CrossBorderDataFlows;
    return countryIntake;
  }
  makeCopy() {
    const data = this.saveAllData();
    data.Modified = new Date();
    this.intakeService.postintakeFormtocopy(data).subscribe((callbackfromgetAPI: any[]) => {
      console.log('callbackfromgetAPI', callbackfromgetAPI);
    });
  }
  onSubmit(e) {
    const data = this.saveAllData();
    data.Modified = new Date();
    this.submitted = true;
    console.log('sumbit', data);
    this.intakeService.postintakeForm(data).subscribe((callbackfromgetAPI: any[]) => {
      console.log('callbackfromgetAPI', callbackfromgetAPI);
    });
  }
  ngOnInit() {

    currentPortfolio = currentPortfolio.concat(this.element.MyFields.Section2details.group16.CurrentPortfolio);
    currentInprogresssites = currentInprogresssites
                                .concat(this.element.MyFields.Section3details.group9.InProgressSitesGroup);
    this.currentInprogresssitesdataSource = new MatTableDataSource(currentInprogresssites);
    this.currentPortfoliodataSource = new MatTableDataSource(currentPortfolio);
    console.log('child', this.element, this.element.MyFields.Section2details.group16.CurrentPortfolio);
  }
}
