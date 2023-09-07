import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import AddMemberPopover from './AddMemberPopover';

describe('AddMemberPopover', () => {
  it('should render successfully', () => {
    const onSetUserData = jest.fn();
    const { baseElement } = render(
      <TestWrapper>
        <AddMemberPopover dropdownOptions={[]} onSetUserData={onSetUserData} />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
