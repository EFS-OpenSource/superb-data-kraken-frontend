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

import { useIntl } from 'react-intl';

interface ErrToastMsg {
  message?: string;
  errorStatus?: string | number;
  errorMessage?: string;
}

function ErrorToastMsg({
  message,
  errorStatus,
  errorMessage,
}: ErrToastMsg): JSX.Element {
  const { formatMessage } = useIntl();

  return (
    <div className="ms-3">
      <h5 className="mb-0 pb-0 ps-0">
        {typeof message !== 'undefined'
          ? formatMessage({ id: message })
          : formatMessage({ id: 'ErrorToast.title' })}
      </h5>
      {typeof errorStatus !== 'undefined' && (
        <div>
          {errorStatus && (
            <h6 className="mt-2 pb-0 ps-0">{`${errorStatus}`}</h6>
          )}
          {errorMessage && (
            <h6 className="mt-2 pb-0 ps-0">{`${formatMessage({
              id: errorMessage,
            })}`}</h6>
          )}
        </div>
      )}
    </div>
  );
}

export default ErrorToastMsg;
