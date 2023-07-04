import { IntlProvider } from 'react-intl';
// import { ReactKeycloakProvider } from '@react-keycloak/web'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { messagesDe, messagesEn } from '../../translations';
// import keycloak from '../keycloak.js'
// import { FeatureContextProvider } from '../contexts/FeatureContextProvider'

const messages: Record<string, unknown> = {
  de: messagesDe,
  en: messagesEn,
};

// const client = new QueryClient()

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  // <ReactKeycloakProvider authClient={keycloak}>
  //     <QueryClientProvider client={client}>
  //         <FeatureContextProvider>
  <IntlProvider
    locale="de"
    defaultLocale="de"
    messages={(messages['de'] as Record<string, string>) ?? messages.de}
  >
    {children}
  </IntlProvider>
);
//         </FeatureContextProvider>
//     </QueryClientProvider>
// </ReactKeycloakProvider>

export default TestWrapper;
