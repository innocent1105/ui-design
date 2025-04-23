import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, Smartphone, SunIcon } from 'lucide-react';

const AppHeader: React.FC = () => {
	const { theme, setTheme } = useTheme();
	return (
		<header className="bg-background sticky top-0 z-10 flex w-full border-b-0 py-3">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
				<div className="flex w-full items-center justify-center gap-2 sm:w-auto">
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<Smartphone className="size-4" />
					</div>
					<div className="grid text-sm leading-tight">
						<span className="truncate font-semibold">MOBISOFT INFOTECH</span>
					</div>
				</div>
			</div>
			<div className="flex grow flex-col items-center justify-end pr-2 lg:flex-row lg:px-6">
				<Button
					variantClassName="light"
					size="icon"
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					{theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
				</Button>
			</div>
		</header>
	);
};
export default AppHeader;
