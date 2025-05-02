import { format, isValid } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn, useIsMobile } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState, useEffect } from 'react';
import CustomSelect from './custom-select';
import CustomDatePicker from './custom-date-picker';

interface IDateRangePickerProps {
	date?: DateRange;
	onDateChange?: (date: DateRange | undefined) => void;
	className?: string;
	placeholder?: string;
}

const CustomDateRangePicker = ({
	date,
	onDateChange,
	className,
	placeholder
}: IDateRangePickerProps) => {
	const [dateRange, setDateRange] = useState<DateRange | undefined>(date);
	const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(date);
	const [open, setOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState<Date>(dateRange?.from || new Date());
	const [fromDate, setFromDate] = useState(
		dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : ''
	);
	const [toDate, setToDate] = useState(dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '');
	const isMobile = useIsMobile();
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
		e.stopPropagation();
		setDateRange(undefined);
		setTempDateRange(undefined);
		setFromDate('');
		setToDate('');
		onDateChange?.(undefined);
	};

	const handleManualDateChange = (from: string, to: string) => {
		const fromDateObj = new Date(from);
		const toDateObj = new Date(to);

		if (isValid(fromDateObj) && isValid(toDateObj) && fromDateObj <= toDateObj) {
			const newRange = { from: fromDateObj, to: toDateObj };
			setTempDateRange(newRange);
			setCurrentMonth(fromDateObj);
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
								className="hover:bg-destructive/10 absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1"
								onClick={handleClearClick}
							>
								<X className="text-muted-foreground hover:text-destructive h-4 w-4" />
							</button>
						)}
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-[calc(100vw-2rem)] max-w-[500px] p-0" align="start">
					<div className="flex flex-col gap-2 border-b p-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
							<CustomDatePicker
								value={tempDateRange?.from || new Date()}
								onChange={(date) => {
									if (date) {
										const newFromDate = format(date, 'yyyy-MM-dd');
										setFromDate(newFromDate);
										if (toDate) {
											handleManualDateChange(newFromDate, toDate);
										} else {
											const newRange = { from: date, to: date };
											setTempDateRange(newRange);
											setCurrentMonth(date);
										}
									}
								}}
								className="w-full sm:w-[150px]"
							/>
							<span className="text-muted-foreground text-center">to</span>
							<CustomDatePicker
								value={tempDateRange?.to || new Date()}
								onChange={(date) => {
									if (date) {
										const newToDate = format(date, 'yyyy-MM-dd');
										setToDate(newToDate);
										if (fromDate) {
											handleManualDateChange(fromDate, newToDate);
										} else {
											const newRange = { from: date, to: date };
											setTempDateRange(newRange);
											setCurrentMonth(date);
										}
									}
								}}
								className="w-full sm:w-[150px]"
							/>
						</div>
						<CustomSelect
							options={years}
							defaultValue={currentMonth.getFullYear().toString()}
							onValueChange={handleYearChange}
							placeholder=""
							className="w-full sm:w-[100px]"
						/>
					</div>

					<div className="overflow-x-auto">
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
							numberOfMonths={isMobile ? 1 : 2}
						/>
					</div>
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
};
export default CustomDateRangePicker;
