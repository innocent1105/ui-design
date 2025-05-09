import React from 'react';
import PageHeader from '@/components/navigation/page-header';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '@/components/ui/accordion';
import { faqData } from '@/constants/FaqConstants';

const FAQPage: React.FC = () => {
	return (
		<>
			<PageHeader
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'FAQ', href: '/faq' }
				]}
				heading="FAQ"
			/>

			<div className="w-full space-y-6 sm:px-0">
				<Accordion type="single" collapsible>
					{faqData.map((faq, index) => (
						<div key={index} className="flex mb-4">
							<div className="w-1 bg-primary rounded-l-lg" />
							<div className="bg-card rounded-r-lg rounded-l-none shadow flex-1">
								<AccordionItem value={`item-${index}`} className="border-none">
									<AccordionTrigger className="px-6 py-2 text-md !font-medium hover:no-underline focus:no-underline">
										{index + 1}. {faq.question}
									</AccordionTrigger>
									<div className="border-t border-muted mx-6 block data-[state=open]:hidden" data-state="closed" />
									<AccordionContent className="px-6 py-5 text-muted-foreground rounded-b-lg">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							</div>
						</div>
					))}
				</Accordion>
			</div>
		</>
	);
};

export default FAQPage;
