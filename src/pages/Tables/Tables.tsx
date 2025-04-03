import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { Employee, employees } from '@/constants/TableConstants';
import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 5;

const Tables = () => {
	const [employeesData, setEmployeesData] = useState(employees);
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const [paginatedData, setPaginatedData] = useState<Employee[]>([]);

	useEffect(() => {
		setPaginatedData(employeesData.slice(startIndex, startIndex + ITEMS_PER_PAGE));
	}, [currentPage, employeesData]);

	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Tables', href: '/tables' }
				]}
				heading="Tables"
			/>

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
