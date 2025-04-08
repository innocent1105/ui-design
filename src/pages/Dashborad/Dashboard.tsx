import { PageHeader } from '@/components/page-header';
import MatricsCard from '@/components/matrics-card';
import { BarChartComponent } from '@/components/bar-chart';
import { PieChartComponent } from '@/components/pie-chart';
import MainCard from '@/components/main-card';
import { AreaChartComponent } from '@/components/area-chart';
import { RevenueCard } from '@/components/revenue-card';
import CreditScoreChart from '@/components/credit-score-chart';

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
				<MainCard className="col-span-1 lg:col-span-4" title="Gross Monthly Revenue">
					<BarChartComponent />
				</MainCard>

				<MainCard className="col-span-1 lg:col-span-3" title="Visitors">
					<PieChartComponent />
				</MainCard>
			</div>

			<MainCard className="col-span-1 lg:col-span-4" title="Gross Monthly Revenue">
				<AreaChartComponent />
			</MainCard>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">	
				<MainCard className="col-span-1 lg:col-span-4" title="Monthly Revenue">
					<CreditScoreChart score={77} />
				</MainCard>

				<MainCard className="col-span-1 lg:col-span-4" title="Total Revenue">
					<RevenueCard />
				</MainCard>

				<MainCard className="col-span-1 lg:col-span-4" title="Exercise Minutes">
					<></>
				</MainCard>
			</div>
		</>
	);
};

export default Dashboard;
