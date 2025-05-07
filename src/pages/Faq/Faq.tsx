import React from 'react';
import PageHeader from '@/components/navigation/page-header';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '@/components/ui/accordion';

interface FAQItem {
	question: string;
	answer: string;
}

const faqData: FAQItem[] = [
	{
		question: 'What is this admin theme?',
		answer:
			'This is a modern administrative dashboard theme built with React and Tailwind CSS. It provides a comprehensive set of UI components, layouts, and features designed specifically for building powerful admin interfaces.'
	},
	{
		question: 'How do I get started with this theme?',
		answer:
			'To get started, you can explore the various components and layouts available in the dashboard. The theme includes pre-built pages for tables, forms, typography, and other common admin features. You can customize these components to match your specific needs.'
	},
	{
		question: 'What features are included in this theme?',
		answer:
			'The theme includes a responsive layout, dark/light mode support, customizable components, pre-built pages, and a modern design system. It also features a collapsible sidebar, breadcrumb navigation, and various UI components like buttons, cards, and form elements.'
	},
	{
		question: 'How can I customize the theme?',
		answer:
			'You can customize the theme by modifying the Tailwind configuration, updating the color scheme, adjusting the layout components, and modifying the component styles. The theme is built with customization in mind, making it easy to adapt to your brand and requirements.'
	},
	{
		question: 'Is this theme suitable for my project?',
		answer:
			"This theme is ideal for building modern web applications that require an administrative interface. It's perfect for dashboards, content management systems, e-commerce admin panels, and any application that needs a professional admin interface."
	},
	{
		question: 'Does the theme support third-party integrations?',
		answer:
			'Yes, the theme is designed to be easily integrated with popular third-party libraries and APIs, such as authentication providers, analytics tools, and data visualization libraries.'
	},
	{
		question: 'How do I install the admin theme?',
		answer:
			'To install the admin theme, clone the repository and run `npm install` or `yarn install` in your project directory. Then, start the development server with `npm start` or `yarn start`.'
	},
	{
		question: 'What is the project structure?',
		answer:
			'The project is organized into key folders such as `src/components` for reusable UI elements, `src/pages` for different routes, and `src/styles` for global styles. Each feature or page typically has its own directory for better maintainability.'
	},
	{
		question: 'How can I contact support or get help?',
		answer:
			'If you need assistance, please visit our Contact Us page or email business@mobisoftinfotech.com. Our team will respond as soon as possible.'
	}
];

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
									<AccordionTrigger className="px-6 py-2 text-lg hover:no-underline focus:no-underline">
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
