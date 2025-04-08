import { EmployeeStatus } from "@/constants/TableConstants";

type ValueOf<T> = T[keyof T];

export interface IEmployee {
	id: string;
	name: string;
	position: string;
	office: string;
	age: number;
	vehicle: {
		type: string;
		code: string;
	};
	status: ValueOf<typeof EmployeeStatus>;
	level: string;
}