import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PageHeader } from '@/components/page-header';
import MatricsCard from '@/components/matrics-card';
import { BarChartComponent } from '@/components/bar-chart';
import { PieChartComponent } from '@/components/pie-chart';

const Dashboard = () => {
	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Dashboard', href: '/' }
				]}
				heading="Hello Everyone!"
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<MatricsCard />
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
				<BarChartComponent />
				<PieChartComponent />
			</div>
		</>
	);
};

export default Dashboard;
