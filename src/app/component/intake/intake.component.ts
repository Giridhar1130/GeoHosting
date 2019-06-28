import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IntakeFormComponent } from '../intake-form/intake-form.component';
import { IntakeService } from '../../app.intake.service';
import {CountryIntake} from '../types/countryintake.type';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.css']
})
export class IntakeComponent implements OnInit {
  constructor( private intakeService: IntakeService, private countryIntakeDialog: MatDialog) { }


  allIntakeData: any[];
  displayedColumns: string[] = ['ID', 'Name', 'AssessmentStatus', 'Priority', 'Scope', 'Country', 'Territory'];
  dataSource = new MatTableDataSource(this.allIntakeData);
  objectkeys = Object.keys;
  objectvalues = Object.values;
  tmpAssessmentStatus: string[] = [];
  leftItemOrginal: object[] = [];
  currentRightItem: CountryIntake[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public sortedData: CountryIntake[];
  getintakeInfo(): void {
    this.intakeService.getintake()
      .subscribe(async (callbackfromgetAPI: any[]) => {

        this.allIntakeData = await callbackfromgetAPI;

      });

  }
  rightChildrenSelected(target) {

    this.currentRightItem = this.allIntakeData.filter((items: CountryIntake) => items.Owner.
      LookupValue === target.Owner.LookupValue && items.AssessmentStatus === target.AssessmentStatus
    );
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sort = this.sort;
  }

  afterLeftRootCollapse(ev: any) {
    console.log(ev[0], this.currentRightItem);
    this.currentRightItem = this.currentRightItem.filter((items: CountryIntake) => !(items.AssessmentStatus === ev[0]));
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sort = this.sort;
  }
  afterLeftRootExpend(ev) {
    console.log(ev, this.currentRightItem);
    this.currentRightItem = this.currentRightItem.concat(
                                this.allIntakeData.filter((items: CountryIntake) => items.AssessmentStatus === ev[0]));
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sort = this.sort;
  }
  showALl() {
    console.log(this.allIntakeData)
    this.dataSource = new MatTableDataSource(this.allIntakeData);
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.allIntakeData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'FormId': return this.compare(a.ID, b.ID, isAsc);
        case 'FormName': return this.compare(a.Name, b.Name, isAsc);
        case 'AssessmentStatus': return this.compare(a.AssessmentStatus, b.AssessmentStatus, isAsc);
        case 'Priority': return this.compare(a.Priority, b.Priority, isAsc);
        case 'Scope': return this.compare(a.Scope, b.Scope, isAsc);
        case 'Country': return this.compare(a.Country, b.Country, isAsc);
        case 'Territory': return this.compare(a.Territory, b.Territory, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getdata(data) {
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

  openIntakeForm(countryIntake: CountryIntake): void {
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

    this.countryIntakeDialog.open(IntakeFormComponent, passdata);
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
    
    this.dataSource.sort = this.sort;
  }


}
