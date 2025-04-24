import CardWrapper from '@/components/card-wrapper';
import ListView from '@/components/form-view/list-view';
import ListViewWithSwitch from '@/components/form-view/list-view-with-switch';
import PageHeader from '@/components/navigation/page-header';
import BasicForm from '@/components/form-view/basic-form';
import ValidationForm from '@/components/form-view/validation-form';
import HorizontalForm from '@/components/form-view/horizontal-form';

const FormView = () => {
	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Form View', href: '/form-view' }
				]}
				heading="Form View"
			/>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
				<CardWrapper title="Basic Form">
					<BasicForm />
				</CardWrapper>
				<CardWrapper title="Validation">
					<ValidationForm />
				</CardWrapper>
			</div>

			<CardWrapper title="Horizontal Form">
				<HorizontalForm />
			</CardWrapper>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
				<CardWrapper title="List View">
					<ListView />
				</CardWrapper>
				<CardWrapper title="List View with Switch">
					<ListViewWithSwitch />
				</CardWrapper>
			</div>
		</>
	);
};

export default FormView;
