import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PageHeader } from '@/components/page-header';
import MatricsCard from '@/components/matrics-card';

const Dashboard = () => {
	return (
		<>
			<PageHeader
				items={[ { label: 'Home', href: '/' }, { label: 'Dashboard', href: '/' } ]}
				heading="Hello Everyone!"
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<MatricsCard />
			</div>

			{/* Overview and Recent Sales */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
				<Card className="col-span-1 lg:col-span-4">
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">{/* Add your chart component here */}</CardContent>
				</Card>

				<Card className="col-span-1 lg:col-span-3">
					<CardHeader>
						<CardTitle>Recent Sales</CardTitle>
						<p className="text-sm text-muted-foreground">You made 265 sales this month.</p>
					</CardHeader>
					<CardContent>
						<div className="space-y-8">
							{[
								{
									name: 'Olivia Martin',
									email: 'olivia.martin@email.com',
									amount: '+$1,999.00'
								},
								{
									name: 'Jackson Lee',
									email: 'jackson.lee@email.com',
									amount: '+$39.00'
								}
								// Add more sales data...
							].map((sale) => (
								<div key={sale.email} className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<Avatar>
											<AvatarFallback>{sale.name[0]}</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium">{sale.name}</p>
											<p className="text-sm text-muted-foreground">{sale.email}</p>
										</div>
									</div>
									<p className="text-sm font-medium">{sale.amount}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default Dashboard;
