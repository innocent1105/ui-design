import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ListView = () => {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<Avatar className="h-10 w-10">
					<AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
					<AvatarFallback>OC</AvatarFallback>
				</Avatar>
				<div className="font-medium">Oran Chanofsky</div>
			</div>
			<div className="grid grid-cols-2 gap-4 border-t pt-4">
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground text-sm">Type</span>
				</div>
				<div className="text-sm">Player</div>
			</div>
			<div className="grid grid-cols-2 gap-4 border-t pt-4">
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground text-sm">Watchlist</span>
				</div>
				<div className="text-sm">Yes</div>
			</div>
			<div className="grid grid-cols-2 gap-4 border-t pt-4">
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground text-sm">Unique ID</span>
				</div>
				<div className="text-sm">PAX6867842</div>
			</div>
		</div>
	);
};

export default ListView;
