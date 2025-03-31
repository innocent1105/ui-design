import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, Smartphone, SunIcon } from 'lucide-react';

const AppHeader: React.FC = () => {
	const { theme, setTheme } = useTheme();
	return (
		<header className="sticky top-0 flex w-full z-99999 border-b-0 bg-background py-3">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 ">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
				<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground ">
					<Smartphone className="size-4" />
				</div>
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-semibold">MOBISOFT INFOTECH</span>
				</div>
			</div>
			<div className="flex flex-col items-center justify-end grow lg:flex-row lg:px-6">
				<Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
					{theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
				</Button>
			</div>
		</header>
	);
};
export default AppHeader;
