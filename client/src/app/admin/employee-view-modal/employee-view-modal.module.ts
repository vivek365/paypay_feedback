import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeViewModalComponent } from './employee-view-modal.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from 'src/app/employee/service/review.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReviewModalModule } from 'src/app/employee/review-modal/review-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    ReviewModalModule
  ],
  declarations: [EmployeeViewModalComponent],
  providers: [ReviewService]
})
export class EmployeeViewModalModule { }
