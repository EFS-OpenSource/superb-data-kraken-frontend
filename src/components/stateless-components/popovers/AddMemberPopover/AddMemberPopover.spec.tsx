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

import { render, screen } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import AddMemberPopover from './AddMemberPopover';
import userEvent from '@testing-library/user-event';
import { InputChip } from '@components/index';
import { act } from 'react-dom/test-utils';
import { forEach } from 'lodash';

describe('AddMemberPopover', () => {
  it('should render successfully', () => {
    const onSetUserData = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <AddMemberPopover
          dropdownOptions={[]}
          onSetUserData={onSetUserData}
          options={[]}
          membersInTable={[]}
        />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should be able to enter emailadress', async () => {
    const user = userEvent.setup();
    const onSetUserData = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <AddMemberPopover
          dropdownOptions={['access']}
          onSetUserData={onSetUserData}
          options={[{ label: 'user@test.com', value: 'user@test.com' }]}
          membersInTable={[]}
        />
      </TestWrapper>
    );

    const openPopover = screen.getByRole('button', {
      name: 'openAddMemberPopover',
    });

    await user.click(openPopover);
    console.log(baseElement.innerHTML);
    const inputFields = await screen.findAllByRole('combobox');
    inputFields.forEach(async (field) => {
      await user.type(field, 'user@test.com');
    });

    const closeButton = screen.getByRole('button', {
      name: 'close-addMemberPopover',
    });

    await user.click(closeButton);
  });
});
