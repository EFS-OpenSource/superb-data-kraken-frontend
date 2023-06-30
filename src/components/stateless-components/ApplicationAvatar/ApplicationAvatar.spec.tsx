import { render } from '@testing-library/react';

import ApplicationAvatar from './ApplicationAvatar';

describe('ApplicationAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationAvatar />);
    expect(baseElement).toBeTruthy();
  });
});
