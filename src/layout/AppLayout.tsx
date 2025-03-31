import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/layout/AppSidebar';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const AppLayout: React.FC = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
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
