import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ISelectProps {
	defaultValue: string;
	onValueChange: (value: string) => void;
	options: { [key: string]: string }[];
	placeholder: string;
	className?: string;
}

const CustomSelect = ({ defaultValue, onValueChange, options, placeholder, className }: ISelectProps) => {
	return (
		<Select
			defaultValue={defaultValue}
			onValueChange={(value) => {
				onValueChange(value);
			}}
		>
			<SelectTrigger className={className}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value} className={option.color}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default CustomSelect;
