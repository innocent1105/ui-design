import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import RequiredAsterisk from '../required-asterisk';

interface User {
	name: string;
	title: string;
	avatar: string;
	followers: number;
	following: number;
	friends: number;
	education: string;
	location: string;
	skills: string;
	notes: string;
}

const settingsSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	experience: z.string().min(1, 'Experience is required'),
	skills: z.string().min(1, 'Skills are required'),
	terms: z.boolean().refine((val) => val, { message: 'You must agree to the terms' })
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const ProfileSettings = ({ user }: { user: User }) => {
	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(settingsSchema),
		defaultValues: {
			name: user.name,
			email: '',
			experience: '',
			skills: user.skills,
			terms: false
		}
	});

	function onSubmit(data: SettingsFormValues) {
		// handle submit
		console.log(data);
	}

	return (
		<Card>
			<CardContent className="py-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium">
										Name <RequiredAsterisk />
									</FormLabel>
									<FormControl>
										<Input placeholder="Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium">
										Email <RequiredAsterisk />
									</FormLabel>
									<FormControl>
										<Input placeholder="Email" type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="experience"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium">
										Experience <RequiredAsterisk />
									</FormLabel>
									<FormControl>
										<Input placeholder="Experience" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="skills"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium">
										Skills <RequiredAsterisk />
									</FormLabel>
									<FormControl>
										<Input placeholder="Skills" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="terms"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start gap-1">
									<div className="flex flex-row flex-wrap items-center gap-2 w-full">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												id="terms"
											/>
										</FormControl>
										<FormLabel
											htmlFor="terms"
											className="text-sm font-medium select-none cursor-pointer"
										>
											I agree to the{' '}
											<a href="#" className="text-blue-600">
												terms and conditions
											</a>{' '}
											<RequiredAsterisk />
										</FormLabel>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-32 mt-2" variantClassName="primary">
							Submit
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default ProfileSettings;
