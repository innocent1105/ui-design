import { MenuIcon, DoorClosedIcon, Table, FormInputIcon, ToggleLeftIcon,  TypeIcon, LayoutDashboard } from 'lucide-react';
import { useEffect, useState } from 'react';

import { NavMain } from '@/components/nav-main';
import {
	Sidebar,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
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
				{
					title: 'Genesis',
					url: '#'
				},
				{
					title: 'Explorer',
					url: '#'
				},
				{
					title: 'Quantum',
					url: '#'
				}
			]
		},
		{
			title: 'Form View',
			url: '/form-view',
			icon: FormInputIcon
		},
		{
			title: 'Buttons',
			url: '#',
			icon: ToggleLeftIcon
		},
		{
			title: 'Typography',
			url: '#',
			icon: TypeIcon
		}
	]
};

export function AppSidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const handleItemClick = (url: string) => {
		setSelectedItem(url);
		window.location.href = url; // Navigate to the selected URL
	};
	useEffect(() => {
		setSelectedItem(window.location.pathname);
	}, [window.location.pathname]);

	return (
		<Sidebar collapsible="icon" >
			<SidebarHeader className='py-3.5 mb-1'>
				<SidebarMenu >
					<SidebarMenuItem >
						<SidebarMenuButton className='!sidemenu-icon'>
								{!open ? (
									<MenuIcon className="w-5 h-5" onClick={() => setOpen(!open)}  />
								) : (
									<DoorClosedIcon className="w-5 h-5" onClick={() => setOpen(!open)} />
								)}
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			{data.navMain.map(
				(item) =>
					item?.items && item?.items.length > 0 ? (
						<NavMain item={item} selectedItem={selectedItem}/>
					) : (
						<SidebarGroup key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								onClick={() => handleItemClick(item.url)}
								className={selectedItem === item.url ? 'sidemenu-background !text-white' : 'sidemenu-icon'}
							>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</SidebarMenuButton>
						</SidebarGroup>
					)
			)}
		</Sidebar>
	);
}
