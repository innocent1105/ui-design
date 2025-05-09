export const COLORS = [
	{ name: 'Primary', className: 'bg-primary', value: 'var(--color-primary)' },
	{ name: 'Success', className: 'bg-green-600', value: 'var(--color-success)' },
	{ name: 'Warning', className: 'bg-yellow-500', value: 'var(--color-warning)' },
	{ name: 'Danger', className: 'bg-red-600', value: 'var(--color-error)' },
	{ name: 'Muted', className: 'bg-secondary', value: 'var(--color-bg-muted)' }
];

export const INITIAL_EVENTS = [
	{
		id: '1',
		title: 'All Day Event',
		start: new Date().toISOString().slice(0, 10),
		color: COLORS[0].value
	},
	{ id: '2', title: 'Long Event', start: '2025-05-02', end: '2025-05-05', color: COLORS[2].value },
	{ id: '3', title: 'Lunch', start: '2025-05-12T12:00:00', color: COLORS[1].value },
	{ id: '4', title: 'Birthday Party', start: '2025-05-08T19:00:00', color: COLORS[1].value }
];
