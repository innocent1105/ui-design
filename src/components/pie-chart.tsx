'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart';
import MainCard from './main-card';

const chartData = [
	{ browser: 'Chrome', visitors: 275, fill: 'hsl(var(--chart-1))' },
	{ browser: 'safari', visitors: 200, fill: 'hsl(var(--chart-2))' },
	{ browser: 'Safari', visitors: 287, fill: 'hsl(var(--chart-3))' },
	{ browser: 'Edge', visitors: 173, fill: 'hsl(var(--chart-4))' },
	{ browser: 'Other', visitors: 190, fill: 'hsl(var(--chart-4))' }
];

const chartConfig = chartData
	.map((item) => ({
		label: item.browser,
		color: item.fill
	}))
	.reduce(
		(acc, curr) => ({
			...acc,
			[curr.label]: curr.color
		}),
		{} as Record<string, string>
	) as unknown as ChartConfig;

export function PieChartComponent() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);

	return (
		<>
			<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
				<PieChart>
					<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
					<Pie
						data={chartData}
						dataKey="visitors"
						nameKey="browser"
						innerRadius={70}
						strokeWidth={5}
					>
						<Label
							content={({ viewBox }) => {
								if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground text-3xl font-bold"
											>
												{totalVisitors.toLocaleString()}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 24}
												className="fill-muted-foreground"
											>
												Visitors
											</tspan>
										</text>
									);
								}
							}}
						/>
					</Pie>
				</PieChart>
			</ChartContainer>

			<div className="flex flex-wrap items-center justify-center gap-4">
				{chartData.map((item) => (
					<div key={item.browser} className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
						<span className="text-muted-foreground text-sm">
							{item.browser} ({((item.visitors / totalVisitors) * 100).toFixed(1)}%)
						</span>
					</div>
				))}
			</div>
		</>
	);
}
