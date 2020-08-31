import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EmployeeAddModalComponent } from './employee-add-modal.component';
import { EmployeeService } from '../service/employee.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [EmployeeAddModalComponent],
  providers: [EmployeeService]
})
export class EmployeeAddModalModule { }
