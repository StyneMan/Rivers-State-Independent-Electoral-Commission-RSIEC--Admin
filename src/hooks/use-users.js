/* eslint-disable prettier/prettier */
import useSWR from 'swr';

export default function useUsers(page) {
  const { data, mutate, error } = useSWR(`/team/all?page=${page}`);

  console.log('USERS ::: ', data);

  const loading = !data && !error;
  const loggedOut =
    (error && error?.message === 'No token provided.') ||
    error?.response?.status === 401 ||
    error?.response?.status === 403 ||
    error?.response?.data?.message === 'No user found!' ||
    data?.accountStatus === 'frozen';

  return {
    loading,
    loggedOut,
    data,
    mutate
  };
}

