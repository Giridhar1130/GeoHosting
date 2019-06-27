import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'geo-mat-dropdown',
  templateUrl: './geo-mat-dropdown.component.html',
  styleUrls: ['./geo-mat-dropdown.component.css']
})
export class GeoMatDropdownComponent implements OnInit {

  @Input() InputTextArray?: any;
  @Input() Title: string;
  @Output() OutputHandler = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }


  public onChangeHandler(value: any) {
      this.OutputHandler.emit(value.value);
  }
}
