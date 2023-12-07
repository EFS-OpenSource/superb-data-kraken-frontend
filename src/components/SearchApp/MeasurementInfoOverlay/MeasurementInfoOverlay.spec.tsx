import { fireEvent, render, screen } from '@testing-library/react';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import MeasurementInfoOverlay from '@components/SearchApp/MeasurementInfoOverlay/MeasurementInfoOverlay';

const data = {
  metadata: {
    name: '20230512100223',
    description: 'Basic metadata',
    dateTime: {
      createdAt: '2021-10-07T13:55:17+0200',
    },
    project: {
      name: 'demo-space',
      type: 'development',
      confidentiality: 'intern',
      purpose: 'Template',
    },
    scope: {
      name: 'demo-space',
      purpose: 'Template',
      confidentiality: 'intern',
    },
    authors: [],
    environment: {
      name: 'None',
    },
    entities: [],
    data: [],
  },
  massdata: [
    {
      location: '20230512100223/test/someText.txt',
      name: 'someText.txt',
      dateCreated: '2023-05-12T08:04:45+0000',
      size: 15,
    },
  ],
  organization: 'egreentech',
  uuid: 'b4a93e6a-f09b-11ed-a63e-d62502bf6db9',
  space: 'demo-space',
};
test('measurement info overlay should render successfully', () => {
  const toggler = jest.fn();
  render(
    <TestWrapperNoOIDC>
      <MeasurementInfoOverlay data={data} onOverlayToggler={toggler} />
    </TestWrapperNoOIDC>
  );
});
test('click zurück button', () => {
  const toggler = jest.fn();
  render(
    <TestWrapperNoOIDC>
      <MeasurementInfoOverlay data={data} onOverlayToggler={toggler} />
    </TestWrapperNoOIDC>
  );

  const button = screen.getByText(/zurück/i);
  fireEvent.click(button);
});
test('trigger handleFileDownload', () => {
  const toggler = jest.fn();
  render(
    <TestWrapperNoOIDC>
      <MeasurementInfoOverlay data={data} onOverlayToggler={toggler} />
    </TestWrapperNoOIDC>
  );

  const button = screen.getByRole('button', { name: 'bsdownload' });
  fireEvent.click(button);
});
