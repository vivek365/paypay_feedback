import { Employee } from 'src/app/admin/model/employee';

export class Review {
	id: number;
	employee: Employee;
	reviewer: Employee;
	reviewDate: Date;
	reviewerRating: number;
	activeStatus: boolean;
	comment: string;
}
