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

import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import { AppPage } from '@views/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'cross-fetch/polyfill';

const client = new QueryClient();

describe('FileUpload', () => {
  it('should successfully render FileUpload', (done) => {
    let baseElement: any;
    act(() => {
      baseElement = render(
        <TestWrapper>
          <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={['/org/2/space/170/FileUpload']}>
              <Routes>
                <Route
                  path="/org/:orgID/space/:spaceID/:appID/*"
                  element={<AppPage />}
                />
              </Routes>
            </MemoryRouter>
          </QueryClientProvider>
        </TestWrapper>,
      );
    });

    let upload;
    waitFor(() => {
      done();
      upload = baseElement.getByText('Upload', {
        selector: 'div',
      });
      expect(upload).toBeDefined();
      fireEvent.click(upload);
      const uploadButton = baseElement.getByText('Upload');
      expect(uploadButton).toBeDefined();

      expect(() =>
        baseElement.getByText('Falsy', {
          selector: 'button',
        }),
      ).toThrow();
    });
  });

  it('should successfully handle file drop', (done) => {
    let baseElement: any;
    act(() => {
      baseElement = render(
        <TestWrapper>
          <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={['/org/2/space/170/FileUpload']}>
              <Routes>
                <Route
                  path="/org/:orgID/space/:spaceID/:appID/*"
                  element={<AppPage />}
                />
              </Routes>
            </MemoryRouter>
          </QueryClientProvider>
        </TestWrapper>,
      );
    });

    let upload;
    waitFor(() => {
      done();
      upload = baseElement.getByText('Upload', { selector: 'div' });
      expect(upload).toBeDefined();
      fireEvent.click(upload);
      const uploadButton = baseElement.getByText('Hochladen', {
        selector: 'button',
      });
      expect(uploadButton).toBeDefined();
    });

    // const item = baseElement.getByText('UserData.json', { selector: 'td' });
    // expect(item).toBeTruthy();

    // expect(() =>
    //   baseElement.getByText('Falsy.json', {
    //     selector: 'td',
    //   }),
    // ).toThrow();
  });
});
