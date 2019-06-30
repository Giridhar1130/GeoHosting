import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { CountryGeoClearanceService } from './country-geo-clearance.service';
import { ITextArray } from '../types/cela-feedbackType';
import { ICountryModel, CountryList } from '../types/country.type';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'geo-country-geo-clearance',
    templateUrl: './country-geo-clearance.component.html',
    styleUrls: ['./country-geo-clearance.component.css']
})
export class CountryGeoClearanceComponent implements OnInit, OnChanges {
    @ViewChild('myMap', { static: false }) myMap;
    public pageTitle = 'Map';
    public map: any;
    public pushpin: any;
    public layer: any;
    public selectedCountry: CountryList = null;
    public countryListDropdown: any[] = [];

    public countryList: CountryList[] = [
        {
            CountryID: 10028789,
            Title: 'Aland Islands',
            DatacenterGeoClearance: 'Not Assessed',
            EdgeGeoClearance: 'Not Assessed',
            AssessmentScope: 'None',
            AssessmentSchedule: 'None',
            Latitude: 60.1785,
            Longitude: 19.9156,
            ModerationComments: null,
            ISOLong: "ALA",
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


    constructor(private countryGeoClearanceService: CountryGeoClearanceService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.countryGeoClearanceService.getCountryList()
            .subscribe((data) => {
            this.countryList = data as CountryList[];
        });
        const countryFromUrlParameter = this.route.snapshot.paramMap.get('selectedCountry');
        this.selectedCountry = this.countryList.find(item => item.Title === countryFromUrlParameter);
        this.countryListDropdown = this.countryList.map(item => { 
            return {SourceId: item.Title, Value: item.Title};
        });
        this.loadBingMap(countryFromUrlParameter);
    }

    ngOnChanges(): void {

    }

    public loadBingMap(country: string = '') {
        if (country === '') {
            this.setBingMap();
        } else {
            this.searchLocationBingMap(country);
        }
    }

    public searchLocationBingMap(country: string) {
        this.selectedCountry = this.countryList.find((item: any) => item.Title === country);
        this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
            credentials: 'Ak8KGgKAX_ALSTAwdrYGBytmgJ796jiEiyfyfoWq024KwkfzJ2Tb0W-fUKEcfiwj',
            center: new Microsoft.Maps.Location(this.selectedCountry.Latitude, this.selectedCountry.Longitude),
            zoom: 4,
        });
        this.pushpin = new Microsoft.Maps.Pushpin(this.map.getCenter(), null);
        this.layer = new Microsoft.Maps.Layer();
        this.layer.add(this.pushpin);
        this.map.layers.insert(this.layer);
    }

    private setBingMap() {
        setTimeout(() => {
            this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
                credentials: 'Ak8KGgKAX_ALSTAwdrYGBytmgJ796jiEiyfyfoWq024KwkfzJ2Tb0W-fUKEcfiwj',
                zoom: 4,
            });
            this.pushpin = new Microsoft.Maps.Pushpin(this.map.getCenter(), null);
            this.layer = new Microsoft.Maps.Layer();
            this.layer.add(this.pushpin);
            this.map.layers.insert(this.layer);
        }, 1000);
    }
}
