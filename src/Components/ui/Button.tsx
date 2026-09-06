import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = '', variant = 'primary', size = 'md', loading, disabled, children, ...props },
    ref,
  ) => {
    const base =
      'inline-flex items-center justify-center font-medium transition-all duration-150 ease-out rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants: Record<string, string> = {
      primary:
        'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90 focus-visible:outline-[var(--color-ring)]',
      secondary:
        'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] border border-[var(--color-border)] hover:bg-[var(--color-muted)] focus-visible:outline-[var(--color-ring)]',
      ghost:
        'text-[var(--color-foreground)] hover:bg-[var(--color-muted)] focus-visible:outline-[var(--color-ring)]',
      destructive:
        'bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:opacity-90 focus-visible:outline-[var(--color-destructive)]',
    };

    const sizes: Record<string, string> = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
        whileHover={!disabled && !loading ? { scale: 1.01 } : undefined}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
