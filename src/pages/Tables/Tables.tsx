import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import CustomSearch from '@/components/custom-controls/custom-search';
import { DateRange } from 'react-day-picker';
import { CustomDateRangePicker } from '@/components/custom-controls/custom-date-range-picker';
import { employees } from '@/constants/TableConstants';
import { IEmployee } from '@/types/IEmployee';
import { AddEmployee } from '@/components/add-employee';
import CustomDialogWrapper from '@/components/custom-controls/custom-dialog-wrapper';

const ITEMS_PER_PAGE = 5;

const Tables = () => {
	const [employeesData, setEmployeesData] = useState(employees);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(Math.ceil(employees.length / ITEMS_PER_PAGE));
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const [paginatedData, setPaginatedData] = useState<IEmployee[]>([]);
	const [search, setSearch] = useState('');
	const [dateRange, setDateRange] = useState<DateRange>();
	const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);

	useEffect(() => {
		setPaginatedData(employeesData.slice(startIndex, startIndex + ITEMS_PER_PAGE));
	}, [currentPage, employeesData]);

	useEffect(() => {
		setTotalPages(Math.ceil(employeesData.length / ITEMS_PER_PAGE));
	}, [employeesData]);

	useEffect(() => {
		if (search?.length >= 3) {
			setCurrentPage(1);
			const filteredData = employeesData.filter((employee) =>
				employee.name.toLowerCase().includes(search.toLowerCase())
			);
			setEmployeesData(filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE));
		} else {
			setEmployeesData(employees);
		}
	}, [search]);

	useEffect(() => {
		if (dateRange?.from && dateRange?.to) {
			setCurrentPage(1);
			const filteredData = employees.filter((employee) => {
				const doj = new Date(employee.doj);
				return doj >= dateRange.from! && doj <= dateRange.to!;
			});
			setEmployeesData(filteredData);
		} else if (!dateRange?.from && !dateRange?.to) {
			setEmployeesData(employees);
		}
	}, [dateRange]);

	const handleAddEmployee = (newEmployee: IEmployee) => {
		setEmployeesData((prev) => [...prev, newEmployee]);
		setCurrentPage(Math.ceil((employeesData.length + 1) / ITEMS_PER_PAGE));
	};

	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Tables', href: '/tables' }
				]}
				heading="Tables"
			>
				<div className="space-y-4">
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row md:items-center">
						<CustomSearch
							value={search}
							onChange={setSearch}
							className="w-full sm:w-[200px]"
							placeholder="Search name here"
						/>

						<div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
							<CustomDateRangePicker
								date={dateRange}
								onDateChange={setDateRange}
								className="w-full !border-none sm:w-[250px]"
								placeholder="Filter by date"
							/>
						</div>
						<div>
							<Button
								variant="default"
								variantClassName="primary"
								leftIcon={<PlusIcon />}
								className="w-full sm:w-auto"
								onClick={() => setIsAddEmployeeDialogOpen(true)}
							>
								Add Employee
							</Button>
						</div>
					</div>
				</div>
			</PageHeader>

			<div>
				<DataTable
					employeesData={employeesData}
					data={paginatedData as unknown as IEmployee[]}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
					setEmployeesData={setEmployeesData}
				/>
			</div>

			<CustomDialogWrapper
				isOpen={isAddEmployeeDialogOpen}
				onOpenChange={setIsAddEmployeeDialogOpen}
				title="Add Employee"
			>
				<AddEmployee onOpenChange={setIsAddEmployeeDialogOpen} onSubmit={handleAddEmployee} />
			</CustomDialogWrapper>
		</>
	);
};

export default Tables;
