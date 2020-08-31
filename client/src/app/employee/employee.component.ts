import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { GlobalService } from '../common/service/global.service';
import { Util } from '../common/utility/util';
import { Review } from './model/review';
import { ReviewModalComponent } from './review-modal/review-modal.component';
import { ReviewService } from './service/review.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeId: number;
  review$: Observable<Review[]>;
  util = Util;

  constructor(
    private modalService: BsModalService,
    private reviewService: ReviewService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    const user = this.globalService.getUser();
    this.employeeId = user.id;
    this.findReviews();
  }

  findReviews() {
    this.review$ = this.reviewService.findAllByReviewerId(this.employeeId);
  }

  openReviewModal(review: Review) {
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
