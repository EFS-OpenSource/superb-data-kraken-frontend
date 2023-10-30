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

import { Nav } from 'react-bootstrap';
import { useIntl } from 'react-intl';

interface SecondaryTabProps {
  tab: string;
  disabled?: boolean;
}

function SecondaryTab({ tab, disabled }: SecondaryTabProps) {
  const { formatMessage } = useIntl();

  return (
    <Nav.Item className='text-left me-4 tab-width'>
      <Nav.Link disabled={disabled}>
        <div>
          {formatMessage({
            id: tab,
          })}
        </div>
      </Nav.Link>
    </Nav.Item>
  );
}

export default SecondaryTab;
