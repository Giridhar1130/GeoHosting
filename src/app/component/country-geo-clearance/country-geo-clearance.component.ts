import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CountryGeoClearanceService } from './country-geo-clearance.service';

export interface ICountry {
  key: string;
  text: string;
}

@Component({
  selector: 'geo-country-geo-clearance',
  templateUrl: './country-geo-clearance.component.html',
  styleUrls: ['./country-geo-clearance.component.css']
})
export class CountryGeoClearanceComponent implements OnInit, AfterViewInit{
  @ViewChild('myMap', { static: false }) myMap;
  public pageTitle = 'Map';

  public countries: any[] = [
    { SourceId: 'afghanistan', Value: 'Afghanistan' }
  ];

  public selectedCountry: ICountry;
  map: any;
  pushpin;
  layer;

  constructor(private countryGeoClearanceService: CountryGeoClearanceService) {

    this.countryGeoClearanceService.getCommonSourceList(0)
      .subscribe((data) => {
        this.countries = data[0].sourceItems;
      });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // // console.log(document.getElementById('myMap'));
    // // setTimeout(()=>{
    // //   this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
    // //     credentials: 'Ak8KGgKAX_ALSTAwdrYGBytmgJ796jiEiyfyfoWq024KwkfzJ2Tb0W-fUKEcfiwj',
    // //   });
    // //   this.pushpin = new Microsoft.Maps.Pushpin(this.map.getCenter(), null);
    // //   this.layer = new Microsoft.Maps.Layer();
    // //   this.layer.add(this.pushpin);
    // //   this.map.layers.insert(this.layer);
    // // },1000)

  }
}
