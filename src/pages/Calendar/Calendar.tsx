import React from 'react';
import PageHeader from '@/components/navigation/page-header';
import FullCalendarWidget from '@/components/calendar/FullCalendarWidget';

const CalendarPage: React.FC = () => (
	<>
		<PageHeader
			items={[
				{ label: 'Home', href: '/' },
				{ label: 'Calendar', href: '/calendar' }
			]}
			heading="Calendar"
		/>
		<FullCalendarWidget />
	</>
);

export default CalendarPage;
