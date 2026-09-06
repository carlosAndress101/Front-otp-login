import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthLayout, AuthHeader } from './AuthLayout';

describe('AuthLayout', () => {
  it('renders children', () => {
    render(
      <AuthLayout>
        <p>Form content</p>
      </AuthLayout>,
    );
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('renders the logo/brand element', () => {
    render(
      <AuthLayout>
        <p>Content</p>
      </AuthLayout>,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});

describe('AuthHeader', () => {
  it('renders title', () => {
    render(<AuthHeader title="Welcome" />);
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<AuthHeader title="Welcome" subtitle="Sign in to continue" />);
    expect(screen.getByText('Sign in to continue')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<AuthHeader title="Welcome" />);
    expect(screen.queryByText(/Sign in/)).not.toBeInTheDocument();
  });

  it('uses h1 for title', () => {
    render(<AuthHeader title="Test" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.tagName).toBe('H1');
  });
});
