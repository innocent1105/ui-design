import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon } from 'lucide-react';
import CustomSearch from '@/components/custom-controls/custom-search';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const AppHeader: React.FC = () => {
	const { theme, setTheme } = useTheme();
	const [ searchQuery, setSearchQuery ] = useState('');
	const navigate = useNavigate();

	const handleSearch = (value: string) => {
		setSearchQuery(value);
	};

	return (
		<header className="bg-background sticky top-0 z-10 flex w-full border-b-0 py-3">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1 cursor-pointer" />
				<Separator orientation="vertical" className="mx-2 !bg-secondary data-[orientation=vertical]:h-4" />
				<CustomSearch
					value={searchQuery}
					onChange={handleSearch}
					placeholder="Type keywords..."
					className="w-full !border-[1px] !border-border"
					onKeyDownEnter={() => {
						navigate(`/`);
						setSearchQuery('');
					}}
				/>
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
