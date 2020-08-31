import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComfirmModalComponent } from './comfirm-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [ComfirmModalComponent],
  exports: [ComfirmModalComponent]
})
export class ComfirmModalModule { }
