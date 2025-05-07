import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon, SettingsIcon, ChevronDownIcon, UserIcon, LogOutIcon } from 'lucide-react';
import CustomSearch from '@/components/custom-controls/custom-search';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const dropdownMenuItems = [
  { label: 'Profile', icon: UserIcon },
  { label: 'Settings', icon: SettingsIcon },
  { label: 'Logout', icon: LogOutIcon, link: '/login' }
];

const AppHeader: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
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

      <div className="flex items-center gap-2 pr-2 lg:px-6">
        <Button
          variant="ghost"
          variantClassName="light"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              variantClassName="light"
              className="ml-2 min-w-[48px] h-8 rounded-full flex items-center"
            >
              <div className="bg-primary ml-[-11px] text-white font-bold flex items-center justify-center rounded-full w-8 h-8 text-sm">
                MI
              </div>
              <ChevronDownIcon className="h-2 w-2 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2 px-3 min-w-[180px]">
            <div className="px-2 pt-1 pb-2 border-b border-muted mb-2">
              <div className="font-semibold text-sm text-foreground">Mobisoft Infotech</div>
              <div className="text-xs text-muted-foreground">business@mobisoftinfotech.com</div>
            </div>
            {dropdownMenuItems.map(({ label, icon: Icon, link }) => (
              <DropdownMenuItem key={label} onClick={() => navigate(link || '')}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default AppHeader;
