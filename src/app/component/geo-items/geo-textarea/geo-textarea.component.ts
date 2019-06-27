import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'geo-textarea',
    templateUrl: './geo-textarea.component.html',
    styleUrls: ['./geo-textarea.component.css']
})
export class GeoTextareaComponent implements OnInit {

    @Input() labelTextAreaSummary: string;
    @Input() input?: string;
    @Output() summary = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {
    }

    public ngOnChange(input: string) {
        this.summary.emit(input);
    }

}
