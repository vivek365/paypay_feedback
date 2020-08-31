import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIHelperService } from 'src/app/common/service/api-helper.service';
import { Review } from '../model/review';

const PATH = 'review';

@Injectable()
export class ReviewService {
  constructor(
    private api: APIHelperService
  ) { }

  findAll(): Observable<Review[]> {
    return this.api.get(PATH);
  }

  findById(id: number): Observable<Review> {
    return this.api.get(PATH + '/' + id);
  }

  saveOrUpdate(review: Review): Observable<Review> {
    return this.api.post(PATH, review);
  }

  assignEmployeeForReview(selectedReviewers: any[], empId: any) {
    return this.api.post(PATH + '/saveAll', { selectedReviewers, empId });
  }

  delete(id: number): Observable<void> {
    return this.api.delete(PATH + '/' + id);
  }

  findAllByReviewerId(reviewerId: number): Observable<Review[]> {
    return this.api.get(PATH + '/reviews/' + reviewerId);
  }

  findAllByEmployeeId(employeeId: number): Observable<Review[]> {
    return this.api.get(`${PATH}/employee/${employeeId}/reviews`);
  }
}
