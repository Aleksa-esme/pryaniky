import { Navigate, Outlet } from 'react-router-dom';
import { RouterPaths } from 'App';
import { useAuth } from 'hooks';

export const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={RouterPaths.LOGIN} />;
};
