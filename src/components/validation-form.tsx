'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import RequiredAsterisk from '@/components/required-asterisk';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';

const formSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	date: z.date().optional(),
	callJohn: z.boolean().default(false)
});

type FormValues = z.infer<typeof formSchema>;

const cities = [
	{ value: 'new-york', label: 'New York' },
	{ value: 'los-angeles', label: 'Los Angeles' },
	{ value: 'chicago', label: 'Chicago' },
	{ value: 'houston', label: 'Houston' }
];

export function ValidationForm() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			city: '',
			state: '',
			zip: '',
			date: undefined,
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
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium">
									First Name <RequiredAsterisk />
								</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Enter First Name" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium">
									Last Name <RequiredAsterisk />
								</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Enter Last Name" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-3 gap-4">
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium">City</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Choose" />
										</SelectTrigger>
										<SelectContent>
											{cities.map((city) => (
												<SelectItem key={city.value} value={city.value}>
													{city.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium">State</FormLabel>
								<FormControl>
									<Input placeholder="Enter" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="zip"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium">Zip</FormLabel>
								<FormControl>
									<Input placeholder="Enter" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-medium">Birth Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-full justify-start !bg-transparent text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.value ? format(field.value, 'PPP') : 'Datepicker'}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
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
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormLabel className="text-sm font-medium">Call John for dinner</FormLabel>
						</FormItem>
					)}
				/>
				<Button type="submit">Sign In</Button>
			</form>
		</Form>
	);
}
