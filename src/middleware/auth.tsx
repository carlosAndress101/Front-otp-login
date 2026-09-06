import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import type { ReactNode } from 'react';

export const AuthorizeUser = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={'/'} replace={true} />;
  }

  return children;
};

export const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const username = useAuthStore((state) => state.auth.username);
  if (!username) {
    return <Navigate to={'/'} replace={true} />;
  }
  return children;
};
