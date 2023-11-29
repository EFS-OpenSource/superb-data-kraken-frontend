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

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import SpaceDataTab from './SpaceDataTab';
import MockOrganization from '@assets/UserData';
describe('SpaceDataTab', () => {
  it('should render successfully', () => {
    const handleChange = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <SpaceDataTab
          handleChange={handleChange}
          modalData={MockOrganization.spaces[0]}
        />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should trigger onChange function for FormInput', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <SpaceDataTab
          handleChange={handleChange}
          modalData={MockOrganization.spaces[0]}
        />
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Löschfrist');
    await user.type(input, '730');
    waitFor(() => {
      expect(input.textContent).toBe('730');
    });
  });
  it('should trigger onChange function for FormCheckbox', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <SpaceDataTab
          handleChange={handleChange}
          modalData={MockOrganization.spaces[0]}
        />
      </TestWrapper>
    );

    const checkbox = screen.getByText('Metadaten');
    await user.click(checkbox);
    waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });
});
