import { render } from '@testing-library/react';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import { InputChip } from '@components/index';

it('should render successfully', () => {
  const onClose = jest.fn();
  render(
    <TestWrapperNoOIDC>
      <InputChip text={''} onClose={onClose} />
    </TestWrapperNoOIDC>
  );
});
it('should render successfully with size xs', () => {
  const onClose = jest.fn();
  render(
    <TestWrapperNoOIDC>
      <InputChip text={'test'} onClose={onClose} size='xs' />
    </TestWrapperNoOIDC>
  );
});
it('should render successfully with size md', () => {
  const onClose = jest.fn();
  render(
    <TestWrapperNoOIDC>
      <InputChip text={'test'} onClose={onClose} size='md' />
    </TestWrapperNoOIDC>
  );
});
it('should render successfully with size lg', () => {
  const onClose = jest.fn();
  render(
    <TestWrapperNoOIDC>
      <InputChip text={'test'} onClose={onClose} size='lg' />
    </TestWrapperNoOIDC>
  );
});
