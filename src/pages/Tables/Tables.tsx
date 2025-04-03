import { DataTable } from '@/components/data-table';
import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Employee, employees } from '@/constants/TableConstants';

const ITEMS_PER_PAGE = 5;

const Tables = () => {
	const [employeesData, setEmployeesData] = useState(employees);
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedData = employeesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	return (
		<div className="flex">
			<main className="flex-1 space-y-4 p-1">
				<PageHeader
					items={[
						{ label: 'Home', href: '/' },
						{ label: 'Tables', href: '/tables' }
					]}
					heading="Tables"
				/>

				<div>
					<DataTable
						data={paginatedData as unknown as Employee[]}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
						setEmployeesData={setEmployeesData}
					/>
				</div>
			</main>
		</div>
	);
};

export default Tables;
