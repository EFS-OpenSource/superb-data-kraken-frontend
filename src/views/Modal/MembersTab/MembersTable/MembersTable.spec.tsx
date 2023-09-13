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
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import MembersTable from './MembersTable';
import { OrgaSpaceUser } from '@customTypes/userTypes';

describe('MembersTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MembersTable
          initialMembers={undefined}
          members={undefined}
          roles={[]}
          onRemoveMember={function (
            member:
              | OrgaSpaceUser<'access' | 'trustee' | 'admin'>
              | OrgaSpaceUser<'trustee' | 'user' | 'supplier'>,
          ): void {
            throw new Error('Function not implemented.');
          }}
          onHandleChange={function (
            passedData:
              | OrgaSpaceUser<'access' | 'trustee' | 'admin'>
              | OrgaSpaceUser<'trustee' | 'user' | 'supplier'>,
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
