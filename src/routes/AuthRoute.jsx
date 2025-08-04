/* eslint-disable prettier/prettier */
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthRoute({ children, redirectTo = '/dashboard' }) {
  const { isAuth } = useSelector((state) => state.auth);

  if (isAuth) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
}
