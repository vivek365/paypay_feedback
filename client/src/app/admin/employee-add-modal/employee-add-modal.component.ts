import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Util } from 'src/app/common/utility/util';
import { ValidationRegex } from 'src/app/common/constant/validation-regex';
import { EmployeeService } from '../service/employee.service';
import { GlobalService } from 'src/app/common/service/global.service';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-employee-add-modal',
  templateUrl: './employee-add-modal.component.html',
  styleUrls: ['./employee-add-modal.component.scss']
})
export class EmployeeAddModalComponent implements OnInit {
  // input
  id: number;
  // output
  onSave: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  util = Util;
  maxDate = new Date();
  editObj: Employee;
  isNotUsed = {
    email: true,
    empId: true
  };

  constructor(
    public modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.findById();
  }

  findById() {
    if (this.id) {
      this.employeeService.findById(this.id).subscribe(emp => {
        this.util.setValuesInForm(this.form, emp);
        this.editObj = emp;
        this.form.get('joiningDate').setValue(new Date(emp.joiningDate));
        this.form.get('birthDate').setValue(new Date(emp.birthDate));
      });
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      empId: [null, Validators.required],
      name: [null, Validators.required],
      gender: ['', Validators.required],
      email: [null, [Validators.required, ValidationRegex.EMAIL]],
      mobile: [null, Validators.required],
      birthDate: [null, Validators.required],
      joiningDate: [null, Validators.required],
      address: [null],
      type: ['', Validators.required]
    });
  }
  save() {
    this.util.validateAllFormFields(this.form);
    if (this.form.valid && this.isNotUsed.email && this.isNotUsed.empId) {
      const body = this.form.value;
      body.birthDate = this.util.getFormattedDate(body.birthDate);
      body.joiningDate = this.util.getFormattedDate(body.joiningDate);
      this.employeeService.saveOrUpdate(body).subscribe((emp: Employee) => {
        this.globalService.successNotification();
        this.onSave.emit(emp);
        this.modalRef.hide();
      });
    }
  }

  isAlreadyExist(type: string) {
    const value = this.form.get(type).value;
    if (Util.isNotEmpty(value) && (!this.editObj || this.editObj[type] !== value)) {
      this.employeeService.isAlreadyExist(type, value).subscribe((res: any) => {
        this.isNotUsed[type] = !res;
      });
    } else {
      this.isNotUsed[type] = true;
    }
  }

}
