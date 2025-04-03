import { Activity, DollarSign, LucideIcon, ShoppingCart, Users } from 'lucide-react';
import MainCard from './main-card';
import { Button } from './ui/button';

interface StatCardProps {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
}

const statsData: StatCardProps[] = [
	{
		title: 'Total Revenue',
		value: '$45,231.89',
		change: '+20.1',
		icon: DollarSign
	},
	{
		title: 'Subscriptions',
		value: '2350',
		change: '+180.1',
		icon: Users
	},
	{
		title: 'Sales',
		value: '12,234',
		change: '-19',
		icon: ShoppingCart
	},
	{
		title: 'Active Now',
		value: '573',
		change: '+20',
		icon: Activity
	}
];
const MatricsCard = () => {
	return (
		<>
			{statsData.map((item) => (
				<MainCard key={item.title} >
					<div className="flex items-start justify-between space-y-2">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-2">{item.title}</p>
							<p className="text-2xl font-bold mb-2">{item.value}</p>
							<p className="text-sm text-muted-foreground">
								<span className= { `${Number(item.change) < 0 ? 'text-red-500' : 'text-green-500'}`}>{item.change}%</span> from last month
							</p>
						</div>
						<Button variant="default" size="icon" variantClassName={"primary"}>
							<item.icon className="h-6 w-6" />
						</Button>
					</div>
				</MainCard>
			))}
		</>
	);
};

export default MatricsCard;
