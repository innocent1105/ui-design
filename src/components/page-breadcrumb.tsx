import React from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface IPageBreadcrumbProps {
	items: {
		label: string;
		href?: string;
	}[];
}

export function PageBreadcrumb({ items }: IPageBreadcrumbProps) {
	return (
		<Breadcrumb className="mb-0 items-center">
			<BreadcrumbList>
				{items.map((item, index) => (
					<React.Fragment key={item.label}>
						<BreadcrumbItem>
							{item.href ? (
								<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
							) : (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{index < items.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
