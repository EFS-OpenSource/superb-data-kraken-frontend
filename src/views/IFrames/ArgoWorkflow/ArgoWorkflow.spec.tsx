import { render } from '@testing-library/react';

import ArgoWorkflow from './ArgoWorkflow';

describe('ArgoWorkflow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArgoWorkflow />);
    expect(baseElement).toBeTruthy();
  });
});
