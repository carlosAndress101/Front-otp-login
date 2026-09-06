import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import type { TurnstileHandle } from './Turnstile';

vi.mock('@marsidev/react-turnstile', () => {
  const MockTurnstile = ({
    onSuccess,
    onExpire,
    onError,
    siteKey,
  }: {
    onSuccess?: (token: string) => void;
    onExpire?: () => void;
    onError?: () => void;
    siteKey: string;
  }) => (
    <div data-testid="turnstile-widget" data-sitekey={siteKey}>
      <button data-testid="turnstile-success" onClick={() => onSuccess?.('test-token-123')}>
        Simulate Success
      </button>
      <button data-testid="turnstile-expire" onClick={() => onExpire?.()}>
        Simulate Expire
      </button>
      <button data-testid="turnstile-error" onClick={() => onError?.()}>
        Simulate Error
      </button>
    </div>
  );
  return { Turnstile: MockTurnstile };
});

async function importTurnstile() {
  const mod = await import('./Turnstile');
  return mod.Turnstile;
}

describe('Turnstile', () => {
  const defaultProps = {
    onToken: vi.fn(),
    onExpire: vi.fn(),
    onError: vi.fn(),
  };

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('with site key configured', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_TURNSTILE_SITE_KEY', 'test-site-key');
    });

    it('renders widget', async () => {
      const Turnstile = await importTurnstile();
      render(<Turnstile {...defaultProps} />);
      expect(screen.getByTestId('turnstile-widget')).toBeInTheDocument();
    });

    it('calls onToken when verification succeeds', async () => {
      const Turnstile = await importTurnstile();
      render(<Turnstile {...defaultProps} />);
      screen.getByTestId('turnstile-success').click();
      expect(defaultProps.onToken).toHaveBeenCalledWith('test-token-123');
    });

    it('calls onExpire when token expires', async () => {
      const Turnstile = await importTurnstile();
      render(<Turnstile {...defaultProps} />);
      screen.getByTestId('turnstile-expire').click();
      expect(defaultProps.onExpire).toHaveBeenCalled();
    });

    it('calls onError when error occurs', async () => {
      const Turnstile = await importTurnstile();
      render(<Turnstile {...defaultProps} />);
      screen.getByTestId('turnstile-error').click();
      expect(defaultProps.onError).toHaveBeenCalled();
    });

    it('exposes reset, getResponse, isExpired via ref', async () => {
      const Turnstile = await importTurnstile();
      const ref = createRef<TurnstileHandle>();
      render(<Turnstile {...defaultProps} ref={ref} />);
      expect(ref.current?.reset).toBeDefined();
      expect(ref.current?.getResponse).toBeDefined();
      expect(ref.current?.isExpired).toBeDefined();
    });
  });

  describe('without site key', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_TURNSTILE_SITE_KEY', '');
    });

    it('renders nothing', async () => {
      const Turnstile = await importTurnstile();
      const { container } = render(<Turnstile onToken={() => {}} />);
      expect(container.firstChild).toBeNull();
    });
  });
});
