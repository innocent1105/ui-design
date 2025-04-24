import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { z } from 'zod';
import RequiredAsterisk from '../required-asterisk';

const formSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters'),
	callJohn: z.boolean()
});

type FormValues = z.infer<typeof formSchema>;

const BasicForm: React.FC = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			callJohn: false
		}
	});

	function onSubmit(data: FormValues) {
		console.log('data', data);
		// Handle form submission
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-medium">
								Email Address <RequiredAsterisk />
							</FormLabel>
							<FormControl>
								<Input placeholder="Enter Email" {...field} autoComplete="off" />
							</FormControl>
							<FormDescription className="text-muted-foreground text-xs">
								We'll never share your email with anyone else.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-medium">
								Password <RequiredAsterisk />
							</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter Password"
									{...field}
									autoComplete="new-password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="callJohn"
					render={({ field }) => (
						<FormItem className="flex items-center space-x-2">
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value ? 'yes' : 'no'}
									className="flex items-center space-x-2"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="yes" id="yes" />
										<FormLabel htmlFor="yes" className="text-sm font-medium">
											Call John for dinner
										</FormLabel>
									</div>
								</RadioGroup>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default BasicForm;
