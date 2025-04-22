import { revenueChartData } from '@/constants/ChartConstants';
import { LineChart, Line } from 'recharts';

export function RevenueCard() {
	return (
		<>
			<div className="space-y-2">
				<div className="flex items-baseline gap-2">
					<span className="text-3xl font-bold tracking-tight">$15,231.89</span>
				</div>
				<p className="text-muted-foreground text-sm">+20.1% from last month</p>
			</div>
			<div className="mt-10 flex h-[120px] items-center justify-center">
				<LineChart width={320} height={120} data={revenueChartData}>
					<Line type="monotone" dataKey="pv" stroke="var(--primary)" strokeWidth={2} />
				</LineChart>
			</div>
		</>
	);
}
