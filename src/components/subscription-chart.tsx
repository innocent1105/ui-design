'use client';
import { subscriptionData } from '@/constants/ChartConstants';
import { Progress } from './ui/progress';

export function SubscriptionChart() {
	return (
		<div className="space-y-8 mt-5">
			{subscriptionData.map((item) => (
				<div key={item.code} className="flex items-center gap-6">
					<div className="flex items-center gap-4 min-w-[200px]">
						<div className="w-10 h-10 rounded-full overflow-hidden border border-border/50">
							<img
								src={`https://flagcdn.com/${item.code}.svg`}
								alt={`${item.country} flag`}
								className="w-full h-full object-cover"
							/>
						</div>
						<div>
							<div className="font-semibold text-foreground">{item.country}</div>
							<div className="text-sm text-muted-foreground">
								{item.customers.toLocaleString()} Customers
							</div>
						</div>
					</div>
					<div className="flex-1 flex items-center gap-4">
						<Progress value={item.percentage} className="h-2 bg-primary/20" />
						<span className="text-sm font-medium min-w-[45px]">{item.percentage}%</span>
					</div>
				</div>
			))}
		</div>
	);
}
