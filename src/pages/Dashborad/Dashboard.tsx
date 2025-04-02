import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
	return (
		<div className="flex min-h-screen">
			<main className="flex-1 space-y-4 p-1">
				<PageHeader
					items={[ { label: 'Home', href: '/' }, { label: 'Dashboard', href: '/' } ]}
					heading="Hello Everyone!"
				/>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
					<div className="col-span-full grid min-h-[300px] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
						<Card className="col-span-1 h-full">
							<div className="p-4" />
						</Card>
						<div className="grid grid-cols-1 gap-4">
							<Card className="col-span-1 h-full">
								<div className="p-4" />
							</Card>
							<Card className="col-span-1 h-full">
								<div className="p-4" />
							</Card>
						</div>
						<Card className="col-span-1 h-full">
							<div className="p-4" />
						</Card>
						<Card className="col-span-1 h-full">
							<div className="p-4" />
						</Card>
					</div>

					<div className="col-span-full grid min-h-[150px] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
						<Card className="col-span-1 h-full">
							<div className="p-4" />
						</Card>
						<Card className="col-span-1 h-full">
							<div className="p-4" />
						</Card>
						<Card className="col-span-1 h-full">
							<div className="p-4" />
						</Card>
						<Card className="col-span-1 h-full">
							<div className="p-4" />
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
