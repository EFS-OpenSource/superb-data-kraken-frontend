import { render } from '@testing-library/react';
import { IsExpandedContextProvider } from '@contexts/IsExpandedContextProvider';

test('context provider should render successfully', () => {
  render(
    <IsExpandedContextProvider>
      <div />
    </IsExpandedContextProvider>
  );
});
