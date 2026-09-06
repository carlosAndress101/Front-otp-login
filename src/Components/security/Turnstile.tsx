import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Turnstile as CloudflareTurnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';

export interface TurnstileHandle {
  reset: () => void;
  getResponse: () => string | undefined;
  isExpired: () => boolean | undefined;
}

interface TurnstileProps {
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
}

const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  ({ onToken, onExpire, onError, className = '' }, ref) => {
    const turnstileRef = useRef<TurnstileInstance | null>(null);

    useImperativeHandle(ref, () => ({
      reset: () => turnstileRef.current?.reset(),
      getResponse: () => turnstileRef.current?.getResponse(),
      isExpired: () => turnstileRef.current?.isExpired(),
    }));

    const handleSuccess = useCallback(
      (token: string) => {
        onToken(token);
      },
      [onToken],
    );

    const handleExpire = useCallback(() => {
      onExpire?.();
    }, [onExpire]);

    const handleError = useCallback(() => {
      onError?.();
    }, [onError]);

    if (!siteKey) {
      if (import.meta.env.DEV) {
        console.warn(
          'Turnstile: VITE_TURNSTILE_SITE_KEY is not set. Widget will not render. This is expected in development without a key.',
        );
      }
      return null;
    }

    return (
      <div className={`flex justify-center ${className}`}>
        <CloudflareTurnstile
          ref={turnstileRef}
          siteKey={siteKey}
          onSuccess={handleSuccess}
          onExpire={handleExpire}
          onError={handleError}
          options={{
            theme: 'auto',
            size: 'normal',
          }}
        />
      </div>
    );
  },
);

Turnstile.displayName = 'Turnstile';
