import { BookOpen, Bot, Settings2, SquareTerminal, MenuIcon, DoorClosedIcon } from 'lucide-react';

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
			url: '#',
			icon: SquareTerminal,
			isActive: true
		},
		{
			title: 'Tables',
			url: '#',
			icon: Bot,
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
			url: '#',
			icon: BookOpen
		},
		{
			title: 'Buttons',
			url: '#',
			icon: Settings2
		},
		{
			title: 'Typography',
			url: '#',
			icon: Settings2
		}
	]
};

export function AppSidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
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
			{/* <SidebarContent>

				<NavMain items={data.navMain} />
			</SidebarContent> */}
			{data.navMain.map(
				(item) =>
					item?.items && item?.items.length > 0 ? (
						<NavMain item={item} />
					) : (
						<SidebarGroup key={item.title}>
							<SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
						</SidebarGroup>
					)
			)}
		</Sidebar>
	);
}
