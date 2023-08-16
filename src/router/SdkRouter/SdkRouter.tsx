import { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import { SearchApp } from '@components/index';
import {
  ActivePathContextProvider,
  IntlWrapperContext,
  IsExpandedContextProvider,
} from '@contexts/index';
import RequireAuthentication from '@router/RequireAuthentication/RequireAuthentication';
import { Layout } from '@router/index';
import { HomePage, OpenSearchApp, ArgoWorkflow, LoginPage } from '@views/index';
import RequireAuthorization from '@router/RequireAuthorization/RequireAuthorization';
import AppPage from '@views/AppPage/AppPage/AppPage';

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
