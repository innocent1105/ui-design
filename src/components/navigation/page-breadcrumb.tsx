import React from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { useNavigate } from 'react-router';

interface IPageBreadcrumbProps {
	items: {
		label: string;
		href?: string;
	}[];
}

const PageBreadcrumb = ({ items }: IPageBreadcrumbProps) => {
	const navigate = useNavigate();

	const handleNavigation = (path: string) => {
		navigate(path);
	};
	return (
		<Breadcrumb className="mb-0 items-center">
			<BreadcrumbList>
				{items.map((item, index) => (
					<React.Fragment key={item.label}>
						<BreadcrumbItem>
							{item.href ? (
								<BreadcrumbLink
									className="cursor-pointer"
									onClick={() => item.href && handleNavigation(item.href)}
								>
									{item.label}
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage className="cursor-pointer">{item.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{index < items.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default PageBreadcrumb;
