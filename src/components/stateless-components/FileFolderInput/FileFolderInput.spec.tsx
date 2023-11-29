import { render } from '@testing-library/react';
import { FileFolderInput } from '@components/index';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import { Bs0Circle } from 'react-icons/bs';

it('should render successfully', () => {
  render(
    <TestWrapperNoOIDC>
      <FileFolderInput
        htmlFor={''}
        containerId={''}
        ariaLabel={''}
        inputId={''}
      />
    </TestWrapperNoOIDC>
  );
});
it('should render successfully with icon and textId', () => {
  render(
    <TestWrapperNoOIDC>
      <FileFolderInput
        htmlFor={''}
        containerId={''}
        ariaLabel={''}
        inputId={''}
        icon={Bs0Circle}
        textId='test'
      />
    </TestWrapperNoOIDC>
  );
});
