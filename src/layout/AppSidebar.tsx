import { MenuIcon, DoorClosedIcon, Table, FormInputIcon, ToggleLeftIcon,  TypeIcon, LayoutDashboard } from 'lucide-react';

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
	return (
		<Sidebar collapsible="icon" >
			<SidebarHeader className='py-3.5 mb-1'>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							{!open ? (
								<MenuIcon className="w-5 h-5" onClick={() => setOpen(!open)} />
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
						<NavMain item={item} />
					) : (
						<SidebarGroup key={item.title}>
							<SidebarMenuButton tooltip={item.title} onClick={() => window.location.href = item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
						</SidebarGroup>
					)
			)}
		</Sidebar>
	);
}
