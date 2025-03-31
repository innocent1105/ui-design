'use client';
import BasicForm from '@/components/basic-form';
import FormCard from '@/components/form-card';
import { HorizontalForm } from '@/components/horizontal-form';
import { ListView } from '@/components/list-view';
import { ListViewWithSwitch } from '@/components/list-view-with-switch';
import { PageHeader } from '@/components/page-header';
import { ValidationForm } from '@/components/validation-form';

export default function FormView() {
	return (
		<div className="flex min-h-screen">
			<main className="flex-1 space-y-4 p-1">
				<PageHeader
					items={[ { label: 'Home', href: '/' }, { label: 'Form View', href: '/form-view' } ]}
					heading="Form View"
				/>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
					<FormCard title="Basic Form">
						<BasicForm />
					</FormCard>
					<FormCard title="Validation">
						<ValidationForm />
					</FormCard>
				</div>
				<FormCard title="Horizontal Form">
					<HorizontalForm />
				</FormCard>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
					<FormCard title="List View">
						<ListView />
					</FormCard>
					<FormCard title="List View with Switch">
						<ListViewWithSwitch />
					</FormCard>
				</div>
			</main>
		</div>
	);
}
