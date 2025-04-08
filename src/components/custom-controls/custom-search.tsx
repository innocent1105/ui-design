import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface ICustomSearchProps {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	className?: string;
}
const CustomSearch = ({ value, onChange, placeholder, className }: ICustomSearchProps) => {
	return (
		<div
			className={cn('!bg-input-background relative w-full flex-1 rounded-md border-none sm:max-w-xs', className)}
		>
			<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
			<Input
				placeholder={placeholder}
				className="border-none pl-9"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default CustomSearch;
