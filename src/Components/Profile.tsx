import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../Hooks/fetch.hook';
import { updateUser } from '../helper/helper';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';
import { Spinner } from './ui/Spinner';
import { Alert } from './ui/Alert';
import type { User } from '../types';

export function Profile() {
  const [file, setFile] = useState<string>();
  const [{ isLoading, apiData, serverError }] = useFetch<User>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const merged = { ...values, profile: file || apiData?.profile || '' };
      const updatePromise = updateUser(merged as unknown as Record<string, unknown>);

      toast.promise(updatePromise, {
        loading: 'Updating profile...',
        success: <b>Profile updated!</b>,
        error: <b>Could not update profile</b>,
      });
    },
  });

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    }
  };

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (serverError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
        <div className="w-full max-w-[400px]">
          <Alert variant="destructive">{serverError.message}</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
                Profile
              </h1>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                Manage your account settings
              </p>
            </div>
            <Button variant="ghost" onClick={userLogout}>
              Sign out
            </Button>
          </div>

          <div className="border border-[var(--color-border)] rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-4">
              <label htmlFor="profile" className="cursor-pointer group">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[var(--color-border)] flex items-center justify-center overflow-hidden transition-colors group-hover:border-[var(--color-muted-foreground)]">
                  {apiData?.profile || file ? (
                    <img
                      src={file || apiData?.profile}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
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
              <div>
                <p className="font-medium text-[var(--color-foreground)]">
                  {apiData?.firstName || apiData?.username || 'User'}
                </p>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  {apiData?.email || 'No email set'}
                </p>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="First name"
                  placeholder="First name"
                  autoComplete="given-name"
                  {...formik.getFieldProps('firstName')}
                />
                <FormField
                  label="Last name"
                  placeholder="Last name"
                  autoComplete="family-name"
                  {...formik.getFieldProps('lastName')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  error={formik.errors.email}
                  {...formik.getFieldProps('email')}
                />
                <FormField
                  label="Phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                  {...formik.getFieldProps('mobile')}
                />
              </div>

              <FormField
                label="Address"
                placeholder="Your address"
                autoComplete="street-address"
                {...formik.getFieldProps('address')}
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" loading={formik.isSubmitting}>
                  Save changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
