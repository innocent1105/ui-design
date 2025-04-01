import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				outline: '!bg-transparent',
				ghost: ''
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
			{
				variant: 'outline',
				variantClassName: 'primary',
				className: 'border border-primary text-primary hover:bg-primary/10'
			},
			{
				variant: 'outline',
				variantClassName: 'secondary',
				className: 'border border-secondary text-secondary hover:bg-secondary/10'
			},
			{
				variant: 'outline',
				variantClassName: 'success',
				className: 'border border-green-600 text-green-500 hover:bg-green-950'
			},
			{
				variant: 'outline',
				variantClassName: 'danger',
				className: 'border border-red-600 text-red-500 hover:bg-red-950'
			},
			{
				variant: 'outline',
				variantClassName: 'warning',
				className: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-950'
			},
			{
				variant: 'outline',
				variantClassName: 'info',
				className: 'border border-sky-500 text-sky-500 hover:bg-sky-950'
			},
			{
				variant: 'outline',
				variantClassName: 'light',
				className: 'border border-zinc-200 text-zinc-700 hover:bg-zinc-800 dark:text-zinc-300'
			},
			{
				variant: 'outline',
				variantClassName: 'dark',
				className: 'border border-zinc-700 text-zinc-800 hover:bg-zinc-800 dark:text-zinc-400'
			},
			{
				variant: 'ghost',
				variantClassName: 'primary',
				className: 'bg-primary/20 text-primary hover:bg-primary/30'
			},
			{
				variant: 'ghost',
				variantClassName: 'secondary',
				className: 'bg-secondary/20 text-secondary hover:bg-secondary/30'
			},
			{
				variant: 'ghost',
				variantClassName: 'success',
				className: 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
			},
			{
				variant: 'ghost',
				variantClassName: 'danger',
				className: 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
			},
			{
				variant: 'ghost',
				variantClassName: 'warning',
				className: 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
			},
			{
				variant: 'ghost',
				variantClassName: 'info',
				className: 'bg-sky-500/20 text-sky-400 hover:bg-sky-500/30'
			},
			{
				variant: 'ghost',
				variantClassName: 'light',
				className: 'bg-zinc-200/20 text-zinc-700 hover:bg-zinc-200/30  dark:text-zinc-300'
			},
			{
				variant: 'ghost',
				variantClassName: 'dark',
				className: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
			}
		],
		defaultVariants: {
			variant: 'default',
			size: 'default',
			variantClassName: 'primary'
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
