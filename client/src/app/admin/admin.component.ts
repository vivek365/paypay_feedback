import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ComfirmModalComponent } from '../common/components/comfirm-modal/comfirm-modal.component';
import { EmployeeAddModalComponent } from './employee-add-modal/employee-add-modal.component';
import { EmployeeViewModalComponent } from './employee-view-modal/employee-view-modal.component';
import { Observable, noop, Observer, of } from 'rxjs';
import { Employee } from './model/employee';
import { Util } from '../common/utility/util';
import { EmployeeService } from './service/employee.service';
import { GlobalService } from '../common/service/global.service';
import { map, tap, switchMap, filter } from 'rxjs/operators';
import { ReviewService } from '../employee/service/review.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  search;
  selectedReviewers = [];
  employees$: Observable<Employee[]>;
  util = Util;
  empId;
  assignee$;

  @ViewChild('hiddenBtn') hiddenBtn: ElementRef;

  constructor(
    private modalService: BsModalService,
    private employeeService: EmployeeService,
    private globalService: GlobalService,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getAssignees() {
    this.assignee$ = new Observable((observer: Observer<string>) => {
      observer.next(this.search);
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          return this.employeeService.findAllForAssign(this.empId, query).pipe(
            map((data) => data.filter(x => !this.selectedReviewers.some(y => y.id === x.id))),
          );
        }
        return of([]);
      })
    );
  }

  getEmployees() {
    this.employees$ = this.employeeService.findAll();
  }

  deleteEmployee(id: number) {
    const bsModalRef = this.modalService.show(ComfirmModalComponent, {
      backdrop: 'static',
      class: '',
      initialState: { header: 'Delete Employee', message: 'Are you sure you want to delete Employee?' }
    });
    bsModalRef.content.confirm.subscribe((flag: boolean) => {
      if (flag) {
        this.employeeService.delete(id).subscribe(() => {
          this.globalService.successNotification('Successfully Deleted');
          this.getEmployees();
        });
      }
    });
  }

  openEmployeeModal(id?: number) {
    const bsModalRef = this.modalService.show(EmployeeAddModalComponent, {
      backdrop: 'static',
      class: 'modal-lg',
      initialState: { id }
    });
    bsModalRef.content.onSave.subscribe((emp: Employee) => {
      this.getEmployees();
    });
  }


  openEmployeeView(id: number, name: string) {
    this.modalService.show(EmployeeViewModalComponent, {
      // backdrop: 'static',
      class: '',
      initialState: { id, name }
    });
  }

  selectReviewer(event) {
    this.search = undefined;
    this.selectedReviewers.push(event.item);
  }

  removeReviewer(index: number) {
    this.selectedReviewers.splice(index, 1);
  }

  popoverShow(id: number) {
    this.selectedReviewers = [];
    this.empId = id;
    this.search = undefined;
    this.getAssignees();
  }

  assignReviewer() {
    this.hiddenBtn.nativeElement.click();
    this.reviewService.assignEmployeeForReview(this.selectedReviewers.map(x => x.id), this.empId).subscribe((response: string) => {
      this.selectedReviewers = [];
      this.globalService.successNotification('Successfully Assigned.');
    });
  }
}
