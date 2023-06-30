import { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SearchApp } from 'src/components';
import { ActivePathContextProvider } from 'src/contexts/ActivePathContextProvider';
import { IntlWrapperContext } from 'src/contexts/IntlProviderWrapper';
import { IsExpandedContextProvider } from 'src/contexts/IsExpandedContextProvider';
import { Layout } from 'src/router/Layout/Layout';
import { HomePage, OpenSearchApp, ArgoWorkflow } from 'src/views/';

function SdkRouter() {
  const { setLanguage } = useContext(IntlWrapperContext);
  return (
    <ActivePathContextProvider>
      <IsExpandedContextProvider>
        <Routes>
          <Route element={<Layout onLanguageChange={setLanguage} />}>
            <Route path="/*" element={<HomePage />} />
            <Route path="/apps/dashboard" element={<OpenSearchApp />} />
            <Route path="/apps/workflow" element={<ArgoWorkflow />} />
            <Route path="/apps/search" element={<SearchApp />} />
          </Route>
        </Routes>
      </IsExpandedContextProvider>{' '}
    </ActivePathContextProvider>
  );
}

export default SdkRouter;
