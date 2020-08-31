import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AdminComponent } from './admin.component';
import { EmployeeAddModalModule } from './employee-add-modal/employee-add-modal.module';
import { EmployeeViewModalModule } from './employee-view-modal/employee-view-modal.module';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './service/employee.service';
import { ReviewService } from '../employee/service/review.service';

const routes: Routes = [{
  path: '', component: AdminComponent
}];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    EmployeeAddModalModule,
    EmployeeViewModalModule,
    PopoverModule.forRoot(),
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  declarations: [AdminComponent],
  providers: [EmployeeService, ReviewService]
})
export class AdminModule { }
