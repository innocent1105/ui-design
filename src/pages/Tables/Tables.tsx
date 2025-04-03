import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Employee, employees } from '@/constants/TableConstants';
import { PlusIcon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 5;

const Tables = () => {
	const [employeesData, setEmployeesData] = useState(employees);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(Math.ceil(employees.length / ITEMS_PER_PAGE));
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const [paginatedData, setPaginatedData] = useState<Employee[]>([]);
	const [search, setSearch] = useState('');

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
					<div className="flex items-center justify-between gap-4">
						<div className="w-[300px] relative max-w-xs flex-1 border-none rounded-md !bg-input-background">
							<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform " />
							<Input placeholder="Search name here" className=" border-none pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
						</div>

						<div className="flex items-center gap-4">
							{/* <DatePickerWithRange className="bg-background/50" > */}

							<Button variant="default" variantClassName="primary" leftIcon={<PlusIcon />}>
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
