import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ITextArray } from 'src/app/component/types/cela-feedbackType';

@Component({
  selector: 'app-geo-dropdown',
  templateUrl: './geo-dropdown.component.html',
  styleUrls: ['./geo-dropdown.component.css']
})
export class DropdownComponent implements OnInit {

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
