import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders label', () => {
    render(<FormField label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('associates label with input', () => {
    render(<FormField label="Email" />);
    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', 'email');
    expect(input).toHaveAttribute('id', 'email');
  });

  it('renders error message', () => {
    render(<FormField label="Email" error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('sets aria-invalid when error', () => {
    render(<FormField label="Email" error="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby to error id', () => {
    render(<FormField label="Email" error="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'email-error');
  });

  it('renders hint message when no error', () => {
    render(<FormField label="Email" hint="We won't share this" />);
    expect(screen.getByText("We won't share this")).toBeInTheDocument();
  });

  it('does not render hint when error is present', () => {
    render(<FormField label="Email" error="Required" hint="We won't share this" />);
    expect(screen.queryByText("We won't share this")).not.toBeInTheDocument();
  });

  it('sets aria-describedby to hint id', () => {
    render(<FormField label="Email" hint="Help text" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'email-hint');
  });

  it('renders without label', () => {
    render(<FormField />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<FormField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('uses custom id when provided', () => {
    render(<FormField label="Email" id="custom-id" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
  });
});
