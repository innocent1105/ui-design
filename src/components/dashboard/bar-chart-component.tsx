import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { barChartData } from '@/constants/ChartConstants';

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--color-primary)'
	}
} satisfies ChartConfig;

const BarChartComponent = () => {
	return (
		<ChartContainer config={chartConfig} className="mt-2 max-h-[300px] w-full">
			<BarChart accessibilityLayer data={barChartData} barSize={20}>
				<CartesianGrid vertical={false} />
				<YAxis
					orientation="right"
					pointsAtX={0}
					tickLine={false}
					tickFormatter={(value) => `$${value.toLocaleString()}`}
					axisLine={false}
				/>
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} animationDuration={1000} />
			</BarChart>
		</ChartContainer>
	);
};

export default BarChartComponent;
