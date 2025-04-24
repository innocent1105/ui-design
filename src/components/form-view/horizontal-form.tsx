import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import RequiredAsterisk from '../required-asterisk';
import { z } from 'zod';
import { radioOptions } from '@/constants/FormConstants';
import CustomFileUpload from '../custom-controls/custom-file-upload';

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters'),
	radioOption: z.string().min(1, 'Please select an option'),
	checkMe: z.boolean(),
	identityProof: z
		.instanceof(FileList)
		.refine((files) => files.length > 0, 'Identity proof is required')
		.refine((files) => files[0]?.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
		.refine(
			(files) => ['application/pdf', 'image/jpeg', 'image/png'].includes(files[0]?.type),
			'Only PDF, JPEG, and PNG files are allowed'
		)
});

const HorizontalForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			radioOption: 'option1',
			checkMe: false
		}
	});

	function onSubmit(data: FormValues) {
		console.log(data);
		// Handle form submission
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-start gap-4 md:grid-cols-12">
							<FormLabel className="col-span-2 text-sm font-medium">
								Email Address <RequiredAsterisk />
							</FormLabel>
							<div className="col-span-10">
								<FormControl>
									<Input placeholder="Enter Email" {...field} autoComplete="off" />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-start gap-4 md:grid-cols-12">
							<FormLabel className="col-span-2 text-sm font-medium">
								Password <RequiredAsterisk />
							</FormLabel>
							<div className="col-span-10">
								<FormControl>
									<Input
										type="password"
										placeholder="Enter Password"
										{...field}
										autoComplete="new-password"
									/>
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="radioOption"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-start gap-4 md:grid-cols-12">
							<FormLabel className="col-span-2 text-sm font-medium">
								Radio Buttons <RequiredAsterisk />
							</FormLabel>
							<div className="col-span-10 space-y-2">
								<FormControl>
									<RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
										{radioOptions.map((option) => (
											<div key={option.id} className="flex items-center space-x-2">
												<RadioGroupItem
													value={option.value}
													id={option.id}
													disabled={option.disabled}
												/>
												<Label htmlFor={option.id} className="mb-1 text-sm">
													{option.label}
												</Label>
											</div>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="identityProof"
					render={({ field: { onChange, value, ...field } }) => (
						<FormItem className="grid grid-cols-1 items-start gap-4 md:grid-cols-12">
							<FormLabel className="col-span-2 text-sm font-medium">
								Identity Proof <RequiredAsterisk />
							</FormLabel>
							<div className="col-span-10">
								<FormControl>
									<CustomFileUpload onChange={onChange} value={value} {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="checkMe"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
							<FormLabel className="col-span-2 text-sm font-medium">Checkbox</FormLabel>
							<div className="col-span-10">
								<div className="flex items-center space-x-2">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											id="checkMeOut"
										/>
									</FormControl>
									<Label htmlFor="checkMeOut" className="text-sm">
										Check me out
									</Label>
								</div>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
					<div className="col-span-2" />
					<div className="col-span-10">
						<Button type="submit" className="mt-4">
							Sign In
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default HorizontalForm;
