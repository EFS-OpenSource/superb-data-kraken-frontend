import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SdkRouter from './SdkRouter';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';

jest.mock('@axa-fr/react-oidc', () => ({
  useOidc: () => ({ useOidc: jest.fn() }),
}));
describe('SdkRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <MemoryRouter initialEntries={['/home/overview']}>
          <SdkRouter />
        </MemoryRouter>
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  // it('should redirect unauthenticated request to LoginPage', () => {
  //     const { baseElement } = render(
  //         <MemoryRouter initialEntries={['/home/overview']}>
  //             <TestWrapper>
  //                 <SdkRouter />
  //             </TestWrapper>
  //         </MemoryRouter>
  //     )
  //     const loginIcon = baseElement.querySelector('svg')
  //     expect(loginIcon).toBeTruthy()
  // })
  // toDo: mock keycloak...
  // it('should render HomePage if user is authenticated', () => {
  //     const { baseElement } = render(
  //         <TestWrapper>
  //             <MemoryRouter initialEntries={['/home/overview']}>
  //                 <Routes>
  //                     <Route path='/home/*' element={<HomePage />} />
  //                 </Routes>
  //             </MemoryRouter>
  //         </TestWrapper>
  //     )
  //     const title = baseElement.querySelector('h1')
  //     expect(title?.textContent).toContain(
  //         'Willkommen auf der SDK Plattform, '
  //     )
  // })
});
