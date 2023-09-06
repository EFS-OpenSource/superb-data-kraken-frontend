import { TokenRenewMode } from '@axa-fr/react-oidc';
import { LoadingIndicator } from '@components/index';

const oidcConfiguration = {
  client_id: 'sdk-client',
  redirect_uri: `${window.location.origin}/home/overview#callback`,
  silent_redirect_uri: `${window.location.origin}/home/overview#silent-callback`,
  scope: 'openid',
  authority: 'https://sdk-dev.efs.ai/auth/realms/efs-sdk',
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: true,
  token_renew_mode: TokenRenewMode.access_token_invalid,
};

// export const oidcProps = {
//   loadingComponent: LoadingIndicator,
//   authenticatingComponent: LoadingIndicator,
//   callbackSuccessComponent: LoadingIndicator,
// };

export default oidcConfiguration;
