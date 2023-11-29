import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import CustomButton from '@components/stateless-components/CustomButton/CustomButton';
import { Bs0Circle } from 'react-icons/bs';
it('should render successfully (disabled to cover branch in test)', () => {
  render(
    <TestWrapper>
      <CustomButton
        icon={<Bs0Circle />}
        onClick={function (event: unknown): void {
          throw new Error('Function not implemented.');
        }}
        buttonDisabled
      />
    </TestWrapper>
  );
});
