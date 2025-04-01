import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import RequiredAsterisk from './required-asterisk';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
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
		console.log(data);
		// Handle form submission
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }: { field: any }) => (
						<FormItem className="space-y-2">
							<FormLabel className="text-sm font-medium">
								Email Address <RequiredAsterisk />
							</FormLabel>
							<FormControl>
								<Input placeholder="Enter Email" {...field} autoComplete="off" />
							</FormControl>
							<FormDescription className="text-xs text-muted-foreground">
								We'll never share your email with anyone else.
							</FormDescription>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }: { field: any }) => (
						<FormItem className="space-y-2">
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
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="callJohn"
					render={({ field }: { field: any }) => (
						<FormItem className="flex items-center space-x-2">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormLabel className="text-sm font-medium">Call John for dinner</FormLabel>
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default BasicForm;
