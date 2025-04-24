import { revenueChartData } from '@/constants/ChartConstants';
import { LineChart, Line } from 'recharts';

const LineChartComponent = () => {
	return (
		<LineChart width={320} height={120} data={revenueChartData}>
			<Line type="monotone" dataKey="pv" stroke="var(--primary)" strokeWidth={2} />
		</LineChart>
	);
};

export default LineChartComponent;
