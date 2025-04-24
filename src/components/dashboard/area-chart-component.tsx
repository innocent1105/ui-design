import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { useState } from 'react';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { areaChartData } from '@/constants/ChartConstants';

const chartConfig = {
	visitors: {
		label: 'Visitors'
	},
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-1)'
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-2)'
	}
} satisfies ChartConfig;

const timeRanges = [
	{ value: '7d', label: 'Week' },
	{ value: '30d', label: 'Month' },
	{ value: '365d', label: 'Year' }
] as const;

const AreaChartComponent = () => {
	const [selectedView, setSelectedView] = useState('365d');

	const filteredData = areaChartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date('2024-06-30');
		let daysToSubtract = 365;
		if (selectedView === '30d') {
			daysToSubtract = 30;
		} else if (selectedView === '7d') {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
				{/* Legend */}
				<div className="order-2 flex items-center justify-center gap-4 sm:order-1 sm:justify-start">
					<div className="flex items-center gap-2">
						<div
							className="h-3 w-3 rounded-full"
							style={{ backgroundColor: 'var(--color-desktop)' }}
						/>
						<span className="text-muted-foreground text-sm">Desktop</span>
					</div>
					<div className="flex items-center gap-2">
						<div
							className="h-3 w-3 rounded-full"
							style={{ backgroundColor: 'var(--color-mobile)' }}
						/>
						<span className="text-muted-foreground text-sm">Mobile</span>
					</div>
				</div>

				{/* Toggle Group */}
				<div className="order-1 w-full sm:order-2 sm:w-auto">
					<ToggleGroup
						type="single"
						value={selectedView}
						onValueChange={(value) => value && setSelectedView(value)}
						variant="outline"
						className="flex w-auto rounded-md border"
					>
						{timeRanges.map((range) => (
							<ToggleGroupItem
								key={range.value}
								value={range.value}
								className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-3"
							>
								{range.label}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</div>
			</div>

			<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
				<AreaChart data={filteredData}>
					<defs>
						<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
							<stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
						</linearGradient>
						<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
							<stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
						</linearGradient>
					</defs>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="date"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						minTickGap={32}
						tickFormatter={(value) => {
							const date = new Date(value);
							return date.toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric'
							});
						}}
					/>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								labelFormatter={(value) => {
									return new Date(value).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric'
									});
								}}
								indicator="dot"
							/>
						}
					/>
					<Area
						dataKey="mobile"
						type="natural"
						fill="url(#fillMobile)"
						stroke="var(--color-mobile)"
						stackId="a"
					/>
					<Area
						dataKey="desktop"
						type="natural"
						fill="url(#fillDesktop)"
						stroke="var(--color-desktop)"
						stackId="a"
					/>
				</AreaChart>
			</ChartContainer>
		</div>
	);
};

export default AreaChartComponent;
