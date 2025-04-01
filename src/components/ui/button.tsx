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

const BASE_OUTLINE_STYLE = 'border bg-transparent';

const outlineVariants = {
	primary: `${BASE_OUTLINE_STYLE} border-primary text-primary hover:bg-primary/10`,
	secondary: `${BASE_OUTLINE_STYLE} border-secondary text-secondary hover:bg-secondary/10`,
	success: `${BASE_OUTLINE_STYLE} border-green-600 text-green-500 hover:bg-green-600/10`,
	danger: `${BASE_OUTLINE_STYLE} border-red-600 text-red-500 hover:bg-red-600/10`,
	warning: `${BASE_OUTLINE_STYLE} border-yellow-600 text-yellow-500 hover:bg-yellow-600/10`,
	info: `${BASE_OUTLINE_STYLE} border-sky-600 text-sky-500 hover:bg-sky-500/10`,
	light: `${BASE_OUTLINE_STYLE} border-zinc-200 text-zinc-700 hover:bg-zinc-200/10 dark:text-zinc-300`,
	dark: `${BASE_OUTLINE_STYLE} border-zinc-700 text-zinc-800 hover:bg-zinc-600/10 dark:text-zinc-400`
} as const;

// Common opacity values for ghost variants
const GHOST_BG_OPACITY = '10';
const GHOST_HOVER_OPACITY = '20';

const ghostVariants = {
	primary: `bg-primary/${GHOST_BG_OPACITY} text-primary hover:bg-primary/${GHOST_HOVER_OPACITY}`,
	secondary: `bg-secondary/${GHOST_BG_OPACITY} text-secondary hover:bg-secondary/${GHOST_HOVER_OPACITY} dark:text-zinc-400`,
	success: `bg-green-600/${GHOST_BG_OPACITY} text-green-400 hover:bg-green-600/${GHOST_HOVER_OPACITY}`,
	danger: `bg-red-600/${GHOST_BG_OPACITY} text-red-400 hover:bg-red-600/${GHOST_HOVER_OPACITY}`,
	warning: `bg-yellow-400/${GHOST_BG_OPACITY} text-yellow-400 hover:bg-yellow-500/${GHOST_HOVER_OPACITY}`,
	info: `bg-sky-500/${GHOST_BG_OPACITY} text-sky-400 hover:bg-sky-500/${GHOST_HOVER_OPACITY}`,
	light: `bg-zinc-200/${GHOST_BG_OPACITY} text-zinc-700 hover:bg-zinc-200/${GHOST_HOVER_OPACITY} dark:text-zinc-300`,
	dark: `bg-zinc-950/${GHOST_BG_OPACITY} text-zinc-900 hover:bg-zinc-700/${GHOST_HOVER_OPACITY} dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-900/${GHOST_HOVER_OPACITY}`
} as const;

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-transparent shadow-xs ',
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
			...COMMON_VARIANTS.map(variantClassName => ({
				variant: 'outline',
				variantClassName,
				className: outlineVariants[variantClassName]
			})),

			// Common styles for ghost variants
			...COMMON_VARIANTS.map(variantClassName => ({
				variant: 'ghost',
				variantClassName,
				className: ghostVariants[variantClassName]
			})),
		] as any,
		defaultVariants: {
			variant: 'default',
			size: 'default',
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
