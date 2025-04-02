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
				<h1 className="heading text-4xl leading-14 !font-bold tracking-tight">{heading}</h1>
			)}
		</>
	);
}
