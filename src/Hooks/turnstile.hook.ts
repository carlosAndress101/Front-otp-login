import { useState, useCallback, useRef } from 'react';
import type { TurnstileHandle } from '../Components/security/Turnstile';

export function useTurnstile() {
  const [token, setToken] = useState<string | undefined>();
  const turnstileRef = useRef<TurnstileHandle | null>(null);

  const handleToken = useCallback((newToken: string) => {
    setToken(newToken);
  }, []);

  const handleExpire = useCallback(() => {
    setToken(undefined);
  }, []);

  const handleError = useCallback(() => {
    setToken(undefined);
  }, []);

  const reset = useCallback(() => {
    setToken(undefined);
    turnstileRef.current?.reset();
  }, []);

  return {
    token,
    turnstileRef,
    handleToken,
    handleExpire,
    handleError,
    reset,
  };
}
