import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'geo-mat-textarea',
  templateUrl: './geo-mat-textarea.component.html',
  styleUrls: ['./geo-mat-textarea.component.css']
})
export class GeoMatTextareaComponent implements OnInit {

    @Input() labelTextAreaSummary: string;
    @Input() input?: string;
    @Input() toolTip?: string;
    @Input() toDisable?: boolean;
    @Input() IsRequired?: boolean;

    @Output() summary = new EventEmitter<string>();
    
    constructor() { }
  
    ngOnInit() {
        this.toolTip = this.toolTip || '';
    }
  
    public ngOnChange(input: string) {
        this.summary.emit(input);
    }

}
