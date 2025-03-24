import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import { AppSidebar } from '@/layout/AppSidebar';
import { useState } from 'react';

const AppLayout: React.FC = () => {
	const [ open, setOpen ] = useState(false);
	return (
		<SidebarProvider open={open}>
			<AppSidebar open={open} setOpen={setOpen} />
			<SidebarInset>
				<AppHeader />
				<div className="flex-1 p-4">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default AppLayout;
