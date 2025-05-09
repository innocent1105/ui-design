import React from 'react';
import PageHeader from '@/components/navigation/page-header';
import CalendarWidget from '@/components/calendar/calendar-widget';

const CalendarPage: React.FC = () => (
	<>
		<PageHeader
			items={[
				{ label: 'Home', href: '/' },
				{ label: 'Calendar', href: '/calendar' }
			]}
			heading="Calendar"
		/>
		<CalendarWidget />
	</>
);

export default CalendarPage;
