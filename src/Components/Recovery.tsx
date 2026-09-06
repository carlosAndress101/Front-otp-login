import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthLayout, AuthHeader } from './auth/AuthLayout';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';

export const Recovery = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthHeader
        title="Recover your account"
        subtitle="Enter the 6-digit code sent to your email"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/reset');
        }}
        className="space-y-4"
      >
        <FormField
          label="Verification code"
          placeholder="000000"
          autoComplete="one-time-code"
          inputMode="numeric"
          maxLength={6}
          pattern="[0-9]*"
        />

        <Button type="submit" className="w-full">
          Verify code
        </Button>
      </form>

      <div className="text-center space-y-2">
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Didn&apos;t receive a code?{' '}
          <button
            type="button"
            className="font-medium text-[var(--color-foreground)] hover:underline underline-offset-4"
          >
            Resend
          </button>
        </p>
        <Link
          to="/"
          className="block text-sm text-[var(--color-muted-foreground)] hover:underline underline-offset-4"
        >
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
};
