import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'geo-action',
  templateUrl: './geo-action.component.html',
  styleUrls: ['./geo-action.component.css']
})
export class GeoActionComponent implements OnInit {

  @Input() Confirm?: boolean;
  @Input() ConfirmText?: string;
  @Input() Reject?: boolean;
  @Input() RejectText?: string;
  @Input() Close?: boolean;

  @Output() ConfirmAction? = new EventEmitter<boolean>();
  @Output() RejectAction? = new EventEmitter<boolean>();
  @Output() CloseAction? = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  public onConfirm(){
      this.ConfirmAction.emit();
  }

  public onReject(){
      this.RejectAction.emit();
  }

  public onClose(){
      this.CloseAction.emit();
  }
}
