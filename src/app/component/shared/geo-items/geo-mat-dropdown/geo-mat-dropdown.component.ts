import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';
import { CountryList } from 'src/app/component/types/country.type';

@Component({
  selector: 'geo-mat-dropdown',
  templateUrl: './geo-mat-dropdown.component.html',
  styleUrls: ['./geo-mat-dropdown.component.css']
})
export class GeoMatDropdownComponent implements OnInit, OnChanges {

    @Input() InputTextArray?: ITextArray[];
    @Input() InputCountryList?: CountryList[];
    @Input() SelectedValue?: string;
    @Input() Title: string;
    @Input() toDisable?: boolean;
    @Input() IsRequired?: boolean;

    public SelectedItemKey?: string;

    @Input() ToolTip?: string;
  
    @Input() Selected?: any;
    @Output() OutputHandler = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(){
    }

    public onChangeHandler(value: any) {
        this.OutputHandler.emit(value.value);
    }
}
