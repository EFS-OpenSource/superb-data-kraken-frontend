import { render } from '@testing-library/react';
import { ActivePathContextProvider } from '@contexts/ActivePathContextProvider';
import { MemoryRouter } from 'react-router-dom';

test('context provider should render successfully', () => {
  render(
    <MemoryRouter initialEntries={['/home/overview']}>
      <ActivePathContextProvider>
        <div />
      </ActivePathContextProvider>
    </MemoryRouter>
  );
});
