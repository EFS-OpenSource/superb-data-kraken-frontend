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

import { fireEvent, render, screen } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import OrganizationGeneralTab from './OrganizationGeneralTab';
import MockOrganization from '@assets/UserData';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('OrganizationGeneralTab', () => {
  it('should render successfully', () => {
    const handleChange = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <OrganizationGeneralTab
          handleChange={handleChange}
          modalData={MockOrganization}
        />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should be possible to enter a name into the name field', () => {
    const handleChange = jest.fn();
    render(
      <TestWrapper>
        <OrganizationGeneralTab
          handleChange={handleChange}
          modalData={MockOrganization}
        />
      </TestWrapper>
    );

    const nameField = screen.getByRole('textbox', { name: 'name' });
    expect(nameField).toBeTruthy();

    fireEvent.change(nameField, { target: { value: 'abc' } });
  });
  it('should be possible to enter a company name into the company name field', () => {
    const handleChange = jest.fn();
    render(
      <TestWrapper>
        <OrganizationGeneralTab
          handleChange={handleChange}
          modalData={MockOrganization}
        />
      </TestWrapper>
    );

    const companyNameField = screen.getByRole('textbox', { name: 'company' });
    expect(companyNameField).toBeTruthy();

    fireEvent.change(companyNameField, { target: { value: 'abc' } });
  });
  it('should be possible to enter a description into the description field', () => {
    const handleChange = jest.fn();
    render(
      <TestWrapper>
        <OrganizationGeneralTab
          handleChange={handleChange}
          modalData={MockOrganization}
        />
      </TestWrapper>
    );

    const descriptionField = screen.getByRole('textbox', {
      name: 'description',
    });
    expect(descriptionField).toBeTruthy();

    fireEvent.change(descriptionField, { target: { value: 'abc' } });
  });
  it('should be possible to open the add tag popover, add a tag and then delete it by clicking on the tagChip', () => {
    const handleChange = jest.fn();
    render(
      <TestWrapper>
        <OrganizationGeneralTab
          handleChange={handleChange}
          modalData={MockOrganization}
        />
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

    const tags = screen.getAllByRole('button', { name: 'tagChip' });
    expect(tags).toBeTruthy();
    act(() => {
      tags.forEach((tag) => {
        fireEvent.click(tag);
      });
    });
  });

  it('should be possible to change the confidentiality using the radion buttons provided', () => {
    const handleChange = jest.fn();
    render(
      <TestWrapper>
        <OrganizationGeneralTab
          handleChange={handleChange}
          modalData={MockOrganization}
        />
      </TestWrapper>
    );

    const radioButton = screen.getByRole('radio', {
      name: 'intern',
    });
    const radioButton2 = screen.getByRole('radio', {
      name: 'öffentlich',
    });

    expect(radioButton).toBeChecked();

    fireEvent.click(radioButton2);
  });
});
