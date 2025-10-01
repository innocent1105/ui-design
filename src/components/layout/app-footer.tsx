import React from 'react';
import { cn } from '@/lib/utils';

const AppFooter: React.FC = () => {
	return (
		<footer
			data-slot="app-footer"
			className={cn(
				'bg-background mt-6 border-t py-6',
				'data-[state=open]:animate-in data-[state=closed]:animate-out'
			)}
		>
			<div className="px-8">
				<div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
					<div className="w-full text-center md:text-right">
						<p className="text-muted-foreground text-sm">
							{/* From {' '} */} ZRA {' '} 
							<a
								href="#"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600"
							>
								{/* Cynite Technologies */}
								TaxScope AI
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default AppFooter;
