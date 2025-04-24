import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Music, Rabbit, Cigarette, MessageSquare } from 'lucide-react';

const ListViewWithSwitch = () => {
	const [preferences, setPreferences] = useState({
		music: true,
		pets: true,
		smoking: false,
		conversations: false
	});

	const handleToggle = (key: keyof typeof preferences) => {
		setPreferences({
			...preferences,
			[key]: !preferences[key]
		});
	};

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Preferences</h3>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Music className="text-muted-foreground h-5 w-5" />
						<span>Music</span>
					</div>
					<Switch checked={preferences.music} onCheckedChange={() => handleToggle('music')} />
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Rabbit className="text-muted-foreground h-5 w-5" />
						<span>Pets</span>
					</div>
					<Switch checked={preferences.pets} onCheckedChange={() => handleToggle('pets')} />
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Cigarette className="text-muted-foreground h-5 w-5" />
						<span>Smoking</span>
					</div>
					<Switch checked={preferences.smoking} onCheckedChange={() => handleToggle('smoking')} />
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<MessageSquare className="text-muted-foreground h-5 w-5" />
						<span>Conversations</span>
					</div>
					<Switch
						checked={preferences.conversations}
						onCheckedChange={() => handleToggle('conversations')}
					/>
				</div>
			</div>
		</div>
	);
};

export default ListViewWithSwitch;
