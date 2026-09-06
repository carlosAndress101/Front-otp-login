import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('has role="alert"', () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    render(<Alert variant="default">Default</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('bg-[var(--color-muted)]');
  });

  it('applies destructive variant styles', () => {
    render(<Alert variant="destructive">Error</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('text-[var(--color-destructive)]');
  });

  it('applies success variant styles', () => {
    render(<Alert variant="success">Success</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('text-[var(--color-success)]');
  });

  it('applies custom className', () => {
    render(<Alert className="custom">Test</Alert>);
    expect(screen.getByRole('alert').className).toContain('custom');
  });
});
