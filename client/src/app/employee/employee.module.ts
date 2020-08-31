import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { ReviewModalModule } from './review-modal/review-modal.module';
import { ReviewService } from './service/review.service';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
const routes: Routes = [{
  path: '', component: EmployeeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RatingModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    RouterModule.forChild(routes),
    ReviewModalModule
  ],
  declarations: [EmployeeComponent],
  providers: [ReviewService]
})
export class EmployeeModule { }
