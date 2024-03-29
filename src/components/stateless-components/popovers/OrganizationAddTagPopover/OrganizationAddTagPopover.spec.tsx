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

import { act, fireEvent, render, screen } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import OrganizationAddTagPopover from './OrganizationAddTagPopover';

describe('OrganizationAddTagPopover', () => {
  it('should render successfully', () => {
    const handleAddOrgaTag = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <OrganizationAddTagPopover handleAddOrgaTag={handleAddOrgaTag} />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should click the + button to open the modal, enter a tag and add it', () => {
    const handleAddOrgaTag = jest.fn();
    render(
      <TestWrapper>
        <OrganizationAddTagPopover handleAddOrgaTag={handleAddOrgaTag} />
      </TestWrapper>
    );
    const openPopoverButton = screen.getByRole('button', {
      name: 'openAddEditSpaceTagPopover',
    });
    expect(openPopoverButton).toBeTruthy();

    act(() => {
      fireEvent.click(openPopoverButton);
    });

    const tagInputField = screen.getByRole('textbox', { name: 'tagInput' });
    expect(tagInputField).toBeTruthy();

    act(() => {
      fireEvent.change(tagInputField, { target: { value: 'test tag' } });
    });

    const addTagButton = screen.getByRole('button', { name: 'addTagButton' });
    expect(addTagButton).toBeTruthy();

    act(() => {
      fireEvent.click(addTagButton);
    });
  });
  it('should click the + button to open the modal and then x button to close the modal', () => {
    const handleAddOrgaTag = jest.fn();
    render(
      <TestWrapper>
        <OrganizationAddTagPopover handleAddOrgaTag={handleAddOrgaTag} />
      </TestWrapper>
    );
    const openPopoverButton = screen.getByRole('button', {
      name: 'openAddEditSpaceTagPopover',
    });
    expect(openPopoverButton).toBeTruthy();

    act(() => {
      fireEvent.click(openPopoverButton);
    });

    const closePopoverButton = screen.getByRole('button', {
      name: 'closePopoverButton',
    });
    expect(closePopoverButton).toBeTruthy();

    act(() => {
      fireEvent.click(closePopoverButton);
    });
  });
});
