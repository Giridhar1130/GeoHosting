import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'geo-mat-input',
  templateUrl: './geo-mat-input.component.html',
  styleUrls: ['./geo-mat-input.component.css']
})
export class GeoMatInputComponent implements OnInit {

  @Input() input?: string;
    @Input() label2: string;
    @Output() output = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {
        this.input = this.input === null || this.input === undefined ? "" : this.input;
        this.label2 = this.label2 || '';
    }
  
    public onChange(input: string){
        this.output.emit(input);        
    }

}
