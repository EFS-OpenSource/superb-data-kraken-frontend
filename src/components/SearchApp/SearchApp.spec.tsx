import { render } from '@testing-library/react';

import SearchApp from './SearchApp';

describe('SearchApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchApp />);
    expect(baseElement).toBeTruthy();
  });
});
