import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const COMMON_VARIANTS = [
	'primary',
	'secondary',
	'success',
	'danger',
	'warning',
	'info',
	'light',
	'dark'
] as const;

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline: 'border bg-transparent shadow-xs ',
				secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost: '',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			variantClassName: {
				// Default variants
				primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				success: 'bg-green-600 text-white hover:bg-green-700',
				danger: 'bg-red-600 text-white hover:bg-red-700',
				warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
				info: 'bg-sky-500 text-white hover:bg-sky-600',
				light: 'bg-zinc-200 text-black hover:bg-zinc-300',
				dark: 'bg-zinc-800 text-white hover:bg-zinc-700'
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9'
			}
		},
		compoundVariants: [
			// Common styles for outline variants
			...COMMON_VARIANTS.map((variantClassName) => ({
				variant: 'outline',
				variantClassName,
				className: {
					primary: 'border bg-transparent border-primary text-primary hover:bg-primary/10',
					secondary: 'border bg-transparent border-secondary text-secondary hover:bg-secondary/10',
					success: 'border bg-transparent border-green-600 text-green-500 hover:bg-green-600/10',
					danger: 'border bg-transparent border-red-600 text-red-500 hover:bg-red-600/10',
					warning: 'border bg-transparent border-yellow-600 text-yellow-500 hover:bg-yellow-600/10',
					info: 'border bg-transparent border-sky-600 text-sky-500 hover:bg-sky-500/10',
					light:
						'border bg-transparent border-zinc-200 text-zinc-700 hover:bg-zinc-200/10 dark:text-zinc-300',
					dark: 'border bg-transparent border-zinc-700 text-zinc-800 hover:bg-zinc-600/10 dark:text-zinc-400'
				}[variantClassName]
			})),

			// Common styles for ghost variants
			...COMMON_VARIANTS.map((variantClassName) => ({
				variant: 'ghost',
				variantClassName,
				className: {
					primary: 'bg-primary/10 text-primary hover:bg-primary/20',
					secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 dark:text-zinc-400',
					success: 'bg-green-600/10 text-green-400 hover:bg-green-600/20',
					danger: 'bg-red-600/10 text-red-400 hover:bg-red-600/20',
					warning: 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-500/20',
					info: 'bg-sky-500/10 text-sky-400 hover:bg-sky-500/20',
					light: 'bg-zinc-200/10 text-zinc-700 hover:bg-zinc-200/20 dark:text-zinc-300',
					dark: 'bg-zinc-950/10 text-zinc-900 hover:bg-zinc-700/20 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-900/20'
				}[variantClassName]
			}))
		] as any,
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

function Button({
	className,
	variant,
	variantClassName,
	size,
	asChild = false,
	leftIcon,
	rightIcon,
	children,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp className={cn(buttonVariants({ variant, variantClassName, size, className }))} {...props}>
			{leftIcon}
			{children}
			{rightIcon}
		</Comp>
	);
}

export { Button, buttonVariants };
