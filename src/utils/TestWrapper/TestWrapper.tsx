import { IntlProvider } from 'react-intl';
import { OidcProvider } from '@axa-fr/react-oidc';
import { oidcConfiguration, oidcProps } from '@utils/authConf';
import { messagesDe, messagesEn } from '../../translations';
// import { FeatureContextProvider } from '../contexts/FeatureContextProvider'

const messages: Record<string, unknown> = {
  de: messagesDe,
  en: messagesEn,
};

// const client = new QueryClient();

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <OidcProvider
    configuration={oidcConfiguration}
    loadingComponent={oidcProps.loadingComponent}
    callbackSuccessComponent={oidcProps.callbackSuccessComponent}
    authenticatingComponent={oidcProps.authenticatingComponent}
  >
    <IntlProvider
      locale="de"
      defaultLocale="de"
      messages={(messages['de'] as Record<string, string>) ?? messages.de}
    >
      {children}
    </IntlProvider>
  </OidcProvider>
);

export default TestWrapper;
