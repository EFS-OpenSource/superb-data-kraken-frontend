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

import { TokenRenewMode } from '@axa-fr/react-oidc';

const oidcConfiguration = {
  client_id: 'sdk-client',
  redirect_uri: `${window.location.origin}/home/overview#callback`,
  silent_redirect_uri: `${window.location.origin}/home/overview#silent-callback`,
  scope: 'openid',
  authority: process.env.VITE_SDK_KEYCLOAK_REALM_URL as string,
  service_worker_relative_url: '/OidcServiceWorker.js',
  // service_worker_relative_url: `${process.env.VITE_PUBLIC_URL}OidcServiceWorker.js`,
  // service_worker_keep_alive_path: `${process.env.VITE_PUBLIC_URL}/`,
  service_worker_only: true,
  token_renew_mode: TokenRenewMode.access_token_invalid,
};

// export const oidcProps = {
//   loadingComponent: LoadingIndicator,
//   authenticatingComponent: LoadingIndicator,
//   callbackSuccessComponent: LoadingIndicator,
// };

export default oidcConfiguration;
