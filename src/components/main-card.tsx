import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface MainCardProps {
	title?: string;
	children: React.ReactNode;
	className?: string;
}

const MainCard: React.FC<MainCardProps> = ({ title, children, className }) => {
	return (
		<Card className={className}>
			{title && (
				<CardHeader>
					<CardTitle className="text-lg leading-2 font-medium">{title}</CardTitle>
				</CardHeader>
			)}
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default MainCard;
