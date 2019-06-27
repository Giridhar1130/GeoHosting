import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IntakeFormComponent } from '../intake-form/intake-form.component';
import { IntakeService } from '../../app.intake.service';
import {CountryIntake} from '../types/countryintake.type';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.css']
})
export class IntakeComponent implements OnInit {


  allIntakeData: any[];
  displayedColumns: string[] = ['ID', 'Name', 'AssessmentStatus', 'Priority', 'Scope', 'Country', 'Territory'];
  dataSource = new MatTableDataSource(this.allIntakeData);
  objectkeys = Object.keys;
  objectvalues = Object.values;
  tmpAssessmentStatus: string[] = [];
  leftItemOrginal: object[] = [];
  currentRightItem: CountryIntake[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor( private intakeService: IntakeService, private bottomSheet: MatDialog) { }
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
    console.log('show all work');
    this.dataSource = new MatTableDataSource(this.allIntakeData);
    this.dataSource.sort = this.sort;
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
  openBottomSheet(element): void {
    console.log(element);
    const passdata = {
      data: element,
      width: '80%',
      height: '75%',
      panelClass: 'intakeFomrbody'
    };
    this.bottomSheet.open(IntakeFormComponent, passdata);
  }
  ngOnInit() {

    this.intakeService.getintake()
      .subscribe(async (callbackfromgetAPI: any[]) => {
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
