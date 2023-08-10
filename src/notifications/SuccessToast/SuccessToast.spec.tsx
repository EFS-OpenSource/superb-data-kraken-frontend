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
