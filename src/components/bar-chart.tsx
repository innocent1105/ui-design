'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import MainCard from './main-card';

const chartData = [
	{ month: 'January', desktop: 186 },
	{ month: 'February', desktop: 305 },
	{ month: 'March', desktop: 237 },
	{ month: 'April', desktop: 73 },
	{ month: 'May', desktop: 209 },
	{ month: 'June', desktop: 94 },
	{ month: 'July', desktop: 114 },
	{ month: 'August', desktop: 314 },
	{ month: 'September', desktop: 80 },
	{ month: 'October', desktop: 204 },
	{ month: 'November', desktop: 114 },
	{ month: 'December', desktop: 214 }
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--color-primary)'
	},
} satisfies ChartConfig;

export function BarChartComponent() {
	return (
		<MainCard className="col-span-1 lg:col-span-4">
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={chartData} >
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						width={5}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} animationDuration={1000} />
				</BarChart>
			</ChartContainer>
		</MainCard>
	);
}
