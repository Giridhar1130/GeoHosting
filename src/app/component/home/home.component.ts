import { Component, OnInit } from '@angular/core';
import { CountryGeoClearanceService } from '../country-geo-clearance/country-geo-clearance.service';
import { CountryList } from '../types/country.type';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private countryGeoClearanceService: CountryGeoClearanceService) { }
  public CountriesList: CountryList[] = [];

  ngOnInit() {
    this.countryGeoClearanceService.getAllCountriesWithRiskDetails()
      .subscribe((data: CountryList[]) => {
        this.CountriesList = data;
    });
  }

}
