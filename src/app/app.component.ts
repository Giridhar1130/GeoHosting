import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    [x: string]: any;
    title = 'GeoHosting';
    constructor() {}

  ngOnInit() {
}


    // public openCelaFeedbackComponentDialog() {
    //     console.log('openCelaFeedbackDialogComponentDialog');
    //     const matDialogConfig = {
    //         data: {
    //             title: 'CELA Feedback',
    //             country: 'Angola',
    //         },
    //         width: '80%',
    //         height: '75%',
    //         panelClass: 'geo-dialog'
    //     };

    //     const dialogRef = this.dialog.open(CelaFeedbackDialogComponent, matDialogConfig);

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             console.log(result);
    //         }
    //     });
    // }

    // public openGeoPhysicalSecurityFeedbackDialogComponent() {
    //     const matDialogConfig = {
    //         data: {
    //             title: 'Physical Security Feedback',
    //             country: 'Angola',
    //             user: {
    //                 owner: 'Tom',
    //                 scope: 'Full',
    //                 asignedTo: 'Alessandra Reyes (CELA)',
    //                 dueDate: new Date(3/25/2016).toLocaleDateString(),
    //                 priority: '2-Medium',
    //                 completedDate: new Date(5/31/2016).toLocaleDateString(),
    //             },
    //         },
    //         width: '80%',
    //         height: '75%',
    //         panelClass: 'geo-dialog'
    //     };

    //     const dialogRef = this.dialog.open(GeoPhysicalSecurityFeedbackComponent, matDialogConfig);

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             console.log(result);
    //         }
    //     });
    // }

    // public openRiskManagementFeedbackDialogComponent() {
    //     const matDialogConfig = {
    //         data: {
    //             title: 'Country Risk Feedback',
    //             country: 'Poland',
    //             user: {
    //                 owner: 'Tom',
    //                 scope: 'Full',
    //                 asignedTo: 'Alessandra Reyes (CELA)',
    //                 dueDate: new Date(3/25/2016).toLocaleDateString(),
    //                 priority: '2-Medium',
    //                 completedDate: new Date(5/31/2016).toLocaleDateString(),
    //             },
    //         },
    //         width: '70%',
    //         height: '85%',
    //         panelClass: 'geo-dialog'
    //     };
    //     const dialogRef = this.dialog.open(RiskManagementFeedbackDialogComponent, matDialogConfig);

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             console.log(result);
    //         }
    //     });
    // }

    // public openFeedbackFormDialogComponent() {
    //     const matDialogConfig = {
    //         data: {
    //             title: 'Feedback Tasks',
    //             country: '',
    //         },
    //         width: '70%',
    //         height: '70%',
    //         panelClass: 'geo-dialog'
    //     };
    //     const dialogRef = this.dialog.open(FeedbackFormDialogComponent, matDialogConfig);

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             console.log(result);
    //         }
    //     });
    // }
}
