import { useOidc } from '@axa-fr/react-oidc';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuthentication = () => {
  const { isAuthenticated } = useOidc();
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuthentication;
