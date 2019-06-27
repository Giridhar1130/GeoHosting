import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'geo-input',
  templateUrl: './geo-input.component.html',
  styleUrls: ['./geo-input.component.css']
})
export class GeoInputComponent implements OnInit {
    @Input() input?: string;
    @Input() label: string;
    @Output() output = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {
        this.input = this.input === null || this.input === undefined ? "" : this.input;
    }
  
    public onChange(input: string){
        this.output.emit(input);        
    }

}
