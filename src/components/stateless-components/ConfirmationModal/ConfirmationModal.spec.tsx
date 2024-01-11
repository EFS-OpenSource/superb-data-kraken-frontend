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

import {
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import ConfirmationModal from './ConfirmationModal';

describe('ConfirmationModal', () => {
  it('should render successfully', () => {
    const onSetShow = jest.fn();
    const onHandleSubmit = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <ConfirmationModal
          show={false}
          confirmButtonText={'SuccessToast.title'}
          onSetShow={onSetShow}
          onHandleSubmit={onHandleSubmit}
          message={'SuccessToast.title'}
        />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('tests the cancel button', async () => {
    const onSetShow = jest.fn();
    const onHandleSubmit = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <ConfirmationModal
          show={true}
          confirmButtonText={'SuccessToast.title'}
          onSetShow={onSetShow}
          onHandleSubmit={onHandleSubmit}
          message={'SuccessToast.title'}
        />
      </TestWrapper>
    );
    const cancelButton = getByTestId(baseElement, 'cancel');
    fireEvent.click(cancelButton);
    expect(onSetShow).toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });
  it('tests the confirm button', async () => {
    const onSetShow = jest.fn();
    const onHandleSubmit = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <ConfirmationModal
          show={true}
          confirmButtonText={'SuccessToast.title'}
          onSetShow={onSetShow}
          onHandleSubmit={onHandleSubmit}
          message={'SuccessToast.title'}
        />
      </TestWrapper>
    );
    const confirmButton = await screen.findByRole('button', {
      name: 'Erfolg!',
    });
    fireEvent.click(confirmButton);
    expect(onSetShow).toHaveBeenCalled();
    expect(onHandleSubmit).toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });
});
