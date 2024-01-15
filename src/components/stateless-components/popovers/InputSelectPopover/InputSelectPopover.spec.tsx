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
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import InputSelectPopover from './InputSelectPopover';
import { Button } from 'react-bootstrap';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('InputSelectPopover', () => {
  it('should render successfully', () => {
    const handleShow = jest.fn();
    const openPopoverButton = (
      <Button
        aria-label='applyAccessButton'
        size='sm'
        onClick={(e) => handleShow(e)}
      >
        Test
      </Button>
    );
    const { baseElement } = render(
      <TestWrapper>
        <InputSelectPopover
          id={''}
          placement={'auto'}
          buttonLabel={''}
          popoverOpenButton={openPopoverButton}
          dropdownOptions={[]}
          handleShow={handleShow}
        />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should trigger onChange for input field', async () => {
    const user = userEvent.setup();
    const handleShow = jest.fn();
    const onSend = jest.fn();
    const openPopoverButton = (
      <Button
        aria-label='applyAccessButton'
        size='sm'
        onClick={(e) => handleShow(e)}
      >
        Test
      </Button>
    );
    const { baseElement } = render(
      <TestWrapper>
        <InputSelectPopover
          inputLabel='test input label'
          id={'input'}
          inputPlaceholder='inputPlaceholder'
          placement={'auto'}
          buttonLabel={''}
          popoverOpenButton={openPopoverButton}
          dropdownOptions={['user']}
          onSend={onSend}
          handleShow={handleShow}
          selectOptions={[]}
          inputValue='before input'
          selectPlaceholder2='roleDropdown'
        />
      </TestWrapper>
    );

    const openButton = screen.getByRole('button', {
      name: 'applyAccessButton',
    });

    await user.click(openButton);
    const input = screen.getByPlaceholderText('inputPlaceholder');
    await user.type(input, 'test input');
    const roleDropdown = screen.getByRole('combobox');
    // await user.selectOptions(roleDropdown, 'user');
    const sendButton = screen.getByRole('button', { name: 'input-addButton' });
    await user.click(sendButton);
  });
});
