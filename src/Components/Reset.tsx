import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';
import { resetPasswordValidation } from '../helper/validate';
import { AuthLayout, AuthHeader } from './auth/AuthLayout';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';

export const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: '',
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <AuthLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthHeader title="Set new password" subtitle="Choose a strong password for your account" />

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormField
          label="New password"
          type="password"
          placeholder="Enter new password"
          autoComplete="new-password"
          error={formik.errors.password}
          {...formik.getFieldProps('password')}
        />

        <FormField
          label="Confirm password"
          type="password"
          placeholder="Confirm new password"
          autoComplete="new-password"
          error={formik.errors.confirm_pwd}
          {...formik.getFieldProps('confirm_pwd')}
        />

        <Button type="submit" className="w-full" loading={formik.isSubmitting}>
          Reset password
        </Button>
      </form>
    </AuthLayout>
  );
};
