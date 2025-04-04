'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import MainCard from './main-card';

const chartData = [
	{ month: 'January', desktop: 1800 },
	{ month: 'February', desktop: 3050 },
	{ month: 'March', desktop: 2370 },
	{ month: 'April', desktop: 730 },
	{ month: 'May', desktop: 2090 },
	{ month: 'June', desktop: 940 },
	{ month: 'July', desktop: 1140 },
	{ month: 'August', desktop: 3140 },
	{ month: 'September', desktop: 800 },
	{ month: 'October', desktop: 2040 },
	{ month: 'November', desktop: 1140 },
	{ month: 'December', desktop: 2140 }
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--color-primary)'
	}
} satisfies ChartConfig;

export function BarChartComponent() {
	return (
		<MainCard className="col-span-1 lg:col-span-4 " title="Gross Monthly Revenue">
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-2">
				<BarChart accessibilityLayer data={chartData} >
					<CartesianGrid vertical={false} />
					<YAxis orientation="right" pointsAtX={0} tickLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} axisLine={false} />
					<XAxis
					width={1}
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} animationDuration={1000} />
				</BarChart>
			</ChartContainer>
		</MainCard>
	);
}
