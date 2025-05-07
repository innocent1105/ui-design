import {
	Table,
	FormInputIcon,
	ToggleLeftIcon,
	TypeIcon,
	LayoutDashboard,
	HelpCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';

import NavMain from '@/components/navigation/nav-main';
import {
	Sidebar,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	useSidebar
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router';
import LogoLight from '@/assets/logo-light-theme.svg';
import LogoDark from '@/assets/logo-dark-theme.svg';
import { useTheme } from '@/context/ThemeContext';
import LogoSidebar from '@/assets/logo-icon.svg';

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
			url: '/tables',
			icon: Table,
			items: []
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
		},
		{
			title: 'FAQ',
			url: '/faq',
			icon: HelpCircle
		}
	]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const { open, isMobile } = useSidebar();
	const navigate = useNavigate();
	const { theme } = useTheme();

	const handleItemClick = (url: string) => {
		setSelectedItem(url);
		navigate(url);
	};

	useEffect(() => {
		setSelectedItem(window.location.pathname);
	}, [window.location.pathname]);

	const renderLogo = () => {
		if (isMobile || open) {
			return (
				<div className="grid flex-1">
					<img
						src={theme !== 'dark' ? LogoDark : LogoLight}
						alt="Logo"
						className="block h-6 w-[150px]"
					/>
				</div>
			);
		}
		return (
			<div className="flex aspect-square size-8 items-center justify-center rounded-lg">
				<img src={LogoSidebar} alt="Logo Icon" className="block h-[40px] w-[40px] p-1" />
			</div>
		);
	};

	return (
		<Sidebar collapsible="icon" {...props} data-slot="sidebar" data-state="expanded">
			<SidebarHeader className="mb-1 py-3.5">
				<SidebarMenu>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
						onClick={() => navigate('/')}
					>
						{renderLogo()}
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
									className={`cursor-pointer ${
										selectedItem === item.url
											? 'sidemenu-background !text-white'
											: !open
												? 'sidemenu-icon'
												: 'sidemenu-icon-expanded'
									}`}
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
