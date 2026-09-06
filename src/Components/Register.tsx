import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { useTurnstile } from '../Hooks/turnstile.hook';
import { registerUser } from '../helper/helper';
import { AuthLayout, AuthHeader } from './auth/AuthLayout';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';
import { Turnstile } from './security/Turnstile';

export function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState<string>();
  const {
    token: turnstileToken,
    turnstileRef,
    handleToken,
    handleExpire,
    handleError,
    reset: resetTurnstile,
  } = useTurnstile();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const merged = { ...values, profile: file || '', turnstileToken };
      const registerPromise = registerUser(merged);
      toast.promise(registerPromise, {
        loading: 'Creating account...',
        success: <b>Account created!</b>,
        error: <b>Could not create account</b>,
      });

      registerPromise.then(() => {
        resetTurnstile();
        navigate('/');
      });
    },
  });

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    }
  };

  return (
    <AuthLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthHeader title="Create an account" subtitle="Get started in seconds" />

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex justify-center">
          <label htmlFor="profile" className="relative cursor-pointer group">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-[var(--color-border)] flex items-center justify-center overflow-hidden transition-colors group-hover:border-[var(--color-muted-foreground)]">
              {file ? (
                <img src={file} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <svg
                  className="w-6 h-6 text-[var(--color-muted-foreground)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              )}
            </div>
            <input
              onChange={onUpload}
              type="file"
              id="profile"
              name="profile"
              accept="image/*"
              className="sr-only"
            />
          </label>
        </div>

        <FormField
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={formik.errors.email}
          {...formik.getFieldProps('email')}
        />

        <FormField
          label="Username"
          placeholder="Choose a username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          error={formik.errors.username}
          {...formik.getFieldProps('username')}
        />

        <FormField
          label="Password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          error={formik.errors.password}
          {...formik.getFieldProps('password')}
        />

        <Turnstile
          ref={turnstileRef}
          onToken={handleToken}
          onExpire={handleExpire}
          onError={handleError}
        />

        <Button type="submit" className="w-full" loading={formik.isSubmitting}>
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        Already have an account?{' '}
        <Link
          to="/"
          className="font-medium text-[var(--color-foreground)] hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
