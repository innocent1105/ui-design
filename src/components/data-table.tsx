import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Employee {
	id: string;
	name: string;
	position: string;
	office: string;
	age: number;
	vehicle: {
		type: string;
		code: string;
	};
	status: 'Assigned' | 'Not Assigned' | 'Driver Assigned';
}

interface DataTableProps {
	data: Employee[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function DataTable({ data, currentPage, totalPages, onPageChange }: DataTableProps) {
	return (
		<div className="space-y-4">
			<div className="w-full">
				<Table>
					<TableHeader className="table-row-background">
						<TableRow>
							<TableHead className="rounded-l-md  !border-none pl-4">Name</TableHead>
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
								<TableCell className="pl-4">{employee.name}</TableCell>
								<TableCell>{employee.position}</TableCell>
								<TableCell>{employee.office}</TableCell>
								<TableCell>{employee.age}</TableCell>
								<TableCell>
									{employee.vehicle.type} ({employee.vehicle.code})
								</TableCell>
								<TableCell>
									<span
										className={`${employee.status === 'Assigned'
											? 'text-blue-500'
											: employee.status === 'Not Assigned' ? 'text-red-500' : 'text-blue-500'}`}
									>
										{employee.status}
									</span>
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
				<div className="text-sm text-muted-foreground">
					{currentPage} - {totalPages} of {totalPages}
				</div>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
