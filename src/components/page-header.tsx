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
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h2 className="heading text-3xl leading-14 !font-bold tracking-tight">{heading}</h2>
				</div>
				<div className="flex items-center gap-2">{children}</div>
			</div>
		</>
	);
}
