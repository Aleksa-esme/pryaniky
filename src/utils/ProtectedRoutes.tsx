import { Navigate, Outlet } from 'react-router-dom';
import { RouterPaths } from 'App';
import { useAppSelector } from 'hooks';

const useAuth = () => {
  const { loggedIn } = useAppSelector(state => state.appData);
  return loggedIn;
};

export const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={RouterPaths.LOGIN} />;
};
