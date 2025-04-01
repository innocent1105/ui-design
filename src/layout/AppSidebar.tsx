import {
	Table,
	FormInputIcon,
	ToggleLeftIcon,
	TypeIcon,
	LayoutDashboard,
	Smartphone
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { NavMain } from '@/components/nav-main';
import {
	Sidebar,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	useSidebar
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/',
			icon: LayoutDashboard,
			isActive: true
		},
		{
			title: 'Tables',
			url: '#',
			icon: Table,
			items: [
			]
		},
		{
			title: 'Form View',
			url: '/form-view',
			icon: FormInputIcon
		},
		{
			title: 'Buttons',
			url: '/buttons',
			icon: ToggleLeftIcon
		},
		{
			title: 'Typography',
			url: '/typography',
			icon: TypeIcon
		}
	]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const { open } = useSidebar();
	console.log(open);
	const handleItemClick = (url: string) => {
		setSelectedItem(url);
		window.location.href = url; // Navigate to the selected URL
	};
	useEffect(() => {
		setSelectedItem(window.location.pathname);
	}, [window.location.pathname]);
	return (
		<Sidebar collapsible="icon" {...props} data-slot="sidebar" data-state="expanded">
			<SidebarHeader className="mb-1 py-3.5">
				<SidebarMenu>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
							<Smartphone className="size-4" />
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">MOBISOFT INFOTECH</span>
						</div>
					</SidebarMenuButton>
				</SidebarMenu>
			</SidebarHeader>
			{data.navMain.map((item) => {
				return (
					<div key={item.title}>
						{item?.items && item?.items.length > 0 ? (
							<NavMain item={item} selectedItem={selectedItem} />
						) : (
							<SidebarGroup key={item.title}>
								<SidebarMenuButton
									tooltip={item.title}
									onClick={() => handleItemClick(item.url)}
									className={
										selectedItem === item.url
											? 'sidemenu-background !text-white'
											: !open
												? 'sidemenu-icon'
												: 'sidemenu-icon-expanded'
									}
								>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarGroup>
						)}
					</div>
				);
			})}
		</Sidebar>
	);
}
