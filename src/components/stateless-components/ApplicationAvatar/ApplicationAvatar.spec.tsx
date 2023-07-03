import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import ApplicationAvatar from './ApplicationAvatar';
import { IconBaseProps } from 'react-icons/lib';
import { BsCircle } from 'react-icons/bs';

describe('ApplicationAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <ApplicationAvatar icon={BsCircle} size={0} />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
