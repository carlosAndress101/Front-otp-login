import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUsername } from '../helper/helper';
import type { FetchState } from '../types';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function useFetch<T = Record<string, unknown>>(query?: string) {
  const [getData, setData] = useState<FetchState<T>>({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev: FetchState<T>) => ({ ...prev, isLoading: true }));

        const { username } = !query ? await getUsername() : { username: '' };

        const { data, status } = !query
          ? await axios.get<T>(`/api/user/${username}`)
          : await axios.get<T>(`api/${query}`);

        if (status === 201) {
          setData((prev: FetchState<T>) => ({ ...prev, isLoading: false }));
          setData((prev: FetchState<T>) => ({ ...prev, apiData: data, status: status }));
        }

        setData((prev: FetchState<T>) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev: FetchState<T>) => ({
          ...prev,
          isLoading: false,
          serverError: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData] as const;
}
