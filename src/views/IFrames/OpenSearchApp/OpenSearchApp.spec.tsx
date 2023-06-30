import { render } from '@testing-library/react';

import OpenSearchApp from './OpenSearchApp';

describe('OpenSearchApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpenSearchApp />);
    expect(baseElement).toBeTruthy();
  });
});
