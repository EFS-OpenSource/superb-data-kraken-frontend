import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import MembersTab from './MembersTab';

describe('MembersTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MembersTab roles={[]} />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
