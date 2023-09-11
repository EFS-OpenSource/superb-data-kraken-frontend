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

import { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import { SearchApp } from '@components/index';
import {
  ActivePathContextProvider,
  IntlWrapperContext,
  IsExpandedContextProvider,
} from '@contexts/index';
import {
  Layout,
  RequireAuthentication,
  RequireAuthorization,
} from '@router/index';
import {
  HomePage,
  AppPage,
  OpenSearchApp,
  ArgoWorkflow,
  LoginPage,
} from '@views/index';

function SdkRouter() {
  const { isAuthenticated } = useOidc();
  const { setLanguage } = useContext(IntlWrapperContext);
  const location = useLocation();

  return (
    <ActivePathContextProvider>
      <IsExpandedContextProvider>
        <Routes>
          {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}
          <Route element={<Layout onLanguageChange={setLanguage} />}>
            <Route element={<RequireAuthentication />}>
              <Route path="/home/*" element={<HomePage />} />
              <Route
                path="*"
                element={<Navigate to="/home/overview" replace />}
              />
              <Route path="/apps/dashboard" element={<OpenSearchApp />} />
              <Route path="/apps/workflow" element={<ArgoWorkflow />} />
              <Route path="/apps/search" element={<SearchApp />} />
              <Route element={<RequireAuthorization />}>
                <Route
                  path="/org/:orgID/space/:spaceID/*"
                  element={<AppPage />}
                />
                <Route
                  path="/org/:orgID/space/:spaceID"
                  element={
                    <Navigate
                      to="Overview"
                      state={{
                        from: location.pathname,
                      }}
                      replace
                    />
                  }
                />
                <Route path="/org/:orgID/*" element={<AppPage />} />

                <Route
                  path="/org/:orgID"
                  element={
                    <Navigate
                      to="Overview"
                      state={{
                        from: location.pathname,
                      }}
                      replace
                    />
                  }
                />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </IsExpandedContextProvider>
    </ActivePathContextProvider>
  );
}

export default SdkRouter;
