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
  render,
  waitFor,
  screen,
  fireEvent,
  RenderResult,
  act,
  renderHook,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
//
import { AppPage } from '@views/index';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import { useConvertSpaceDisplayName } from '@customHooks/index';
import MockOrganization from '../../../assets/UserData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'cross-fetch/polyfill';

const client = new QueryClient();

const data = MockOrganization.spaces[0];

describe('Spaces', () => {
  jest.mock('@axa-fr/react-oidc', () => ({
    useOidc: () => ({
      oidcUser: {
        profile: { sub: '123' },
        tokens: {
          id_token: 'abc123',
          access_token: 'xyz456',
          access_token_invalid: 'asd',
        },
      },
      login: jest.fn(),
      oidcLogout: jest.fn(),
    }),
    useOidcIdToken: () => ({
      oidcUser: {
        profile: { sub: '123' },
        tokens: {
          id_token: 'abc123',
          access_token: 'xyz456',
          access_token_invalid: 'asd',
        },
      },
    }),
  }));
  it('should render Spaces in an org', (done) => {
    let baseElement: RenderResult;
    act(() => {
      baseElement = render(
        <TestWrapper>
          <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={['/org/2/Spaces']}>
              <Routes>
                <Route path="/org/:orgID/*" element={<AppPage />} />
              </Routes>
            </MemoryRouter>
          </QueryClientProvider>
        </TestWrapper>,
      );
    });
    let heading;

    waitFor(() => {
      done();
      expect(baseElement).toBeTruthy();
      heading = baseElement.findByText('Spaces', {
        selector: 'div',
      });
      expect(heading).toBeDefined();
    });
  });
  it('should not render Spaces in a space', (done) => {
    let baseElement: RenderResult;
    act(() => {
      baseElement = render(
        <TestWrapper>
          <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={['/org/2/space/170/Spaces']}>
              <Routes>
                <Route
                  path="/org/:orgID/space/:spaceID/*"
                  element={<AppPage />}
                />
              </Routes>
            </MemoryRouter>
          </QueryClientProvider>
        </TestWrapper>,
      );
    });
    waitFor(() => {
      done();
      expect(() => baseElement.getByText('Spaces')).toThrow();
    });
  });
  it('should open Modal when "+" icon is clicked', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      const openModalBtn = screen.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);
    });
  });
  it('should open close the opened Modal, when the close button is clicked', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
    waitFor(() => {
      done();
      const openModalBtn = screen.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const closeModalBtn = screen.getByRole('button', {
        name: 'closeManageOrgaSpaceModal',
      });
      fireEvent.click(closeModalBtn);
    });
  });
  it('should submit the form if at least the mandatory field "name" is filled and user is on the last tab of the modal', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
    waitFor(() => {
      done();
      const openModalBtn = baseElement.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const nameInput = baseElement.getByRole('textbox', { name: 'name' });
      fireEvent.change(nameInput, { target: { value: 'name' } });

      const nextBtn = baseElement.getByRole('button', {
        name: 'nextButton',
      });

      fireEvent.click(nextBtn);

      const submitBtn = baseElement.getByRole('button', {
        name: 'submitButton',
      });

      fireEvent.click(submitBtn);
    });
  });
  it('should convert the displayName to correct format for container name', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );

    const handleChange = jest.fn();

    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      const openModalBtn = baseElement.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const nameInput = baseElement.getByRole('textbox', { name: 'name' });
      fireEvent.change(nameInput, {
        target: { value: 'Mein erster Space!!!' },
      });

      const { result } = renderHook(() =>
        useConvertSpaceDisplayName('Mein erster Space!!!', handleChange, data),
      );

      const containerName = result.current;

      expect(containerName).toBe('mein-erster-space');
    });
  });
  it('should shorten containerName to 63 characters, if displayName is longer than that', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );

    const handleChange = jest.fn();

    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      const openModalBtn = baseElement.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const nameInput = baseElement.getByRole('textbox', { name: 'name' });
      fireEvent.change(nameInput, {
        target: {
          value:
            'aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaaa ',
        },
      });

      const { result } = renderHook(() =>
        useConvertSpaceDisplayName(
          'aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaaa ',
          handleChange,
          data,
        ),
      );

      const containerName = result.current;

      expect(containerName).toBe(
        'aaaaaaaaa-aaaaaaaaa-aaaaaaaaa-aaaaaaaaa-aaaaaaaaa-aaaaaaaaa-aaa',
      );
    });
  });
  it('should fill all the input fields: "name", "description"', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      const openModalBtn = baseElement.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const nameInput = baseElement.getByRole('textbox', { name: 'name' });
      const descriptionInput = baseElement.getByRole('textbox', {
        name: 'Beschreibung (optional)',
      });

      fireEvent.change(nameInput, { target: { value: 'name' } });
      fireEvent.change(descriptionInput, { target: { value: 'description' } });
    });
  });
  it('should be able to click/change the radio buttons ', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      const openModalBtn = screen.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const radioBtnConfidentiality = screen.getByRole('radio', {
        name: 'öffentlich',
      });
      fireEvent.click(radioBtnConfidentiality);
    });
  });
  it('should be able to open and close the add tag popover', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      const openModalBtn = screen.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const openPopover = screen.getByRole('button', {
        name: 'openAddEditSpaceTagPopover',
      });
      fireEvent.click(openPopover);
      const closePopover = screen.getByRole('button', {
        name: 'closePopoverButton',
      });
      fireEvent.click(closePopover);
    });
  });
  it('should be able to open add tag popover, add a tag to the input field and click the "add tag" button', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      const openModalBtn = screen.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const openPopover = screen.getByRole('button', {
        name: 'openAddEditSpaceTagPopover',
      });
      fireEvent.click(openPopover);

      const tagInput = screen.getByRole('textbox', { name: 'tagInput' });
      fireEvent.change(tagInput, { target: { value: 'tag' } });

      const addTagButton = screen.getByRole('button', {
        name: 'addTagButton',
      });
      fireEvent.click(addTagButton);
    });
  });
  it('if tag was entered in the popover a chip tag should appear in the modal', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      const openModalBtn = screen.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const openPopover = screen.getByRole('button', {
        name: 'openAddEditSpaceTagPopover',
      });
      fireEvent.click(openPopover);

      const tagInput = screen.getByRole('textbox', { name: 'tagInput' });
      fireEvent.change(tagInput, { target: { value: 'tag' } });

      const addTagButton = screen.getByRole('button', {
        name: 'addTagButton',
      });
      fireEvent.click(addTagButton);

      const tagChip = screen.getByRole('button', { name: 'tagChip' });
      expect(tagChip).toBeTruthy();

      const closeIcon = screen.getByRole('button', {
        name: 'deleteAddEditModalTag',
      });
      fireEvent.click(closeIcon);
    });
  });
  it('should not be able submit the form, if the required "name" field has no value  and user is on the last tab of the modal', (done) => {
    const baseElement = render(
      <TestWrapper>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={['/org/2/Spaces']}>
            <Routes>
              <Route path="/org/:orgID/*" element={<AppPage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();

      const openModalBtn = screen.getByRole('button', {
        name: 'openManageOrgaSpaceModal',
      });
      fireEvent.click(openModalBtn);

      const nextBtn = screen.getByRole('button', {
        name: 'nextButton',
      });

      fireEvent.click(nextBtn);

      const submitBtn = screen.getByRole('button', {
        name: 'submitButton',
      });
      fireEvent.click(submitBtn);
    });
  });
});
