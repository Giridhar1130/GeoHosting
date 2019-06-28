import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'geo-mat-dropdown',
  templateUrl: './geo-mat-dropdown.component.html',
  styleUrls: ['./geo-mat-dropdown.component.css']
})
export class GeoMatDropdownComponent implements OnInit, OnChanges {

    @Input() InputTextArray?: any;
    @Input() SelectedValue?: any;
    @Input() Title: string;
    @Input() toDisable?: boolean;
    @Input() IsRequired?: boolean;
  
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
