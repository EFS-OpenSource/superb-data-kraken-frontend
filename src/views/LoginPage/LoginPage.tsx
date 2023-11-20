/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';

interface LocationState {
  from: { pathname: string };
}

function LoginPage() {
  const { login, isAuthenticated } = useOidc();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state !== null && (location.state as LocationState).from) ||
    '/home/overview';

  useEffect(() => {
    login(`${from}`);
    if (isAuthenticated) navigate(from, { replace: true });
  }, [from, isAuthenticated, navigate, login]);

  return <Outlet />;
}

export default LoginPage;
