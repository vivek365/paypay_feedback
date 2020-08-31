import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from 'src/app/common/utility/util';
import { ReviewService } from '../service/review.service';
import { Review } from '../model/review';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent implements OnInit {
  // input
  review: Review;
  // output
  onSave: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  util = Util;

  constructor(
    public modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.util.setValuesInForm(this.form, this.review);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: null,
      reviewerRating: [null, Validators.required],
      comment: [null, Validators.required],
      employee: this.formBuilder.group({
        id: null
      }),
      reviewer: this.formBuilder.group({
        id: null
      }),
    });
  }

  save() {
    this.util.validateAllFormFields(this.form);
    if (this.form.valid) {
      const body = this.form.value;
      body.reviewDate = this.util.getFormattedDate(new Date());
      this.reviewService.saveOrUpdate(body).subscribe(() => {
        this.onSave.emit();
        this.modalRef.hide();
      });

    }
  }

}
