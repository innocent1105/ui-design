import { DataTable } from '@/components/data-table';
import { useState } from 'react';
import { employees } from './data';
import { PageBreadcrumb } from '@/components/page-breadcrumb';

const ITEMS_PER_PAGE = 5;

const Tables = () => {
	const [ currentPage, setCurrentPage ] = useState(1);
	const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedData = employees.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	return (
		<div className="flex">
			<main className="flex-1 space-y-4 p-1">
				<PageBreadcrumb items={[ { label: 'Home', href: '/' }, { label: 'Tables', href: '/tables' } ]} />
				<h1 className="heading text-4xl leading-14 !font-bold  tracking-tight">Tables</h1>

				<div>
					<DataTable
						data={paginatedData}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
			</main>
		</div>
	);
};

export default Tables;
