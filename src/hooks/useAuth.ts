import { useAppSelector } from 'hooks';

export const useAuth = () => {
  const { loggedIn } = useAppSelector(state => state.appData);
  return loggedIn;
};
