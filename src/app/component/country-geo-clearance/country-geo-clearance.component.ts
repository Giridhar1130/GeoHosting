import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CountryGeoClearanceService } from './country-geo-clearance.service';
import { GapFeedbackService } from 'src/app/app.gapfeedback.service';
import { CountryList } from '../types/country.type';
import { GapFeedBack } from '../gapfeedbackfiles/gapfeedback/types/gapfeedback.type';
import { MatDialog } from '@angular/material';
import { CelaFeedbackComponent } from '../cela/cela-feedback-dialog/cela-feedback-dialog.component';
import { GeoPhysicalSecurityFeedbackComponent
} from '../gapfeedbackfiles/gapfeedback/gap-feedback-dialogs/geo-physical-security-feedback/geo-physical-security-feedback.component';
import { TaxFeedbackDialogComponent } from '../gapfeedbackfiles/gapfeedback/gap-feedback-dialogs/tax-feedback-dialog/tax-feedback-dialog.component';
import { RiskManagementFeedbackDialogComponent
} from '../gapfeedbackfiles/gapfeedback/gap-feedback-dialogs/risk-management-feedback-dialog/risk-management-feedback-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'geo-country-geo-clearance',
  templateUrl: './country-geo-clearance.component.html',
  styleUrls: ['./country-geo-clearance.component.css']
})
export class CountryGeoClearanceComponent implements OnInit {
    @ViewChild('myMap', { static: false }) myMap;
    public pageTitle = 'Map';
    public map: any;
    public pushpin;
    public layer;

    public formTypes: string[] = [
      'CELA',
      'Physical Security',
      'Country Risk',
      'Tax'
    ];

    public countriesList: CountryList[] = [
        {
            CountryID: 10028789,
            Title: 'Aland Islands',
            DatacenterGeoClearance: 'Not Assessed',
            EdgeGeoClearance: 'Not Assessed',
            AssessmentScope: 'None',
            AssessmentSchedule: 'None',
            Latitude: 60,
            Longitude: 20,
            ModerationComments: null,
            ISOLong:'ALA',
            ISOShort: 'AX',
            Restrictions: null,
            Region: 'EMEA',
            Territory: 'Europe',
            LastGAPDate: null,
            AverageRating: null,
            Modified: null,
            Created: null
        }
    ];

    public formsFeedbackData: GapFeedBack[] = [];

    public gapFeedbackData: GapFeedBack[] = [
      {
        Id: '',
        IsActive: false,
        GeoHostingOwner: '',
        AssessmentID: '',
        AssessmentStatus: '',
        AssignedTo: '',
        Author: null,
        CompletedDate: null,
        CountryName: '',
        DataCenterRiskLevel: '',
        AverageRating : '',
        Country: '',
        CountryID: '',
        Editor: {Email: '', LookupValue: ''},
        FeedbackSummary: '',
        FormId: 0,
        Modified: null,
        MyFields: null,
        NetworkRiskLevel: '',
        NewCompleteAssessmentID: '',
        NewCountryAssessmentID: '',
        NewFormName: '',
        RiskLevel: '',
        SubmitStatus: '',
        Submitted: null,
        TaskStatus: '',
        TaskName: '',
        TeamName: '',
        WorkflowVersion: 0
      }
    ];

    public selectedCountry: CountryList;

    public selectedGapFeedback: GapFeedBack;

    constructor(private countryGeoClearanceService: CountryGeoClearanceService, private gapFeedbackService: GapFeedbackService,
                private dialog: MatDialog, private route: ActivatedRoute) {}

    ngOnInit() {
        this.countryGeoClearanceService.getAllCountriesWithRiskDetails()
            .subscribe((data) => {
                this.countriesList = data as CountryList[];
                this.route.paramMap.subscribe(params =>
                {
                    if (params.get('selectedCountry')) {
                        this.searchLocationBingMap(params.get('selectedCountry'));
                    } else {
                        this.selectedCountry = this.countriesList[0];
                    }
                });
                this.loadBingMap();
        });
    }

    public loadBingMap(country: string = '') {
        if (country === '') {
            this.setBingMap();
        } else {
            this.searchLocationBingMap(country);
        }
    }

    setBingMap() {
        setTimeout(() => {
            this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
                credentials: 'Ak8KGgKAX_ALSTAwdrYGBytmgJ796jiEiyfyfoWq024KwkfzJ2Tb0W-fUKEcfiwj',
                center: new Microsoft.Maps.Location(this.selectedCountry.Latitude, this.selectedCountry.Longitude),
                zoom: 4,
            });
            this.pushpin = new Microsoft.Maps.Pushpin(this.map.getCenter(), null);
            this.layer = new Microsoft.Maps.Layer();
            this.layer.add(this.pushpin);
            this.map.layers.insert(this.layer);
        }, 1000);
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
        if (value.TeamName === 'Tax') {
          dialogRef = this.dialog.open(TaxFeedbackDialogComponent, matDialogConfig);
        }
        if (value.TeamName === 'Physical Security') {
          dialogRef = this.dialog.open(GeoPhysicalSecurityFeedbackComponent, matDialogConfig);
        }
        if (value.TeamName === 'Country Risk') {
          dialogRef = this.dialog.open(RiskManagementFeedbackDialogComponent, matDialogConfig);
        }

        if (dialogRef) {
          dialogRef.afterClosed().subscribe (result => {
            if (result) {
              console.log(result);
            }
          });
        }
      }

    public searchLocationBingMap(country: string) {
        this.selectedCountry = this.countriesList.find((item: CountryList) => item.Title === country);
        this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
            credentials: 'Ak8KGgKAX_ALSTAwdrYGBytmgJ796jiEiyfyfoWq024KwkfzJ2Tb0W-fUKEcfiwj',
            center: new Microsoft.Maps.Location(this.selectedCountry.Latitude, this.selectedCountry.Longitude),
            zoom: 4,
        });
        this.pushpin = new Microsoft.Maps.Pushpin(this.map.getCenter(), null);
        this.layer = new Microsoft.Maps.Layer();
        this.layer.add(this.pushpin);
        this.map.layers.insert(this.layer);

        this.gapFeedbackService.getgapfeedback(this.selectedCountry.Title)
            .subscribe((data) => {
            this.gapFeedbackData = data as GapFeedBack[];
            if (this.gapFeedbackData != null) {
              this.formTypes.forEach(element => {
                  if (this.gapFeedbackData.find((item) => item.TeamName === element) != null) {
                    this.formsFeedbackData.push(this.gapFeedbackData.find((item) => item.TeamName === element));
                  }
              });
            }
        });
    }
}
