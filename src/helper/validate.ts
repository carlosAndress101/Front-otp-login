import toast from 'react-hot-toast';
import { authenticate } from './helper';

type ValidationErrors = Record<string, string>;

export async function usernameValidate(values: Record<string, string>): Promise<ValidationErrors> {
  const errors: ValidationErrors = {};

  if (!values.username) {
    errors.username = toast.error('Username Required...!');
  } else if (values.username.includes(' ')) {
    errors.username = toast.error('Invalid Username...!');
  }

  if (values.username) {
    const response = await authenticate(values.username);
    if ('error' in response) {
      errors.exist = toast.error('User does not exist...!');
    } else if (response.status !== 200) {
      errors.exist = toast.error('User does not exist...!');
    }
  }
  return errors;
}

export async function passwordValidate(values: Record<string, string>): Promise<ValidationErrors> {
  const errors: ValidationErrors = {};
  const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  if (!values.password) {
    errors.password = toast.error('Password Required...!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Wrong Password...!');
  } else if (values.password.length < 4) {
    errors.password = toast.error('Password must be more than 4 characters long');
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have special character');
  }

  return errors;
}

export async function resetPasswordValidation(
  values: Record<string, string>,
): Promise<ValidationErrors> {
  const errors: ValidationErrors = {};
  const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  if (!values.password) {
    errors.password = toast.error('Password Required...!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Wrong Password...!');
  } else if (values.password.length < 4) {
    errors.password = toast.error('Password must be more than 4 characters long');
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have special character');
  }

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error('Password not match...!');
  }

  return errors;
}

export async function registerValidation(
  values: Record<string, string>,
): Promise<ValidationErrors> {
  const errors: ValidationErrors = {};

  if (!values.username) {
    errors.username = toast.error('Username Required...!');
  } else if (values.username.includes(' ')) {
    errors.username = toast.error('Invalid Username...!');
  }

  const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  if (!values.password) {
    errors.password = toast.error('Password Required...!');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('Wrong Password...!');
  } else if (values.password.length < 4) {
    errors.password = toast.error('Password must be more than 4 characters long');
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error('Password must have special character');
  }

  if (!values.email) {
    errors.email = toast.error('Email Required...!');
  } else if (values.email.includes(' ')) {
    errors.email = toast.error('Wrong Email...!');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error('Invalid email address...!');
  }

  return errors;
}

export async function profileValidation(values: Record<string, string>): Promise<ValidationErrors> {
  const errors: ValidationErrors = {};

  if (!values.email) {
    errors.email = toast.error('Email Required...!');
  } else if (values.email.includes(' ')) {
    errors.email = toast.error('Wrong Email...!');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error('Invalid email address...!');
  }

  return errors;
}
