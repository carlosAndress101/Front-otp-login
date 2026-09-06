import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import useFetch from '../Hooks/fetch.hook';
import { useTurnstile } from '../Hooks/turnstile.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';
import { AuthLayout, AuthHeader } from './auth/AuthLayout';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';
import { Spinner } from './ui/Spinner';
import { Alert } from './ui/Alert';
import { Turnstile } from './security/Turnstile';

export const Password = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch<{
    firstName?: string;
    username?: string;
    profile?: string;
  }>(`/user/${username}`);
  const [showPassword, setShowPassword] = useState(false);
  const {
    token: turnstileToken,
    turnstileRef,
    handleToken,
    handleExpire,
    handleError,
    reset: resetTurnstile,
  } = useTurnstile();

  const formik = useFormik({
    initialValues: { password: '' },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const loginPromise = verifyPassword({
        username,
        password: values.password,
        turnstileToken,
      });
      toast.promise(loginPromise, {
        loading: 'Signing in...',
        success: <b>Welcome back!</b>,
        error: <b>Invalid password</b>,
      });

      loginPromise.then((res) => {
        resetTurnstile();
        if (res?.data?.token) {
          localStorage.setItem('token', res.data.token);
          navigate('/profile');
        }
      });
    },
  });

  if (isLoading) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      </AuthLayout>
    );
  }

  if (serverError) {
    return (
      <AuthLayout>
        <Alert variant="destructive">{serverError.message}</Alert>
        <Link
          to="/"
          className="block text-center text-sm text-[var(--color-muted-foreground)] hover:underline mt-4"
        >
          Back to login
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthHeader
        title={`Hello ${apiData?.firstName || apiData?.username || username}`}
        subtitle="Enter your password to sign in"
      />

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="relative">
          <FormField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            autoComplete="current-password"
            error={formik.errors.password}
            {...formik.getFieldProps('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-xs font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <Turnstile
          ref={turnstileRef}
          onToken={handleToken}
          onExpire={handleExpire}
          onError={handleError}
        />

        <Button type="submit" className="w-full" loading={formik.isSubmitting}>
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        <Link
          to="/recovery"
          className="font-medium text-[var(--color-foreground)] hover:underline underline-offset-4"
        >
          Forgot password?
        </Link>
      </p>
    </AuthLayout>
  );
};
