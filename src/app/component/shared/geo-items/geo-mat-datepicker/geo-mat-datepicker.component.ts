import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'geo-mat-datepicker',
  templateUrl: './geo-mat-datepicker.component.html',
  styleUrls: ['./geo-mat-datepicker.component.css']
})
export class GeoMatDatepickerComponent implements OnInit {

    public dateValue: FormControl;
    public startDate = new Date(1990, 0, 1);
    @Input() DatepickerLabel?: Date;
    @Input() Value?: Date;
    @Input() IsRequired?: boolean;
    @Input() IsDisabled?: boolean;
    @Input() ToolTip?: string;

    @Output() OnSelectectDate = new EventEmitter<Date>();

    constructor() { }

    ngOnInit() {
        this.dateValue = this.Value ? new FormControl(this.Value) : new FormControl(new Date());
    }

    public onDateChange(event: any) {
        this.OnSelectectDate.emit(event.value);
    }
  
}
