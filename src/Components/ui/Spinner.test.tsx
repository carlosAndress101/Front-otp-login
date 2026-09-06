import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders svg element with aria-label', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders md size by default', () => {
    render(<Spinner />);
    const svg = screen.getByLabelText('Loading');
    expect(svg.getAttribute('class')).toContain('h-6');
  });

  it('renders sm size', () => {
    render(<Spinner size="sm" />);
    const svg = screen.getByLabelText('Loading');
    expect(svg.getAttribute('class')).toContain('h-4');
  });

  it('renders lg size', () => {
    render(<Spinner size="lg" />);
    const svg = screen.getByLabelText('Loading');
    expect(svg.getAttribute('class')).toContain('h-8');
  });

  it('applies custom className', () => {
    render(<Spinner className="custom" />);
    const svg = screen.getByLabelText('Loading');
    expect(svg.getAttribute('class')).toContain('custom');
  });
});
