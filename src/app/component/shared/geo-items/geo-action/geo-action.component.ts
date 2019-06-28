import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'geo-action',
  templateUrl: './geo-action.component.html',
  styleUrls: ['./geo-action.component.css']
})
export class GeoActionComponent implements OnInit {
    
    // Confirm Input section
    @Input() IsConfirmButton?: boolean;
    @Input() ConfirmButtonText?: string;
    @Input() IsDisabledConfirmButton?: boolean;

    // Close Input Section
    @Input() IsCloseButton?: boolean;
    @Input() IsDisabledCloseButton?: boolean;
    @Input() CloseButtonText?: string;

    // Action Input Section
    @Input() IsActionButton?: boolean;
    @Input() IsDisabledActionButton?: boolean;
    @Input() ActionButtonText?: string;

    // Output Section
    @Output() ConfirmAction ? = new EventEmitter<boolean>();
    @Output() GeoAction ? = new EventEmitter<boolean>();
    @Output() CloseAction ? = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
        this.ConfirmButtonText = this.ConfirmButtonText || 'Confirm';
        this.CloseButtonText = this.CloseButtonText || 'Close';
        this.ActionButtonText = this.ActionButtonText || 'Action';
    }

    public onConfirm() {
        this.ConfirmAction.emit();
    }

    public onClose() {
        this.CloseAction.emit();
    }

    public onAction() {
        this.GeoAction.emit();
    }
}
