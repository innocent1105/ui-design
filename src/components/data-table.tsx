import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EmployeeStatus, statusOptions } from '@/constants/TableConstants';
import CustomSelect from './custom-controls/custom-select';
import { IEmployee } from '@/types/IEmployee';
import { format } from 'date-fns';

interface IDataTableProps {
	data: IEmployee[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	setEmployeesData: (data: IEmployee[]) => void;
	employeesData: IEmployee[];
}

export function DataTable({
	data,
	currentPage,
	totalPages,
	onPageChange,
	setEmployeesData,
	employeesData
}: IDataTableProps) {
	return (
		<div className="space-y-4">
			<div className="w-full">
				<Table>
					<TableHeader className="table-row-background">
						<TableRow className="!border-none">
							<TableHead className="rounded-l-md !border-none pl-4">Name</TableHead>
							<TableHead>Position</TableHead>
							<TableHead>Office</TableHead>
							<TableHead>Age</TableHead>
							<TableHead>Date of Joining</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="rounded-r-md !border-none pr-1">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="!px-3">
						{data.map((employee) => (
							<TableRow key={employee.id} className="!border-none">
								<TableCell className="pl-4">
									<h6 className="text-sm font-medium">{employee.name}</h6>
									<h6 className="text-muted-foreground mt-[4px]">{employee.id}</h6>
								</TableCell>
								<TableCell>
									<h6 className="text-sm font-medium">{employee.position}</h6>
									<h6 className="text-muted-foreground mt-[4px]">{employee.level}</h6>
								</TableCell>
								<TableCell>{employee.office}</TableCell>
								<TableCell>
									<h6 className="text-sm font-medium">{employee.age}</h6>
								</TableCell>
								<TableCell>
									<h6 className="text-sm font-medium">{format(employee.doj, 'dd MMM yyyy')}</h6>
								</TableCell>
								<TableCell>
									<CustomSelect
										defaultValue={employee.status}
										onValueChange={(value) => {
											setEmployeesData(
												employeesData.map((emp) =>
													emp.id === employee.id ? { ...emp, status: value as EmployeeStatus } : emp
												)
											);
										}}
										options={statusOptions.map((option) => ({
											value: option.value,
											label: option.label,
											color: option.color
										}))}
										placeholder="Select status"
										className={`w-[150px] !border-none ${
											employee.status === EmployeeStatus.Assigned
												? 'bg-blue-500/10 text-blue-500 [&>svg]:!text-blue-500'
												: employee.status === EmployeeStatus.NotAssigned
													? 'bg-red-500/10 text-red-500 [&>svg]:!text-red-500'
													: 'bg-blue-500/10 text-blue-500 [&>svg]:!text-blue-500'
										}`}
									/>
								</TableCell>
								<TableCell>
									<Button variant="outline" size="sm" variantClassName={'primary'}>
										Reassign
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2">
				<div className="text-muted-foreground text-sm">
					{currentPage} - {totalPages} of {totalPages}
				</div>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					leftIcon={<ChevronLeft className="h-4 w-4" />}
				/>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					leftIcon={<ChevronRight className="h-4 w-4" />}
				/>
			</div>
		</div>
	);
}
