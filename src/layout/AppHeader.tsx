import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon } from 'lucide-react';

const AppHeader: React.FC = () => {
	const { theme, setTheme } = useTheme();
	return (
		<header className="sticky top-0 flex w-full z-99999 border-b-0 bg-background">
			<div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
				<div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
					App Logo
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
