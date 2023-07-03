import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import UserAvatar from './UserAvatar';

describe('UserAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <UserAvatar size={0} dropdownItems={undefined} />,
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
