import { IntlProvider } from 'react-intl';
// import { ReactKeycloakProvider } from '@react-keycloak/web'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OidcProvider } from '@axa-fr/react-oidc';
import { oidcConfiguration, oidcProps } from '@utils/authConf';
import { messagesDe, messagesEn } from '../../translations';
// import keycloak from '../keycloak.js'
// import { FeatureContextProvider } from '../contexts/FeatureContextProvider'

const messages: Record<string, unknown> = {
  de: messagesDe,
  en: messagesEn,
};

// const client = new QueryClient()

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <OidcProvider
    configuration={oidcConfiguration}
    loadingComponent={oidcProps.loadingComponent}
    callbackSuccessComponent={oidcProps.callbackSuccessComponent}
    authenticatingComponent={oidcProps.authenticatingComponent}
  >
    {/* <QueryClientProvider client={client}>
          <FeatureContextProvider> */}
    <IntlProvider
      locale="de"
      defaultLocale="de"
      messages={(messages['de'] as Record<string, string>) ?? messages.de}
    >
      {children}
    </IntlProvider>
    {/* </FeatureContextProvider>
     </QueryClientProvider> */}
  </OidcProvider>
);

export default TestWrapper;
