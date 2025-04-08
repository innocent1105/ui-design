import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

interface ISelectProps {
	value?: string;
	defaultValue?: string;
	onValueChange: (value: string) => void;
	options: { value: string; label: string; color?: string }[];
	placeholder: string;
	className?: string;
}

const CustomSelect = ({
	value,
	defaultValue,
	onValueChange,
	options,
	placeholder,
	className
}: ISelectProps) => {
	return (
		<Select value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
			<SelectTrigger className={`w-full ${className}`}>
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
