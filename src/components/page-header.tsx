import { PageBreadcrumb } from './page-breadcrumb';

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface PageHeaderProps {
	items: BreadcrumbItem[];
	heading: string;
	children?: React.ReactNode;
}

export function PageHeader({ items, heading, children }: PageHeaderProps) {
	return (
		<>
			<PageBreadcrumb items={items} />
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2">
					<h2 className="heading text-2xl sm:text-3xl leading-tight sm:leading-14 !font-bold tracking-tight">
						{heading}
					</h2>
				</div>
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
					{children}
				</div>
			</div>
		</>
	);
}
