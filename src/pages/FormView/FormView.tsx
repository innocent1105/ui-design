'use client';
import BasicForm from '@/components/basic-form';
import MainCard from '@/components/main-card';
import { HorizontalForm } from '@/components/horizontal-form';
import { ListView } from '@/components/list-view';
import { ListViewWithSwitch } from '@/components/list-view-with-switch';
import { PageHeader } from '@/components/page-header';
import { ValidationForm } from '@/components/validation-form';

export default function FormView() {
	return (
		<>
			<PageHeader
				items={[ { label: 'Home', href: '/' }, { label: 'Form View', href: '/form-view' } ]}
				heading="Form View"
			/>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
				<MainCard title="Basic Form">
					<BasicForm />
				</MainCard>
				<MainCard title="Validation">
					<ValidationForm />
				</MainCard>
			</div>
			<MainCard title="Horizontal Form">
				<HorizontalForm />
			</MainCard>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
				<MainCard title="List View">
					<ListView />
				</MainCard>
				<MainCard title="List View with Switch">
					<ListViewWithSwitch />
				</MainCard>
			</div>
		</>
	);
}
