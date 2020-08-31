import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Review } from 'src/app/employee/model/review';
import { ReviewService } from 'src/app/employee/service/review.service';
import { GlobalService } from 'src/app/common/service/global.service';
import { ReviewModalComponent } from 'src/app/employee/review-modal/review-modal.component';
import { utils } from 'protractor';
import { Util } from 'src/app/common/utility/util';

@Component({
  selector: 'app-employee-view-modal',
  templateUrl: './employee-view-modal.component.html',
  styleUrls: ['./employee-view-modal.component.scss']
})
export class EmployeeViewModalComponent implements OnInit {
  // input
  id: number;
  name: string;
  max = '5'
  rate = 0;
  pendingReview: Review[] = [];
  completedReview: Review[] = [];
  adminReview: Review;
  userId: number;
  util = Util;

  constructor(
    public modalRef: BsModalRef,
    public reviewServive: ReviewService,
    private globalService: GlobalService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.findReviews();
    this.userId = this.globalService.getUser().id;
  }

  findReviews() {
    this.completedReview = [];
    this.pendingReview = [];
    this.reviewServive.findAllByEmployeeId(this.id).subscribe((reviews: Review[]) => {
      reviews.forEach((x: Review) => {
        if (x.reviewer.id === this.userId) {
          this.adminReview = x;
        } else {
          this[!x.reviewerRating ? 'pendingReview' : 'completedReview'].push(x);
        }
      });
      if (this.adminReview) {
        this.completedReview = [this.adminReview, ...this.completedReview];
      }
      if (this.completedReview.length) {
        const totalRating = this.completedReview.reduce((result, current) => result += current.reviewerRating, 0)
        this.rate = Math.round(totalRating / this.completedReview.length);
      }
    });
  }

  unassign(id: number) {
    this.reviewServive.delete(id).subscribe(() => {
      this.globalService.successNotification('Successfully Unassigned.');
      this.findReviews();
    });
  }

  openReviewModal(review: any) {
    this.modalRef.hide();
    const bsModalRef = this.modalService.show(ReviewModalComponent, {
      backdrop: 'static',
      class: '',
      initialState: { review }
    });
    bsModalRef.content.onSave.subscribe((flag: boolean) => {
      this.findReviews();
    });
  }
}
