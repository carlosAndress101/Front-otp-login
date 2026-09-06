import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import { AuthLayout, AuthHeader } from './auth/AuthLayout';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';

export const Username = () => {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: { username: '' },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate('/password');
    },
  });

  return (
    <AuthLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthHeader title="Welcome back" subtitle="Enter your username to continue" />

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormField
          label="Username"
          placeholder="Enter your username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          error={formik.errors.username}
          {...formik.getFieldProps('username')}
        />

        <Button type="submit" className="w-full" loading={formik.isSubmitting}>
          Continue
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-[var(--color-foreground)] hover:underline underline-offset-4"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};
