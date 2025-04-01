import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FormCardProps {
	title: string;
	children: React.ReactNode;
}

const MainCard: React.FC<FormCardProps> = ({ title, children }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg leading-2 font-medium">{title}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default MainCard;
