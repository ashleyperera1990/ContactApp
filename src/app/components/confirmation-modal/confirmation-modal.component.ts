import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() modalTitle: string;
  @Input() modalMessage: string;
  @Input() showCancelButton: boolean;
  @Input() showDeleteButton: boolean;
  @Input() showOkButton: boolean;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
