export const COLORS = [
	{ name: 'Primary', className: 'bg-primary', value: 'var(--color-primary, #3b82f6)' },
	{ name: 'Success', className: 'bg-green-500', value: 'var(--color-success, #22c55e)' },
	{ name: 'Warning', className: 'bg-yellow-500', value: 'var(--color-warning, #fbbf24)' },
	{ name: 'Danger', className: 'bg-red-500', value: 'var(--color-danger, #ef4444)' },
	{ name: 'Muted', className: 'bg-gray-500', value: 'var(--color-muted,rgb(97, 98, 100))' }
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
