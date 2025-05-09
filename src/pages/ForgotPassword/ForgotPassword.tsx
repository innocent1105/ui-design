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
import { useNavigate } from 'react-router';
import RequiredAsterisk from '@/components/required-asterisk';
const forgotSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email')
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

const ForgotPassword = () => {
	const { theme, setTheme } = useTheme();
	const navigate = useNavigate();
	const form = useForm<ForgotFormValues>({
		resolver: zodResolver(forgotSchema),
		defaultValues: {
			email: ''
		}
	});

	function onSubmit(data: ForgotFormValues) {
		console.log(data);
		navigate('/recover-password');
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
							You forgot your password? Here you can easily retrieve a new password.
						</p>
					</div>
					<Form {...form}>
						<form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium">
											Email <RequiredAsterisk />
										</FormLabel>
										<FormControl>
											<Input id="email" type="email" placeholder="Email" autoFocus {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full" variantClassName="primary">
								Request new password
							</Button>
						</form>
					</Form>
					<div className="flex flex-col gap-1 text-sm text-center mt-2">
						<a href="/login" className="text-blue-600">
							Remember your password? Login
						</a>
						<a href="/register" className="text-blue-600">
							Register a new account
						</a>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ForgotPassword;
