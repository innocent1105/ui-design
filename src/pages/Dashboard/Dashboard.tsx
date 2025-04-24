import PageHeader from '@/components/navigation/page-header';
import MetricsCard from '@/components/dashboard/metrics-card';
import BarChartComponent from '@/components/dashboard/bar-chart-component';
import PieChartComponent from '@/components/dashboard/pie-chart-component';
import CardWrapper from '@/components/card-wrapper';
import AreaChartComponent from '@/components/dashboard/area-chart-component';
import RevenueCard from '@/components/dashboard/revenue-card';
import SubscriptionOverviewCard from '@/components/dashboard/subscription-overview-card';
import CreditScoreCard from '@/components/dashboard/credit-score-chart';

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
				<MetricsCard />
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
				<CardWrapper className="col-span-1 lg:col-span-4" title="Monthly Target">
					<CreditScoreCard score={77} />
				</CardWrapper>

				<CardWrapper className="col-span-1 lg:col-span-4" title="Total Revenue">
					<RevenueCard />
				</CardWrapper>

				<CardWrapper className="col-span-1 lg:col-span-4" title="Subscription Overview">
					<SubscriptionOverviewCard />
				</CardWrapper>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
				<CardWrapper className="col-span-1 lg:col-span-4" title="Gross Monthly Revenue">
					<BarChartComponent />
				</CardWrapper>

				<CardWrapper className="col-span-1 lg:col-span-3" title="Visitors">
					<PieChartComponent />
				</CardWrapper>
			</div>

			<CardWrapper className="col-span-1 lg:col-span-4" title="Overall Revenue">
				<AreaChartComponent />
			</CardWrapper>
		</>
	);
};

export default Dashboard;
