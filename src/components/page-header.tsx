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
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-2">
					<h2 className="heading text-2xl leading-tight !font-bold tracking-tight sm:text-3xl sm:leading-14">
						{heading}
					</h2>
				</div>
				<div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
					{children}
				</div>
			</div>
		</>
	);
}
