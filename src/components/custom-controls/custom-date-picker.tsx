import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';

interface ICustomDatePickerProps {
	value: Date;
	onChange: (date: Date | undefined) => void;
	className?: string;
}

const CustomDatePicker = ({ value, onChange, className }: ICustomDatePickerProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start !bg-transparent text-left font-normal',
						!value && 'text-muted-foreground',
						className
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? format(value, 'MMM do, yyyy') : 'Pick a date'}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
			</PopoverContent>
		</Popover>
	);
};

export default CustomDatePicker;
