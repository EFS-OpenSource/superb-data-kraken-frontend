import { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SearchApp } from '@components/index';
import {
  ActivePathContextProvider,
  IntlWrapperContext,
  IsExpandedContextProvider,
} from '@contexts/index';
import { Layout } from '@router/index';
import { HomePage, OpenSearchApp, ArgoWorkflow } from '@views/index';

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
