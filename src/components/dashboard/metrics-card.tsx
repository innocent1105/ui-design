import { statsData } from '@/constants/ChartConstants';
import CardWrapper from '../card-wrapper';
import { Button } from '../ui/button';

const MetricsCard = () => {
	return (
		<>
			{statsData.map((item) => (
				<CardWrapper key={item.title}>
					<div className="flex items-start justify-between space-y-2">
						<div>
							<p className="text-muted-foreground mb-2 text-sm font-medium">{item.title}</p>
							<p className="mb-2 text-2xl font-bold">{item.value}</p>
							<p className="text-muted-foreground text-sm">
								<span className={`${Number(item.change) < 0 ? 'text-red-500' : 'text-green-500'}`}>
									{item.change}%
								</span>{' '}
								from last month
							</p>
						</div>
						<Button variant="default" size="icon" variantClassName={'primary'}>
							<item.icon className="h-6 w-6" />
						</Button>
					</div>
				</CardWrapper>
			))}
		</>
	);
};

export default MetricsCard;
