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
import AddTagPopover from './AddTagPopover';
import userEvent from '@testing-library/user-event';

describe('AddTagPopover', () => {
  it('should render successfully', () => {
    const handleAddTag = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <AddTagPopover handleAddTag={handleAddTag} placeholder={''} />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should be opened and closed', async () => {
    const user = userEvent.setup();
    const handleAddTag = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <AddTagPopover handleAddTag={handleAddTag} placeholder={''} />
      </TestWrapper>
    );

    const openButton = screen.getByRole('button', {
      name: 'openAddEditSpaceTagPopover',
    });
    await user.click(openButton);

    const closeButton = screen.getByRole('button', {
      name: 'closePopoverButton',
    });
    await user.click(closeButton);
  });
});
