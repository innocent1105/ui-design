import CardWrapper from '@/components/card-wrapper';
import PageHeader from '@/components/navigation/page-header';

const Typography = () => {
	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Typography', href: '/typography' }
				]}
				heading="Typography"
			/>
			<div className="grid gap-4">
				<CardWrapper title="Body Copy">
					<p className="mb-4 text-lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget
						dolor. Aenean massa.
					</p>
					<p className="text-sm">
						Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
						rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis
						pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
						vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
						ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
						viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
						nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
						Maecenas tempus, tellus eget.Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id,
						lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero
						venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
						Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed
						consequat, leo eget bibendum sodales, augue velit cursus nunc.
					</p>
				</CardWrapper>

				<CardWrapper title="Headings">
					<div className="space-y-6">
						<div>
							<h1 className="text-4xl font-bold">Headline 1</h1>
						</div>

						<div>
							<h2 className="text-3xl font-bold">Headline 2</h2>
						</div>

						<div>
							<h3 className="text-2xl font-semibold">Headline 3</h3>
						</div>

						<div>
							<h4 className="text-xl font-semibold">Headline 4</h4>
						</div>
					</div>
				</CardWrapper>

				<CardWrapper title="Subtitle">
					<div className="space-y-4">
						<div>
							<h5 className="text-base font-medium">Subtitle 1</h5>
						</div>

						<div>
							<h6 className="text-sm font-medium">Subtitle 2</h6>
						</div>

						<div>
							<p className="text-xs font-medium">Subtitle 3</p>
						</div>
					</div>
				</CardWrapper>
			</div>
		</>
	);
};

export default Typography;
