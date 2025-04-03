import { PageBreadcrumb } from './page-breadcrumb';

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface PageHeaderProps {
	items: BreadcrumbItem[];
	heading?: string;
}

export function PageHeader({ items, heading }: PageHeaderProps) {
	return (
		<>
			<PageBreadcrumb items={items} />
			{heading && (
				<h2 className="heading text-3xl leading-14 !font-bold tracking-tight">{heading}</h2>
			)}
		</>
	);
}
