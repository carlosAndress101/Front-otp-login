export interface User {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  address?: string;
  profile?: string;
}

export interface AuthState {
  auth: {
    username: string;
    active: boolean;
  };
  setUsername: (name: string) => void;
}

export interface JWTPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  data: {
    token: string;
    [key: string]: unknown;
  };
}

export interface APIError {
  error: string;
}

export interface FetchState<T = unknown> {
  isLoading: boolean;
  apiData: T | undefined;
  status: number | null;
  serverError: Error | null;
}

export interface RegisterMailPayload {
  username: string;
  userEmail: string;
  text: string;
  subject?: string;
}

export interface AuthenticateResponse {
  status?: number;
  data?: unknown;
  error?: string;
}
