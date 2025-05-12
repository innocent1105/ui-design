import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from 'lucide-react';
import logoDarkTheme from '@/assets/logo-dark-theme.svg';
import logoLightTheme from '@/assets/logo-light-theme.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import RequiredAsterisk from '@/components/required-asterisk';

const loginSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z.string().min(1, 'Password is required'),
	remember: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
	const { theme, setTheme } = useTheme();
	const navigate = useNavigate();
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			remember: false
		}
	});

	function onSubmit(data: LoginFormValues) {
		console.log(data);
		navigate('/');
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
						<p className="text-muted-foreground text-sm">Sign in to start your session</p>
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
								name="remember"
								render={({ field }) => (
									<FormItem className="flex items-center gap-2">
										<FormControl>
											<Checkbox
												id="remember"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel
											htmlFor="remember"
											className="text-sm font-medium select-none cursor-pointer"
										>
											Remember Me
										</FormLabel>
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full" variantClassName="primary">
								Sign In
							</Button>
						</form>
					</Form>
					<div className="flex items-center gap-2 my-2">
						<div className="flex-1 h-px bg-border" />
						<span className="text-xs text-muted-foreground">OR</span>
						<div className="flex-1 h-px bg-border" />
					</div>
					<div className="flex flex-col gap-2">
						<Button
							className="w-full"
							variantClassName="info"
							leftIcon={<FontAwesomeIcon icon={faFacebookF} />}
						>
							Sign in using Facebook
						</Button>
						<Button
							className="w-full"
							variantClassName="danger"
							leftIcon={<FontAwesomeIcon icon={faGoogle} />}
						>
							Sign in using Google
						</Button>
					</div>
					<div className="flex flex-col gap-1 text-sm text-center mt-2">
						<a href="/forgot-password" className="text-blue-600">
							I forgot my password
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

export default Login;
