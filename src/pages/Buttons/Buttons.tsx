import { Button } from '@/components/ui/button';
import PageHeader from '@/components/navigation/page-header';
import CardWrapper from '@/components/card-wrapper';
import { Folder } from 'lucide-react';

const Buttons = () => {
	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Buttons', href: '/buttons' }
				]}
				heading="Buttons"
			/>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<CardWrapper title="Buttons">
					<div className="flex flex-wrap gap-3">
						<Button variant="default" variantClassName="primary">
							Primary
						</Button>
						<Button variant="default" variantClassName="secondary">
							Secondary
						</Button>
						<Button variant="default" variantClassName="success">
							Success
						</Button>
						<Button variant="default" variantClassName="danger">
							Danger
						</Button>
						<Button variant="default" variantClassName="warning">
							Warning
						</Button>
						<Button variant="default" variantClassName="info">
							Info
						</Button>
						<Button variant="default" variantClassName="light">
							Light
						</Button>
						<Button variant="default" variantClassName="dark">
							Dark
						</Button>
					</div>
				</CardWrapper>

				<CardWrapper title="Buttons with Outline">
					<div className="flex flex-wrap gap-3">
						<Button variant="outline" variantClassName="primary">
							Primary
						</Button>
						<Button variant="outline" variantClassName="secondary">
							Secondary
						</Button>
						<Button variant="outline" variantClassName="success">
							Success
						</Button>
						<Button variant="outline" variantClassName="danger">
							Danger
						</Button>
						<Button variant="outline" variantClassName="warning">
							Warning
						</Button>
						<Button variant="outline" variantClassName="info">
							Info
						</Button>
						<Button variant="outline" variantClassName="light">
							Light
						</Button>
						<Button variant="outline" variantClassName="dark">
							Dark
						</Button>
					</div>
				</CardWrapper>

				<CardWrapper title="Button with Background">
					<div className="flex flex-wrap gap-3">
						<div className="flex flex-wrap gap-3">
							<Button variant="ghost" variantClassName="primary">
								Primary
							</Button>
							<Button variant="ghost" variantClassName="secondary">
								Secondary
							</Button>
							<Button variant="ghost" variantClassName="success">
								Success
							</Button>
							<Button variant="ghost" variantClassName="danger">
								Danger
							</Button>
							<Button variant="ghost" variantClassName="warning">
								Warning
							</Button>
							<Button variant="ghost" variantClassName="info">
								Info
							</Button>
							<Button variant="ghost" variantClassName="light">
								Light
							</Button>
							<Button variant="ghost" variantClassName="dark">
								Dark
							</Button>
						</div>
					</div>
				</CardWrapper>

				<CardWrapper title="Button with Icons">
					<div className="flex flex-wrap items-center gap-4">
						<Button
							variant="default"
							variantClassName="primary"
							leftIcon={<Folder className="h-4 w-4" />}
						>
							Primary
						</Button>
						<Button
							variant="default"
							variantClassName="secondary"
							leftIcon={<Folder className="h-4 w-4" />}
						>
							Secondary
						</Button>
						<Button
							variant="default"
							variantClassName="success"
							leftIcon={<Folder className="h-4 w-4" />}
						>
							Success
						</Button>
						<Button
							variant="default"
							variantClassName="danger"
							leftIcon={<Folder className="h-4 w-4" />}
						>
							Danger
						</Button>
						<Button
							variant="default"
							variantClassName="warning"
							leftIcon={<Folder className="h-4 w-4" />}
						>
							Warning
						</Button>
						<Button
							variant="default"
							variantClassName="info"
							leftIcon={<Folder className="h-4 w-4" />}
						>
							Info
						</Button>
						<Button
							variant="default"
							variantClassName="light"
							leftIcon={<Folder className="h-4 w-4" />}
						>
							Light
						</Button>
						<Button
							variant="default"
							variantClassName="dark"
							leftIcon={<Folder className="h-4 w-4" />}
						>
							Dark
						</Button>
					</div>
				</CardWrapper>
			</div>
		</>
	);
};

export default Buttons;
