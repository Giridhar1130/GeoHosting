import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GapFeedbackService } from '../../../app.gapfeedback.service';
import { GapFeedBack } from '../gapfeedback/types/gapfeedback.type';
import { CelaFeedbackComponent } from '../../cela/cela-feedback-dialog/cela-feedback-dialog.component';
import { MatDialog } from '@angular/material';
import { GeoPhysicalSecurityFeedbackComponent } from './gap-feedback-dialogs/geo-physical-security-feedback/geo-physical-security-feedback.component';

@Component({
  selector: 'app-gapfeedback',
  templateUrl: './gapfeedback.component.html',
  styleUrls: ['./gapfeedback.component.css']
})
export class GapFeedbackComponent implements OnInit {


  allGapFeedbackData: any[];
  displayedColumns: string[] = ['Name', 'AssignedTo', 'Submitted', 'TaskStatus', 'Country', 'GAPFeedbackForm', 'GeoHostingOwner',
    'CountryIntakeForm', 'Priority', 'Scope', 'TeamName', 'NewCountryAssessmentID', 'RiskLevel', 'DataCenterRiskLevel', 'NetworkRiskLevel',
    'Modified', 'AssessmentID', 'WorkflowVersion', 'ModifiedBy', 'CountryID', 'AssessmentStatus'];
  dataSource = new MatTableDataSource(this.allGapFeedbackData);
  objectkeys = Object.keys;
  objectvalues = Object.values;
  tmpAssessmentStatus: string[] = [];
  leftItemOrginal: object[] = [];
  currentRightItem: GapFeedBack[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private bottomSheet: MatBottomSheet, private gapfeedbackService: GapFeedbackService,private dialog: MatDialog) {

  }
  getgapfeedbackInfo(): void {
    this.gapfeedbackService.getgapfeedback()
      .subscribe(async (callbackfromgetAPI: any[]) => {

        this.allGapFeedbackData = await callbackfromgetAPI;

      });

  }
  rightChildrenSelected(target) {
    console.log('aaa', target)
    this.currentRightItem = this.allGapFeedbackData.filter((items: GapFeedBack) =>
      items.GeoHostingOwner === target.GeoHostingOwner && items.AssessmentStatus === target.AssessmentStatus
    );
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sort = this.sort;
  }

  afterLeftRootCollapse(ev: any) {
    console.log(ev[0], this.currentRightItem);
    this.currentRightItem = this.currentRightItem.filter((items: GapFeedBack) => !(items.AssessmentStatus === ev[0]));
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sort = this.sort;
  }
  afterLeftRootExpend(ev) {
    this.currentRightItem = this.currentRightItem.concat(
      this.allGapFeedbackData.filter((items: GapFeedBack) => items.AssessmentStatus === ev[0]));
    this.dataSource = new MatTableDataSource(this.currentRightItem);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sort = this.sort;
  }
  showALl() {
    this.dataSource = new MatTableDataSource(this.allGapFeedbackData);
    this.dataSource.sort = this.sort;
  }

  //   Left Navigation
  getdata(data) {
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
  openBottomSheet(value): void {
    const matDialogConfig = {
      data: value,
      width: '80%',
      height: '75%',
      panelClass: 'geo-dialog',
      disableClose: true
    };
    let dialogRef;
    console.log(value.TeamName)
    if(value.TeamName==="CELA"){
      dialogRef= this.dialog.open(CelaFeedbackComponent, matDialogConfig);
    };
    if(value.TeamName==="Physical Security"){
      dialogRef= this.dialog.open(GeoPhysicalSecurityFeedbackComponent, matDialogConfig);
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
   

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
