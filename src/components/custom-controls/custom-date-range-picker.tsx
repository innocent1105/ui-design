'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

interface DateRangePickerProps {
	date?: DateRange;
	onDateChange?: (date: DateRange | undefined) => void;
	className?: string;
}

export function CustomDateRangePicker({ date, onDateChange, className }: DateRangePickerProps) {
	const [dateRange, setDateRange] = useState<DateRange | undefined>(date);
	const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(date);
	const [open, setOpen] = useState(false);

	const handleOkClick = () => {
		setDateRange(tempDateRange);
		onDateChange?.(tempDateRange);
		setOpen(false);
	};

	const handleCancelClick = () => {
		setTempDateRange(dateRange);
		setOpen(false);
	};

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={'outline'}
						className={cn(
							'!bg-card w-full justify-start text-left font-normal',
							!dateRange && 'text-muted-foreground',
							className
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
						defaultMonth={tempDateRange?.from}
						selected={tempDateRange}
						onSelect={setTempDateRange}
						numberOfMonths={2}
						
						
					/>
					<div className="flex items-center justify-end gap-2 p-3 border-t">
						<Button
							variant="outline"
							size="sm"
							onClick={handleCancelClick}
						>
							Cancel
						</Button>
						<Button
							size="sm"
							onClick={handleOkClick}
						>
							OK
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
