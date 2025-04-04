import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { Employee, employees } from '@/constants/TableConstants';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import CustomSearch from '@/components/custom-controls/custom-search';
import { DateRange } from 'react-day-picker';
import { CustomDateRangePicker } from '@/components/custom-controls/custom-date-range-picker';
const ITEMS_PER_PAGE = 5;

const Tables = () => {
	const [employeesData, setEmployeesData] = useState(employees);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(Math.ceil(employees.length / ITEMS_PER_PAGE));
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const [paginatedData, setPaginatedData] = useState<Employee[]>([]);
	const [search, setSearch] = useState('');
	const [dateRange, setDateRange] = useState<DateRange>();

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
							className="w-full sm:w-[230px]"
							placeholder="Search name here"
						/>

						<div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
							<CustomDateRangePicker
								date={dateRange}
								onDateChange={setDateRange}
								className="w-full sm:w-[230px]"
							/>
						</div>
						<div>
							<Button
								variant="default"
								variantClassName="primary"
								leftIcon={<PlusIcon />}
								className="w-full sm:w-auto"
							>
								CTA Button
							</Button>
						</div>
					</div>
				</div>
			</PageHeader>

			<div>
				<DataTable
					employeesData={employeesData}
					data={paginatedData as unknown as Employee[]}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
					setEmployeesData={setEmployeesData}
				/>
			</div>
		</>
	);
};

export default Tables;
