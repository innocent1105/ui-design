import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CustomSelect from '@/components/custom-controls/custom-select';
import {
	EmployeeStatus,
	levelOptions,
	officeOptions,
	positionOptions,
	statusOptions
} from '@/constants/TableConstants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import CustomDatePicker from '../custom-controls/custom-date-picker';

interface IAddEmployeeProps {
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: any) => void;
}

const formSchema = z.object({
	name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
	position: z.string({ required_error: 'Please select a position.' }),
	office: z.string({ required_error: 'Please select an office.' }),
	age: z
		.number()
		.min(18, { message: 'Age must be at least 18.' })
		.max(65, { message: 'Age must be less than 65.' }),
	status: z.nativeEnum(EmployeeStatus, { required_error: 'Please select a status.' }),
	level: z.string({ required_error: 'Please select a level.' }),
	doj: z.string({ required_error: 'Please select date of joining.' })
});

export function AddEmployee({ onOpenChange, onSubmit }: IAddEmployeeProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			position: positionOptions[0].value,
			office: officeOptions[0].value,
			age: 18,
			status: EmployeeStatus.NotAssigned,
			level: levelOptions[0].value,
			doj: new Date().toISOString().split('T')[0]
		}
	});

	function onFormSubmit(values: z.infer<typeof formSchema>) {
		const data = {
			...values,
			id: Math.random().toString(36).substr(2, 9)
		};
		onSubmit(data);
		onOpenChange(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4 py-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel className="text-right">Name</FormLabel>
							<FormControl className="col-span-3">
								<Input {...field} placeholder="Enter name" />
							</FormControl>
							<FormMessage className="col-span-3 col-start-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="position"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel className="text-right">Position</FormLabel>
							<FormControl className="col-span-3">
								<CustomSelect
									value={field.value}
									onValueChange={field.onChange}
									options={positionOptions}
									placeholder="Select position"
								/>
							</FormControl>
							<FormMessage className="col-span-3 col-start-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="office"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel className="text-right">Office</FormLabel>
							<FormControl className="col-span-3">
								<CustomSelect
									value={field.value}
									onValueChange={field.onChange}
									options={officeOptions}
									placeholder="Select office"
								/>
							</FormControl>
							<FormMessage className="col-span-3 col-start-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel className="text-right">Age</FormLabel>
							<FormControl className="col-span-3">
								<Input
									type="number"
									min={18}
									max={65}
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage className="col-span-3 col-start-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="doj"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel className="text-right">Date of Joining</FormLabel>
							<FormControl className="col-span-3">
								<CustomDatePicker
									value={field.value as unknown as Date}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage className="col-span-3 col-start-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel className="text-right">Status</FormLabel>
							<FormControl className="col-span-3">
								<CustomSelect
									value={field.value}
									onValueChange={field.onChange}
									options={statusOptions as unknown as { value: string; label: string }[]}
									placeholder="Select status"
								/>
							</FormControl>
							<FormMessage className="col-span-3 col-start-2" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="level"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel className="text-right">Level</FormLabel>
							<FormControl className="col-span-3">
								<CustomSelect
									value={field.value}
									onValueChange={field.onChange}
									options={levelOptions}
									placeholder="Select level"
								/>
							</FormControl>
							<FormMessage className="col-span-3 col-start-2" />
						</FormItem>
					)}
				/>

				<div className="mt-[10px] mb-[-20px] flex justify-end gap-2">
					<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button type="submit">Add Employee</Button>
				</div>
			</form>
		</Form>
	);
}

export default AddEmployee;
