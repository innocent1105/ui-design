import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '../ui/card';
import { COLORS, INITIAL_EVENTS } from '@/constants/CalendarConstants';

const CalendarWidget: React.FC = () => {
	const [ events, setEvents ] = useState(INITIAL_EVENTS);
	const [ externalEvents, setExternalEvents ] = useState([
		{ title: 'Lunch', color: COLORS[1].className, fcColor: COLORS[1].value },
		{ title: 'Go home', color: COLORS[2].className, fcColor: COLORS[2].value },
		{ title: 'Do homework', color: COLORS[4].className, fcColor: COLORS[4].value },
		{ title: 'Work on UI design', color: COLORS[0].className, fcColor: COLORS[0].value },
		{ title: 'Sleep tight', color: COLORS[3].className, fcColor: COLORS[3].value }
	]);
	const [ removeAfterDrop, setRemoveAfterDrop ] = useState(false);
	const [ newEventTitle, setNewEventTitle ] = useState('');
	const [ newEventColor, setNewEventColor ] = useState(COLORS[0]);
	const externalEventsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (externalEventsRef.current) {
			const draggable = new Draggable(externalEventsRef.current, {
				itemSelector: '.fc-event',
				eventData: function(eventEl) {
					return {
						title: eventEl.getAttribute('data-title'),
						color: eventEl.getAttribute('data-fc-color'),
						extendedProps: {
							fcColor: eventEl.getAttribute('data-fc-color')
						}
					};
				}
			});

			return () => {
				draggable.destroy();
			};
		}
	}, []);

	const handleEventReceive = (info: any) => {
		const isDuplicate = events.some(
			(event) => event.title === info.event.title && event.start === info.event.start
		);

		if (!isDuplicate) {
			setEvents((prev) => [
				...prev,
				{
					id: String(Date.now()),
					title: info.event.title,
					start: info.event.start,
					color: info.event.extendedProps.fcColor || info.event.backgroundColor
				}
			]);
			if (removeAfterDrop) {
				setExternalEvents((prev) => prev.filter((e) => e.title !== info.event.title));
			}
		}
	};

	const handleAddExternalEvent = () => {
		if (newEventTitle.trim()) {
			setExternalEvents([
				...externalEvents,
				{ title: newEventTitle, color: newEventColor.className, fcColor: newEventColor.value }
			]);
			setNewEventTitle('');
		}
	};

	return (
		<div className="flex flex-col gap-4 lg:flex-row">
			<div className="hidden space-y-4 lg:block lg:w-1/4">
				<Card className="flex flex-col gap-2 p-4">
					<h3 className="mb-2 font-semibold">Draggable Events</h3>
					<div ref={externalEventsRef}>
						{externalEvents.map((event, idx) => (
							<div
								key={idx}
								className={`fc-event mb-2 cursor-move rounded px-3 py-2 text-white ${event.color}`}
								data-title={event.title}
								data-fc-color={event.fcColor}
							>
								{event.title}
							</div>
						))}
					</div>
					<div className="mt-2 mb-2 flex items-center">
						<Checkbox
							id="remove-after-drop"
							checked={removeAfterDrop}
							onCheckedChange={(checked) => setRemoveAfterDrop(checked as boolean)}
							className="mr-2"
						/>
						<label htmlFor="remove-after-drop" className="text-sm">
							remove after drop
						</label>
					</div>
				</Card>
				<Card className="flex flex-col gap-2 p-4">
					<h3 className="mb-2 font-semibold">Create Event</h3>
					<div className="mb-2 flex gap-2">
						{COLORS.map((c) => (
							<button
								key={c.value}
								className={`h-6 w-6 rounded-full border-2 ${newEventColor.value === c.value
									? 'border-black'
									: 'border-transparent'} ${c.className}`}
								onClick={() => setNewEventColor(c)}
								title={c.name}
							/>
						))}
					</div>
					<div className="mb-2 flex gap-2">
						<Input
							type="text"
							className="flex-1"
							placeholder="Event Title"
							value={newEventTitle}
							onChange={(e) => setNewEventTitle(e.target.value)}
						/>
						<Button onClick={handleAddExternalEvent} variantClassName="primary">
							Add
						</Button>
					</div>
				</Card>
			</div>
			<Card className="flex-1 p-2 sm:p-4">
				<style>
					{`
						
					`}
				</style>
				<FullCalendar
					plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
					headerToolbar={{
						left: 'prev,next today',
						center: 'title',
						right: 'dayGridMonth,timeGridWeek,timeGridDay'
					}}
					initialView="dayGridMonth"
					editable={true}
					droppable={true}
					events={events}
					eventReceive={handleEventReceive}
					height="auto"
					aspectRatio={1.35}
				/>
			</Card>
		</div>
	);
};

export default CalendarWidget;
