import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { COLORS, INITIAL_EVENTS } from './CalendarConstants';

const FullCalendarWidget: React.FC = () => {
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
		<div className="flex flex-col lg:flex-row gap-4">
			<div className="hidden lg:block lg:w-1/4 space-y-4">
				<div className="bg-card rounded shadow p-4">
					<h3 className="font-semibold mb-2">Draggable Events</h3>
					<div ref={externalEventsRef}>
						{externalEvents.map((event, idx) => (
							<div
								key={idx}
								className={`fc-event cursor-move px-3 py-2 rounded mb-2 text-white ${event.color}`}
								data-title={event.title}
								data-fc-color={event.fcColor}
							>
								{event.title}
							</div>
						))}
					</div>
					<div className="flex items-center mt-2">
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
				</div>
				<div className="bg-card rounded shadow p-4">
					<h3 className="font-semibold mb-2">Create Event</h3>
					<div className="flex gap-2 mb-2">
						{COLORS.map((c) => (
							<button
								key={c.value}
								className={`w-6 h-6 rounded-full border-2 ${newEventColor.value === c.value
									? 'border-black'
									: 'border-transparent'} ${c.className}`}
								onClick={() => setNewEventColor(c)}
								title={c.name}
							/>
						))}
					</div>
					<div className="flex gap-2">
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
				</div>
			</div>
			<div className="flex-1 bg-card rounded shadow p-2 sm:p-4">
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
			</div>
		</div>
	);
};

export default FullCalendarWidget;
