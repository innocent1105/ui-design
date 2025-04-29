import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon } from 'lucide-react';
import LogoLight from '../assets/logo-light-theme.svg';
import LogoDark from '../assets/logo-dark-theme.svg';

const AppHeader: React.FC = () => {
	const { theme, setTheme } = useTheme();
	return (
		<header className="bg-background sticky top-0 z-10 flex w-full border-b-0 py-3">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1 cursor-pointer" />
				<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

				<div className="flex w-full items-center justify-center gap-2 sm:w-auto">
					<img
						src={theme !== 'dark' ? LogoDark : LogoLight}
						alt="Logo Light"
						className="block w-[150px] h-6"
					/>
				</div>
			</div>
			<div className="flex grow flex-col items-center justify-end pr-2 lg:flex-row lg:px-6">
				<Button
					variant="ghost"
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
