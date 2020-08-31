import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIHelperService } from 'src/app/common/service/api-helper.service';
import { Employee } from '../model/employee';

const PATH = 'user';

@Injectable()
export class EmployeeService {

  constructor(
    private api: APIHelperService
  ) { }

  findAll(): Observable<Employee[]> {
    return this.api.get(PATH);
  }

  findById(id: number): Observable<Employee> {
    return this.api.get(PATH + '/' + id);
  }

  saveOrUpdate(employee: Employee): Observable<Employee> {
    return this.api.post(PATH, employee);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(PATH + '/' + id);
  }

  isAlreadyExist(type: string, value: string) {
    return this.api.get(PATH + '/' + type + '/isAlreadyExist/' + value, true);
  }

  findAllForAssign(id: number, search: string) {
    return this.api.get(PATH + '/' + id + '/assignee/' + search, true);
  }
}
