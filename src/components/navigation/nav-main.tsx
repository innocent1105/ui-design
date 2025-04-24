import { ChevronRight, type LucideIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar
} from '@/components/ui/sidebar';

interface INavItem {
	title: string;
	url: string;
	icon?: LucideIcon;
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
	}[];
}

const NavMain = ({ item, selectedItem }: { item: INavItem; selectedItem: string | null }) => {
	const { open } = useSidebar();
	return (
		<SidebarGroup>
			<SidebarMenu>
				<Collapsible
					key={item.title}
					asChild
					defaultOpen={item.isActive}
					className="group/collapsible"
				>
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton
								tooltip={item.title}
								className={
									selectedItem === item.url
										? 'sidemenu-background !text-white'
										: open
											? 'sidemenu-icon-expanded'
											: 'sidemenu-icon'
								}
							>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
								<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
							</SidebarMenuButton>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								{item.items?.map((subItem) => (
									<SidebarMenuSubItem key={subItem.title}>
										<SidebarMenuSubButton asChild>
											<a href={subItem.url}>
												<span>{subItem.title}</span>
											</a>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))}
							</SidebarMenuSub>
						</CollapsibleContent>
					</SidebarMenuItem>
				</Collapsible>
			</SidebarMenu>
		</SidebarGroup>
	);
};

export default NavMain;
