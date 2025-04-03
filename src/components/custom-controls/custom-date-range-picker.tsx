'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
	date?: DateRange | undefined;
	onDateChange?: (date: DateRange | undefined) => void;
}

export function CustomDateRangePicker({ date, onDateChange, className }: DateRangePickerProps) {
	const [dateRange, setDateRange] = React.useState<DateRange | undefined>(date);

	const handleDateChange = (range: DateRange | undefined) => {
		setDateRange(range);
		onDateChange?.(range);
	};

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={'outline'}
						className={cn(
							'!bg-card w-full justify-start text-left font-normal sm:w-[300px]',
							!date && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{dateRange?.from ? (
							dateRange.to ? (
								<>
									{format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
								</>
							) : (
								format(dateRange.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date range</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={dateRange?.from}
						selected={dateRange}
						onSelect={handleDateChange}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
