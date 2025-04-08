import { format, parse, isValid } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState, useEffect } from 'react';
import CustomSelect from './custom-select';
import { Input } from '@/components/ui/input';

interface IDateRangePickerProps {
	date?: DateRange;
	onDateChange?: (date: DateRange | undefined) => void;
	className?: string;
	placeholder?: string;
}

export function CustomDateRangePicker({ date, onDateChange, className, placeholder }: IDateRangePickerProps) {
	const [dateRange, setDateRange] = useState<DateRange | undefined>(date);
	const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(date);
	const [open, setOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState<Date>(dateRange?.from || new Date());
	const [fromDate, setFromDate] = useState(
		dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : ''
	);
	const [toDate, setToDate] = useState(dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '');

	// Generate years array (e.g., current year ± 10 years)
	const years = Array.from({ length: 21 }, (_, i) => {
		const year = new Date().getFullYear() - 10 + i;
		return { value: year.toString(), label: year.toString() };
	});

	const handleYearChange = (year: string) => {
		const newDate = new Date(currentMonth);
		newDate.setFullYear(parseInt(year));
		setCurrentMonth(newDate);
	};

	const handleOkClick = () => {
		setDateRange(tempDateRange);
		onDateChange?.(tempDateRange);
		setOpen(false);
	};

	const handleCancelClick = () => {
		setTempDateRange(dateRange);
		setOpen(false);
	};

	const handleClearClick = (e: React.MouseEvent) => {
		console.log('handleClearClick');
		e.stopPropagation();
		setDateRange(undefined);
		setTempDateRange(undefined);
		setFromDate('');
		setToDate('');
		onDateChange?.(undefined);
	};

	const handleManualDateChange = (start: string, end: string) => {
		const from = parse(start, 'yyyy-MM-dd', new Date());
		const to = parse(end, 'yyyy-MM-dd', new Date());

		if (isValid(from) && isValid(to)) {
			const newRange = { from, to };
			setTempDateRange(newRange);
			if (from <= to) {
				setCurrentMonth(from);
			}
		}
	};

	useEffect(() => {
		if (tempDateRange?.from) {
			setFromDate(format(tempDateRange.from, 'yyyy-MM-dd'));
		}
		if (tempDateRange?.to) {
			setToDate(format(tempDateRange.to, 'yyyy-MM-dd'));
		}
	}, [tempDateRange]);

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div className="relative">
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
								<span>{placeholder}</span>
							)}
						</Button>
						{dateRange && (
							<button
								type="button"
								className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-destructive/10"
								onClick={handleClearClick}
							>
								<X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
							</button>
						)}
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<div className="hidden items-center justify-between gap-2 border-b p-3 sm:flex">
						<div className="flex items-center gap-2">
							<Input
								type="date"
								value={fromDate}
								onChange={(e) => {
									const newFromDate = e.target.value;
									setFromDate(newFromDate);
									if (newFromDate && toDate) {
										handleManualDateChange(newFromDate, toDate);
									}
								}}
								className="w-[130px]"
							/>
							<span className="text-muted-foreground">to</span>
							<Input
								type="date"
								value={toDate}
								onChange={(e) => {
									const newToDate = e.target.value;
									setToDate(newToDate);
									if (fromDate && newToDate) {
										handleManualDateChange(fromDate, newToDate);
									}
								}}
								className="w-[130px]"
							/>
						</div>
						<CustomSelect
							options={years}
							defaultValue={currentMonth.getFullYear().toString()}
							onValueChange={handleYearChange}
							placeholder=""
							className="w-[100px]"
						/>
					</div>

					<Calendar
						initialFocus
						mode="range"
						defaultMonth={currentMonth}
						month={currentMonth}
						onMonthChange={setCurrentMonth}
						selected={tempDateRange}
						onSelect={(range) => {
							setTempDateRange(range);
							if (range?.from) setFromDate(format(range.from, 'yyyy-MM-dd'));
							if (range?.to) setToDate(format(range.to, 'yyyy-MM-dd'));
						}}
						numberOfMonths={2}
					/>
					<div className="flex items-center justify-end gap-2 border-t p-3">
						<Button variant="outline" size="sm" onClick={handleCancelClick}>
							Cancel
						</Button>
						<Button
							size="sm"
							onClick={handleOkClick}
							disabled={!tempDateRange?.from || !tempDateRange?.to}
						>
							OK
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
