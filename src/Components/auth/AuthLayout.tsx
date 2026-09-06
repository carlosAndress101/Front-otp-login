import type { ReactNode } from 'react';
import { motion, authPageEnter } from '../ui/animations';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4 py-12">
      <motion.div
        className="w-full max-w-[400px] space-y-8"
        variants={authPageEnter}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-sm font-bold mb-2">
            A
          </div>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="space-y-1 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
        {title}
      </h1>
      {subtitle && <p className="text-sm text-[var(--color-muted-foreground)]">{subtitle}</p>}
    </div>
  );
}
