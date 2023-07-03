import { render } from '@testing-library/react';

import Icon from './Icon';
import { IconBaseProps } from 'react-icons/lib';

jest.mock('./Icon');

describe('Icon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Icon
        icon={function (props: IconBaseProps): JSX.Element {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
