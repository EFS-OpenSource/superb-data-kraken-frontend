import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper';
import SearchApp from './SearchApp';
import 'cross-fetch/polyfill';
describe('SearchApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <SearchApp />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
