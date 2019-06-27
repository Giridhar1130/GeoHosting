import { Component } from '@angular/core';
import { CelaFeedbackComponent } from './component/cela/cela-feedback-dialog/cela-feedback-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  title = 'GeoHosting';
  constructor(public dialog: MatDialog) {}

    // ngOnInit() {
    //     this.openCelaFeedbackComponentDialog();
    // }

    // public openCelaFeedbackComponentDialog() {
    //     console.log('openCelaFeedbackComponentDialog');
    //     const matDialogConfig = {
    //         data: {
    //             title: 'CELA Feedback',
    //             country: 'Angola',
    //         },
    //         width: '80%',
    //         height: '75%',
    //         panelClass: 'geo-dialog'
    //     };

    //     const dialogRef = this.dialog.open(CelaFeedbackComponent, matDialogConfig);

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             console.log(result);
    //         }
    //     });
    // }
}
