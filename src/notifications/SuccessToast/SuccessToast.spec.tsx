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

import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import SuccessToast from './SuccessToast';

describe('SdkRouter', () => {
  it('should launch SuccessToast', async () => {
    let baseElement: RenderResult;
    act(() => {
      baseElement = render(
        <MemoryRouter initialEntries={['/home/overview']}>
          <TestWrapperNoOIDC>
            <ToastContainer />
          </TestWrapperNoOIDC>
        </MemoryRouter>,
      );
    });
    SuccessToast();
    let overview;
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
      overview = baseElement.getByText('Erfolg!', {
        selector: 'h5',
      });
      expect(overview).toBeDefined();
    });
  });
  it('should not launch SuccessToast with default message if one is provided', async () => {
    let baseElement: RenderResult;
    act(() => {
      baseElement = render(
        <MemoryRouter initialEntries={['/home/overview']}>
          <TestWrapperNoOIDC>
            <ToastContainer />
          </TestWrapperNoOIDC>
        </MemoryRouter>,
      );
    });
    SuccessToast('SuccessToast.title-upload');
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
      expect(() =>
        baseElement.getByText('Erfolg!', {
          selector: 'h5',
        }),
      ).toThrow();
      expect(() =>
        baseElement.getByText('Dateiupload erfolgreich!', {
          selector: 'h5',
        }),
      ).not.toThrow();
    });
  });
});
