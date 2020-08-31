import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewModalComponent } from './review-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ReviewService } from '../service/review.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RatingModule.forRoot()
  ],
  declarations: [ReviewModalComponent],
  providers: [ReviewService]
})
export class ReviewModalModule { }
