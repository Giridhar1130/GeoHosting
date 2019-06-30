import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'geo-action',
  templateUrl: './geo-action.component.html',
  styleUrls: ['./geo-action.component.css']
})
export class GeoActionComponent implements OnInit {
    
    // Confirm  section
    @Input() IsConfirmButton?: boolean;
    @Input() ConfirmButtonText?: string;
    @Input() IsDisabledConfirmButton?: boolean;
    @Input() ConfirmToolTip?: string;
    @Output() ConfirmAction ? = new EventEmitter<boolean>();

    // Close  Section
    @Input() IsCloseButton?: boolean;
    @Input() IsDisabledCloseButton?: boolean;
    @Input() CloseButtonText?: string;
    @Input() CloseToolTip?: string;
    @Output() CloseAction ? = new EventEmitter<boolean>();

    // Action  Section
    @Input() IsActionButton?: boolean;
    @Input() IsDisabledActionButton?: boolean;
    @Input() ActionButtonText?: string;
    @Input() ActionToolTip?: string;
    @Output() GeoAction ? = new EventEmitter<boolean>();

    // Submit  Section
    @Input() IsSubmitButton?: boolean;
    @Input() IsDisabledSubmitButton?: boolean;
    @Input() SubmitButtonText?: string;
    @Input() SubmitToolTip?: string;
    @Output() SubmitAction ? = new EventEmitter<boolean>();

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

    public onSubmit() {
        this.SubmitAction.emit();
    }
}
