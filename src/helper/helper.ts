import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import type { JWTPayload, User, RegisterMailPayload } from '../types';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export async function getUsername(): Promise<JWTPayload> {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject('Cannot find Token');
  const decode = jwtDecode<JWTPayload>(token);
  return decode;
}

export async function authenticate(username: string) {
  try {
    return await axios.post('/api/authenticate', { username });
  } catch {
    return { error: "Username doesn't exist...!" };
  }
}

export async function getUser({ username }: { username: string }) {
  try {
    const { data } = await axios.get<User>(`/user/${username}`);
    return { data };
  } catch {
    return { error: "Password doesn't Match...!" };
  }
}

export async function registerUser(credentials: {
  username: string;
  email: string;
  password: string;
  profile?: string;
  turnstileToken?: string;
}) {
  try {
    const { turnstileToken, ...rest } = credentials;
    const body = turnstileToken ? { ...rest, turnstileToken } : rest;

    const {
      data: { msg },
      status,
    } = await axios.post<{ msg: string }>('/api/register', body);

    const { username, email } = credentials;

    if (status === 201) {
      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        text: msg,
      } satisfies RegisterMailPayload);
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyPassword({
  username,
  password,
  turnstileToken,
}: {
  username: string;
  password: string;
  turnstileToken?: string;
}) {
  try {
    if (username) {
      const body: Record<string, string> = { username, password };
      if (turnstileToken) {
        body.turnstileToken = turnstileToken;
      }
      const { data } = await axios.post<{ token: string }>('/api/login', body);
      return Promise.resolve({ data });
    }
  } catch {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

export async function updateUser(response: Record<string, unknown>) {
  try {
    const token = localStorage.getItem('token');
    const data = await axios.put('/api/updateuser', response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

export async function generateOTP(username: string) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get<{ code: string }>('/api/generateOTP', {
      params: { username },
    });

    if (status === 201) {
      const userResult = await getUser({ username });
      const email = userResult.data?.email ?? '';
      const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        text,
        subject: 'Password Recovery OTP',
      } satisfies RegisterMailPayload);
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyOTP({ username, code }: { username: string; code: string }) {
  try {
    const { data, status } = await axios.get('/api/verifyOTP', {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function resetPassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const { data, status } = await axios.put('/api/resetPassword', {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
