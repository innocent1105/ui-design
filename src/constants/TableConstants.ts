export enum EmployeeStatus {
	Assigned = 'Assigned',
	NotAssigned = 'Not Assigned',
	DriverAssigned = 'Driver Assigned'
}

type ValueOf<T> = T[keyof T];

export interface Employee {
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
}

export const employees: Employee[] = [
	{
		id: '234239864',
		name: 'Siegfried Kaiser',
		position: 'Accountant',
		office: 'Tokyo',
		age: 33,
		vehicle: {
			type: 'Gold08 (SUV)',
			code: 'SP2053'
		},
		status: EmployeeStatus.Assigned
	},
	{
		id: '23784629',
		name: 'Xavier Graden',
		position: 'Chief Executive Officer',
		office: 'London',
		age: 34,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP5853' },
		status: EmployeeStatus.Assigned
	},
	{
		id: '97453992',
		name: 'Randolph Kassim',
		position: 'Junior Technical Author',
		office: 'San Francisco',
		age: 42,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2053' },
		status: EmployeeStatus.Assigned
	},
	{
		id: '23728375',
		name: 'Derk Schartz',
		position: 'Software Engineer',
		office: 'London',
		age: 37,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2053' },
		status: EmployeeStatus.NotAssigned
	},
	{
		id: '25348894',
		name: 'Ned Quire',
		position: 'Software Engineer',
		office: 'New York',
		age: 26,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2053' },
		status: EmployeeStatus.DriverAssigned
	},
	{
		id: '34781749',
		name: 'Franklin Boenisch',
		position: 'Integration Specialist',
		office: 'New York',
		age: 41,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2053' },
		status: EmployeeStatus.NotAssigned
	},
	{
		id: '45673891',
		name: 'Sarah Chen',
		position: 'Data Analyst',
		office: 'Singapore',
		age: 29,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP4567' },
		status: EmployeeStatus.Assigned
	},
	{
		id: '56789012',
		name: 'Michael Torres',
		position: 'Product Manager',
		office: 'Berlin',
		age: 36,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP7890' },
		status: EmployeeStatus.DriverAssigned
	},
	{
		id: '67890123',
		name: 'Emma Watson',
		position: 'UX Designer',
		office: 'Paris',
		age: 31,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP3456' },
		status: EmployeeStatus.NotAssigned
	},
	{
		id: '78901234',
		name: 'James Smith',
		position: 'Senior Developer',
		office: 'Sydney',
		age: 39,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP8901' },
		status: EmployeeStatus.Assigned
	},
	{
		id: '89012345',
		name: 'Lisa Johnson',
		position: 'Marketing Manager',
		office: 'Toronto',
		age: 34,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2345' },
		status: EmployeeStatus.DriverAssigned
	},
	{
		id: '90123456',
		name: 'David Kim',
		position: 'System Architect',
		office: 'Seoul',
		age: 43,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP6789' },
		status: EmployeeStatus.Assigned
	},
	{
		id: '12345678',
		name: 'Anna Martinez',
		position: 'Quality Assurance',
		office: 'Madrid',
		age: 28,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP1234' },
		status: EmployeeStatus.NotAssigned
	},
	{
		id: '23456789',
		name: 'Thomas Anderson',
		position: 'DevOps Engineer',
		office: 'Amsterdam',
		age: 35,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP9012' },
		status: EmployeeStatus.Assigned
	},
	{
		id: '34567890',
		name: 'Maria Garcia',
		position: 'Business Analyst',
		office: 'Barcelona',
		age: 32,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP5678' },
		status: EmployeeStatus.DriverAssigned
	},
	{
		id: '45678901',
		name: 'Robert Taylor',
		position: 'Frontend Developer',
		office: 'Dublin',
		age: 27,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP3457' },
		status: EmployeeStatus.NotAssigned
	},
	{
		id: '56789123',
		name: 'Sophie Brown',
		position: 'HR Manager',
		office: 'Melbourne',
		age: 38,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP7891' },
		status: EmployeeStatus.Assigned
	},
	{
		id: '67891234',
		name: 'Alex Wong',
		position: 'Mobile Developer',
		office: 'Hong Kong',
		age: 30,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP4321' },
		status: EmployeeStatus.DriverAssigned
	},
	{
		id: '78912345',
		name: 'Isabella Silva',
		position: 'Project Manager',
		office: 'São Paulo',
		age: 36,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP8765' },
		status: EmployeeStatus.NotAssigned
	},
	{
		id: '89123456',
		name: 'Daniel Lee',
		position: 'Cloud Engineer',
		office: 'Tokyo',
		age: 33,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2468' },
		status: EmployeeStatus.Assigned
	}
];

export const statusOptions = [
	{ value: EmployeeStatus.Assigned, label: 'Assigned', color: 'text-blue-500' },
	{ value: EmployeeStatus.NotAssigned, label: 'Not Assigned', color: 'text-red-500' },
	{ value: EmployeeStatus.DriverAssigned, label: 'Driver Assigned', color: 'text-blue-500' }
] as const;
