import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from 'lucide-react';
import logoDarkTheme from '@/assets/logo-dark-theme.svg';
import logoLightTheme from '@/assets/logo-light-theme.svg';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import RequiredAsterisk from '@/components/required-asterisk';
import { Link, useNavigate } from 'react-router';

const recoverSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(1, 'Confirm Password is required')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: [ 'confirmPassword' ]
	});

type RecoverFormValues = z.infer<typeof recoverSchema>;

const RecoverPassword = () => {
	const { theme, setTheme } = useTheme();
	const navigate = useNavigate();
	const form = useForm<RecoverFormValues>({
		resolver: zodResolver(recoverSchema),
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	});

	function onSubmit(data: RecoverFormValues) {
		console.log(data);
		navigate('/login');
	}

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-background">
			<div className="absolute top-4 right-4">
				<Button
					variant="ghost"
					variantClassName="light"
					size="icon"
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					{theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
				</Button>
			</div>
			<Card className="w-full max-w-md mx-auto shadow-lg">
				<CardContent className="flex flex-col gap-4 py-6">
					<div className="flex flex-col items-center gap-2">
						<img
							src={theme === 'dark' ? logoLightTheme : logoDarkTheme}
							alt="Logo"
							className="mb-2 w-32 md:w-32 transition-all duration-200"
						/>
						<p className="text-muted-foreground text-sm">
							You are only one step away from your new password, recover your password now.
						</p>
					</div>
					<Form {...form}>
						<form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium">
											Password <RequiredAsterisk />
										</FormLabel>
										<FormControl>
											<Input id="password" type="password" placeholder="Password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium">
											Confirm Password <RequiredAsterisk />
										</FormLabel>
										<FormControl>
											<Input
												id="confirmPassword"
												type="password"
												placeholder="Confirm Password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full" variantClassName="primary">
								Change password
							</Button>
						</form>
					</Form>
					<div className="flex flex-col gap-1 text-sm text-center mt-2">
						<Link to="/login" className="text-blue-600">
							Login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RecoverPassword;
