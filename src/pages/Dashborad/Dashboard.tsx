import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
	return (
		<div className="flex min-h-screen">
			<main className="flex-1 space-y-4 p-1">
				<PageHeader items={[ { label: 'Home', href: '/' }, { label: 'Dashboard', href: '/' } ]} />
				<h1 className="heading text-4xl leading-14 !font-bold  tracking-tight">Hello Everyone!</h1>
				{/* Dashboard Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{/* Grid Row 1 */}
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 col-span-full min-h-[300px]">
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

					{/* Grid Row 2 */}
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 col-span-full min-h-[150px]">
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
