import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-comfirm-modal',
  templateUrl: './comfirm-modal.component.html',
  styleUrls: ['./comfirm-modal.component.scss']
})
export class ComfirmModalComponent implements OnInit {
  // input
  header = 'Delete';
  message = 'Are you sure you want to delete?';
  // output
  confirm: EventEmitter<boolean> = new EventEmitter();
  constructor(private modalRef: BsModalRef) { }

  ngOnInit() {
  }

  close(flag: boolean) {
    this.confirm.emit(flag);
    this.modalRef.hide();
  }

}
