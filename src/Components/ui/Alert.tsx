import type { ReactNode } from 'react';
import { motion, AnimatePresence, alertVariants } from './animations';

interface AlertProps {
  variant?: 'default' | 'destructive' | 'success';
  children: ReactNode;
  className?: string;
}

export function Alert({ variant = 'default', children, className = '' }: AlertProps) {
  const variants: Record<string, string> = {
    default: 'bg-[var(--color-muted)] text-[var(--color-foreground)] border-[var(--color-border)]',
    destructive:
      'bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/20',
    success:
      'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        role="alert"
        className={`rounded-lg border px-4 py-3 text-sm ${variants[variant]} ${className}`}
        variants={alertVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
