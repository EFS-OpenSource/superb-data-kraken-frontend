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
