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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Employee, EmployeeStatus, statusOptions } from '@/constants/TableConstants';

interface DataTableProps {
	data: Employee[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	setEmployeesData: (data: Employee[]) => void;
	employeesData: Employee[];
}

export function DataTable({
	data,
	currentPage,
	totalPages,
	onPageChange,
	setEmployeesData,
	employeesData
}: DataTableProps) {
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
							<TableHead>Vehicle</TableHead>
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
									<h6 className="text-sm font-medium">{employee.vehicle.type} </h6>
									<h6 className="text-muted-foreground mt-[4px]">
										Jasck - {employee.vehicle.code}
									</h6>
								</TableCell>
								<TableCell>
									<Select
										defaultValue={employee.status}
										onValueChange={(value) => {
											setEmployeesData(
												employeesData.map((emp) => {
													if (emp.id === employee.id) {
														return { ...emp, status: value as EmployeeStatus };
													}
													return emp;
												})
											);
										}}
									>
										<SelectTrigger
											className={`w-[140px] !border-none ${
												employee.status === EmployeeStatus.Assigned
													? 'bg-blue-500/10 text-blue-500 [&>svg]:!text-blue-500'
													: employee.status === EmployeeStatus.NotAssigned
														? 'bg-red-500/10 text-red-500 [&>svg]:!text-red-500'
														: 'bg-blue-500/10 text-blue-500 [&>svg]:!text-blue-500'
											}`}
										>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											{statusOptions.map((option) => (
												<SelectItem
													key={option.value}
													value={option.value}
													className={option.color}
												>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
