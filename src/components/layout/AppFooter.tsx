import React from 'react';
import { cn } from '@/lib/utils';

const AppFooter: React.FC = () => {
	const currentYear = new Date().getFullYear();
	const footerLinks = [
		{
			href: 'https://mobisoftinfotech.com',
			label: 'Website'
		},
		{
			href: 'https://mobisoftinfotech.com/privacy-policy',
			label: 'Privacy Policy'
		}
	];

	return (
		<footer
			data-slot="app-footer"
			className={cn(
				'border-t bg-background mt-6 py-6',
				'data-[state=open]:animate-in data-[state=closed]:animate-out'
			)}
		>
			<div className="container mx-auto px-8">
				<div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
					<div className="text-center md:text-left">
						<p className="text-muted-foreground text-sm">
							© {currentYear} Mobisoft Infotech. All rights reserved.
						</p>
					</div>
					<div className="flex items-center gap-8">
						{footerLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground text-sm transition-colors"
							>
								{link.label}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default AppFooter;
