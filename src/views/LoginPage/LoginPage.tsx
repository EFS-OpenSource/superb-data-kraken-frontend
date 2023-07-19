import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';

interface LocationState {
  from: { pathname: string };
}

const LoginPage = () => {
  const { login, isAuthenticated } = useOidc();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state !== null && (location?.state as LocationState).from) ||
    '/home/overview';

  useEffect(() => {
    login(`${from}`);
    if (isAuthenticated) navigate(from, { replace: true });
  }, [from, isAuthenticated, navigate, login]);

  return <Outlet />;
};

export default LoginPage;
