import PageBreadcrumb from './page-breadcrumb';

interface IBreadcrumbItem {
	label: string;
	href?: string;
}

interface IPageHeaderProps {
	items: IBreadcrumbItem[];
	heading: string;
	children?: React.ReactNode;
}

const PageHeader = ({ items, heading, children }: IPageHeaderProps) => {
	document.title =
		(items?.length > 1 && items.find((_, index) => index === items.length - 1)?.label) || heading;
	return (
		<>
			<PageBreadcrumb items={items} />
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-2">
					<h1 className="heading text-4xl leading-tight !font-bold tracking-tight sm:text-3xl sm:leading-14">
						{heading}
					</h1>
				</div>
				<div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
					{children}
				</div>
			</div>
		</>
	);
};

export default PageHeader;
