'use client';
import { BasicForm } from '@/components/basic-form';
import { HorizontalForm } from '@/components/horizontal-form';
import { ListView } from '@/components/list-view';
import { ListViewWithSwitch } from '@/components/list-view-with-switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ValidationForm } from '@/components/validation-form';

export default function FormView() {
	return (
		<div className="flex min-h-screen bg-[#fafafa]">
			<main className="flex-1 space-y-4 p-1">
				<div className="flex items-center space-x-2">
					<nav className="flex items-center space-x-2 text-sm text-muted-foreground">
						<a href="#" className="text-foreground hover:text-primary">
							Home Page
						</a>
						<span>/</span>
						<span>Form View</span>
					</nav>
				</div>
				<h1 className="text-3xl font-semibold tracking-tight text-[#325adb]">Form View</h1>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Basic Form</CardTitle>
						</CardHeader>
						<CardContent>
							<BasicForm />
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Validation</CardTitle>
						</CardHeader>
						<CardContent>
							<ValidationForm />
						</CardContent>
					</Card>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Horizontal Form</CardTitle>
					</CardHeader>
					<CardContent>
						<HorizontalForm />
					</CardContent>
				</Card>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>List View</CardTitle>
						</CardHeader>
						<CardContent>
							<ListView />
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>List View with Switch</CardTitle>
						</CardHeader>
						<CardContent>
							<ListViewWithSwitch />
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
