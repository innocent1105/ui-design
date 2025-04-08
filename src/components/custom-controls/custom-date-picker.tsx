import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface ICustomDatePickerProps {
	value: Date;
	onChange: (date: Date | undefined) => void;
	className?: string;
}
import { format } from 'date-fns';

const CustomDatePicker = ({ value, onChange }: ICustomDatePickerProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start !bg-transparent text-left font-normal',
						!value && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? format(value, 'PPP') : 'Datepicker'}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
			</PopoverContent>
		</Popover>
	);
};

export default CustomDatePicker;
