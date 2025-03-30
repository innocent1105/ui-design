'use client';
import BasicForm from '@/components/basic-form';
import FormCard from '@/components/form-card';
import { HorizontalForm } from '@/components/horizontal-form';
import { ListView } from '@/components/list-view';
import { ListViewWithSwitch } from '@/components/list-view-with-switch';
import { CardContent } from '@/components/ui/card';
import { ValidationForm } from '@/components/validation-form';

export default function FormView() {
	return (
		<div className="flex min-h-screen">
			<main className="flex-1 space-y-4 p-1">
				<div className="flex items-center space-x-2">
					<nav className="flex items-center space-x-2 text-sm text-muted-foreground">
						<a href="/" className="text-foreground hover:text-primary">
							Home Page
						</a>
						<span>/</span>
						<span>Form View</span>
					</nav>
				</div>
				<h1 className="text-3xl font-semibold tracking-tight text-[#325adb] !font-bold">Form View</h1>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
					<FormCard title="Basic Form">
						<BasicForm />
					</FormCard>
					<FormCard title="Validation">
						<ValidationForm />
					</FormCard>
				</div>
				<FormCard title="Horizontal Form">
					<CardContent>
						<HorizontalForm />
					</CardContent>
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
