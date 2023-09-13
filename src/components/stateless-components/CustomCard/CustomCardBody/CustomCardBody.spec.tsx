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

import { render } from '@testing-library/react';
import { CustomCardBody } from '@components/index';
import TestWrapperNoOIDC from '../../../../utils/TestWrapper/TestWrapperNoOIDC';
import MockOrganization from '../../../../assets/UserData';

const data = {
  name: 'Peter Parker',
  email: 'test.user@efs-auto.com',
  roles: [
    'org_sdkcorestorage_admin',
    'spc_all_public',
    'offline_access',
    'SDK_USER',
    'org_all_public',
    'SDK_ADMIN',
    'uma_authorization',
    'all_access',
    'sdkcorestorage_test-container_trustee',
    'default-roles-efs-sdk',
  ],
  organizations: MockOrganization,
};

describe('CustomCardBody', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <CustomCardBody data={data.organizations} cardType="organization" />
      </TestWrapperNoOIDC>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render data', () => {
    expect(data).toBeTruthy();
  });
});
