'use client';
import { subscriptionData } from '@/constants/ChartConstants';
import { Progress } from './ui/progress';

export function SubscriptionChart() {
	return (
		<div className="mt-5 space-y-8">
			{subscriptionData.map((item) => (
				<div key={item.code} className="flex items-center gap-6">
					<div className="flex min-w-[200px] items-center gap-4">
						<div className="border-border/50 h-10 w-10 overflow-hidden rounded-full border">
							<img
								src={`https://flagcdn.com/${item.code}.svg`}
								alt={`${item.country} flag`}
								className="h-full w-full object-cover"
							/>
						</div>
						<div>
							<div className="text-foreground font-semibold">{item.country}</div>
							<div className="text-muted-foreground text-sm">
								{item.customers.toLocaleString()} Customers
							</div>
						</div>
					</div>
					<div className="flex flex-1 items-center gap-4">
						<Progress value={item.percentage} className="bg-primary/20 h-2" />
						<span className="min-w-[45px] text-sm font-medium">{item.percentage}%</span>
					</div>
				</div>
			))}
		</div>
	);
}
