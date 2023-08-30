import { render } from '@testing-library/react';
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
          confirmButtonText={'asdasd'}
          onSetShow={onSetShow}
          onHandleSubmit={onHandleSubmit}
          message={'esf'}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
