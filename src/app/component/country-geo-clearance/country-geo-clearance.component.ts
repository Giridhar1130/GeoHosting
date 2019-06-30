import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CountryGeoClearanceService } from './country-geo-clearance.service';
import { ITextArray } from '../types/cela-feedbackType';
import { ICountryModel } from '../types/country.type';

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


    public countriesList: ICountryModel[] = [
        {
            CountryId: 1234,
            Title: "Ukraine",
            DatacenterGeoClearance: "Ukraine",
            EdgeGeoClearance: "Ukraine",
            AssessmentScope: "Ukraine",
            AssessmentSchedule: "Ukraine",
            Owner: "Ukraine",
        }
    ];

    constructor(private countryGeoClearanceService: CountryGeoClearanceService) {}

    ngOnInit() { 
        this.countryGeoClearanceService.getCountryList()
            .subscribe((data) => {
            this.countriesList = data as any[];
        });
        this.loadBingMap();
        console.log(this.countriesList)
    }

    public loadBingMap(country: string = '') {
        if(country === '') {
            this.setBingMap();
        }
        else {
            this.searchLocationBingMap(country);
        }
    }

    /* #region temp dataset */

    public selectedCountry: any = {
        countryName: 'Ukraine',
            latitude: 50.434341,
            longitude: 30.527756,
            zoom: 5
    };

    public countriesData: any[] = [
        {
            countryName: 'Ukraine',
            latitude: 50.434341,
            longitude: 30.527756,
            zoom: 5
        },
    ];

    /* #endRegion */

    setBingMap() {
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

    public searchLocationBingMap(country: string) {
        this.selectedCountry = this.countriesData.find((item: any) => item.countryName === country);
        this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
            credentials: 'Ak8KGgKAX_ALSTAwdrYGBytmgJ796jiEiyfyfoWq024KwkfzJ2Tb0W-fUKEcfiwj',
            center: new Microsoft.Maps.Location(this.selectedCountry.latitude, this.selectedCountry.longitude),
            zoom: 4,
        });
        this.pushpin = new Microsoft.Maps.Pushpin(this.map.getCenter(), null);
        this.layer = new Microsoft.Maps.Layer();
        this.layer.add(this.pushpin);
        this.map.layers.insert(this.layer);
    }
}
