import { PageHeader } from '@/components/page-header';

const Tables = () => {
	return (
		<div className="flex min-h-screen">
			<main className="flex-1 space-y-4 p-1">
				<PageHeader items={[ { label: 'Home', href: '/' }, { label: 'Tables', href: '/tables' } ]} />
				<h1 className="heading text-4xl leading-14 !font-bold  tracking-tight">Tables</h1>
			</main>
		</div>
	);
};

export default Tables;
