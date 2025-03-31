import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import MainCard from '@/components/main-card';

export default function Buttons() {
	return (
		<div className="flex min-h-screen">
			<main className="flex-1 space-y-4 p-1">
				<PageHeader
					items={[ { label: 'Home', href: '/' }, { label: 'Buttons', href: '/buttons' } ]}
					heading="Buttons"
				/>

				<div className="grid gap-4 ">
					{/* Regular Buttons */}
					<MainCard title="Buttons">
						<div className="flex flex-wrap gap-3">
							<Button className="bg-blue-600 hover:bg-blue-700">Primary</Button>
							<Button variant="secondary" className="bg-zinc-700 hover:bg-zinc-600">
								Secondary
							</Button>
							<Button className="bg-green-600 hover:bg-green-700">Success</Button>
							<Button className="bg-red-600 hover:bg-red-700">Danger</Button>
							<Button className="bg-yellow-500 text-black hover:bg-yellow-600">Warning</Button>
							<Button className="bg-sky-500 hover:bg-sky-600">Info</Button>
							<Button className="bg-zinc-200 text-black hover:bg-zinc-300">Light</Button>
							<Button className="bg-zinc-800 hover:bg-zinc-700">Dark</Button>
						</div>
					</MainCard>

					{/* Outline Buttons */}
					<MainCard title="Buttons with Outline">
						<div className="flex flex-wrap gap-3">
							<Button variant="outline" className="border-blue-600 text-blue-500 hover:bg-blue-950">
								Primary
							</Button>
							<Button variant="outline" className="border-zinc-600 text-zinc-400 hover:bg-zinc-800">
								Secondary
							</Button>
							<Button variant="outline" className="border-green-600 text-green-500 hover:bg-green-950">
								Success
							</Button>
							<Button variant="outline" className="border-red-600 text-red-500 hover:bg-red-950">
								Danger
							</Button>
							<Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-950">
								Warning
							</Button>
							<Button variant="outline" className="border-sky-500 text-sky-500 hover:bg-sky-950">
								Info
							</Button>
							<Button variant="outline" className="border-zinc-200 text-zinc-200 hover:bg-zinc-800">
								Light
							</Button>
							<Button variant="outline" className="border-zinc-700 text-zinc-400 hover:bg-zinc-800">
								Dark
							</Button>
						</div>
					</MainCard>

					{/* Background Buttons */}
					<MainCard title="Button with Background">
						<div className="flex flex-wrap gap-3">
							<Button className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30">Primary</Button>
							<Button className="bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700/60">Secondary</Button>
							<Button className="bg-green-600/20 text-green-400 hover:bg-green-600/30">Success</Button>
							<Button className="bg-red-600/20 text-red-400 hover:bg-red-600/30">Danger</Button>
							<Button className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">Warning</Button>
							<Button className="bg-sky-500/20 text-sky-400 hover:bg-sky-500/30">Info</Button>
							<Button className="bg-zinc-200/20 text-zinc-300 hover:bg-zinc-200/30">Light</Button>
							<Button className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700">Dark</Button>
						</div>
					</MainCard>

					{/* Icon Buttons */}
					<MainCard title="Button with Icons">
						<div className="flex flex-wrap gap-3">
							<Button className="bg-blue-600 hover:bg-blue-700">
								<div className="mr-2 h-4 w-4 rounded bg-white/20" />
								Primary
							</Button>
							<Button variant="secondary" className="bg-zinc-700 hover:bg-zinc-600">
								<div className="mr-2 h-4 w-4 rounded bg-white/20" />
								Secondary
							</Button>
							<Button className="bg-green-600 hover:bg-green-700">
								<div className="mr-2 h-4 w-4 rounded bg-white/20" />
								Success
							</Button>
							<Button className="bg-red-600 hover:bg-red-700">
								<div className="mr-2 h-4 w-4 rounded bg-white/20" />
								Danger
							</Button>
							<Button className="bg-yellow-500 text-black hover:bg-yellow-600">
								<div className="mr-2 h-4 w-4 rounded bg-black/20" />
								Warning
							</Button>
							<Button className="bg-sky-500 hover:bg-sky-600">
								<div className="mr-2 h-4 w-4 rounded bg-white/20" />
								Info
							</Button>
							<Button className="bg-zinc-200 text-black hover:bg-zinc-300">
								<div className="mr-2 h-4 w-4 rounded bg-black/20" />
								Light
							</Button>
							<Button className="bg-zinc-800 hover:bg-zinc-700">
								<div className="mr-2 h-4 w-4 rounded bg-white/20" />
								Dark
							</Button>
						</div>
					</MainCard>
				</div>
			</main>
		</div>
	);
}
