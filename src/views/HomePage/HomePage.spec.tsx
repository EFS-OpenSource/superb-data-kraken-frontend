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

import { render, waitFor, screen, RenderResult } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './HomePage';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import 'cross-fetch/polyfill';

const client = new QueryClient();

describe('HomePage', () => {
  it('renders successfully', async () => {
    let baseElement: RenderResult;
    await act(async () => {
      baseElement = render(
        <TestWrapper>
          <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={['/home/overview']}>
              <HomePage />
            </MemoryRouter>
          </QueryClientProvider>
        </TestWrapper>
      );
    });
  });
});
